class AddJson < ActiveRecord::Migration[7.1]
  def change
    add_column :orders, :details, :json # expect: PG020
  end
end
