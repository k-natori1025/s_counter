class AddPasswordToStores < ActiveRecord::Migration[7.0]
  def change
    add_column :stores, :password, :string
    add_column :stores, :password_digest, :string
  end
end
