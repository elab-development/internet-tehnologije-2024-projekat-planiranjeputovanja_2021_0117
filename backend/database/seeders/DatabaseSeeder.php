<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Pozivanje svih pojedinačnih Seeder-a
        $this->call([
            UserSeeder::class,
            DestinacijaSeeder::class,
            ZnamenitostSeeder::class,
            PlanPutovanjaSeeder::class,
            PlanZnamenitostSeeder::class,
        ]);
    }
}
