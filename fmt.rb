require_relative 'time_constants'

class Fmt
  def self.time(time_in_seconds)
    return TimeFmt.new(time_in_seconds)
  end
end

class TimeFmt
  attr_reader :time_in_seconds

  def initialize(time_in_seconds)
    @time_in_seconds = time_in_seconds
  end

  def as_local_hour_and_day
    hour = @time_in_seconds.strftime("%I") + ":00" + @time_in_seconds.strftime("%P")
    month_day = @time_in_seconds.strftime("%m-%d")
    return hour + " (" + month_day +")"
  end

  def as_relative_time
    return "past" if @time_in_seconds <= -(60*60)
    return "now" if @time_in_seconds <= 0
    return "in 0:#{(@time_in_seconds/60).truncate}" if @time_in_seconds < (60*60)

    #puts "ft = #{future_time}"
    days = humanify_days(@time_in_seconds)
    future_time = ( @time_in_seconds % SECONDS_IN_DAY )
    hours = (future_time / 60 / 60).truncate
    minutes = (future_time / 60 % 60).truncate
    minutes = minutes.to_s.rjust(2, "0")
    return "in #{days}#{hours}:#{minutes}"

  end


  def humanify_days(time_in_seconds)
    return "" if time_in_seconds < SECONDS_IN_DAY
    days = time_in_seconds / SECONDS_IN_DAY
    return "#{days}:"
  end
end
