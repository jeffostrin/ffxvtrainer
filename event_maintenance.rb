require 'json'

file_name = "test_input.json"

def read_file(fname)
  contents = ""
  File.open(fname).each do |line|
    contents = contents + line
  end
  return contents
end

input = read_file(file_name)
json = JSON.parse(input)
json["3"] = {}



puts json.to_json
File.open(file_name, "w") do |file|
  file.write(json.to_json)
end