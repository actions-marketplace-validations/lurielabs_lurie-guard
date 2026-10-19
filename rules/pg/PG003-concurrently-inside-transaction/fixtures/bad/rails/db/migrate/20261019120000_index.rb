class AddIndex < ActiveRecord::Migration[7.1]
  def change
    add_index :orders, :created_at, algorithm: :concurrently # expect: PG003
  end
end
