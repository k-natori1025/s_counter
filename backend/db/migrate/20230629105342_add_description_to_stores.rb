class AddDescriptionToStores < ActiveRecord::Migration[7.0]
  def change
    add_column :stores, :description, :text
  end
end
