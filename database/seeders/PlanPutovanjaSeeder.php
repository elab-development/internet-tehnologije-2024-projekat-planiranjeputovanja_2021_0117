<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\PlanPutovanja;

class PlanPutovanjaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Kreiranje planova putovanja za svakog korisnika
        User::all()->each(function ($user) {
            PlanPutovanja::factory()->count(2)->create([
                'user_id' => $user->id, // Veza sa korisnikom
            ]);
        });
    }
}
