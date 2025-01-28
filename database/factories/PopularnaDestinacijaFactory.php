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
            'destinacija_id' => Destinacija::all()->random()->id,  // Nasumično povezuje sa postojećom destinacijom
            'broj_posetilaca' => $this->faker->numberBetween(1000, 50000),  // Nasumičan broj posetilaca
            'prosecna_ocena' => $this->faker->randomFloat(2, 1, 5),  // Nasumična ocena između 1 i 5 sa dve decimale
        ];
    }
}
