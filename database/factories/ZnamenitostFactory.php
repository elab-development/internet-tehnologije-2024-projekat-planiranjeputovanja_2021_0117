<?php

namespace Database\Factories;

use App\Models\Znamenitost;
use Illuminate\Database\Eloquent\Factories\Factory;

class ZnamenitostFactory extends Factory
{
    protected $model = Znamenitost::class;

    public function definition(): array
    {
        return [
            'naziv' => $this->faker->word(), // Nasumičan naziv znamenitosti
            'opis' => $this->faker->paragraph(), // Kratki opis
            'cena_ulaznice' => $this->faker->randomFloat(2, 10, 100), // Cena ulaznice
            'destinacija_id' => null, // Biće postavljen preko seeda
        ];
    }
}
