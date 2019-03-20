require_relative 'json_util'
require_relative 'hepoch_updater'

if ARGV.length != 2
  puts "The process goal here is to move an event from one file to another."
  puts "This tool is to stitch two files together. Given file-1 and file-2,"
  puts "a new file be created that stitches all the event-hours together. The"
  puts "result will go to STDOUT"
  puts "usage: ruby stitch.rb file-1 file-2"
  exit 1
end

fileName1 = ARGV[0]
fileName2 = ARGV[1]

json1 = read_json_file(fileName1)
json2 = read_json_file(fileName2)

json2.keys.each do |hepoch|
  events = json2[hepoch]
  events.each do |event|
    add_event(event).to(json1).at(hepoch)
  end
end

puts json1.to_json
