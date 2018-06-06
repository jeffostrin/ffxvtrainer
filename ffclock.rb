
new_major = "New Rotation / Major Events may end"
training = "Training <=== Plan for this"
monster_hunt = "Monster Hunt <=== Save MP for this"
spin = "Spin the Wheel"
secret = "Secret Gift"
guild_defend = "Guild Defend"
gather_rss = "Gather RSS <=== Plan for this"
guild_quests = "Guild Quests"
guild_rss_trade = "Guild RSS Trade"
guild_help = "Guild Help"
hero_quests = "Hero Quests"

unconfirmed = "{Unconfirmed (Crowd Source)}"

luna = "Luna Gifts"

ghalad = "Ghalad, start harvest for Gather RSS"
kellebram = "Kellebram, start harvest for Gather RSS"

empire_ascend = "Empire Ascend"
research = "Research"

events = [
  [ new_major, training, empire_ascend],
  [ monster_hunt, empire_ascend ],
  [ spin, luna, ghalad, empire_ascend ],
  [ secret, empire_ascend ],
  [ guild_defend, kellebram, research ],
  [ gather_rss, research ],
  [ guild_quests, luna, research ],
  [ training, research ],
  [ monster_hunt, empire_ascend ],
  [ guild_rss_trade, empire_ascend ],
  [ "#{guild_quests} #{unconfirmed}", luna, empire_ascend ],
  [ "#{training} #{unconfirmed}", ghalad, empire_ascend ],
  [ guild_help, research ],
  [ guild_defend, kellebram, research ],
  [ gather_rss, luna, research ],
  [ training, research ],
  [ guild_quests, empire_ascend ],
  [ monster_hunt, empire_ascend ],
  [ guild_rss_trade, luna, ghalad, empire_ascend ],
  [ guild_defend, empire_ascend ],
  [ spin, kellebram, research ],
  [ gather_rss, research ],
  [ monster_hunt, luna, research ],
  [ hero_quests, research ],
]


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
  return "in #{hours}:#{minutes}"
end

assert( (events.length == 24), "There should be 24 mini events per day")

historical_hours = 3

while true
  utc_now = Time.now.utc
  utc_time = Time.utc(utc_now.year, utc_now.month, utc_now.day, utc_now.hour)
  utc_time = utc_time - (historical_hours * (60 * 60))
  now_local = utc_now.clone.localtime
  puts "Current time is #{now_local.strftime("%I:%M (%m-%d)")}"
  (-historical_hours..5).each do |index|
    local_time = utc_time.clone.localtime
    time_from_now = utc_time.clone.localtime - utc_now.clone.localtime
    time_from_now = humanify(time_from_now)

    prefix = "  "
    if utc_now.hour == utc_time.hour
      prefix = "=>"
    end

    puts
    puts "#{prefix} #{local_time.strftime("%I")}:00#{local_time.strftime("%P")} (#{local_time.strftime("%m-%d")}) (#{time_from_now})"
    events[utc_time.hour].each do |event|
      puts "     #{event}"
    end

    utc_time = utc_time + (60 * 60)
  end
  puts "sleeping"
  sleep 5*60
end
