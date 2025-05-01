<?php

namespace Database\Factories;

use App\Models\PlanPutovanja;
use Illuminate\Database\Eloquent\Factories\Factory;

class PlanPutovanjaFactory extends Factory
{
    protected $model = PlanPutovanja::class;

    public function definition(): array
    {
        return [
            'user_id' => null, // Biće povezan preko Seeder-a
            'naziv' => $this->faker->sentence(3), // Nasumičan naziv plana
            'ukupni_troskovi' => $this->faker->randomFloat(2, 100, 1000), // Nasumični troškovi
            'broj_dana' => $this->faker->numberBetween(3, 15), // Broj dana
        ];
    }
}
