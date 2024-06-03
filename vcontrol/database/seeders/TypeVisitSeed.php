<?php

namespace Database\Seeders;
use App\Configs\UserTypeConfig;
use App\Models\TypeVisit;
use App\Models\UserType;
use Illuminate\Database\Seeder;

class TypeVisitSeed extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        if (!TypeVisit::where("id", 1)->exists()) {
            TypeVisit::create([
                "id" => 1,
                "name" => "Apartamento",
            ]);
            TypeVisit::create([
                "id" => 2,
                "name" => "Salão de festas",
            ]);
            TypeVisit::create([
                "id" => 3,
                "name" => "Prestação de serviço",
            ]);
        }
    }
}
