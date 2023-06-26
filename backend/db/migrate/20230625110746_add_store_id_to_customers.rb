class AddStoreIdToCustomers < ActiveRecord::Migration[7.0]
  def change
    add_reference :customers, :store, foreign_key: true
  end
end
