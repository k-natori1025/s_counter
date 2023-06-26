class AddNumberOfLockersToStores < ActiveRecord::Migration[7.0]
  def change
    add_column :stores, :number_of_lockers, :integer
  end
end
