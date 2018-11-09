require 'json'
require_relative 'time_constants'
require_relative 'fmt'
require_relative 'events_mini'
require_relative 'assert'

file_name = "mini_events.json"

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

class Option
  attr_reader :name
  attr_reader :extra

  def initialize(params)
    @name = params[:name]
    assert(@name != nil, "Option.name is required")
    @extra = params[:extra]
  end
end


def get_default_options
  options = []
  MiniEvents::Options.each do |option|
    options << Option.new(:name => option)
  end
  return options
end

def get_historical_options(json, hepoch)
  option_hash = {}
  (0..10).each do |counter|
  	probe_hepoch = (hepoch.to_i - (24 * counter)).to_s
  	#puts probe_hepoch
    if json.has_key? probe_hepoch
      json[probe_hepoch].each do |historical_option|
        if option_hash[historical_option].nil?
          option_hash[historical_option] = 0
        end
      	option_hash[historical_option] = option_hash[historical_option] + 1
      end
    end
  end
  options = []
  option_hash.keys.each do |option|
    options << Option.new(:name => option, :extra => option_hash[option].to_s)
  end
  return options
end

def get_options(json, hepoch)
  option_list = get_historical_options(json, hepoch)
  get_default_options.each do |option|
  	option_list << option
  end

  options = {}
  option_list.each_with_index do |option, index|
    options[index+1] = option
  end
  return options
end

json = read_json_file(file_name)

state = Navigation.new

# puts utc_hour
# puts local_hour

# utc_hour_epoch = utc_hour.tv_sec / SECONDS_IN_HOUR

c = "x"

while c != "q" do

  hepoch = state.get_hepoch
  options = get_options(json, hepoch)
  options.keys.sort.each do |key| 
  	option = "#{key} - #{options[key].name}"
    if options[key].extra != nil && options[key].extra.length > 0
      option += " (#{options[key].extra})"
    end
    puts option
  end

  prompt = Fmt.time(state.get_local_time).as_local_hour_and_day +  " " + hepoch + " >"
  puts prompt

  c = STDIN.readline
  c = c.strip

  if "u" == c
  	state.backwards 24
  elsif "j" == c
  	state.backwards 1
  elsif "i" == c
  	state.forwards 24
  elsif "k" == c
  	state.forwards 1
  elsif "q" == c
  elsif options.has_key? c.to_i
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

