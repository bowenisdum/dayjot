class AddVideoFileNameToEntry < ActiveRecord::Migration
  # Note: You can't use change, as User.update_all will fail in the down migration
  def up
    add_column :entries, :video_file_name, :string
    add_index :entries, :video_file_name, unique: true
  end

  def down
    remove_columns :entries, :video_file_name
    # remove_columns :users, :unconfirmed_email # Only if using reconfirmable
  end
end
