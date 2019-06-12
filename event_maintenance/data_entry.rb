
def display_hepoch(hepoch, filename, json)
  if ! json.has_key? hepoch
    return
  end

  data = json[hepoch]
  puts "current hepoch > " + data.to_s + " (#{filename})"
end

def display_hepoch_records(hepoch, modes)
  modes.all_modes.each do |mode|
    display_hepoch(hepoch, mode.short_file_name, mode.json)
  end
end



def display_data_entry_options(options)
  options.keys.sort.each do |key|
    option = "  #{key} - #{options[key].name}"
    if options[key].score != nil && options[key].score.length > 0
      option += (" (%.2f)" % options[key].score) + (" (%.2f)" % options[key].trend)
    end
    puts option
  end
end



def display_set_options(eventModes, sets)
  sets.each_with_index do |set, index|
    puts "set #{index} #{lookup_set_bind_key(index)}"
    eventModes.all_modes.each do |mode|
      if mode != nil
        if set[mode.short_file_name] != nil
          puts "  #{set[mode.short_file_name]}"
        end
      end
    end
  end
end
