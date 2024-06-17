<?php

namespace Database\Factories;

use App\Models\Reservation;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->randomElement(['Pane', 'Pizza', 'Calzone', 'Fagottino', 'Arancino']),
            'category' => fake()->words(1, true),
            'weight' => rand(500, 1500),
            'price' => rand(1, 10),
        ];
    }
}
