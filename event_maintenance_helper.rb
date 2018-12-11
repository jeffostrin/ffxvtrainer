
def score_weighted_historical_value(days_ago)
  if days_ago < 2
    return 1
  end
  return 1 / Math::log(days_ago)
end


def score_hepoch(events, days_ago)
  scores = {}
  events.each do |e|
    if scores[e].nil?
      scores[e] = 0
    end
    scores[e] += score_weighted_historical_value(days_ago)
  end
  return scores
end
