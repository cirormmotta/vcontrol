<?php

namespace Database\Seeders;

use App\Configs\UserTypeConfig;
use App\Models\Residence;
use App\Models\UserType;
use Illuminate\Database\Seeder;

class ResidenceSeed extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        if (count(Residence::all()) > 0)
            return;
        $apartmentsBlock = [
            '1A',
            '1B',
            '2A',
            '2B',
            '3A',
            '3B',
            '4A',
            '4B',
            '5A',
            '5B',
            '6A',
        ];
        foreach ($apartmentsBlock as $key => $value) {
            for ($i = 100; $i < 404; $i = $i + 100) {
                for ($j = 1; $j <= 4; $j++) {
                    Residence::create([
                        "name" => $value . ' - ' . $i + $j,
                    ]);
                }
            }
        }
    }
}
