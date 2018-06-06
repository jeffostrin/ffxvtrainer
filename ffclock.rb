
new_major = "New Rotation / Major Events may end"
training = "Training <==="
monster_hunt = "Monster Hunt <==="
spin = "Spin the Wheel"
secret = "Secret Gift"
guild_defend = "Guild Defend"
gather_rss = "Gather RSS <==="
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
  :training => 150,
  :gather_25k => 70,
}

kellebram_settings = {
  :training => 150,
  :gather_25k => 45
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
  { :local=>"8pm", :event=>gather_rss },
  { :local=>"9pm", :event=>guild_defend },
  { :local=>"10pm", :event=>gather_rss },
  { :local=>"11pm", :event=>guild_quests },
  { :local=>"12pm", :event=>training },
  { :local=>"1am", :event=>unknown },
  { :local=>"2am", :event=>unknown },
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
  { :local=>"2pm", :event=>gather_rss },
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

def humanify(future_time)
  future_time = (future_time / 60).truncate

  return "past" if future_time <= -60
  return "now" if future_time <= 0
  return "in 0:#{future_time}" if future_time < 60

  hours = (future_time / 60).truncate
  minutes = (future_time % 60).truncate
  minutes = minutes.to_s.rjust(2, "0")
  return "in #{hours}:#{minutes}"
end

def build_time_model(events, hour_range)
  result = []
  hour_range.each do |hour|

    utc_now = Time.now.utc
    utc_hour = Time.utc(utc_now.year, utc_now.month, utc_now.day, utc_now.hour) + (hour * 60 * 60)
    time_from_now = humanify(utc_hour.clone.localtime - utc_now.clone.localtime)
    local_hour = utc_hour.clone.localtime
    utc_hour_epoch = utc_hour.tv_sec / 60 / 60

    hour_epoch_index = utc_hour_epoch % 24

    hour_info = {
      :hour_index => hour,
      :time_from_now => time_from_now,
      :local_hour => local_hour,
      :hour_epoch => utc_hour_epoch,
      :mini_event => events[:mini_events][hour_epoch_index][:event],
      :luna_event => events[:luna_events][hour_epoch_index],
      :four_hour_extra => events[:four_hour_extras][hour_epoch_index],
      :hourly_notes => events[:hourly_notes][hour_epoch_index],
    }
    result << hour_info
  end
  return result
end

assert( (hourly_event.length == 24), "There should be 24 mini hourly_event per day")
assert( (hourly_extras.length == 24), "There should be 24 mini hourly_extras per day")

historical_hours = 3

while true
  utc_now = Time.now.utc
  now_local = utc_now.clone.localtime
  puts "Current time is #{now_local.strftime("%I:%M (%m-%d)")}"

  hour_range = (-historical_hours..8)
  model = build_time_model(events, hour_range)

  model.each do |hour|
    output = "  "
    if hour[:hour_index] == 0
      output = "=>"
    end

    output += " #{hour[:local_hour].strftime("%I")}:00#{hour[:local_hour].strftime("%P")} (#{hour[:local_hour].strftime("%m-%d")}) (#{hour[:time_from_now]}) ".ljust(29, "-")
    output += " #{hour[:mini_event]} ".ljust(19, "-")
    output += " #{hour[:luna_event]} ".ljust(15, "-")
    output += " #{hour[:four_hour_extra]} ".ljust(15, "-")
    output += " #{hour[:hourly_notes]} ".ljust(15, "-")
    puts output
  end
  puts "sleeping"
  sleep 5 until Time.now.utc > (utc_now.clone + 60 * 5)
end






hourly_event_1 = [
  training,
  monster_hunt,
  spin,
  secret,
  guild_defend,
  gather_rss,
  guild_quests,
  training,
  monster_hunt,
  guild_rss_trade,
  "#{guild_quests} #{unconfirmed}",
  "#{training} #{unconfirmed}",
  guild_help,
  guild_defend,
  gather_rss,
  training,
  guild_quests,
  monster_hunt,
  guild_rss_trade,
  guild_defend,
  spin,
  gather_rss,
  monster_hunt,
  hero_quests,
]
