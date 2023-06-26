# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

SAMPLE_USERS = [
  {
    name: 'Natori',
    email: 'natori@gmail.com',
    password: 'natori1025'
  },
  {
    name: 'Hasegawa',
    email: 'hasegawa@gmail.com',
    password: 'hasegawa0123'
  },
  {
    name: 'Kitamoto',
    email: 'kitamoto@gmail.com',
    password: 'kitamoto0421'
  }
]

SAMPLE_USERS.each do |user|
  User.create(user)
end