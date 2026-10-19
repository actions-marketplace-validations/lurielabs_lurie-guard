class AddIndex < ActiveRecord::Migration[7.1]
  disable_ddl_transaction!

  def change
    add_index :accounts, :email, unique: true, algorithm: :concurrently, if_not_exists: true # expect: PG016
  end
end
