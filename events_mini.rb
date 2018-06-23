
class MiniEvents
  GatherRSS = "Gather RSS <==="
  Training = "Training <==="

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

  HourlyEvents_STARTED_JUNE_22_LOCAL_TIME = [
    { :local=>"5pm", :event=>unknown },
    { :local=>"6pm", :event=>unknown },
    { :local=>"7pm", :event=>unknown },
    { :local=>"8pm", :event=>unknown },
    { :local=>"9pm", :event=>unknown },
    { :local=>"10pm", :event=>unknown },
    { :local=>"11pm", :event=>unknown },
    { :local=>"12am", :event=>unknown },
    { :local=>"1am", :event=>unknown },
    { :local=>"2am", :event=>unknown },
    { :local=>"3am", :event=>unknown },
    { :local=>"4am", :event=>unknown },
    { :local=>"5am", :event=>unknown },
    { :local=>"6am", :event=>unknown },
    { :local=>"7am", :event=>unknown },
    { :local=>"8am", :event=>unknown },
    { :local=>"9am", :event=>unknown },
    { :local=>"10am", :event=>guild_defend },
    { :local=>"11am", :event=>spin },
    { :local=>"12pm", :event=>secret },
    { :local=>"1pm", :event=>unknown },
    { :local=>"2pm", :event=>unknown },
    { :local=>"3pm", :event=>unknown },
    { :local=>"4pm", :event=>unknown },
  ]


  HourlyEvents = HourlyEvents_STARTED_JUNE_22_LOCAL_TIME


  HourlyEvents_BUSTED = [
    { :local=>"5pm", :event=>MiniEvents::Training },
    { :local=>"6pm", :event=>monster_hunt },
    { :local=>"7pm", :event=>unknown },
    { :local=>"8pm", :event=>MiniEvents::GatherRSS },
    { :local=>"9pm", :event=>guild_defend },
    { :local=>"10pm", :event=>MiniEvents::GatherRSS },
    { :local=>"11pm", :event=>guild_quests },
    { :local=>"12am", :event=>secret },
    { :local=>"1am", :event=>hero_quests },
    { :local=>"2am", :event=>MiniEvents::GatherRSS },
    { :local=>"3am", :event=>unknown },
    { :local=>"4am", :event=>unknown },
    { :local=>"5am", :event=>unknown },
    { :local=>"6am", :event=>guild_quests },
    { :local=>"7am", :event=>spin },
    { :local=>"8am", :event=>MiniEvents::Training },
    { :local=>"9am", :event=>guild_quests },
    { :local=>"10am", :event=>secret },
    { :local=>"11am", :event=>guild_rss_trade },
    { :local=>"12pm", :event=>guild_defend },
    { :local=>"1pm", :event=>spin },
    { :local=>"2pm", :event=>MiniEvents::GatherRSS },
    { :local=>"3pm", :event=>monster_hunt },
    { :local=>"4pm", :event=>hero_quests },
  ]

  HourlyEvents_OLD_2 = [
    { :local=>"5pm", :event=>MiniEvents::Training },
    { :local=>"6pm", :event=>guild_help },
    { :local=>"7pm", :event=>guild_defend },
    { :local=>"8pm", :event=>MiniEvents::GatherRSS },
    { :local=>"9pm", :event=>guild_defend },
    { :local=>"10pm", :event=>MiniEvents::GatherRSS },
    { :local=>"11pm", :event=>guild_quests },
    { :local=>"12pm", :event=>MiniEvents::Training },
    { :local=>"1am", :event=>monster_hunt },
    { :local=>"2am", :event=>guild_rss_trade },
    { :local=>"3am", :event=>guild_quests + unconfirmed },
    { :local=>"4am", :event=>MiniEvents::Training },
    { :local=>"5am", :event=>monster_hunt },
    { :local=>"6am", :event=>spin },
    { :local=>"7am", :event=>secret },
    { :local=>"8am", :event=>MiniEvents::Training },
    { :local=>"9am", :event=>guild_quests },
    { :local=>"10am", :event=>monster_hunt },
    { :local=>"11am", :event=>guild_rss_trade },
    { :local=>"12am", :event=>guild_defend },
    { :local=>"1pm", :event=>spin },
    { :local=>"2pm", :event=>MiniEvents::GatherRSS },
    { :local=>"3pm", :event=>monster_hunt },
    { :local=>"4pm", :event=>hero_quests },
  ]
end



# MiniEvents::HourlyEvents.each do |e|
#   puts e
# end



# hourly_event_old_1 = [
#   MiniEvents::Training,
#   monster_hunt,
#   spin,
#   secret,
#   guild_defend,
#   MiniEvents::GatherRSS,
#   guild_quests,
#   MiniEvents::Training,
#   monster_hunt,
#   guild_rss_trade,
#   "#{guild_quests} #{unconfirmed}",
#   "#{MiniEvents::Training} #{unconfirmed}",
#   guild_help,
#   guild_defend,
#   MiniEvents::GatherRSS,
#   MiniEvents::Training,
#   guild_quests,
#   monster_hunt,
#   guild_rss_trade,
#   guild_defend,
#   spin,
#   MiniEvents::GatherRSS,
#   monster_hunt,
#   hero_quests,
# ]
