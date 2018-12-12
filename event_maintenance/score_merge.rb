
def hash_lookup(hash, key, default)
  if (hash.has_key?(key))
    return hash[key]
  end
  return default
end

def merge_scores(set1, set2)
  merge = {}
  keys = set1.keys + set2.keys
  keys.each do |k|
    merge[k] = hash_lookup(set1, k, 0) + hash_lookup(set2, k, 0)
  end
  return merge
end
