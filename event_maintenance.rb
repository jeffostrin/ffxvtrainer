require 'json'
require_relative 'time_constants'
require_relative 'fmt'
require_relative 'events_mini'

file_name = "test_input.json"

def read_file(fname)
  contents = ""
  File.open(fname).each do |line|
    contents = contents + line
  end
  return contents
end


options = {}
options[1] = MiniEvents::GatherRSS
options[2] = MiniEvents::Training
options[3] = MiniEvents::MonsterHunt
options[4] = MiniEvents::SpinTheWheel
options[5] = MiniEvents::SecretGift


input = read_file(file_name)
json = JSON.parse(input)
#json["3"] = {}

utc_now = Time.now.utc
utc_hour = Time.utc(utc_now.year, utc_now.month, utc_now.day, utc_now.hour)
local_hour = utc_hour.clone.localtime

# puts utc_hour
# puts local_hour

# utc_hour_epoch = utc_hour.tv_sec / SECONDS_IN_HOUR

while true do

  options.keys.sort.each do |key| 
  	puts "#{key} - #{options[key]}"
  end

  prompt = Fmt.time(local_hour).as_local_hour_and_day + " >"
  puts prompt

  c = STDIN.getc

  if 'j' == c
  	utc_hour = utc_hour - SECONDS_IN_HOUR
  	local_hour = local_hour - SECONDS_IN_HOUR
  elsif 'k' == c
  	utc_hour = utc_hour + SECONDS_IN_HOUR
  	local_hour = local_hour + SECONDS_IN_HOUR
  elsif options.has_key? c.to_i
  	selection = options[c.to_i]

  	hepoch = utc_hour.tv_sec / SECONDS_IN_HOUR
  	if ! json.has_key? hepoch
  	  json[hepoch] = []
  	end
  	json[hepoch] << selection

	puts json.to_json
	File.open(file_name, "w") do |file|
	  file.write(json.to_json)
	end
  end

end

