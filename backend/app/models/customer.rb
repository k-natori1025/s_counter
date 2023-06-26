class Customer < ApplicationRecord
  # validates :store_id, presence: true
  # validates :locker_number, presence: true
  # validates :usage_time, presence: true

  belongs_to :store
end
