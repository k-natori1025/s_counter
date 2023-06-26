class RenameUsagetimeColumnToCustomers < ActiveRecord::Migration[7.0]
  def change
    rename_column :customers, :usagetime, :usage_time
  end
end
