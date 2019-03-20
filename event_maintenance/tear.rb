require_relative 'json_util'

def create_new_source_file_name(sourceFileName)
  return sourceFileName + ".torn"
end

def create_sink_file_name(sourceFileName, event_name)
  return sourceFileName + "." + event_name.gsub(" ", "_")
end

if ARGV.length != 2
  puts "The process goal here is to move an event from one file to another."
  puts "This tool is to extract an event (event-name-to-extract) out of a"
  puts "file (source-file). It will create a new file intended to be"
  puts "stitched (stitch.rb) into another file"
  puts "usage: ruby tear.rb source-file event-name-to-extract"
  exit 1
end

sourceFileName = ARGV[0]
eventName = ARGV[1]

sourceJson = read_json_file(sourceFileName)
sinkJson = {}

sourceJson.keys.each do |hepoch|
  events = sourceJson[hepoch]

  hasEvent = events.include?(eventName)
  next if !hasEvent

  sinkJson[hepoch] = [ eventName ]
  events.delete(eventName)
  if events.length == 0
    #puts "removing #{hepoch}"
    sourceJson.delete(hepoch)
  end
end

newSourceFile = create_new_source_file_name(sourceFileName)
puts "Create new source file #{newSourceFile}"
write_json_file(newSourceFile, sourceJson)

sinkFile = create_sink_file_name(sourceFileName, eventName)
puts "Create sink file #{sinkFile}"
write_json_file(sinkFile, sinkJson)
