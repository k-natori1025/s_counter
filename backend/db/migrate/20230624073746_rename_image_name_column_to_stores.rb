class RenameImageNameColumnToStores < ActiveRecord::Migration[7.0]
  def change
    rename_column :stores, :image_name, :image
  end
end
