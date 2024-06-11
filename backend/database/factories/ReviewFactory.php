<?php

namespace Database\Factories;

use App\Models\User;
use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Review>
 */
class ReviewFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $product_ids = Product::all()->pluck('id')->all();
        $user_ids = User::all()->pluck('id')->all();
        return [
            'product_id' => fake()->randomElement($product_ids),
            'user_id' => fake()->randomElement($user_ids),
            'content' => fake()->words(rand(5, 15), true)
        ];
    }
}
