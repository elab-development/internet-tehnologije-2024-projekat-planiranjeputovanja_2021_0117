<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Kreiranje 10 nasumičnih korisnika
        User::factory()->count(10)->create();

        // Proveri da li administrator već postoji pre kreiranja
        if (!User::where('email', 'admin@example.com')->exists()) {
            User::create([
                'name' => 'Admin User',
                'email' => 'admin@example.com',
                'password' => bcrypt('password'), // Lozinka: "password"
                'uloga' => 'administrator',
            ]);
        }
    }
}
