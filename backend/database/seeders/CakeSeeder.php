<?php

namespace Database\Seeders;

use App\Models\Cake;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class CakeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Cake::create([
            'reservation_id' => 1,
            'text' => "Buon Compleanno Simone",
            'flavor' => "crema",
            'weight' => 1500,
            'img' => "immagine",
        ]);
    }
}
