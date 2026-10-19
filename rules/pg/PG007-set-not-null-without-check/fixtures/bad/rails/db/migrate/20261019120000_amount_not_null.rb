class AmountNotNull < ActiveRecord::Migration[7.1]
  def change
    change_column_null :orders, :amount, false # expect: PG007
  end
end
