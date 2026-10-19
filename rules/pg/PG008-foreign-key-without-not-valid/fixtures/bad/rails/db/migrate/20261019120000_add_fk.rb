class AddFk < ActiveRecord::Migration[7.1]
  def change
    add_foreign_key :orders, :accounts # expect: PG008
  end
end
