class Store < ApplicationRecord
  has_secure_password

  validates :email, presence: true
  validates :email, uniqueness: true

  has_many :customers
  has_many :events
  has_many :posts
  
  mount_uploader :image, ImageUploader
end
