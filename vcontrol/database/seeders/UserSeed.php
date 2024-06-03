<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeed extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        if (!User::where("email", "cirormmotta@gmail.com")->exists()) {
            User::create([
                "name" => "Admin",
                "user_type_id" => 1,
                "email" => "cirormmotta@gmail.com",
                "password" => bcrypt("12341234"),
            ]);
        }
    }
}
