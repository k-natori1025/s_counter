class Event < ApplicationRecord
  # validates :store_id, presence: true
  # validates :event_name, presence: true
  # validates :time, presence: true

  belongs_to :store
end
