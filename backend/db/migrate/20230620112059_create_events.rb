class CreateEvents < ActiveRecord::Migration[7.0]
  def change
    create_table :events do |t|
      t.string :event_name
      t.time :time
      t.string :person
      t.string :heat
      t.text :description
      t.integer :store_id
      t.timestamps
    end
  end
end
