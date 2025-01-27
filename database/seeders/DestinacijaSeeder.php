<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Destinacija;

class DestinacijaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Koristi factory da popuni destinacije
        Destinacija::factory()->count(5)->create();
    }
}
