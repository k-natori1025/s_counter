class AddAddressToStores < ActiveRecord::Migration[7.0]
  def change
    add_column :stores, :email, :string
  end
end
