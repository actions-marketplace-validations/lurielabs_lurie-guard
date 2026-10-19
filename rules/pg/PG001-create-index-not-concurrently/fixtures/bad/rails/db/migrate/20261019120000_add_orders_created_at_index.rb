class AddOrdersCreatedAtIndex < ActiveRecord::Migration[7.1]
  def change
    add_index :orders, :created_at # expect: PG001
  end
end
