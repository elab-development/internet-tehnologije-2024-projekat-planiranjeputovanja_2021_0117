<?php

namespace Database\Factories;

use App\Models\Destinacija;
use App\Models\PopularnaDestinacija;
use Illuminate\Database\Eloquent\Factories\Factory;

class PopularnaDestinacijaFactory extends Factory
{
    protected $model = PopularnaDestinacija::class;

    public function definition()
    {
        return [
            'destinacija_id' => Destinacija::all()->random()->id, // Nasumično povezuje sa postojećom destinacijom
            'naziv' => $this->faker->word(),  // Nasumičan naziv popularne destinacije
            'opis' => $this->faker->paragraph(),  // Nasumičan opis
        ];
    }
}
