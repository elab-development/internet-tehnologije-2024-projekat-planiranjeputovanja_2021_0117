<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\PopularnaDestinacija;
use App\Models\Destinacija;

class DestinacijaController extends Controller
{
    public function getPopularDestinations()
    {
        $popularDestinations = PopularnaDestinacija::with('destinacija')->get();  // Povezivanje sa tabelom destinacija

        if ($popularDestinations->isEmpty()) {
            return response()->json(['message' => 'Nema popularnih destinacija.'], 404);
        }

        return response()->json(['popularne_destinacije' => $popularDestinations], 200);
    }

    public function getDestinacijaDetails($id)
    {
        // Pronalazak destinacije u bazi podataka prema ID-u
        $destinacija = Destinacija::with('znamenitosti')->find($id);

        if (!$destinacija) {
            // Ako destinacija nije pronađena, vraćamo odgovarajuću grešku
            return response()->json(['message' => 'Detalji o odabranoj destinaciji nisu dostupni.'], 404);
        }

        // Vraćanje detalja o destinaciji
        return response()->json([
            'id' => $destinacija->id,
            'naziv' => $destinacija->naziv,
            'opis' => $destinacija->opis,
            'znamenitosti' => $destinacija->znamenitosti,
            'prosecni_troskovi' => $destinacija->prosecni_troskovi,
        ], 200);
    }
}
