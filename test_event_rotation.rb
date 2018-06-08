require 'test/unit'
require_relative 'event_rotation'

class TestFmt < Test::Unit::TestCase

  def test_luna_events
    luna_events = EventRotation.new(
      :start_epoch => 2,
      :events => [
        { :name => "Luna Gifts", :duration => 1, },
        { :name => "", :duration => 3, },
      ])
    assert_equal("Luna Gifts", luna_events.lookup(2))
    assert_equal("Luna Gifts", luna_events.lookup(6))
    assert_equal("", luna_events.lookup(7))
    assert_equal("", luna_events.lookup(8))
    assert_equal("", luna_events.lookup(9))
    assert_equal("Luna Gifts", luna_events.lookup(10))
  end

end
