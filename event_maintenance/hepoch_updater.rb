
class Updater
  attr_reader :eventName
  attr_reader :json

  def initialize(eventName)
    @eventName = eventName
  end

  def to(json)
    @json = json
    return self
  end

  def at(hepoch)
    if ! @json.has_key? hepoch
      @json[hepoch] = []
    end
    @json[hepoch] << @eventName
  end
end

def add_event(eventName)
  return Updater.new(eventName)
end
