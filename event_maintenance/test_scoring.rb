require 'test/unit'
require_relative 'scoring'

class TestEventMaintenanceScoring < Test::Unit::TestCase
  def test_score_recent_hepoch
    events = [ "e1", "e2" ]
    days_ago = 1
    result = score_hepoch(events, days_ago)
    expected = { "e1" => 1, "e2" => 1 }
    assert_equal(expected, result)
  end

  def test_score_old_hepoch
    events = [ "e1", "e2" ]
    days_ago = 5
    result = score_hepoch(events, days_ago)
    expected = { "e1" => 1/Math::log(days_ago), "e2" => 1/Math::log(days_ago) }
    assert_equal(expected, result)
  end

  def test_score_multiple_observations
    events = [ "e1", "e2", "e1", "e1" ]
    days_ago = 1
    result = score_hepoch(events, days_ago)
    expected = { "e1" => 3, "e2" => 1 }
    assert_equal(expected, result)
  end

end
