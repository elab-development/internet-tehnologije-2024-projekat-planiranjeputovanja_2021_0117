<?php

namespace Database\Factories;

use App\Models\Destinacija;
use Illuminate\Database\Eloquent\Factories\Factory;

class DestinacijaFactory extends Factory
{
    protected $model = Destinacija::class;

    public function definition(): array
    {
        return [
            'naziv' => $this->faker->city(), 
            'drzava' => $this->faker->country(), 
            'prosecni_troskovi' => $this->faker->randomFloat(2, 50, 300), 
            'opis' => $this->faker->paragraph(), 
        ];
    }
}
