class RemoveStoreIdFromPosts < ActiveRecord::Migration[7.0]
  def change
    remove_column :posts, :store_id, :integer
  end
end
