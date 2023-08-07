class AddCapacityToStores < ActiveRecord::Migration[7.0]
  def change
    add_column :stores, :capacity, :string
  end
end
