require 'test/unit'
require_relative 'fmt'

class TestFmt < Test::Unit::TestCase

  def test_past
    assert_equal("past", Fmt.time(-2 * 60 * 60).as_relative_time)
  end

  def test_this_hour
    assert_equal("now", Fmt.time(-6 * 60).as_relative_time)
  end

  def test_a_few_minutes
    assert_equal("in 0:6", Fmt.time(6 * 60).as_relative_time)
  end

  def test_next_hour
    assert_equal("in 1:00", Fmt.time(1 * 60 * 60).as_relative_time)
  end
end
