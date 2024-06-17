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
            'name' => 'Treccia',
            'category' => 'bread',
            'weight' => 250,
            'price' => 1,
        ]);
        Product::create([
            'name' => 'Schiacciata',
            'category' => 'bread',
            'weight' => 500,
            'price' => 1.80,
        ]);
        Product::create([
            'name' => 'Trancio di pizza',
            'category' => 'snack',
            'price' => 1.80,
        ]);
        Product::create([
            'name' => 'Fagottino al salame',
            'category' => 'snack',
            'price' => 1.80,
        ]);
        Product::create([
            'name' => 'Panino con panelle',
            'category' => 'snack',
            'price' => 2,
        ]);
    }
}
