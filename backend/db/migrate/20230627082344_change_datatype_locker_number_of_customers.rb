class ChangeDatatypeLockerNumberOfCustomers < ActiveRecord::Migration[7.0]
  def change
    change_column :customers, :locker_number, :string
  end
end
