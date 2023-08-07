class AddStoreIdToPosts < ActiveRecord::Migration[7.0]
  def change
    add_reference :posts, :store, foreign_key: true
  end
end