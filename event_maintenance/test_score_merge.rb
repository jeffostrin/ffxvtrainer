require 'test/unit'
require_relative 'score_merge'

class TestScoreMerge < Test::Unit::TestCase

  def test_simple_merge
    set1 = { "e1" => 1, "e2" => 1 }
    set2 = { "e1" => 1, "e2" => 2 }
    expected = { "e1" => 2, "e2" => 3 }
    result = merge_scores(set1, set2)
    assert_equal(expected, result)
  end

  def test_set1_has_more
    set1 = { "e1" => 1, "e2" => 1 }
    set2 = { "e1" => 1 }
    expected = { "e1" => 2, "e2" => 1 }
    result = merge_scores(set1, set2)
    assert_equal(expected, result)
  end

  def test_set2_has_more
    set1 = { "e1" => 1, "e2" => 1 }
    set2 = { "e2" => 2 }
    expected = { "e1" => 1, "e2" => 3 }
    result = merge_scores(set1, set2)
    assert_equal(expected, result)
  end

  def test_set2_has_new_keys
    set1 = { "e1" => 1 }
    set2 = { "e2" => 2 }
    expected = { "e1" => 1, "e2" => 2 }
    result = merge_scores(set1, set2)
    assert_equal(expected, result)
  end
end
