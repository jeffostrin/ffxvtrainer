require 'json'
require_relative '../time_constants'
require_relative '../fmt'
require_relative '../events_mini'
require_relative '../assert'
require_relative 'scoring'
require_relative 'score_merge'

file_name = "mini_events.json"

def print_usage
  puts "============================"
  puts "u - backwards in time 1 day"
  puts "j - backwards in time 1 hour"

  puts "i - forwards in time 1 day"
  puts "k - forwards in time 1 hour"

  puts "d - display the values for the current hour"
  puts "h - display the (h)istory for the current hour"
  puts "g - generate a file that has the most recent 10 entries per hour"

  puts "e - edit an hour (to remove observations)"
  puts "a - add observation to an hour (default mode)"

  puts "p - print schedule"

  puts "q - quit"
  puts "? - help"

  puts "## - enter an observation"
  puts "============================"
end

#---------------------
# Character inputs
# https://gist.github.com/acook/4190379
#---------------------
require 'io/console'

# Reads keypresses from the user including 2 and 3 escape character sequences.
def read_char
  STDIN.echo = false
  STDIN.raw!

  input = STDIN.getc.chr
  if input == "\e" then
    input << STDIN.read_nonblock(3) rescue nil
    input << STDIN.read_nonblock(2) rescue nil
  end
ensure
  STDIN.echo = true
  STDIN.cooked!

  return input
end

# oringal case statement from:
# http://www.alecjacobson.com/weblog/?p=75
def show_single_key
  c = read_char

  case c
  when " "
    puts "SPACE"
  when "\t"
    puts "TAB"
  when "\r"
    puts "RETURN"
  when "\n"
    puts "LINE FEED"
  when "\e"
    puts "ESCAPE"
  when "\e[A"
    puts "UP ARROW"
  when "\e[B"
    puts "DOWN ARROW"
  when "\e[C"
    puts "RIGHT ARROW"
  when "\e[D"
    puts "LEFT ARROW"
  when "\177"
    puts "BACKSPACE"
  when "\004"
    puts "DELETE"
  when "\e[3~"
    puts "ALTERNATE DELETE"
  when "\u0003"
    puts "CONTROL-C"
    exit 0
  when /^.$/
    puts "SINGLE CHAR HIT: #{c.inspect}"
  else
    puts "SOMETHING ELSE: #{c.inspect}"
  end
end
#---------------------
#---------------------


def read_json_file(fname)
  contents = ""
  File.open(fname).each do |line|
    contents = contents + line
  end
  json = JSON.parse(contents)
  return json
end

def write_json_file(fname, json)
  File.open(fname, "w") do |file|
    file.write(json.to_json)
  end
end

class Navigation
  attr_reader :utc_time

  def initialize()
  	utc_now = Time.now.utc
    @utc_time = Time.utc(utc_now.year, utc_now.month, utc_now.day, utc_now.hour)
  end

  def backwards(count)
    (1..count).each do |counter|
      @utc_time = @utc_time - SECONDS_IN_HOUR
  	end
  end

  def forwards(count)
    (1..count).each do |counter|
      @utc_time = @utc_time + SECONDS_IN_HOUR
  	end
  end

  def get_hepoch
  	hepoch = (@utc_time.tv_sec / SECONDS_IN_HOUR).to_s
  	return hepoch
  end

  def get_local_time
  	return @utc_time.clone.localtime
  end

end

class Mode


end

class Option
  attr_reader :name
  attr_reader :score
  attr_reader :trend

  def initialize(params)
    @name = params[:name]
    assert(@name != nil, "Option.name is required")
    @score = params[:score]
    @trend = params[:trend]
  end
end

def get_default_options
  options = []
  MiniEvents::Options.each do |option|
    options << Option.new(:name => option)
  end
  return options
end

def calculate_historical_scores(json, hepoch, num_days_ago)
  # assert hepoch is a number

  option_hash = {}
  probe_hepoch = (hepoch - (24 * num_days_ago)).to_s
  #puts probe_hepoch
  if json.has_key? probe_hepoch
    events = json[probe_hepoch]
    scores = score_hepoch(events, num_days_ago)
    option_hash = merge_scores(option_hash, scores)
    # puts option_hash
  end
  return option_hash
end

def get_score(option_set, option)
  if option_set.has_key? option
    return option_set[option]
  end
  return 0
end

def get_historical_options(json, hepoch)
  # assert hepoch is a string

  baseline = {}
  (2..100).each do |counter|
    scores = calculate_historical_scores(json, (hepoch.to_i - 48), counter)
    baseline = merge_scores(baseline, scores)
  end


  # calculate scores
  option_hash = {}
  (0..100).each do |counter|
    scores = calculate_historical_scores(json, hepoch.to_i, counter)
    option_hash = merge_scores(option_hash, scores)
  end

  # calculate trends

  # build objects
  options = []
  option_hash.keys.each do |option|
    trend = get_score(option_hash, option) - get_score(baseline, option)
    option = Option.new(:name => option, :score => option_hash[option].to_s, :trend => trend)
    options << option
    # puts "#{option.name} #{option.score} #{option.trend}"
  end
  return options
end

def sort_historical_options(options)
  options = options.sort { |x,y| y.score.to_i <=> x.score.to_i }
  return options
end


def get_options(json, hepoch)
  option_list = get_historical_options(json, hepoch)
  option_list = sort_historical_options(option_list)
  get_default_options.each do |option|
  	option_list << option
  end

  options = {}
  option_list.each_with_index do |option, index|
    options[index+1] = option
  end
  return options
end

def display_hepoch(hepoch, json)
  if ! json.has_key? hepoch
    return
  end

  data = json[hepoch]
  puts "current hepoch > " + data.to_s
end

def display_hepoch_history(hepoch, json)
  max_tries = json.keys.size

  (0..max_tries).each do |counter|
    probe_hepoch = (hepoch.to_i - (24 * counter)).to_s
    display_hepoch(probe_hepoch, json)
  end
end

def generate_compact_file(json)
  puts "generating file"
end

def edit_hepoch(hepoch, json)

end

def print_schedule(hepoch, json)
  hepoch = hepoch.to_i
  nav = Navigation.new


  (hepoch..(hepoch+24)).each do |hepoch_to_print|
    prompt = Fmt.time(nav.get_local_time).as_local_hour_and_day +  " " + hepoch_to_print.to_s + " >"

    puts prompt

    option_list = get_historical_options(json, hepoch_to_print.to_s)
    option_list = sort_historical_options(option_list)
    option_list.each do |option|
      puts "  " + option.name + " " + ('%.2f' % option.score)
    end

    nav.forwards 1
  end
end

json = read_json_file(file_name)

state = Navigation.new

# puts utc_hour
# puts local_hour

# utc_hour_epoch = utc_hour.tv_sec / SECONDS_IN_HOUR

c = "x"

while c != "q" do

  puts

  hepoch = state.get_hepoch

  display_hepoch(hepoch, json)

  options = get_options(json, hepoch)
  options.keys.sort.each do |key|
  	option = "  #{key} - #{options[key].name}"
    if options[key].score != nil && options[key].score.length > 0
      option += (" (%.2f)" % options[key].score) + (" (%.2f)" % options[key].trend)
    end
    puts option
  end

# make %w the day-of week (monday, tuesday, wednesday...)
  prompt = "+@ " + state.get_local_time.strftime("%Y/%m/%d %I:%M(%P) %H:%M (%A)") + " " + hepoch + ">"
  puts prompt

  c = read_char
  # c = STDIN.readline
  # c = c.strip

  if "u" == c || "\e[A"  == c
  	state.backwards 24
  elsif "j" == c || "\e[D" == c
  	state.backwards 1
  elsif "i" == c || "\e[B" == c
  	state.forwards 24
  elsif "k" == c || "\e[C" == c
  	state.forwards 1
  elsif "d" == c
    display_hepoch(hepoch, json)
  elsif "h" == c
    display_hepoch_history(hepoch, json)
  elsif "g" == c
    generate_compact_file(json)
  elsif "e" == c
    edit_hepoch(hepoch, json)
  elsif "p" == c
    print_schedule(hepoch, json)
  elsif "q" == c
  elsif "?" == c
    print_usage
  else
    putc c
    c = c + STDIN.readline
    c = c.strip

    if options.has_key? c.to_i
  	   selection = options[c.to_i].name

    	if ! json.has_key? hepoch
    	  json[hepoch] = []
    	end
    	json[hepoch] << selection

      puts json.to_json
      write_json_file(file_name, json)

      state.forwards 1
    else
    	puts "unknown input (#{c})"
    end
  end
end
