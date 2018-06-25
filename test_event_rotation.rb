require 'test/unit'
require_relative 'time_constants'
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
    assert_equal(0, luna_events.find_next("Luna Gifts").after(2 * SECONDS_IN_HOUR))

    assert_equal("Luna Gifts", luna_events.lookup(6))
    assert_equal(0, luna_events.find_next("Luna Gifts").after(6 * SECONDS_IN_HOUR))

    assert_equal("", luna_events.lookup(7))
    #assert_equal(3 * SECONDS_IN_HOUR, luna_events.find_next("Luna Gifts").after(7 * SECONDS_IN_HOUR))

    assert_equal("", luna_events.lookup(8))
    #assert_equal(2 * SECONDS_IN_HOUR, luna_events.find_next("Luna Gifts").after(8 * SECONDS_IN_HOUR))

    assert_equal("", luna_events.lookup(9))
    #assert_equal(1 * SECONDS_IN_HOUR, luna_events.find_next("Luna Gifts").after(9 * SECONDS_IN_HOUR))

    assert_equal("Luna Gifts", luna_events.lookup(10))
  end

  def test_lookup_using_luna_events
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

  def test_create_schedule_using_luna_events
    luna_events = EventRotation.new(
      :start_epoch => 2,
      :events => [
        { :name => "Luna Gifts", :duration => 1, },
        { :name => "", :duration => 3, },
      ])

    luna_schedule = luna_events.create_schedule(:start_epoch => 2, :number_of_hours => 8)
    assert_equal(8, luna_schedule.length)
    assert_equal("Luna Gifts", luna_schedule[0].name)
    assert_equal("", luna_schedule[1].name)
    assert_equal("", luna_schedule[2].name)
    assert_equal("", luna_schedule[3].name)
    assert_equal("Luna Gifts", luna_schedule[4].name)
    assert_equal("", luna_schedule[5].name)
    assert_equal("", luna_schedule[6].name)
    assert_equal("", luna_schedule[7].name)
  end
end
