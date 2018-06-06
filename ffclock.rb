
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

luna = " + Luna Gifts"

ghalad = " ===> Ghalad, start harvest for Gather RSS"
kellebram = " ===> Kellebram, start harvest for Gather RSS"


events = [
  training,
  monster_hunt,
  "#{spin} #{ghalad} #{luna}",
  secret,
  "#{guild_defend} #{kellebram}",
  gather_rss,
  "#{guild_quests} #{luna}",
  training,
  monster_hunt,
  guild_rss_trade,
  "(u) #{guild_quests} #{luna}",
  "(u) #{training} #{ghalad}",
  guild_help,
  "#{guild_defend} #{kellebram}",
  "#{gather_rss} #{luna}",
  "#{training}",
  "#{guild_quests}",
  "#{monster_hunt}",
  "#{guild_rss_trade} #{ghalad} #{luna}",
  guild_defend,
  "#{spin} #{kellebram}",
  gather_rss,
  "#{monster_hunt} #{luna}",
  hero_quests,
]


def assert(condition, message)
  if !condition
    raise message
  end
end

def humanify(future_time)
  future_time = (future_time / 60).truncate

  return "now" if future_time <= 0
  return "in 0:#{future_time}" if future_time < 60

  hours = (future_time / 60).truncate
  minutes = (future_time % 60).truncate
  return "in #{hours}:#{minutes}"
end

assert( (events.length == 24), "There should be 24 mini events per day")

while true
  utc_now = Time.now.utc
  utc_time = Time.utc(utc_now.year, utc_now.month, utc_now.day, utc_now.hour)
  now_local = utc_now.clone.localtime
  puts "Current time is #{now_local.strftime("%I:%M (%m-%d)")}"
  (0..23).each do |index|
    if utc_time.hour == 0
      puts "New Rotation / Major Events may end"
    end
    event = events[utc_time.hour]
    local_time = utc_time.clone.localtime
    time_from_now = utc_time.clone.localtime - utc_now.clone.localtime
    time_from_now = humanify(time_from_now)
    puts "#{local_time.strftime("%I")}:00#{local_time.strftime("%P")} (#{local_time.strftime("%m-%d")}) (#{time_from_now}) => #{event}"

    utc_time = utc_time + (60 * 60)
  end
  puts "sleeping"
  sleep 5*60
end
