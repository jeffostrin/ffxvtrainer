
require_relative 'fmt'
require_relative 'time_constants'
# Friday 5pm -> Saturday, RVR
# Monday 5pm -> start 2 day event


# 2:53:52


new_major = "New Rotation / Major Events may end"

class MiniEvents
  GatherRSS = "Gather RSS <==="
  Training = "Training <==="
end

training = MiniEvents::Training
monster_hunt = "Monster Hunt <==="
spin = "Spin the Wheel"
secret = "Secret Gift"
guild_defend = "Guild Defend"
guild_quests = "Guild Quests"
guild_rss_trade = "Guild RSS Trade"
guild_help = "Guild Help"
hero_quests = "Hero Quests"

unconfirmed = "{Unconfirmed (Crowd Source)}"

unknown = "Unknown"
rvr_blitz = "RVR Blitz"

luna = "Luna Gifts "

ghalad = "Ghalad, start harvest for Gather RSS"
kellebram = "Kellebram, start harvest for Gather RSS"

empire_ascend = "Empire Ascend"
research = "Research"

ghalad_settings = {
  :realm => "Ghalad (ipad)",
  :training_mins => 150,
  :gather_rss_mins => 174,
}

kellebram_settings = {
  :realm => "Kellebram (iphone)",
  :training_mins => 150,
  :gather_rss_mins => 89,
}

hourly_extras_1 = [
  [  ],
  [  ],
  [ ghalad ],
  [  ],
  [ kellebram ],
  [  ],
  [  ],
  [  ],
  [  ],
  [  ],
  [  ],
  [ ghalad ],
  [  ],
  [ kellebram ],
  [  ],
  [  ],
  [  ],
  [  ],
  [ ghalad ],
  [  ],
  [ kellebram ],
  [  ],
  [  ],
  [  ],
]


hourly_event = [
  { :local=>"5pm", :event=>training },
  { :local=>"6pm", :event=>guild_help },
  { :local=>"7pm", :event=>guild_defend },
  { :local=>"8pm", :event=>MiniEvents::GatherRSS },
  { :local=>"9pm", :event=>guild_defend },
  { :local=>"10pm", :event=>MiniEvents::GatherRSS },
  { :local=>"11pm", :event=>guild_quests },
  { :local=>"12pm", :event=>training },
  { :local=>"1am", :event=>monster_hunt },
  { :local=>"2am", :event=>guild_rss_trade },
  { :local=>"3am", :event=>unknown },
  { :local=>"4am", :event=>training },
  { :local=>"5am", :event=>monster_hunt },
  { :local=>"6am", :event=>spin },
  { :local=>"7am", :event=>secret },
  { :local=>"8am", :event=>training },
  { :local=>"9am", :event=>guild_quests },
  { :local=>"10am", :event=>monster_hunt },
  { :local=>"11am", :event=>guild_rss_trade },
  { :local=>"12am", :event=>guild_defend },
  { :local=>"1pm", :event=>spin },
  { :local=>"2pm", :event=>MiniEvents::GatherRSS },
  { :local=>"3pm", :event=>monster_hunt },
  { :local=>"4pm", :event=>hero_quests },
]

# hourly_event.each do |e|
#   puts e
# end

luna_schedule = [
  "",
  "",
  luna,
  "",
  "",
  "",
  luna,
  "",
  "",
  "",
  luna,
  "",
  "",
  "",
  luna,
  "",
  "",
  "",
  luna,
  "",
  "",
  "",
  luna,
  "",
]

four_hour_extras = [
  empire_ascend,
  empire_ascend,
  empire_ascend,
  empire_ascend,
  research,
  research,
  research,
  research,
  empire_ascend,
  empire_ascend,
  empire_ascend,
  empire_ascend,
  research,
  research,
  research,
  research,
  empire_ascend,
  empire_ascend,
  empire_ascend,
  empire_ascend,
  research,
  research,
  research,
  research,
]


hourly_extras = [
  [ new_major ],
  [  ],
  [  ],
  [  ],
  [  ],
  [  ],
  [  ],
  [  ],
  [  ],
  [  ],
  [  ],
  [  ],
  [  ],
  [  ],
  [  ],
  [  ],
  [  ],
  [  ],
  [  ],
  [  ],
  [  ],
  [  ],
  [  ],
  [  ],
]

events = {
  :mini_events => hourly_event,
  :luna_events => luna_schedule,
  :four_hour_extras => four_hour_extras,
  :hourly_notes => hourly_extras,
}

def assert(condition, message)
  if !condition
    raise message
  end
end

def build_time_model(events, hour_range)
  result = []
  hour_range.each do |hour|

    utc_now = Time.now.utc
    utc_hour = Time.utc(utc_now.year, utc_now.month, utc_now.day, utc_now.hour) + (hour * SECONDS_IN_HOUR)
    time_from_now = Fmt.time(utc_hour.clone.localtime - utc_now.clone.localtime).as_relative_time
    local_hour = utc_hour.clone.localtime
    utc_hour_epoch = utc_hour.tv_sec / SECONDS_IN_HOUR

    hour_epoch_index = utc_hour_epoch % 24

    hour_info = {
      :hour_index => hour,
      :time_from_now => time_from_now,
      :local_hour => local_hour,
      :hour_epoch => utc_hour_epoch,
      :mini_event => events[:mini_events][hour_epoch_index][:event],
      :luna_event => events[:luna_events][hour_epoch_index],
      :four_hour_extra => events[:four_hour_extras][hour_epoch_index],
      :hourly_notes => events[:hourly_notes][hour_epoch_index].clone,
    }
    result << hour_info
  end
  return result
end

def add_hints(model, realm_settings)
  model.each_with_index do |hour_data, index|
    if hour_data[:mini_event] == MiniEvents::GatherRSS
      gather_rss_start_epoch = hour_data[:hour_epoch] * SECONDS_IN_HOUR
      realm_settings.each do |realm|
        gathering_timing = realm[:gather_rss_mins]
        assert gathering_timing != nil, "No gathering timings"
        earliest_start_epoch = gather_rss_start_epoch - (gathering_timing * SECONDS_IN_MINUTE)
        earliest_start_hour_epoch = earliest_start_epoch / SECONDS_IN_HOUR
        model.each do |hour_search|
          if hour_search[:hour_epoch] == earliest_start_hour_epoch
            when_time = Time.at(earliest_start_epoch)
            hour_search[:hourly_notes] << "Start Harvest in #{realm[:realm]} at #{when_time.strftime("%I:%M")}"
          end
        end
      end
    end
    if hour_data[:mini_event] == MiniEvents::Training
      training_start_epoch = hour_data[:hour_epoch] * SECONDS_IN_HOUR
      realm_settings.each do |realm|
        training_timing = realm[:training_mins]
        assert training_timing != nil, "No training timings"
        earliest_start_epoch = training_start_epoch - (training_timing * SECONDS_IN_MINUTE)
        earliest_start_hour_epoch = earliest_start_epoch / SECONDS_IN_HOUR
        model.each do |hour_search|
          if hour_search[:hour_epoch] == earliest_start_hour_epoch
            when_time = Time.at(earliest_start_epoch)
            hour_search[:hourly_notes] << "Start Training in #{realm[:realm]} at #{when_time.strftime("%I:%M")}"
          end
        end
      end
    end
  end
  return model
end

# 1528502400 - 1528146105
def calculate_next_rvr(rvr)
  utc_now = Time.now.utc
  current_epoch = utc_now.tv_sec
  next_rvr = rvr[:interval] - ( (current_epoch - rvr[:epoch]) % (rvr[:interval]) )
  return next_rvr
end

rvr = {
  :epoch => 1527897600,
  :interval => 7 * SECONDS_IN_DAY,
  :duration => SECONDS_IN_DAY
}

assert( (hourly_event.length == 24), "There should be 24 mini hourly_event per day")
assert( (hourly_extras.length == 24), "There should be 24 mini hourly_extras per day")

historical_hours = 3

while true
  utc_now = Time.now.utc
  now_local = utc_now.clone.localtime
  puts "Current time is #{now_local.strftime("%I:%M (%m-%d)")}"

  next_rvr = calculate_next_rvr(rvr)
  puts "Next RVR in #{Fmt.time(next_rvr).as_relative_time}"

  hour_range = (-historical_hours..8)
  model = build_time_model(events, hour_range)
  model = add_hints(model, [ ghalad_settings, kellebram_settings ])

  model.each do |hour_data|
    output = "  "
    line_connector = "-"
    if hour_data[:hour_index] == 0
      output = "=>"
      line_connector = "="
    end

    output += " " + Fmt.time(hour_data[:local_hour]).as_local_hour_and_day
    output += " (#{hour_data[:time_from_now]}) ".ljust(12, line_connector)
    output += " #{hour_data[:mini_event]} ".ljust(19, line_connector)
    output += " #{hour_data[:luna_event]}".ljust(15, line_connector)
    output += " #{hour_data[:four_hour_extra]} ".ljust(15, line_connector)
    output += " #{hour_data[:hourly_notes]} ".ljust(15, line_connector)
    puts output
  end
  puts "sleeping"
  sleep 5 until Time.now.utc > (utc_now.clone + 60 * 1)
end






hourly_event_1 = [
  training,
  monster_hunt,
  spin,
  secret,
  guild_defend,
  MiniEvents::GatherRSS,
  guild_quests,
  training,
  monster_hunt,
  guild_rss_trade,
  "#{guild_quests} #{unconfirmed}",
  "#{training} #{unconfirmed}",
  guild_help,
  guild_defend,
  MiniEvents::GatherRSS,
  training,
  guild_quests,
  monster_hunt,
  guild_rss_trade,
  guild_defend,
  spin,
  MiniEvents::GatherRSS,
  monster_hunt,
  hero_quests,
]
