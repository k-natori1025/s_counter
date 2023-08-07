# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2023_08_07_033526) do
  create_table "customers", charset: "utf8mb3", collation: "utf8mb3_unicode_ci", force: :cascade do |t|
    t.integer "usage_time"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "locker_number"
    t.bigint "store_id"
    t.index ["store_id"], name: "index_customers_on_store_id"
  end

  create_table "events", charset: "utf8mb3", collation: "utf8mb3_unicode_ci", force: :cascade do |t|
    t.string "event_name"
    t.string "time"
    t.string "person"
    t.string "heat"
    t.text "description"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "store_id"
    t.index ["store_id"], name: "index_events_on_store_id"
  end

  create_table "posts", charset: "utf8mb3", collation: "utf8mb3_unicode_ci", force: :cascade do |t|
    t.string "content", null: false
    t.string "image"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "store_id"
    t.index ["store_id"], name: "index_posts_on_store_id"
  end

  create_table "stores", charset: "utf8mb3", collation: "utf8mb3_unicode_ci", force: :cascade do |t|
    t.string "store_name"
    t.string "address"
    t.string "phone_number"
    t.string "image"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "number_of_lockers"
    t.string "password"
    t.string "password_digest"
    t.text "description"
    t.string "email"
    t.string "capacity"
  end

  create_table "users", charset: "utf8mb3", collation: "utf8mb3_unicode_ci", force: :cascade do |t|
    t.string "email"
    t.string "password_digest"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "name"
  end

  add_foreign_key "customers", "stores"
  add_foreign_key "events", "stores"
  add_foreign_key "posts", "stores"
end
