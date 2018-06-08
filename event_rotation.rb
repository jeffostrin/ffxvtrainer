require_relative 'assert'

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
end
