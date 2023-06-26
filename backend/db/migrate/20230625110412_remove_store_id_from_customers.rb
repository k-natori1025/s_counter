class RemoveStoreIdFromCustomers < ActiveRecord::Migration[7.0]
  def change
    remove_column :customers, :store_id, :integer
  end
end
