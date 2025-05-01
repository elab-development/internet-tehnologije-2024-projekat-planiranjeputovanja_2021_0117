<?php

namespace Database\Factories;

use App\Models\PlanPutovanja;
use App\Models\Znamenitost;
use App\Models\PlanZnamenitost;
use Illuminate\Database\Eloquent\Factories\Factory;

class PlanZnamenitostFactory extends Factory
{
    protected $model = PlanZnamenitost::class;

    public function definition(): array
    {
        return [
            'plan_putovanja_id' => PlanPutovanja::all()->random()->id, // Nasumičan plan iz baze
            'znamenitost_id' => Znamenitost::all()->random()->id,     // Nasumična znamenitost iz baze
        ];
    }
}
