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
    #puts ">> " + @time_in_seconds.to_s
    hour = @time_in_seconds.strftime("%I") + ":00" + @time_in_seconds.strftime("%P")
    month_day = @time_in_seconds.strftime("%m-%d")
    return hour + " (" + month_day +")"
  end

  def as_relative_time
    #puts @time_in_seconds
    relative_time = @time_in_seconds
    return "past" if relative_time <= -(60*60)
    return "now" if relative_time <= 0

    days = humanify_days(relative_time)
    relative_time = relative_time % SECONDS_IN_DAY

    hours = humanify_hours(relative_time)
    relative_time = relative_time % SECONDS_IN_HOUR

    minutes = humanify_minutes(relative_time)
    return "in #{days}#{hours}#{minutes}"

  end


  # Private
  def humanify_days(time_in_seconds)
    return "" if time_in_seconds < SECONDS_IN_DAY
    days = time_in_seconds / SECONDS_IN_DAY
    return "#{days}:"
  end

  def humanify_hours(time_in_seconds)
    return "0:" if time_in_seconds < SECONDS_IN_HOUR
    hours = (time_in_seconds / SECONDS_IN_HOUR).truncate
    return "#{hours}:"
  end

  def humanify_minutes(time_in_seconds)
    #puts time_in_seconds
    return (time_in_seconds / 60).truncate.to_s.rjust(2, "0")
  end
end
