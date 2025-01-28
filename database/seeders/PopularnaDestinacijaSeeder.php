<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\PopularnaDestinacija;
use App\Models\Destinacija;

class PopularnaDestinacijaSeeder extends Seeder
{
    public function run()
    {
        // Unos podataka za popularne destinacije
        PopularnaDestinacija::factory(10)->create();  // Dodaje 10 popularnih destinacija
    }
}
