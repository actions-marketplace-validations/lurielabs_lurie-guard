class AddDatetime < ActiveRecord::Migration[7.1]
  def change
    add_column :orders, :shipped_at, :datetime # expect: PG019
  end
end
