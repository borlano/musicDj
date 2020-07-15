<?php

use App\Models\UserInfo;
use Illuminate\Database\Seeder;

class UsersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        \App\Models\User::create([
            'name' => 'Админ',
            'email' => 'admin@admin.ru',
            'password' => bcrypt('secret12345')
        ]);
    }
}
