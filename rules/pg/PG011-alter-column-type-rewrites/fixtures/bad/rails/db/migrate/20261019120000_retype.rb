class Retype < ActiveRecord::Migration[7.1]
  def change
    change_column :orders, :account_id, :bigint # expect: PG011
  end
end
