class AddSku < ActiveRecord::Migration[7.1]
  def change
    add_column :orders, :sku, :string, null: false # expect: PG006
  end
end
