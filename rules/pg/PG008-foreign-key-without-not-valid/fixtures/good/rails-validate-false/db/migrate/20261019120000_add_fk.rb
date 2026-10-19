class AddFk < ActiveRecord::Migration[7.1]
  def change
    add_foreign_key :orders, :accounts, validate: false
  end
end
