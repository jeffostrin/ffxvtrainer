class Fmt
  def self.time(epoch_in_seconds)
    return TimeFmt.new(epoch_in_seconds)
  end
end

class TimeFmt
  attr_reader :epoch_in_seconds

  def initialize(epoch_in_seconds)
    @epoch_in_seconds = epoch_in_seconds
  end

  def as_local_hour_and_day
    hour = @epoch_in_seconds.strftime("%I") + ":00" + @epoch_in_seconds.strftime("%P")
    month_day = @epoch_in_seconds.strftime("%m-%d")
    return hour + " (" + month_day +")"
  end
end
