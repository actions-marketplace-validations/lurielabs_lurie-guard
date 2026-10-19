class Drop < ActiveRecord::Migration[7.1]
  def change
    remove_column :orders, :legacy_note # expect: PG014
    drop_table :legacy_orders # expect: PG014
  end
end
