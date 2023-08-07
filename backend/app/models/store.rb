class Store < ApplicationRecord
  has_secure_password

  validates :phone_number, presence: true
  validates :phone_number, uniqueness: true

  has_many :customers
  has_many :events
  has_many :posts
  
  mount_uploader :image, ImageUploader
end
