<?php

namespace Database\Seeders;
use App\Configs\UserTypeConfig;
use App\Models\UserType;
use Illuminate\Database\Seeder;

class UserTypeSeed extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        if (!UserType::where("id", 1)->exists()) {
            UserType::create([
                "id" => 1,
                "name" => "Admin",
                "abilities" => json_encode(array_keys(UserTypeConfig::ABILITIES))
            ]);
        }
    }
}
