<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{

    /**
     * Auto generated seed file
     *
     * @return void
     */
    public function run()
    {
        

        \DB::table('users')->delete();
        
        \DB::table('users')->insert(array (
            0 => 
            array (
                'id' => 1,
                'username' => 'admin',
                'email' => 'admin@email.com',
                'email_verified_at' => NULL,
                'password' => '$2y$10$4z/k9pAMMB9.6vnnH0mMuOBJwqCftnK/WjOGahq7V07wtVDDyQRU6', //admin
                'user_type' => 'admin',
                'status' => 1,
                'remember_token' => NULL,
                'created_at' => '2021-05-20 12:53:11',
                'updated_at' => '2021-05-20 12:53:11',
            ),
        ));
        
        
    }
}