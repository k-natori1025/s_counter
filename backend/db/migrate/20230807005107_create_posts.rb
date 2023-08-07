class CreatePosts < ActiveRecord::Migration[7.0]
  def change
    create_table :posts do |t|
      t.string :content, null: false
      t.string :image
      t.integer :store_id, null: false, foreign_key: true

      t.timestamps
    end
  end
end
