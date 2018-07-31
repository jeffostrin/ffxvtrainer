
class MiniEvents
  GatherRSS = "Gather RSS <==="
  Training = "Training <==="

  monster_hunt = "Monster Hunt <==="
  spin = "Spin the Wheel"
  secret = "Secret Gift"
  guild_defend = "Guild Defend"
  guild_quests = "Guild Quests"
  guild_rss_help = "Guild RSS Help"
  guild_help = "Guild Help"
  hero_quests = "Hero Quests"
  vip_quests = "VIP Quests"

  unconfirmed = "{Unconfirmed (Crowd Source)}"
  unknown = "Unknown"


  HourlyEvents_TEMPLATE = [
    { :utc=>7, :local=>"12am", :event=>unknown },
    { :utc=>8, :local=>"1am", :event=>unknown },
    { :utc=>9, :local=>"2am", :event=>unknown },
    { :utc=>10, :local=>"3am", :event=>unknown },
    { :utc=>11, :local=>"4am", :event=>unknown },
    { :utc=>12, :local=>"5am", :event=>unknown },
    { :utc=>13, :local=>"6am", :event=>unknown },
    { :utc=>14, :local=>"7am", :event=>unknown },
    { :utc=>15, :local=>"8am", :event=>unknown },
    { :utc=>16, :local=>"9am", :event=>unknown },
    { :utc=>17, :local=>"10am", :event=>unknown },
    { :utc=>18, :local=>"11am", :event=>unknown },
    { :utc=>19, :local=>"12pm", :event=>unknown },
    { :utc=>20, :local=>"1pm", :event=>unknown },
    { :utc=>21, :local=>"2pm", :event=>unknown },
    { :utc=>22, :local=>"3pm", :event=>unknown },
    { :utc=>23, :local=>"4pm", :event=>unknown },

    { :utc=>0, :local=>"5pm", :event=>unknown },
    { :utc=>1, :local=>"6pm", :event=>unknown },
    { :utc=>2, :local=>"7pm", :event=>unknown },
    { :utc=>3, :local=>"8pm", :event=>unknown },
    { :utc=>4, :local=>"9pm", :event=>unknown },
    { :utc=>5, :local=>"10pm", :event=>unknown },
    { :utc=>6, :local=>"11pm", :event=>unknown },
  ].sort { |x,y| x[:utc] <=> y[:utc] }


  HourlyEvents_CONSOLIDATED = [
    { :utc=>7, :local=>"12am", :event=>MiniEvents::GatherRSS },
    { :utc=>8, :local=>"1am", :event=>unknown },
    { :utc=>9, :local=>"2am", :event=>unknown },
    { :utc=>10, :local=>"3am", :event=>unknown },
    { :utc=>11, :local=>"4am", :event=>unknown },
    { :utc=>12, :local=>"5am", :event=>unknown },
    { :utc=>13, :local=>"6am", :event=>guild_rss_help },
    { :utc=>14, :local=>"7am", :event=>guild_defend },
    { :utc=>15, :local=>"8am", :event=>secret },
    { :utc=>16, :local=>"9am", :event=>hero_quests },
    { :utc=>17, :local=>"10am", :event=>MiniEvents::GatherRSS },
    { :utc=>18, :local=>"11am", :event=>guild_help },
    { :utc=>19, :local=>"12pm", :event=>spin },
    { :utc=>20, :local=>"1pm", :event=>vip_quests },
    { :utc=>21, :local=>"2pm", :event=>monster_hunt },
    { :utc=>22, :local=>"3pm", :event=>guild_rss_help },
    { :utc=>23, :local=>"4pm", :event=>guild_rss_help },

    { :utc=>0, :local=>"5pm", :event=>vip_quests },
    { :utc=>1, :local=>"6pm", :event=>monster_hunt },
    { :utc=>2, :local=>"7pm", :event=>unknown },
    { :utc=>3, :local=>"8pm", :event=>unknown },
    { :utc=>4, :local=>"9pm", :event=>guild_defend },
    { :utc=>5, :local=>"10pm", :event=>secret },
    { :utc=>6, :local=>"11pm", :event=>guild_quests },
  ].sort { |x,y| x[:utc] <=> y[:utc] }


  HourlyEvents = HourlyEvents_CONSOLIDATED


  HourlyEvents_JULY_29 = [
    { :utc=>7, :local=>"12am", :event=>unknown },
    { :utc=>8, :local=>"1am", :event=>unknown },
    { :utc=>9, :local=>"2am", :event=>unknown },
    { :utc=>10, :local=>"3am", :event=>unknown },
    { :utc=>11, :local=>"4am", :event=>unknown },
    { :utc=>12, :local=>"5am", :event=>unknown },
    { :utc=>13, :local=>"6am", :event=>guild_rss_help },
    { :utc=>14, :local=>"7am", :event=>guild_defend },
    { :utc=>15, :local=>"8am", :event=>secret },
    { :utc=>16, :local=>"9am", :event=>unknown },
    { :utc=>17, :local=>"10am", :event=>unknown },
    { :utc=>18, :local=>"11am", :event=>unknown },
    { :utc=>19, :local=>"12pm", :event=>unknown },
    { :utc=>20, :local=>"1pm", :event=>unknown },
    { :utc=>21, :local=>"2pm", :event=>unknown },
    { :utc=>22, :local=>"3pm", :event=>unknown },
    { :utc=>23, :local=>"4pm", :event=>unknown },

    { :utc=>0, :local=>"5pm", :event=>vip_quests },
    { :utc=>1, :local=>"6pm", :event=>monster_hunt },
    { :utc=>2, :local=>"7pm", :event=>unknown },
    { :utc=>3, :local=>"8pm", :event=>unknown },
    { :utc=>4, :local=>"9pm", :event=>guild_defend },
    { :utc=>5, :local=>"10pm", :event=>secret },
    { :utc=>6, :local=>"11pm", :event=>unknown },
  ].sort { |x,y| x[:utc] <=> y[:utc] }


  HourlyEvents_JULY_28 = [
    { :utc=>7, :local=>"12am", :event=>MiniEvents::GatherRSS },
    { :utc=>8, :local=>"1am", :event=>unknown },
    { :utc=>9, :local=>"2am", :event=>unknown },
    { :utc=>10, :local=>"3am", :event=>unknown },
    { :utc=>11, :local=>"4am", :event=>unknown },
    { :utc=>12, :local=>"5am", :event=>unknown },
    { :utc=>13, :local=>"6am", :event=>unknown },
    { :utc=>14, :local=>"7am", :event=>unknown },
    { :utc=>15, :local=>"8am", :event=>secret },
    { :utc=>16, :local=>"9am", :event=>hero_quests },
    { :utc=>17, :local=>"10am", :event=>unknown },
    { :utc=>18, :local=>"11am", :event=>unknown },
    { :utc=>19, :local=>"12pm", :event=>unknown },
    { :utc=>20, :local=>"1pm", :event=>unknown },
    { :utc=>21, :local=>"2pm", :event=>unknown },
    { :utc=>22, :local=>"3pm", :event=>unknown },
    { :utc=>23, :local=>"4pm", :event=>unknown },

    { :utc=>0, :local=>"5pm", :event=>unknown },
    { :utc=>1, :local=>"6pm", :event=>unknown },
    { :utc=>2, :local=>"7pm", :event=>unknown },
    { :utc=>3, :local=>"8pm", :event=>unknown },
    { :utc=>4, :local=>"9pm", :event=>unknown },
    { :utc=>5, :local=>"10pm", :event=>secret },
    { :utc=>6, :local=>"11pm", :event=>guild_quests },
  ].sort { |x,y| x[:utc] <=> y[:utc] }

  HourlyEvents_JULY_27 = [
    { :utc=>7, :local=>"12am", :event=>unknown },
    { :utc=>8, :local=>"1am", :event=>unknown },
    { :utc=>9, :local=>"2am", :event=>unknown },
    { :utc=>10, :local=>"3am", :event=>unknown },
    { :utc=>11, :local=>"4am", :event=>unknown },
    { :utc=>12, :local=>"5am", :event=>unknown },
    { :utc=>13, :local=>"6am", :event=>unknown },
    { :utc=>14, :local=>"7am", :event=>unknown },
    { :utc=>15, :local=>"8am", :event=>secret },
    { :utc=>16, :local=>"9am", :event=>unknown },
    { :utc=>17, :local=>"10am", :event=>MiniEvents::GatherRSS },
    { :utc=>18, :local=>"11am", :event=>guild_help },
    { :utc=>19, :local=>"12pm", :event=>spin },
    { :utc=>20, :local=>"1pm", :event=>unknown },
    { :utc=>21, :local=>"2pm", :event=>monster_hunt },
    { :utc=>22, :local=>"3pm", :event=>unknown },
    { :utc=>23, :local=>"4pm", :event=>guild_rss_help },

    { :utc=>0, :local=>"5pm", :event=>vip_quests },
    { :utc=>1, :local=>"6pm", :event=>monster_hunt },
    { :utc=>2, :local=>"7pm", :event=>unknown },
    { :utc=>3, :local=>"8pm", :event=>unknown },
    { :utc=>4, :local=>"9pm", :event=>unknown },
    { :utc=>5, :local=>"10pm", :event=>unknown },
    { :utc=>6, :local=>"11pm", :event=>unknown },
  ].sort { |x,y| x[:utc] <=> y[:utc] }







  HourlyEvents_JULY_25 = [
    { :utc=>7, :local=>"12am", :event=>hero_quests },
    { :utc=>8, :local=>"1am", :event=>unknown },
    { :utc=>9, :local=>"2am", :event=>unknown },
    { :utc=>10, :local=>"3am", :event=>unknown },
    { :utc=>11, :local=>"4am", :event=>unknown },
    { :utc=>12, :local=>"5am", :event=>unknown },
    { :utc=>13, :local=>"6am", :event=>guild_quests },
    { :utc=>14, :local=>"7am", :event=>guild_defend },
    { :utc=>15, :local=>"8am", :event=>secret },
    { :utc=>16, :local=>"9am", :event=>hero_quests },
    { :utc=>17, :local=>"10am", :event=>MiniEvents::GatherRSS },
    { :utc=>18, :local=>"11am", :event=>guild_help },
    { :utc=>19, :local=>"12pm", :event=>spin },
    { :utc=>20, :local=>"1pm", :event=>vip_quests },
    { :utc=>21, :local=>"2pm", :event=>unknown },
    { :utc=>22, :local=>"3pm", :event=>guild_rss_help },
    { :utc=>23, :local=>"4pm", :event=>guild_quests },

    { :utc=>0, :local=>"5pm", :event=>guild_quests },
    { :utc=>1, :local=>"6pm", :event=>monster_hunt },
    { :utc=>2, :local=>"7pm", :event=>monster_hunt },
    { :utc=>3, :local=>"8pm", :event=>guild_quests },
    { :utc=>4, :local=>"9pm", :event=>guild_defend },
    { :utc=>5, :local=>"10pm", :event=>secret },
    { :utc=>6, :local=>"11pm", :event=>secret },
  ].sort { |x,y| x[:utc] <=> y[:utc] }



  HourlyEvents_JULY_24 = [
    { :utc=>7, :local=>"12am", :event=>hero_quests },
    { :utc=>8, :local=>"1am", :event=>unknown },
    { :utc=>9, :local=>"2am", :event=>unknown },
    { :utc=>10, :local=>"3am", :event=>unknown },
    { :utc=>11, :local=>"4am", :event=>unknown },
    { :utc=>12, :local=>"5am", :event=>unknown },
    { :utc=>13, :local=>"6am", :event=>guild_quests },
    { :utc=>14, :local=>"7am", :event=>guild_defend },
    { :utc=>15, :local=>"8am", :event=>secret },
    { :utc=>16, :local=>"9am", :event=>hero_quests },
    { :utc=>17, :local=>"10am", :event=>MiniEvents::GatherRSS },
    { :utc=>18, :local=>"11am", :event=>guild_help },
    { :utc=>19, :local=>"12pm", :event=>spin },
    { :utc=>20, :local=>"1pm", :event=>vip_quests },
    { :utc=>21, :local=>"2pm", :event=>unknown },
    { :utc=>22, :local=>"3pm", :event=>guild_rss_help },
    { :utc=>23, :local=>"4pm", :event=>guild_quests },

    { :utc=>0, :local=>"5pm", :event=>guild_quests },
    { :utc=>1, :local=>"6pm", :event=>monster_hunt },
    { :utc=>2, :local=>"7pm", :event=>monster_hunt },
    { :utc=>3, :local=>"8pm", :event=>guild_quests },
    { :utc=>4, :local=>"9pm", :event=>guild_defend },
    { :utc=>5, :local=>"10pm", :event=>secret },
    { :utc=>6, :local=>"11pm", :event=>unknown },
  ].sort { |x,y| x[:utc] <=> y[:utc] }



  HourlyEvents_JULY_5 = [
    { :utc=>7, :local=>"12am", :event=>secret },
    { :utc=>8, :local=>"1am", :event=>hero_quests },
    { :utc=>9, :local=>"2am", :event=>MiniEvents::GatherRSS },
    { :utc=>10, :local=>"3am", :event=>unknown },
    { :utc=>11, :local=>"4am", :event=>unknown },
    { :utc=>12, :local=>"5am", :event=>MiniEvents::Training },
    { :utc=>13, :local=>"6am", :event=>monster_hunt },
    { :utc=>14, :local=>"7am", :event=>guild_rss_help },
    { :utc=>15, :local=>"8am", :event=>guild_quests },
    { :utc=>16, :local=>"9am", :event=>guild_rss_help },
    { :utc=>17, :local=>"10am", :event=>guild_defend },
    { :utc=>18, :local=>"11am", :event=>spin },
    { :utc=>19, :local=>"12pm", :event=>secret },
    { :utc=>20, :local=>"1pm", :event=>hero_quests },
    { :utc=>21, :local=>"2pm", :event=>MiniEvents::GatherRSS },
    { :utc=>22, :local=>"3pm", :event=>guild_quests },
    { :utc=>23, :local=>"4pm", :event=>guild_help },

    { :utc=>0, :local=>"5pm", :event=>MiniEvents::Training },
    { :utc=>1, :local=>"6pm", :event=>monster_hunt },
    { :utc=>2, :local=>"7pm", :event=>guild_rss_help },
    { :utc=>3, :local=>"8pm", :event=>guild_quests },
    { :utc=>4, :local=>"9pm", :event=>guild_rss_help },
    { :utc=>5, :local=>"10pm", :event=>guild_defend },
    { :utc=>6, :local=>"11pm", :event=>spin },
  ].sort { |x,y| x[:utc] <=> y[:utc] }



  HourlyEvents_STARTED_JULY_3 = [
    { :utc=>7, :local=>"12am", :event=>secret },
    { :utc=>8, :local=>"1am", :event=>unknown },
    { :utc=>9, :local=>"2am", :event=>MiniEvents::GatherRSS },
    { :utc=>10, :local=>"3am", :event=>unknown },
    { :utc=>11, :local=>"4am", :event=>unknown },
    { :utc=>12, :local=>"5am", :event=>unknown },
    { :utc=>13, :local=>"6am", :event=>monster_hunt },
    { :utc=>14, :local=>"7am", :event=>guild_rss_help },
    { :utc=>15, :local=>"8am", :event=>guild_quests },
    { :utc=>16, :local=>"9am", :event=>guild_rss_help },
    { :utc=>17, :local=>"10am", :event=>guild_defend },
    { :utc=>18, :local=>"11am", :event=>spin },
    { :utc=>19, :local=>"12pm", :event=>secret },
    { :utc=>20, :local=>"1pm", :event=>hero_quests },
    { :utc=>21, :local=>"2pm", :event=>MiniEvents::GatherRSS },
    { :utc=>22, :local=>"3pm", :event=>guild_quests },
    { :utc=>23, :local=>"4pm", :event=>guild_help },

    { :utc=>0, :local=>"5pm", :event=>guild_help },
    { :utc=>1, :local=>"6pm", :event=>monster_hunt },
    { :utc=>2, :local=>"7pm", :event=>guild_rss_help },
    { :utc=>3, :local=>"8pm", :event=>guild_quests },
    { :utc=>4, :local=>"9pm", :event=>guild_rss_help },
    { :utc=>5, :local=>"10pm", :event=>guild_defend },
    { :utc=>6, :local=>"11pm", :event=>spin },
  ].sort { |x,y| x[:utc] <=> y[:utc] }

  HourlyEvents_STARTED_JUNE_24_LOCAL_TIME = [
    { :utc=>7, :local=>"12am", :event=>secret },
    { :utc=>8, :local=>"1am", :event=>hero_quests },
    { :utc=>9, :local=>"2am", :event=>unknown },
    { :utc=>10, :local=>"3am", :event=>unknown },
    { :utc=>11, :local=>"4am", :event=>unknown },
    { :utc=>12, :local=>"5am", :event=>unknown },
    { :utc=>13, :local=>"6am", :event=>unknown },
    { :utc=>14, :local=>"7am", :event=>guild_rss_help },
    { :utc=>15, :local=>"8am", :event=>guild_quests },
    { :utc=>16, :local=>"9am", :event=>guild_rss_help },
    { :utc=>17, :local=>"10am", :event=>guild_defend },
    { :utc=>18, :local=>"11am", :event=>spin },
    { :utc=>19, :local=>"12pm", :event=>secret },
    { :utc=>20, :local=>"1pm", :event=>hero_quests },
    { :utc=>21, :local=>"2pm", :event=>MiniEvents::GatherRSS },
    { :utc=>22, :local=>"3pm", :event=>guild_quests },
    { :utc=>23, :local=>"4pm", :event=>guild_help },

    { :utc=>0, :local=>"5pm", :event=>MiniEvents::Training },
    { :utc=>1, :local=>"6pm", :event=>monster_hunt },
    { :utc=>2, :local=>"7pm", :event=>guild_rss_help },
    { :utc=>3, :local=>"8pm", :event=>guild_quests },
    { :utc=>4, :local=>"9pm", :event=>guild_rss_help },
    { :utc=>5, :local=>"10pm", :event=>guild_defend },
    { :utc=>6, :local=>"11pm", :event=>spin },
  ].sort { |x,y| x[:utc] <=> y[:utc] }



  HourlyEvents_STARTED_JUNE_23_LOCAL_TIME = [
    { :utc=>7, :local=>"12am", :event=>unknown },
    { :utc=>8, :local=>"1am", :event=>unknown },
    { :utc=>9, :local=>"2am", :event=>unknown },
    { :utc=>10, :local=>"3am", :event=>unknown },
    { :utc=>11, :local=>"4am", :event=>unknown },
    { :utc=>12, :local=>"5am", :event=>unknown },
    { :utc=>13, :local=>"6am", :event=>unknown },
    { :utc=>14, :local=>"7am", :event=>unknown },
    { :utc=>15, :local=>"8am", :event=>guild_quests },
    { :utc=>16, :local=>"9am", :event=>guild_rss_help },
    { :utc=>17, :local=>"10am", :event=>guild_defend },
    { :utc=>18, :local=>"11am", :event=>spin },
    { :utc=>19, :local=>"12pm", :event=>secret },
    { :utc=>20, :local=>"1pm", :event=>hero_quests },
    { :utc=>21, :local=>"2pm", :event=>MiniEvents::GatherRSS },
    { :utc=>22, :local=>"3pm", :event=>guild_quests },
    { :utc=>23, :local=>"4pm", :event=>guild_help },

    { :utc=>0, :local=>"5pm", :event=>unknown },
    { :utc=>1, :local=>"6pm", :event=>unknown },
    { :utc=>2, :local=>"7pm", :event=>unknown },
    { :utc=>3, :local=>"8pm", :event=>unknown },
    { :utc=>4, :local=>"9pm", :event=>unknown },
    { :utc=>5, :local=>"10pm", :event=>unknown },
    { :utc=>6, :local=>"11pm", :event=>unknown },
  ].sort { |x,y| x[:utc] <=> y[:utc] }


  #
  #
  # HourlyEvents_STARTED_JUNE_23_LOCAL_TIME_QUESTIONAVBLE = [
  #   { :utc=>7, :local=>"12am", :event=>unknown },
  #   { :utc=>8, :local=>"1am", :event=>unknown },
  #   { :utc=>9, :local=>"2am", :event=>unknown },
  #   { :utc=>10, :local=>"3am", :event=>unknown },
  #   { :utc=>11, :local=>"4am", :event=>unknown },
  #   { :utc=>12, :local=>"5am", :event=>unknown },
  #   { :utc=>13, :local=>"6am", :event=>unknown },
  #   { :utc=>14, :local=>"7am", :event=>unknown },
  #   { :utc=>15, :local=>"8am", :event=>guild_quests },
  #   { :utc=>16, :local=>"9am", :event=>guild_rss_help },
  #   { :utc=>17, :local=>"10am", :event=>guild_defend },
  #   { :utc=>18, :local=>"11am", :event=>unknown },
  #   { :utc=>19, :local=>"12pm", :event=>unknown },
  #   { :utc=>20, :local=>"1pm", :event=>unknown },
  #   { :utc=>22, :local=>"2pm", :event=>unknown },
  #   { :utc=>22, :local=>"3pm", :event=>unknown },
  #   { :utc=>23, :local=>"4pm", :event=>unknown },
  #   { :utc=>0, :local=>"5pm", :event=>MiniEvents::Training },
  #   { :utc=>1, :local=>"6pm", :event=>monster_hunt },
  #   { :utc=>2, :local=>"7pm", :event=>guild_rss_help },
  #   { :utc=>3, :local=>"8pm", :event=>guild_quests },
  #   { :utc=>4, :local=>"9pm", :event=>guild_rss_help },
  #   { :utc=>5, :local=>"10pm", :event=>unknown },
  #   { :utc=>6, :local=>"11pm", :event=>unknown },
  # ].sort { |x,y| x[:utc] <=> y[:utc] }
  #
  # HourlyEvents_STARTED_JUNE_22_LOCAL_TIME = [
  #   { :local=>"5pm", :event=>unknown },
  #   { :local=>"6pm", :event=>unknown },
  #   { :local=>"7pm", :event=>unknown },
  #   { :local=>"8pm", :event=>unknown },
  #   { :local=>"9pm", :event=>unknown },
  #   { :local=>"10pm", :event=>unknown },
  #   { :local=>"11pm", :event=>unknown },
  #   { :local=>"12am", :event=>unknown },
  #   { :local=>"1am", :event=>unknown },
  #   { :local=>"2am", :event=>unknown },
  #   { :local=>"3am", :event=>unknown },
  #   { :local=>"4am", :event=>unknown },
  #   { :local=>"5am", :event=>unknown },
  #   { :local=>"6am", :event=>unknown },
  #   { :local=>"7am", :event=>unknown },
  #   { :local=>"8am", :event=>unknown },
  #   { :local=>"9am", :event=>unknown },
  #   { :local=>"10am", :event=>guild_defend },
  #   { :local=>"11am", :event=>spin },
  #   { :local=>"12pm", :event=>secret },
  #   { :local=>"1pm", :event=>hero_quests },
  #   { :local=>"2pm", :event=>MiniEvents::GatherRSS },
  #   { :local=>"3pm", :event=>guild_quests },
  #   { :local=>"4pm", :event=>guild_help },
  # ]

  #
  # HourlyEvents_BUSTED = [
  #   { :local=>"5pm", :event=>MiniEvents::Training },
  #   { :local=>"6pm", :event=>monster_hunt },
  #   { :local=>"7pm", :event=>unknown },
  #   { :local=>"8pm", :event=>MiniEvents::GatherRSS },
  #   { :local=>"9pm", :event=>guild_defend },
  #   { :local=>"10pm", :event=>MiniEvents::GatherRSS },
  #   { :local=>"11pm", :event=>guild_quests },
  #   { :local=>"12am", :event=>secret },
  #   { :local=>"1am", :event=>hero_quests },
  #   { :local=>"2am", :event=>MiniEvents::GatherRSS },
  #   { :local=>"3am", :event=>unknown },
  #   { :local=>"4am", :event=>unknown },
  #   { :local=>"5am", :event=>unknown },
  #   { :local=>"6am", :event=>guild_quests },
  #   { :local=>"7am", :event=>spin },
  #   { :local=>"8am", :event=>MiniEvents::Training },
  #   { :local=>"9am", :event=>guild_quests },
  #   { :local=>"10am", :event=>secret },
  #   { :local=>"11am", :event=>guild_rss_help },
  #   { :local=>"12pm", :event=>guild_defend },
  #   { :local=>"1pm", :event=>spin },
  #   { :local=>"2pm", :event=>MiniEvents::GatherRSS },
  #   { :local=>"3pm", :event=>monster_hunt },
  #   { :local=>"4pm", :event=>hero_quests },
  # ]

  HourlyEvents_OLD_2_LONG_LIVED = [
    { :local=>"5pm", :event=>MiniEvents::Training },
    { :local=>"6pm", :event=>guild_help },
    { :local=>"7pm", :event=>guild_defend },
    { :local=>"8pm", :event=>MiniEvents::GatherRSS },
    { :local=>"9pm", :event=>guild_defend },
    { :local=>"10pm", :event=>MiniEvents::GatherRSS },
    { :local=>"11pm", :event=>guild_quests },
    { :local=>"12pm", :event=>MiniEvents::Training },
    { :local=>"1am", :event=>monster_hunt },
    { :local=>"2am", :event=>guild_rss_help },
    { :local=>"3am", :event=>guild_quests + unconfirmed },
    { :local=>"4am", :event=>MiniEvents::Training },
    { :local=>"5am", :event=>monster_hunt },
    { :local=>"6am", :event=>spin },
    { :local=>"7am", :event=>secret },
    { :local=>"8am", :event=>MiniEvents::Training },
    { :local=>"9am", :event=>guild_quests },
    { :local=>"10am", :event=>monster_hunt },
    { :local=>"11am", :event=>guild_rss_help },
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
#   guild_rss_help,
#   "#{guild_quests} #{unconfirmed}",
#   "#{MiniEvents::Training} #{unconfirmed}",
#   guild_help,
#   guild_defend,
#   MiniEvents::GatherRSS,
#   MiniEvents::Training,
#   guild_quests,
#   monster_hunt,
#   guild_rss_help,
#   guild_defend,
#   spin,
#   MiniEvents::GatherRSS,
#   monster_hunt,
#   hero_quests,
# ]
