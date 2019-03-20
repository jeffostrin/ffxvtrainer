require 'json'
require 'pathname'

def read_json_file(fname)
  if ! Pathname.new(fname).exist?()
    puts "Unable to read file #{fname}, check the path"
    exit 1
  end

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
