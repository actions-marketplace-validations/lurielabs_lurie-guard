class Rename < ActiveRecord::Migration[7.1]
  def change
    rename_column :orders, :account_id, :customer_id # expect: PG013
    rename_table :orders, :customer_orders # expect: PG013
  end
end
