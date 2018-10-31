require 'json'
require_relative 'time_constants'
require_relative 'fmt'
require_relative 'events_mini'

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
  attr_reader :local_time

  def initialize()
  	utc_now = Time.now.utc
    @utc_time = Time.utc(utc_now.year, utc_now.month, utc_now.day, utc_now.hour)
    @local_time = utc_time.clone.localtime
  end

  def backwards
  	@utc_time = @utc_time - SECONDS_IN_HOUR
  	@local_time = @local_time - SECONDS_IN_HOUR
  end

  def forwards
    @utc_time = @utc_time + SECONDS_IN_HOUR
  	@local_time = @local_time + SECONDS_IN_HOUR
  end
end

options = {}
MiniEvents::Options.each_with_index do |option, index|
  options[index+1] = option
end

json = read_json_file(file_name)
#json["3"] = {}

state = Navigation.new

# puts utc_hour
# puts local_hour

# utc_hour_epoch = utc_hour.tv_sec / SECONDS_IN_HOUR

while true do

  options.keys.sort.each do |key| 
  	puts "#{key} - #{options[key]}"
  end

  prompt = Fmt.time(state.local_time).as_local_hour_and_day + " >"
  puts prompt

  c = STDIN.readline
  c = c.strip

  if "u" == c
  	(1..24).each do |counter| 
  	  state.backwards
  	end
  elsif "j" == c
  	state.backwards
  elsif "i" == c
  	(1..24).each do |counter| 
  	  state.forwards
  	end
  elsif "k" == c
  	state.forwards
  elsif options.has_key? c.to_i
  	selection = options[c.to_i]

  	hepoch = (state.utc_time.tv_sec / SECONDS_IN_HOUR).to_s
  	if ! json.has_key? hepoch
  	  json[hepoch] = []
  	end
  	json[hepoch] << selection

	puts json.to_json
	write_json_file(file_name, json)

	state.forwards
  else
  	puts "unknown input (#{c})"
  end

end

