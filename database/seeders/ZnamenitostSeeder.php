<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Destinacija;
use App\Models\Znamenitost;

class ZnamenitostSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Kreiranje znamenitosti za svaku destinaciju
        Destinacija::all()->each(function ($destinacija) {
            Znamenitost::factory()->count(3)->create([
                'destinacija_id' => $destinacija->id, // Veza sa destinacijom
            ]);
        });
    }
}
