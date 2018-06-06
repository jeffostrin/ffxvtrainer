require 'test/unit'
require_relative 'fmt'

class TestFmt < Test::Unit::TestCase

  def test_simple
    assert_equal("in 0:6", Fmt.time(6 * 60).as_relative_time)
  end

end
