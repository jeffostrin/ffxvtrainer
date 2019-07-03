require 'json'
require_relative 'json_util'
require_relative 'hepoch_updater'
require_relative '../time_constants'
require_relative '../fmt'
require_relative '../assert'
require_relative 'scoring'
require_relative 'score_merge'
require_relative 'data_entry'

CLEAR_SCREEN = "\e[2J"

class Mode
  attr_reader :short_file_name
  attr_reader :full_file_name
  attr_reader :default_options
  attr_reader :json

  def initialize(params)
    file_name = params[:file_name]
    assert(file_name != nil, "Mode.file_name is required")
    @short_file_name = file_name
    @full_file_name = file_name + ".json"
    assert(params[:default_options] != nil, "default options is required")
    @default_options = convert_to_event_list(params[:default_options])
    assert(@default_options != nil, "Mode.default_options is required")
    @json = read_json_file(@full_file_name)
    assert(@json != nil, "Mode.json cannot be nil, file is likely missing")
  end

  private

  def convert_to_event_list(events)
    options = []
    events.each do |event_name|
      options << Option.new(:name => event_name)
    end
    return options
  end
end


def mini_event_mode
  # 5 pm race to vip
  # proving Grounds
  # Secret Event
  # Level up your hero
  # guild event
  # race to vip
  # proving grounds
  # secret event
  # ?               level up your hero
  # guild event
  # race to vip
  # proving grounds
  # secret event
  # level up your hero
  # guild event
  # race to vip
  # proving grounds
  # secret event
  # level up your hero
  # guild event
  # race to vip
  # proving grounds
  # secret event
  # 4pm level up your hero
  return Mode.new(
    :file_name => "slot0",
    :default_options => [
      "Final Fashionsy!",
      "Gathering Event",
      "Guild Adventures Hall Event",
      "Guild Event",
      "Guild Gift Extravaganza!",
      "Level Up Your Hero Event",
      "Monster Pen: Champion Egg Hatching Frenzy",
      "Proving Grounds Adventure Quest",
      "Race to VIP",
      "Secret Event Unlocked!",
      "Special Limited Time Ignis Diner Menu",
      "Special Proving Grounds Event",
      ]
  )
end
#
# def luna_gift_mode
#   return Mode.new(
#     :file_name => "luna_gifts",
#     :default_options => []
#   )
# end


def luna_special_gift_mode
  return Mode.new(
    :file_name => "luna_special_gifts",
    :default_options => [
      "1x Commander Recruiting Chest (from Gladious)",
      "300000x Elite Magitek Shard"
    ]
  )
end
#
# def hourly_event_mode
#   return Mode.new(
#     :file_name => "hourly_events",
#     :default_options => []
#   )
# end


def multi_hour_event_mode
  return Mode.new(
    :file_name => "slot1",
    :default_options => [
      "Dark Troop T1 Training Event (5+ hours left)",
      "Dark Troop T1 Training Event (4+ hours left)",
      "Dark Troop T1 Training Event (3+ hours left)",
      "Dark Troop T1 Training Event (2+ hours left)",
      "Dark Troop T1 Training Event (1+ hours left)",
      "Dark Troop T1 Training Event (0+ hour left)",
    ]
  )
end


def more_multi_hour_event_mode
  return Mode.new(
    :file_name => "slot2",
    :default_options => [
      "Dark World Empire Invasion Event (5+ hours left)",
      "Dark World Empire Invasion Event (4+ hours left)",
      "Dark World Empire Invasion Event (3+ hours left)",
      "Dark World Empire Invasion Event (2+ hours left)",
      "Dark World Empire Invasion Event (1+ hours left)",
      "Dark World Empire Invasion Event (0+ hour left)",

      "Solo Dark World Guild Kill Event (3+ hours left)",
      "Solo Dark World Guild Kill Event (2+ hours left)",
      "Solo Dark World Guild Kill Event (1+ hours left)",
      "Solo Dark World Guild Kill Event (0+ hour left)",
    ]
  )
end


def single_hour_events
  return Mode.new(
    :file_name => "slot3",
    :default_options => [
      "Auxiliary Kill Event",
      "Bulking Up",
      "Dark World VIP Event",
      "Special Bonus Building Event",
      "Special Bonus Research Event",
      "Train Troops!",
    ]
  )
end


def day_long_events
  return Mode.new(
    :file_name => "slot4",
    :default_options => [
      "Combat Dark Research Event (23+ hours)",
      "Combat Dark Research Event (22+ hours)",
      "Combat Dark Research Event (21+ hours)",
      "Combat Dark Research Event (20+ hours)",
      "Combat Dark Research Event (19+ hours)",
      "Combat Dark Research Event (18+ hours)",
      "Combat Dark Research Event (17+ hours)",
      "Combat Dark Research Event (16+ hours)",
      "Combat Dark Research Event (15+ hours)",
      "Combat Dark Research Event (14+ hours)",
      "Combat Dark Research Event (13+ hours)",
      "Combat Dark Research Event (12+ hours)",
      "Combat Dark Research Event (11+ hours)",
      "Combat Dark Research Event (10+ hours)",
      "Combat Dark Research Event (9+ hours)",
      "Combat Dark Research Event (8+ hours)",
      "Combat Dark Research Event (7+ hours)",
      "Combat Dark Research Event (6+ hours)",
      "Combat Dark Research Event (5+ hours)",
      "Combat Dark Research Event (4+ hours)",
      "Combat Dark Research Event (3+ hours)",
      "Combat Dark Research Event (2+ hours)",
      "Combat Dark Research Event (1+ hours)",
      "Combat Dark Research Event (0+ hours)",
      "Level Up Titan (23+ hours)",
      "Level Up Titan (22+ hours)",
      "Level Up Titan (21+ hours)",
      "Level Up Titan (20+ hours)",
      "Level Up Titan (19+ hours)",
      "Level Up Titan (18+ hours)",
      "Level Up Titan (17+ hours)",
      "Level Up Titan (16+ hours)",
      "Level Up Titan (15+ hours)",
      "Level Up Titan (14+ hours)",
      "Level Up Titan (13+ hours)",
      "Level Up Titan (12+ hours)",
      "Level Up Titan (11+ hours)",
      "Level Up Titan (10+ hours)",
      "Level Up Titan (9+ hours)",
      "Level Up Titan (8+ hours)",
      "Level Up Titan (7+ hours)",
      "Level Up Titan (6+ hours)",
      "Level Up Titan (5+ hours)",
      "Level Up Titan (4+ hours)",
      "Level Up Titan (3+ hours)",
      "Level Up Titan (2+ hours)",
      "Level Up Titan (1+ hours)",
      "Level Up Titan (0+ hours)",
    ]
  )
end


def guild_empire_invasion
  return Mode.new(
    :file_name => "slot5",
    :default_options => [
      "Guild Dark World Empire Invasion Event (23+ hours)",
      "Guild Dark World Empire Invasion Event (22+ hours)",
      "Guild Dark World Empire Invasion Event (21+ hours)",
      "Guild Dark World Empire Invasion Event (20+ hours)",
      "Guild Dark World Empire Invasion Event (19+ hours)",
      "Guild Dark World Empire Invasion Event (18+ hours)",
      "Guild Dark World Empire Invasion Event (17+ hours)",
      "Guild Dark World Empire Invasion Event (16+ hours)",
      "Guild Dark World Empire Invasion Event (15+ hours)",
      "Guild Dark World Empire Invasion Event (14+ hours)",
      "Guild Dark World Empire Invasion Event (13+ hours)",
      "Guild Dark World Empire Invasion Event (12+ hours)",
      "Guild Dark World Empire Invasion Event (11+ hours)",
      "Guild Dark World Empire Invasion Event (10+ hours)",
      "Guild Dark World Empire Invasion Event (9+ hours)",
      "Guild Dark World Empire Invasion Event (8+ hours)",
      "Guild Dark World Empire Invasion Event (7+ hours)",
      "Guild Dark World Empire Invasion Event (6+ hours)",
      "Guild Dark World Empire Invasion Event (5+ hours)",
      "Guild Dark World Empire Invasion Event (4+ hours)",
      "Guild Dark World Empire Invasion Event (3+ hours)",
      "Guild Dark World Empire Invasion Event (2+ hours)",
      "Guild Dark World Empire Invasion Event (1+ hours)",
      "Guild Dark World Empire Invasion Event (0+ hours)",
      "Guild Event (23+ hours)",
      "Guild Event (22+ hours)",
      "Guild Event (21+ hours)",
      "Guild Event (20+ hours)",
      "Guild Event (19+ hours)",
      "Guild Event (18+ hours)",
      "Guild Event (17+ hours)",
      "Guild Event (16+ hours)",
      "Guild Event (15+ hours)",
      "Guild Event (14+ hours)",
      "Guild Event (13+ hours)",
      "Guild Event (12+ hours)",
      "Guild Event (11+ hours)",
      "Guild Event (10+ hours)",
      "Guild Event (9+ hours)",
      "Guild Event (8+ hours)",
      "Guild Event (7+ hours)",
      "Guild Event (6+ hours)",
      "Guild Event (5+ hours)",
      "Guild Event (4+ hours)",
      "Guild Event (3+ hours)",
      "Guild Event (2+ hours)",
      "Guild Event (1+ hours)",
      "Guild Event (0+ hours)",    ]
  )
end

# Guild Dark World Empire Invasion Event | Guild Event (slot5)
# Dark World Empire Invasion Event (slot 2)  |   "Auxiliary Kill Event" (slot 3) | Guild Event
# Level Up Titan   (slot 4) | Dark Troop T1 Training (slot 1)
# Final Fashionsy  (slot 0)

class Modes
  attr_reader :luna_specials
  attr_reader :slot0
  attr_reader :slot1
  attr_reader :slot2
  attr_reader :slot3
  attr_reader :slot4
  attr_reader :slot5

  def initialize()
    @luna_specials = luna_special_gift_mode
    @slot5 = guild_empire_invasion
    @slot4 = day_long_events
    @slot3 = single_hour_events
    @slot2 = more_multi_hour_event_mode
    @slot1 = multi_hour_event_mode
    @slot0 = mini_event_mode
  end

  def all_modes
    return [ @luna_specials, @slot5, @slot4, @slot3, @slot2, @slot1, @slot0 ]
  end

  def start
    return @slot2
  end

  def next(current)
    index = all_modes.index(current)
    # Math.max the index
    puts "the index is: #{index}"
    if current == @luna_specials
      return @slot2
    elsif current == @slot5
      return @slot4
    elsif current == @slot4
      return @slot3
    elsif current == @slot3
      return @slot2
    elsif current == @slot2
      return @slot1
    elsif current == @slot1
      return @slot0
    elsif current == @slot0
      return @slot0
    end
    raise "Unknown current mode #{current}"
  end
end

class DataEntryApplication

  attr_reader :hourNav
  attr_reader :eventModes
  attr_reader :currentEventMode
  attr_reader :hepoch
  attr_reader :options
  attr_reader :setOptions
  attr_reader :editing

  def initialize(modes)
    @hourNav = Navigation.new()
    @eventModes = modes
    @currentEventMode = @eventModes.slot0
    @editing = true
  end

  def display_mode()
    puts "DATA ENTRY MODE"
  end

  def show()
    puts  CLEAR_SCREEN
    @hepoch = @hourNav.get_hepoch

    display_hepoch_records(@hepoch, @eventModes)
    puts

    puts "Options:"
    @options = get_options(@currentEventMode, @currentEventMode.json, @hepoch)
    display_data_entry_options(@options)
    puts

    puts "Sets:"
    @setOptions = get_sets(@eventModes, @hepoch)
    display_set_options(@eventModes, @setOptions)
    puts

    puts "EDIT MODE #{@editing}"

  # make %w the day-of week (monday, tuesday, wednesday...)
    prompt = "+@ " + @hourNav.get_local_time.strftime("%Y/%m/%d | %A %I:%M %p | %H:%M") + " " + @hepoch + ">"
    puts prompt
  end

  def process(key)

    return if "q" == key
    if "j" == key || "\e[A"  == key
      @hourNav.backwards 24
      @currentEventMode = @eventModes.start
    elsif "k" == key || "\e[D" == key
      @hourNav.backwards 1
      @currentEventMode = @eventModes.start
    elsif "l" == key || "\e[C" == key
      @hourNav.forwards 1
      @currentEventMode = @eventModes.start
    elsif ";" == key || "\e[B" == key
      @hourNav.forwards 24
      @currentEventMode = @eventModes.start
    elsif "c" == key
      @currentEventMode = @eventModes.luna_specials
    elsif "v" == key
      @currentEventMode = @eventModes.slot5
    elsif "b" == key
      @currentEventMode = @eventModes.slot4
    elsif "n" == key
      @currentEventMode = @eventModes.slot3
    elsif "m" == key
      @currentEventMode = @eventModes.slot2
    elsif "," == key
      @currentEventMode = @eventModes.slot1
    elsif "." == key
      @currentEventMode = @eventModes.slot0

    elsif "-" == key
      save_set(@eventModes, @hepoch, @setOptions[0]) if @editing
    elsif "=" == key
      save_set(@eventModes, @hepoch, @setOptions[1]) if @editing
    elsif "[" == key
      save_set(@eventModes, @hepoch, @setOptions[2]) if @editing
    elsif "]" == key
      save_set(@eventModes, @hepoch, @setOptions[3]) if @editing

    elsif "e" == key
      @editing = ! @editing

    else
      if "u" == key
        key = "1"
      elsif "i" == key
        key = "2"
      elsif "o" == key
        key = "3"
      elsif "p" == key
        key = "4"
      else
        putc key
        key = key + STDIN.readline
        key = key.strip
      end

      if @options.has_key? key.to_i
        selection = @options[key.to_i].name

        add_event(selection).to(@currentEventMode.json).at(@hepoch)

        puts @currentEventMode.json[@hepoch].to_json
        if @editing
          write_json_file(@currentEventMode.full_file_name, @currentEventMode.json)
        end

        @currentEventMode = @eventModes.next(@currentEventMode)
      else
        puts "unknown input (#{key})"
      end
    end
  end

end

class MetaControlApplication

  attr_reader :eventModes

  def initialize(modes)
    @eventModes = modes
  end

  def display_mode()
    puts "META CONTROL MODE"
  end


  def show()
  end

  def process(key)
    #hepoch = state.get_hepoch
    #
    # display_hepoch_records(hepoch, modes)
    # puts

    # if "d" == c
    #   display_hepoch(hepoch, mode.short_file_name, mode.json)
    # elsif "h" == c
    #   display_hepoch_history(hepoch, mode.short_file_name, mode.json)
    if "g" == key
      generate_compact_files(@eventModes)
    # elsif "e" == c
    #   edit_hepoch(hepoch, mode.json)
    # elsif "p" == c
    #   print_schedule(hepoch, mode.json)
    # elsif "q" == c
    elsif "?" == key
      print_usage

    end
  end

end

class ApplicationControl

  attr_reader :dataEntry
  attr_reader :metaControl
  attr_reader :current

  def initialize()
    modes = Modes.new()
    @dataEntry = DataEntryApplication.new(modes)
    @metaControl = MetaControlApplication.new(modes)
    @current = @dataEntry
  end

  def get_controller(key)
    if "s" == key
      if @current == @dataEntry
        puts "SWITCH TO META CONTROL MODE"
        @current = @metaControl
      else
        puts "SWITCH TO DATA ENTRY MODE"
        @current = @dataEntry
      end
    end
    return @current
  end

end

def print_usage
  puts "============================"

  puts "s - switch modes (data entry vs meta-data)"

  puts "j - backwards in time 1 day"
  puts "k - backwards in time 1 hour"
  puts "l - forwards in time 1 hour"
  puts "; - forwards in time 1 day"

  puts "u - select option 1"
  puts "i - select option 2"
  puts "o - select option 3"

  puts "- - select set 1"
  puts "= 0 select set 2"
  puts "[ - select set 3"
  puts "] 0 select set 4"

  puts "n - special-luna-gift mode"
  puts "m - mini-event mode"
  puts ", - multi-hour-event mode"
  # puts ". - mini-event mode"
  # puts "/ - multi-hour-event mode"


  puts "d - display the values for the current hour"
  puts "h - display the (h)istory for the current hour"
  puts "g - generate files that has the most recent 10 entries per hour"

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
  attr_reader :score
  attr_reader :trend

  def initialize(params)
    @name = params[:name]
    assert(@name != nil, "Option.name is required")
    @score = params[:score]
    @trend = params[:trend]
  end
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


def get_options(mode, json, hepoch)
  option_list = get_historical_options(json, hepoch)
  option_list = sort_historical_options(option_list)
  mode.default_options.each do |option|
  	option_list << option
  end

  options = {}
  option_list.each_with_index do |option, index|
    options[index+1] = option
  end
  return options
end

def display_hepoch_history(hepoch, filename, json)
  max_tries = json.keys.size

  (0..max_tries).each do |counter|
    probe_hepoch = (hepoch.to_i - (24 * counter)).to_s
    display_hepoch(probe_hepoch, filename, json)
  end
end

def find_latest(json, count_to_find)
  result = {}

  utc_now = Time.now.utc
  utc_time = Time.utc(utc_now.year, utc_now.month, utc_now.day, utc_now.hour)
  hepoch = utc_time.tv_sec / SECONDS_IN_HOUR

  (0..23).each do |hour|
    hour_found_count = 0
    (0..1000).each do |counter|
      probe_hepoch = ((hepoch-hour) - (24 * counter)).to_s
      if json.has_key? probe_hepoch
        result[probe_hepoch] = json[probe_hepoch]
        hour_found_count = hour_found_count + 1
      end
      break if hour_found_count >= count_to_find
    end
  end
  return result
end

def generate_compact_file(mode)
  target_file = "../" + mode.short_file_name + ".compact.json"
  puts "generating file #{target_file}"
  last_ten = find_latest(mode.json, 10)
  write_json_file(target_file, last_ten)
end

def generate_compact_files(modes)
  puts "generating files"
  modes.all_modes.each do |mode|
    generate_compact_file(mode)
  end
end

def edit_hepoch(hepoch, json)
  puts "edit hepoch - implement this method"
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

def lookup_set(modes, hepoch)
  set = {}
  found_something = false
  modes.all_modes.each do |mode|
    set[mode.short_file_name] = mode.json[hepoch]
    found_something = found_something || (mode.json[hepoch] != nil)
  end
  if found_something
    return set
  end

  return nil
end

def find_historical_set(modes, hepoch, hour_delta, already_found)
  current_hepoch = hepoch.to_i
  set = nil
  attempts = 0

  hepoch = hepoch.to_i - hour_delta
  while (set == nil && attempts < 100) || already_found.include?(set)
    set = lookup_set(modes, hepoch.to_s)
    hepoch = hepoch - hour_delta
    attempts = attempts + 1
  end
  return set
end

def get_sets(modes, hepoch)
  sets = []

  set = find_historical_set(modes, hepoch, (24*7), sets)
  if set != nil
    sets << set
  end

  set = find_historical_set(modes, hepoch, 24, sets)
  if set != nil
    sets << set
  end

  set = find_historical_set(modes, hepoch, 24, sets)
  if set != nil
    sets << set
  end

  set = find_historical_set(modes, hepoch, 24, sets)
  if set != nil
    sets << set
  end

  return sets
end

def save_set(modes, hepoch, set)
  modes.all_modes.each do |mode|
    event_type = mode.short_file_name
    events = set[event_type]
    if events != nil && events.length > 0
      events.each do |event|
        add_event(event).to(mode.json).at(hepoch)
      end
      puts mode.json[hepoch].to_json
      write_json_file(mode.full_file_name, mode.json)
    end
  end
end


c = "x"

appControl = ApplicationControl.new()
controller = appControl.get_controller(c)

while c != "q" do

  controller.display_mode()
  controller.show()
  c = read_char

  if "s" == c
    controller = appControl.get_controller(c)
  elsif "q" == c
  else
    controller.show()
    controller.process(c);
    next;
  end
end
