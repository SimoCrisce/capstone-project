<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Product::create([
            'reservation_id' => 2,
            'name' => 'Treccia',
            'category' => 'bread',
            'weight' => 250,
            'price' => 1,
        ]);
        Product::create([
            'reservation_id' => 1,
            'name' => 'Schiacciata',
            'category' => 'bread',
            'weight' => 500,
            'price' => 1.80,
        ]);
        Product::create([
            'reservation_id' => 2,
            'name' => 'Trancio di pizza',
            'category' => 'snack',
            'price' => 1.80,
        ]);
        Product::create([
            'reservation_id' => 2,
            'name' => 'Fagottino al salame',
            'category' => 'snack',
            'price' => 1.80,
        ]);
        Product::create([
            'reservation_id' => 2,
            'name' => 'Panino con panelle',
            'category' => 'snack',
            'price' => 2,
        ]);
    }
}
