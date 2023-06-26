class RemoveStoreIdFromEvents < ActiveRecord::Migration[7.0]
  def change
    remove_column :events, :store_id, :integer
  end
end
