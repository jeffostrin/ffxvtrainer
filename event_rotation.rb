require_relative 'assert'

class Event
  attr_reader :name
  attr_reader :hour_epoch_start
  attr_reader :hour_epoch_end

  def initialize(params)
    @name = params[:name]
    assert(@name != nil, "Event.name is required")
    @hour_epoch_start = params[:hour_epoch_start]
    assert(@hour_epoch_start != nil, "Event.hour_epoch_start is required")
    @hour_epoch_end = params[:hour_epoch_end]
    assert(@hour_epoch_end != nil, "Event.hour_epoch_end is required")
  end
end

class EventRotation
  attr_reader :start_epoch
  attr_reader :events

  def initialize(params)
    @start_epoch = params[:start_epoch]
    assert(@start_epoch != nil, "EventRotation.start_epoch is required")

    @events = params[:events]
    assert(@events != nil, "EventRotation.events is required")

    @events.each do |event|
      assert(event[:name] != nil, "EventRotation.name is required on #{event}")
      assert(event[:duration] != nil, "EventRotation.duration is required on #{event}")
    end

    @cycle_time = 0
    @events.each do |event|
      @cycle_time = @cycle_time + event[:duration]
    end
  end

  def lookup(hour_epoch)
    hour_in_cycle = (hour_epoch - @start_epoch) % @cycle_time
    hour_finder = hour_in_cycle
    @events.each do |event|
      duration = event[:duration]
      if hour_finder < duration
        return event[:name]
      end
      hour_finder = hour_finder - duration
    end
    raise "Should never get here"
  end

  def create_schedule(params)
    schedule_start_epoch = params[:start_epoch]
    assert(schedule_start_epoch != nil, "EventRotation.create_schedule.start_epoch is required")
    number_of_hours = params[:number_of_hours]
    assert(number_of_hours != nil, "EventRotation.create_schedule.number_of_hours is required")

    result = []
    (0..(number_of_hours-1)).each do |hour|
      hour_epoch = schedule_start_epoch + hour
      event_name = lookup(hour_epoch)
      event = Event.new(:name => event_name, :hour_epoch_start => 0, :hour_epoch_end => 0)
      result << event
    end

    return result
  end

  def find_next(event_name)
    return EventFind.new(@events, event_name)
  end
end

class EventFind
  attr_reader :event_name
  attr_reader :events

  def initialize(events, event_name)
    @events = events
    @event_name = event_name
  end

  def after(epoch)
    event = find_event
    return 0

    # def next_from(epoch)
    #   next_rvr = rvr[:interval] - ( (current_epoch - rvr[:epoch]) % (rvr[:interval]) )
    #   return next_rvr
    #   return 0
    # end

  end

  # Private
  def find_event
    @events.each do |event|
      if event[:name] == @event_name
        return event
      end
    end
    raise "Could not find event #{@event_name}"
  end
end
