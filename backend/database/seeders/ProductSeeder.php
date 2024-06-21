<?php

namespace Database\Seeders;

use App\Models\Product;
use App\Models\Reservation;
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

        $reservations = Reservation::all();
        $product_ids = Product::all()->pluck('id')->all();

        foreach($reservations as $reservation) {
            $reservation->products()->attach(fake()->randomElement($product_ids), ['amount' => rand(1, 100)]);
        }
    }
}
