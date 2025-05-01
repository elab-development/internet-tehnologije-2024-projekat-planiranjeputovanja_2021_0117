<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\PlanPutovanja;
use App\Models\Znamenitost;
use App\Models\PlanZnamenitost;

class PlanZnamenitostSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Kreiranje veza između planova i znamenitosti
        PlanPutovanja::all()->each(function ($plan) {
            $znamenitosti = Znamenitost::inRandomOrder()->take(3)->pluck('id');
            foreach ($znamenitosti as $znamenitostId) {
                PlanZnamenitost::create([
                    'plan_putovanja_id' => $plan->id, // Veza sa planom
                    'znamenitost_id' => $znamenitostId, // Veza sa znamenitošću
                ]);
            }
        });
    }
}
