class AddLockernumberToCustomers < ActiveRecord::Migration[7.0]
  def change
    add_column :customers, :locker_number, :integer
  end
end
