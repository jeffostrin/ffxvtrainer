
class MiniEvents
  unknown = "Unknown"

  GatherRSS = "Gather RSS"
  Training = "Training"
  Unknown = unknown

  monster_hunt = "Monster Hunt"
  spin = "Spin the Wheel"
  secret = "Secret Gift"
  guild_defend = "Guild Defend"
  guild_quests = "Guild Quests"
  guild_rss_help = "Guild RSS Help"
  guild_help = "Guild Help"
  hero_quests = "Hero Quests"
  vip_quests = "VIP Quests"
  combine_gems = "Combine Gems"
  combine_mats = "Combine Materials"

  unconfirmed = "{Unconfirmed (Crowd Source)}"


  HourlyEvents_TEMPLATE = [
    { :utc=>23, :local=>"4pm", :event=>unknown },
    { :utc=>22, :local=>"3pm", :event=>unknown },
    { :utc=>21, :local=>"2pm", :event=>unknown },
    { :utc=>20, :local=>"1pm", :event=>unknown },
    { :utc=>19, :local=>"12pm", :event=>unknown },
    { :utc=>18, :local=>"11am", :event=>unknown },
    { :utc=>17, :local=>"10am", :event=>unknown },
    { :utc=>16, :local=>"9am", :event=>unknown },
    { :utc=>15, :local=>"8am", :event=>unknown },
    { :utc=>14, :local=>"7am", :event=>unknown },
    { :utc=>13, :local=>"6am", :event=>unknown },
    { :utc=>12, :local=>"5am", :event=>unknown },
    { :utc=>11, :local=>"4am", :event=>unknown },
    { :utc=>10, :local=>"3am", :event=>unknown },
    { :utc=>9, :local=>"2am", :event=>unknown },
    { :utc=>8, :local=>"1am", :event=>unknown },
    { :utc=>7, :local=>"12am", :event=>unknown },
    { :utc=>6, :local=>"11pm", :event=>unknown },
    { :utc=>5, :local=>"10pm", :event=>unknown },
    { :utc=>4, :local=>"9pm", :event=>unknown },
    { :utc=>3, :local=>"8pm", :event=>unknown },
    { :utc=>2, :local=>"7pm", :event=>unknown },
    { :utc=>1, :local=>"6pm", :event=>unknown },
    { :utc=>0, :local=>"5pm", :event=>unknown },

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

  HourlyEvents_DATA_ENTRY = [
    { :utc=>0, :local=>"5pm",   :events=>[ vip_quests,   "",             vip_quests,   "|", vip_quests,   vip_quests,     "",             "",             vip_quests,     vip_quests,     vip_quests,     vip_quests,     vip_quests,     vip_quests,     "",             "",             vip_quests,     "",             vip_quests,     "",             "",             combine_gems,   "",           "",             vip_quests,     vip_quests,     vip_quests,     vip_quests,     vip_quests,     vip_quests,     "",             vip_quests,     vip_quests,     vip_quests,     vip_quests,     "",             "",             "",             vip_quests,     vip_quests,     vip_quests,     ], :l2=>"5pm" },
    { :utc=>1, :local=>"6pm",   :events=>[ "",           monster_hunt,   monster_hunt, "|", monster_hunt, monster_hunt,   "",             "",             vip_quests,     monster_hunt,   monster_hunt,   monster_hunt,   monster_hunt,   monster_hunt,   monster_hunt,   "",             monster_hunt,   "",             monster_hunt,   "",             monster_hunt,   "",             "",           monster_hunt,   "",             "",             monster_hunt,   monster_hunt,   monster_hunt,   monster_hunt,   "",             "",             "",             "",             monster_hunt,   "",             monster_hunt,   "",             "",             "",             monster_hunt,   monster_hunt,   ], :l2=>"6pm" },
    { :utc=>2, :local=>"7pm",   :events=>[ "",           guild_rss_help, "",           "|", "",           guild_rss_help, "",             "",             "",             guild_rss_help, "",             guild_rss_help, guild_rss_help, guild_rss_help, guild_rss_help, "",             guild_rss_help, "",             "",             guild_rss_help, "",             "",             "",           guild_rss_help, "",             guild_rss_help, guild_rss_help, guild_rss_help, "",             "",             "",             "",             "",             "",             "",             "",             "",             "",             "",             "",             guild_rss_help, guild_rss_help, ], :l2=>"7pm" },
    #                                                                                                                                                                                                                                                     Saturday n      Sunday n        Monday n        Tuesday n       Wednesday n     Thursday n      Friday n        Saturday n      Sunday n      Monday n        Tuesday n       Wednesday n     Thursday n      Friday n        Saturday(9/1)n  Sunday n        Monday n        Tuesday n       Wednesday n     Thurs n         Friday n        Sat n           Sunday n        Mon n           Tues n          Wed n           Thurs n         Fri n
    { :utc=>3, :local=>"8pm",   :events=>[ guild_quests, "",             guild_quests, "|", "",           guild_quests,   "",             guild_quests,   "",             guild_quests,   guild_quests,   "",             guild_quests,   guild_quests,   guild_quests,   "",             guild_rss_help, guild_quests,   "",             "",             guild_quests,   "",             guild_quests, guild_quests,   guild_quests,   "",             "",             guild_rss_help, "",             guild_quests,   "",             "",             "",             "",             "",             "",             "",             guild_quests,   guild_quests,   "",             "",             guild_quests,   ], :l2=>"8pm" },
    { :utc=>4, :local=>"9pm",   :events=>[ guild_defend, guild_defend,   guild_quests, "|", "",           guild_defend,   guild_quests,   guild_defend,   guild_defend,   guild_defend,   guild_defend,   guild_defend,   guild_defend,   "",             guild_defend,   "",             guild_quests,   "",             guild_defend,   guild_defend,   guild_quests,   "",             guild_defend, guild_quests,   guild_defend,   "",             guild_defend,   guild_defend,   "",             guild_defend,   guild_defend,   guild_defend,   guild_defend,   guild_quests,   "",             "",             "",             guild_defend,   guild_defend,   "",             "",             guild_defend,   ], :l2=>"9pm" },
    { :utc=>5, :local=>"10pm",  :events=>[ secret,       secret,         guild_defend, "|", combine_mats, "",             combine_mats,   "",             guild_defend,   combine_mats,   combine_mats,   guild_defend,   combine_mats,   combine_mats,   combine_mats,   "",             combine_mats,   "",             combine_mats,   combine_mats,   combine_mats,   combine_mats,   combine_mats, combine_mats,   "",             "",             combine_mats,   combine_mats,   combine_mats,   combine_mats,   "",             combine_mats,   combine_mats,   combine_mats,   "",             "",             combine_mats,   combine_mats,   "",             combine_mats,   combine_mats,   combine_mats,   ], :l2=>"10pm" },
    { :utc=>6, :local=>"11pm",  :events=>[ hero_quests,  hero_quests,    hero_quests,  "|", hero_quests,  hero_quests,    hero_quests,    "",             hero_quests,    hero_quests,    hero_quests,    hero_quests,    "",             combine_mats,   hero_quests,    "",             hero_quests,    hero_quests,    combine_mats,   "",             hero_quests,    hero_quests,    "",           hero_quests,    hero_quests,    hero_quests,    "",             hero_quests,    hero_quests,    "",             hero_quests,    "",             "",             "",             "",             hero_quests,    "",             "",             "",             "",             combine_mats,   hero_quests,    ], :l2=>"11pm" },
    { :utc=>7, :local=>"12am",  :events=>[ "",           "",             "",           "|", GatherRSS,    GatherRSS,      GatherRSS,      GatherRSS,      "",             GatherRSS,      "",             "",             hero_quests,    "",             "",             GatherRSS,      "",             GatherRSS,      "",             "",             "",             GatherRSS,      "",           "",             hero_quests,    GatherRSS,      GatherRSS,      "",             GatherRSS,      "",             "",             "",             "",             "",             "",             "",             "",             "",             "",             "",             "",             GatherRSS.      ], :l2=>"12am" },
    { :utc=>8, :local=>"1am",   :events=>[ "",           guild_help,     "",           "|", guild_help,   "",             guild_help,     GatherRSS,      "",             "",             "",             "",             "",             "",             "",             "",             guild_help,     guild_help,     "",             "",             "",             "",             "",           "",             "",             "",             "",             "",             "",             "",             "",             "",             "",             "",             "",             "",             "",             "",             "",             "",             guild_help,     ], :l2=>"1am" },
    { :utc=>9, :local=>"2am",   :events=>[ "",           "",             "",           "|", "",           "",             "",             "",             "",             "",             "",             "",             "",             "",             "",             "",             "",             "",             "",             "",             spin,           "",             "",           "",             "",             "",             "",             "",             "",             "",             "",             "",             "",             "",             "",             "",             "",             "",             "",             spin,           "",             ], :l2=>"2am" },
    { :utc=>10, :local=>"3am",  :events=>[ vip_quests,   "",             "",           "|", "",           "",             "",             "",             "",             "",             "",             "",             "",             "",             "",             "",             "",             "",             "",             combine_gems,   "",             "",             "",           "",             "",             "",             "",             "",             "",             "",             "",             "",             "",             "",             "",             "",             "",             "",             "",             "",             "",             ], :l2=>"3am" },
    { :utc=>11, :local=>"4am",  :events=>[ "",           "",             "",           "|", "",           secret,         "",             "",             "",             "",             "",             "",             "",             "",             "",             "",             "",             "",             "",             "",             "",             "",             "",           "",             "",             "",             "",             "",             "",             "",             secret,         "",             "",             "",             "",             "",             "",             "",             "",             "",             "",             ], :l2=>"4am" },
    { :utc=>12, :local=>"5am",  :events=>[ "",           "",             "",           "|", "",           "",             "",             Training,       Training,       Training,       Training,       Training,       "",             "",             "",             "",             "",             "",             "",             "",             "",             "",             "",           "",             "",             "",             "",             "",             "",             "",             "",             "",             "",             Training,       "",             "",             "",             "",             Training,       "",             "",             ], :l2=>"5am" },
    #                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   Sunday m        Monday m        Tuesday m       Wednesday m     Thurs m         Friday m        Sat m           Sun m           Mon m           Tues m          Wed m           Thurs m         Fri m
    { :utc=>13, :local=>"6am",  :events=>[ guild_quests, guild_quests,   guild_quests, "|", vip_quests,   "",             "",             Training,       vip_quests,     vip_quests,     vip_quests,     vip_quests,     vip_quests,     "",             "",             "",             "",             "",             "",             "",             "",             "",             "",           vip_quests,     "",             vip_quests,     "",             "",             "",             "",             vip_quests,     vip_quests,     vip_quests,     vip_quests,     "",             "",             vip_quests,     vip_quests,     vip_quests,     "",             vip_quests,     ], :l2=>"6am" },
    { :utc=>14, :local=>"7am",  :events=>[ guild_defend, guild_defend,   guild_defend, "|", monster_hunt, monster_hunt,   monster_hunt,   vip_quests,     monster_hunt,   monster_hunt,   monster_hunt,   monster_hunt,   monster_hunt,   monster_hunt,   "",             monster_hunt,   monster_hunt,   monster_hunt,   monster_hunt,   "",             monster_hunt,   monster_hunt,   "",           monster_hunt,   monster_hunt,   monster_hunt,   monster_hunt,   "",             "",             "",             monster_hunt,   "",             "",             monster_hunt,   "",             "",             "",             monster_hunt,   "",             monster_hunt,   "",             ], :l2=>"7am" },
    { :utc=>15, :local=>"8am",  :events=>[ secret,       secret,         secret,       "|", monster_hunt, guild_rss_help, guild_rss_help, guild_rss_help, guild_rss_help, monster_hunt,   guild_rss_help, guild_rss_help, "",             guild_rss_help, "",             guild_rss_help, guild_rss_help, guild_rss_help, guild_rss_help, "",             guild_rss_help, "",             "",           guild_rss_help, guild_rss_help, guild_rss_help, guild_rss_help, "",             guild_rss_help, "",             guild_rss_help, "",             guild_rss_help, "",             "",             "",             guild_rss_help, guild_rss_help, guild_rss_help, guild_rss_help, guild_rss_help, ], :l2=>"8am" },
    { :utc=>16, :local=>"9am",  :events=>[ hero_quests,  hero_quests,    "",           "|", guild_quests, "",             guild_quests,   guild_quests,   "",             guild_quests,   guild_quests,   guild_quests,   guild_quests,   "",             guild_quests,   "",             guild_quests,   guild_quests,   guild_quests,   guild_quests,   guild_rss_help, guild_quests,   guild_quests, guild_quests,   guild_quests,   "",             guild_quests,   "",             guild_quests,   guild_quests,   guild_quests,   guild_quests,   "",             "",             "",             "",             guild_quests,   guild_rss_help, "",             guild_quests,   guild_quests,   ], :l2=>"9am" },
    { :utc=>17, :local=>"10am", :events=>[ "",           GatherRSS,      "",           "|", guild_defend, guild_quests,   guild_defend,   guild_defend,   guild_defend,   guild_defend,   guild_quests,   guild_defend,   guild_quests,   "",             "",             guild_defend,   guild_defend,   guild_defend,   guild_defend,   guild_defend,   guild_defend,   guild_defend,   "",           guild_quests,   "",             "",             guild_defend,   "",             "",             guild_defend,   "",             "",             "",             "",             "",             "",             "",             guild_defend,   guild_defend,   guild_defend,   guild_defend,   ], :l2=>"10am" },
    { :utc=>18, :local=>"11am", :events=>[ "",           guild_help,     "",           "|", combine_mats, "",             "",             combine_mats,   "",             combine_mats,   combine_mats,   combine_mats,   "",             "",             "",             combine_mats,   combine_mats,   combine_mats,   guild_defend,   "",             combine_mats,   combine_mats,   "",           combine_mats,   "",             "",             combine_mats,   "",             "",             combine_mats,   "",             "",             "",             "",             "",             "",             combine_mats,   "",             "",             combine_mats,   combine_mats,   ], :l2=>"11am" },
    { :utc=>19, :local=>"12pm", :events=>[ "",           spin,           "",           "|", hero_quests,  "",             "",             hero_quests,    hero_quests,    "",             "",             hero_quests,    "",             "",             hero_quests,    hero_quests,    "",             "",             hero_quests,    "",             hero_quests,    hero_quests,    "",           hero_quests,    "",             "",             "",             "",             hero_quests,    hero_quests,    "",             hero_quests,    "",             combine_mats,   "",             "",             "",             hero_quests,    "",             hero_quests,    hero_quests,    ], :l2=>"12pm" },
    #                                                                                                                                                                                                                                                     Sunday a        Monday a        Tuesday a       Wednesday a     Thursday a      Friday a        Saturday a      Sunday a        Monday a      Tuesday a       Wednesday a     Thursday a      Friday a        Saturday(9/1)a  Sunday a        Monday a        Tuesday a       Wednesday a     Thurs a         Friday a        Sat a           Sun a           Mon a           Tues a          Wed a           Thus a          Fri a
    { :utc=>20, :local=>"1pm",  :events=>[ "",           "",             "",           "|", GatherRSS,    "",             "",             "",             "",             hero_quests,    "",             GatherRSS,      "",             "",             "",             GatherRSS,      "",             "",             GatherRSS,      "",             GatherRSS,      "",             GatherRSS,    GatherRSS,      GatherRSS,      "",             GatherRSS,      "",             GatherRSS,      hero_quests,    GatherRSS,      "",             GatherRSS,      "",             "",             "",             "",             GatherRSS,      "",             GatherRSS,      GatherRSS,      ], :l2=>"1pm" },
    { :utc=>21, :local=>"2pm",  :events=>[ "",           monster_hunt,   monster_hunt, "|", guild_help,   "",             "",             "",             "",             GatherRSS,      guild_help,     "",             "",             "",             "",             guild_help,     "",             guild_help,     "",             guild_help,     "",             guild_help,     guild_help,   "",             "",             "",             guild_help,     "",             "",             guild_help,     "",             "",             "",             "",             "",             "",             "",             "",             "",             guild_help,     guild_help,     ], :l2=>"2pm" },
    { :utc=>22, :local=>"3pm",  :events=>[ "",           guild_rss_help, "",           "|", spin,         "",             "",             spin,           "",             spin,           spin,           spin,           "",             "",             spin,           spin,           "",             "",             "",             "",             "",             "",             "",           spin,           spin,           "",             "",             "",             spin,           "",             "",             "",             "",             "",             "",             "",             spin,           spin,           "",             spin,           spin,           ], :l2=>"3pm" },
    { :utc=>23, :local=>"4pm",  :events=>[ "",           guild_quests,   guild_quests, "|", combine_mats, "",             "",             combine_gems,   combine_gems,   combine_gems,   combine_gems,   combine_gems,   combine_gems,   "",             "",             combine_gems,   combine_gems,   "",             "",             "",             combine_gems,   "",             "",           combine_gems,   "",             "",             "",             "",             combine_gems,   "",             combine_gems,   "",             "",             "",             combine_gems,   "",             combine_gems,   combine_gems,   combine_gems,   spin,           combine_gems,   ], :l2=>"4pm" },
  ]

  HourlyEvents_LONG_FORM = [
    [ { :utc=>23, :local=>"4pm", :event=>unknown },
      { :utc=>22, :local=>"3pm", :event=>unknown },
      { :utc=>21, :local=>"2pm", :event=>unknown },
      { :utc=>20, :local=>"1pm", :event=>unknown },
      { :utc=>19, :local=>"12pm", :event=>unknown },
      { :utc=>18, :local=>"11am", :event=>unknown },
      { :utc=>17, :local=>"10am", :event=>unknown },
      { :utc=>16, :local=>"9am", :event=>unknown },
      { :utc=>15, :local=>"8am", :event=>unknown },
      { :utc=>14, :local=>"7am", :event=>unknown },
      { :utc=>13, :local=>"6am", :event=>unknown },
      { :utc=>12, :local=>"5am", :event=>unknown },
      { :utc=>11, :local=>"4am", :event=>unknown },
      { :utc=>10, :local=>"3am", :event=>unknown },
      { :utc=>9, :local=>"2am", :event=>unknown },
      { :utc=>8, :local=>"1am", :event=>unknown },
      { :utc=>7, :local=>"12am", :event=>unknown },
      { :utc=>6, :local=>"11pm", :event=>unknown },
      { :utc=>5, :local=>"10pm", :event=>guild_defend },
      { :utc=>4, :local=>"9pm", :event=>guild_quests },
      { :utc=>3, :local=>"8pm", :event=>guild_quests },
      { :utc=>2, :local=>"7pm", :event=>unknown },
      { :utc=>1, :local=>"6pm", :event=>monster_hunt },
      { :utc=>0, :local=>"5pm", :event=>vip_quests },
    ],

    [ { :utc=>23, :local=>"4pm", :event=>guild_quests },
      { :utc=>22, :local=>"3pm", :event=>guild_rss_help },
      { :utc=>21, :local=>"2pm", :event=>monster_hunt },
      { :utc=>20, :local=>"1pm", :event=>unknown },
      { :utc=>19, :local=>"12pm", :event=>spin },
      { :utc=>18, :local=>"11am", :event=>guild_help },
      { :utc=>17, :local=>"10am", :event=>GatherRSS },
      { :utc=>16, :local=>"9am", :event=>hero_quests },
      { :utc=>15, :local=>"8am", :event=>secret },
      { :utc=>14, :local=>"7am", :event=>guild_defend },
      { :utc=>13, :local=>"6am", :event=>guild_quests },
      { :utc=>12, :local=>"5am", :event=>unknown },
      { :utc=>11, :local=>"4am", :event=>unknown },
      { :utc=>10, :local=>"3am", :event=>unknown },
      { :utc=>9, :local=>"2am", :event=>unknown },
      { :utc=>8, :local=>"1am", :event=>guild_help },
      { :utc=>7, :local=>"12am", :event=>unknown },

      # Aug 7
      { :utc=>6, :local=>"11pm", :event=>hero_quests },
      { :utc=>5, :local=>"10pm", :event=>secret },
      { :utc=>4, :local=>"9pm", :event=>guild_defend },
      { :utc=>3, :local=>"8pm", :event=>unknown },
      { :utc=>2, :local=>"7pm", :event=>guild_rss_help },
      { :utc=>1, :local=>"6pm", :event=>monster_hunt },
      { :utc=>0, :local=>"5pm", :event=>unknown },
    ],

    [ { :utc=>23, :local=>"4pm", :event=>unknown },
      { :utc=>22, :local=>"3pm", :event=>unknown },
      { :utc=>21, :local=>"2pm", :event=>unknown },
      { :utc=>20, :local=>"1pm", :event=>unknown },
      { :utc=>19, :local=>"12pm", :event=>unknown },
      { :utc=>18, :local=>"11am", :event=>unknown },
      { :utc=>17, :local=>"10am", :event=>unknown },
      { :utc=>16, :local=>"9am", :event=>hero_quests },
      { :utc=>15, :local=>"8am", :event=>secret },
      { :utc=>14, :local=>"7am", :event=>guild_defend },
      { :utc=>13, :local=>"6am", :event=>guild_quests },
      { :utc=>12, :local=>"5am", :event=>unknown },
      { :utc=>11, :local=>"4am", :event=>unknown },
      { :utc=>10, :local=>"3am", :event=>vip_quests },
      { :utc=>9, :local=>"2am", :event=>unknown },
      { :utc=>8, :local=>"1am", :event=>unknown },

      # Aug 6
      { :utc=>7, :local=>"12am", :event=>unknown },
      { :utc=>6, :local=>"11pm", :event=>hero_quests },
      { :utc=>5, :local=>"10pm", :event=>secret },
      { :utc=>4, :local=>"9pm", :event=>guild_defend },
      { :utc=>3, :local=>"8pm", :event=>guild_quests },
      { :utc=>2, :local=>"7pm", :event=>unknown },
      { :utc=>1, :local=>"6pm", :event=>unknown },
      { :utc=>0, :local=>"5pm", :event=>vip_quests },
    ],
  ]


  HourlyEvents_AUG_6 = [
    { :utc=>7, :local=>"12am", :event=>unknown },
    { :utc=>8, :local=>"1am", :event=>unknown },
    { :utc=>9, :local=>"2am", :event=>unknown },
    { :utc=>10, :local=>"3am", :event=>vip_quests },
    { :utc=>11, :local=>"4am", :event=>unknown },
    { :utc=>12, :local=>"5am", :event=>unknown },
    { :utc=>13, :local=>"6am", :event=>guild_quests },
    { :utc=>14, :local=>"7am", :event=>guild_defend },
    { :utc=>15, :local=>"8am", :event=>secret },
    { :utc=>16, :local=>"9am", :event=>hero_quests },
    { :utc=>17, :local=>"10am", :event=>unknown },
    { :utc=>18, :local=>"11am", :event=>unknown },
    { :utc=>19, :local=>"12pm", :event=>unknown },
    { :utc=>20, :local=>"1pm", :event=>unknown },
    { :utc=>21, :local=>"2pm", :event=>unknown },
    { :utc=>22, :local=>"3pm", :event=>unknown },
    { :utc=>23, :local=>"4pm", :event=>unknown },

    { :utc=>0, :local=>"5pm", :event=>vip_quests },
    { :utc=>1, :local=>"6pm", :event=>unknown },
    { :utc=>2, :local=>"7pm", :event=>unknown },
    { :utc=>3, :local=>"8pm", :event=>guild_quests },
    { :utc=>4, :local=>"9pm", :event=>guild_defend },
    { :utc=>5, :local=>"10pm", :event=>secret },
    { :utc=>6, :local=>"11pm", :event=>hero_quests },
  ].sort { |x,y| x[:utc] <=> y[:utc] }

  HourlyEvents_AUG_5 = [
    { :utc=>7, :local=>"12am", :event=>unknown },
    { :utc=>8, :local=>"1am", :event=>guild_help },
    { :utc=>9, :local=>"2am", :event=>unknown },
    { :utc=>10, :local=>"3am", :event=>unknown },
    { :utc=>11, :local=>"4am", :event=>unknown },
    { :utc=>12, :local=>"5am", :event=>guild_rss_help },
    { :utc=>13, :local=>"6am", :event=>guild_quests },
    { :utc=>14, :local=>"7am", :event=>guild_defend },
    { :utc=>15, :local=>"8am", :event=>secret },
    { :utc=>16, :local=>"9am", :event=>unknown },
    { :utc=>17, :local=>"10am", :event=>GatherRSS },
    { :utc=>18, :local=>"11am", :event=>unknown },
    { :utc=>19, :local=>"12pm", :event=>spin },
    { :utc=>20, :local=>"1pm", :event=>unknown },
    { :utc=>21, :local=>"2pm", :event=>unknown },
    { :utc=>22, :local=>"3pm", :event=>unknown },
    { :utc=>23, :local=>"4pm", :event=>guild_quests },

    { :utc=>0, :local=>"5pm", :event=>unknown },
    { :utc=>1, :local=>"6pm", :event=>unknown },
    { :utc=>2, :local=>"7pm", :event=>unknown },
    { :utc=>3, :local=>"8pm", :event=>unknown },
    { :utc=>4, :local=>"9pm", :event=>unknown },
    { :utc=>5, :local=>"10pm", :event=>secret },
    { :utc=>6, :local=>"11pm", :event=>secret },
  ].sort { |x,y| x[:utc] <=> y[:utc] }


  HourlyEvents_AUG_4 = [
    { :utc=>7, :local=>"12am", :event=>unknown },
    { :utc=>8, :local=>"1am", :event=>unknown },
    { :utc=>9, :local=>"2am", :event=>unknown },
    { :utc=>10, :local=>"3am", :event=>unknown },
    { :utc=>11, :local=>"4am", :event=>unknown },
    { :utc=>12, :local=>"5am", :event=>unknown },
    { :utc=>13, :local=>"6am", :event=>unknown },
    { :utc=>14, :local=>"7am", :event=>guild_defend },
    { :utc=>15, :local=>"8am", :event=>secret },
    { :utc=>16, :local=>"9am", :event=>unknown },
    { :utc=>17, :local=>"10am", :event=>unknown },
    { :utc=>18, :local=>"11am", :event=>guild_help },
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
    { :utc=>6, :local=>"11pm", :event=>hero_quests },
  ].sort { |x,y| x[:utc] <=> y[:utc] }




  HourlyEvents_AUG_3 = [
    { :utc=>7, :local=>"12am", :event=>GatherRSS },
    { :utc=>8, :local=>"1am", :event=>unknown },
    { :utc=>9, :local=>"2am", :event=>unknown },
    { :utc=>10, :local=>"3am", :event=>unknown },
    { :utc=>11, :local=>"4am", :event=>unknown },
    { :utc=>12, :local=>"5am", :event=>unknown },
    { :utc=>13, :local=>"6am", :event=>unknown },
    { :utc=>14, :local=>"7am", :event=>guild_defend },
    { :utc=>15, :local=>"8am", :event=>secret },
    { :utc=>16, :local=>"9am", :event=>unknown },
    { :utc=>17, :local=>"10am", :event=>GatherRSS },
    { :utc=>18, :local=>"11am", :event=>unknown },
    { :utc=>19, :local=>"12pm", :event=>unknown },
    { :utc=>20, :local=>"1pm", :event=>unknown },
    { :utc=>21, :local=>"2pm", :event=>unknown },
    { :utc=>22, :local=>"3pm", :event=>guild_rss_help },
    { :utc=>23, :local=>"4pm", :event=>unknown },

    { :utc=>0, :local=>"5pm", :event=>unknown },
    { :utc=>1, :local=>"6pm", :event=>unknown },
    { :utc=>2, :local=>"7pm", :event=>unknown },
    { :utc=>3, :local=>"8pm", :event=>unknown },
    { :utc=>4, :local=>"9pm", :event=>unknown },
    { :utc=>5, :local=>"10pm", :event=>unknown },
    { :utc=>6, :local=>"11pm", :event=>hero_quests },
  ].sort { |x,y| x[:utc] <=> y[:utc] }



  HourlyEvents_AUG_1 = [
    { :utc=>7, :local=>"12am", :event=>unknown },
    { :utc=>8, :local=>"1am", :event=>unknown },
    { :utc=>9, :local=>"2am", :event=>unknown },
    { :utc=>10, :local=>"3am", :event=>unknown },
    { :utc=>11, :local=>"4am", :event=>unknown },
    { :utc=>12, :local=>"5am", :event=>unknown },
    { :utc=>13, :local=>"6am", :event=>unknown },
    { :utc=>14, :local=>"7am", :event=>guild_quests },
    { :utc=>15, :local=>"8am", :event=>secret },
    { :utc=>16, :local=>"9am", :event=>hero_quests },
    { :utc=>17, :local=>"10am", :event=>unknown },
    { :utc=>18, :local=>"11am", :event=>unknown },
    { :utc=>19, :local=>"12pm", :event=>unknown },
    { :utc=>20, :local=>"1pm", :event=>unknown },
    { :utc=>21, :local=>"2pm", :event=>unknown },
    { :utc=>22, :local=>"3pm", :event=>unknown },
    { :utc=>23, :local=>"4pm", :event=>guild_quests },

    { :utc=>0, :local=>"5pm", :event=>unknown },
    { :utc=>1, :local=>"6pm", :event=>monster_hunt },
    { :utc=>2, :local=>"7pm", :event=>guild_rss_help },
    { :utc=>3, :local=>"8pm", :event=>guild_rss_help },
    { :utc=>4, :local=>"9pm", :event=>unknown },
    { :utc=>5, :local=>"10pm", :event=>secret },
    { :utc=>6, :local=>"11pm", :event=>unknown },
  ].sort { |x,y| x[:utc] <=> y[:utc] }


  HourlyEvents_JULY_31 = [
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
    { :utc=>18, :local=>"11am", :event=>guild_help },
    { :utc=>19, :local=>"12pm", :event=>spin },
    { :utc=>20, :local=>"1pm", :event=>spin },
    { :utc=>21, :local=>"2pm", :event=>monster_hunt },
    { :utc=>22, :local=>"3pm", :event=>guild_rss_help },
    { :utc=>23, :local=>"4pm", :event=>unknown },

    { :utc=>0, :local=>"5pm", :event=>vip_quests },
    { :utc=>1, :local=>"6pm", :event=>unknown },
    { :utc=>2, :local=>"7pm", :event=>unknown },
    { :utc=>3, :local=>"8pm", :event=>guild_quests },
    { :utc=>4, :local=>"9pm", :event=>guild_defend },
    { :utc=>5, :local=>"10pm", :event=>secret },
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

DaysToInspect = 14

# Input: [ "Gather RSS", "", "", "", "", "Hero Quests", "", "Gather RSS", "", "", "", "Gather RSS", "" ]
# Output: { "Gather RSS"=>7, "Hero Quests"=>1 }
def count_events(hour_across_days)
  day_range = ( (hour_across_days.length - DaysToInspect - 1)..(hour_across_days.length - 1) )
  event_counts = { }
  day_range.each do |day_index|
    event = hour_across_days[day_index]
    next if event == ""
    if ! event_counts.has_key? event
        event_counts[event] = 0
    end
    event_counts[event] = event_counts[event] + 1
  end
  return event_counts
end

def sort_counts(event_counts) 
  sorted = []
  sorted_counts = event_counts.to_a.sort { |x,y| y[1] <=> x[1] }
  sorted_counts.each do |event_info| 
    sorted.push({ :event => event_info[0], :count => event_info[1] })
  end
  return sorted
end

# Input: { "Gather RSS"=>7, "Hero Quests"=>1 }
# Output: { "Gather RSS"=>{count:7, probability:high }, "Hero Quests"=>{count:1, probability:low } }
def score_counts(event_counts)

  total_observations = 0
  event_counts.keys.each do |event_name|
    total_observations = total_observations + event_counts[event_name]
  end
  
  scored = {}
  event_counts.keys.each do |event_name|

    is_unique = false
    if event_counts.keys.length == 1
      is_unique = true
    end

    event_count = event_counts[event_name]
    repetition_factor = 0.1
    if event_count > 10
      repetition_factor = 0.9
    elsif event_count > 5
      repetition_factor = 0.6
    elsif event_count > 2
      repetition_factor = 0.3
    end

    obserability_factor = 0.1
    if total_observations > 10
      obserability_factor = 0.9
    elsif total_observations > 5
      obserability_factor = 0.6
    elsif total_observations > 2
      obserability_factor = 0.3
    end

    probability_factor = repetition_factor * obserability_factor
    probability = "low"
    if probability_factor > 0.7
      probability = "high"
    elsif probability_factor > 0.3
      probability = "medium"
    end

    if is_unique && probability == "medium"
      probability = "high"
    elsif is_unique && probability == "low"
      probability = "medium"
    end

    scored[event_name] = {
        count: event_counts[event_name],
        probability: probability,
        repetition_factor: repetition_factor,
        obserability_factor: obserability_factor,
        probability_factor: probability_factor,
        is_unique: is_unique,
    }
  end

  return scored
  # scored = []
  # counts.each do |
  # return counts
end

def summarize(scored_counts)
  summary = ""
  scored_counts.keys.each do |event_name|
    if summary.length > 0
      summary += "or "
    end
    summary += event_name + " (" + scored_counts[event_name][:probability] + ") "
  end
#  puts summary
  return summary
end

MiniEvents::HourlyEvents_DATA_ENTRY.each do |hour_array| 
  #hour_array = MiniEvents::HourlyEvents_DATA_ENTRY[20]

  #p hour_array[:events]
  event_counts = count_events(hour_array[:events])
  #p event_counts
  #sorted_counts = sort_counts(event_counts)
  scored_counts = score_counts(event_counts)
  #puts scored_counts
  summary = summarize(scored_counts)
  #puts hour_array[:utc].to_s + " " + hour_array[:local].to_s + " " + scored_counts.to_s

  puts hour_array[:utc].to_s + " " + hour_array[:local].to_s + " " + summary
 
  # sorted_counts = event_counts.to_a.sort { |x,y| y[1] <=> x[1] }
  # puts hour_array[:utc].to_s + " " + hour_array[:local].to_s + " " + sorted_counts.to_s
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
