require 'test/unit'
require_relative 'fmt'

class TestFmt < Test::Unit::TestCase

  def test_past
    assert_equal("past", Fmt.time(-2 * SECONDS_IN_HOUR).as_relative_time)
  end

  def test_this_hour
    assert_equal("now", Fmt.time(-6 * SECONDS_IN_MINUTE).as_relative_time)
  end

  def test_a_few_minutes
    assert_equal("in 0:06", Fmt.time(6 * SECONDS_IN_MINUTE).as_relative_time)
  end

  def test_next_hour
    assert_equal("in 1:00", Fmt.time(1 * SECONDS_IN_HOUR).as_relative_time)
  end

  def test_hours_and_minutes
    assert_equal("in 1:05", Fmt.time(1 * SECONDS_IN_HOUR + 5 * SECONDS_IN_MINUTE).as_relative_time)
  end

  def test_hours_and_minutes_and_seconds
    assert_equal("in 1:05", Fmt.time(1 * SECONDS_IN_HOUR + 5 * SECONDS_IN_MINUTE + 33).as_relative_time)
  end

  def test_decimal
    assert_equal("in 1:05", Fmt.time(1 * SECONDS_IN_HOUR + 5 * SECONDS_IN_MINUTE + 33.333).as_relative_time)
  end
end
