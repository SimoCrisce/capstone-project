<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Reservation>
 */
class ReservationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $user_ids = User::all()->pluck('id')->all();
        return [
            'user_id' => fake()->randomElement($user_ids),
            'date' => fake()->date(),
            'time' => fake()->time(),
            'description' => fake()->words(rand(5, 10), true)
        ];
    }
}
