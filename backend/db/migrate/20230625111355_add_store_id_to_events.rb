class AddStoreIdToEvents < ActiveRecord::Migration[7.0]
  def change
    add_reference :events, :store, foreign_key: true
  end
end
