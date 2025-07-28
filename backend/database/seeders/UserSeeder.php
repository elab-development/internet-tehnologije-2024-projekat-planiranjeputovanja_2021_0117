<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Kreiranje 10 nasumičnih korisnika sa factory
        User::factory()->count(10)->create();

        // Proveri da li admin korisnik već postoji
        if (!User::where('email', 'admin@example.com')->exists()) {
            User::create([
                'name' => 'Admin User',
                'email' => 'admin@example.com',
                'password' => Hash::make('password'),
                'prava_pristupa' => 'admin', 
            ]);
        }
    }
}
