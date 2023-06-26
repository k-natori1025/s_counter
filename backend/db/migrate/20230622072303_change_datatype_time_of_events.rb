class ChangeDatatypeTimeOfEvents < ActiveRecord::Migration[7.0]
  def change
    change_column :events, :time, :string
  end
end
