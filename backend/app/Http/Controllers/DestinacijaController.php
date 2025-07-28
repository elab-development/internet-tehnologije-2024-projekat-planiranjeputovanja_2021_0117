<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\PopularnaDestinacija;
use App\Models\Destinacija;
use Illuminate\Support\Facades\Cache;



class DestinacijaController extends Controller
{
    public function getPopularDestinations()
    {
        // Keširaj rezultat na 10 minuta (600 sekundi)
        $popularneDestinacije = Cache::remember('popularne_destinacije', 600, function () {
            return PopularnaDestinacija::with('destinacija')->get();
        });

    
        return response()->json($popularneDestinacije);
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

    public function getAllDestinacije()
    {
        $destinacije = Destinacija::all();  // Dohvatanje svih destinacija iz baze
        Destinacija::with('znamenitosti')->get();


        return response()->json($destinacije);  // Vraćanje odgovora u JSON formatu
    }

    public function store(Request $request)
    {
        $request->validate([
            'naziv' => 'required|string|max:255',
            'drzava' => 'required|string|max:255',
            'opis' => 'nullable|string',
        ]);

        $destinacija = Destinacija::create([
            'naziv' => $request->naziv,
            'drzava' => $request->drzava,
            'opis' => $request->opis,
            'prosecni_troskovi' => 0  
        ]);

        return response()->json(['message' => 'Destinacija uspešno dodata', 'destinacija' => $destinacija], 201);
    }


    


}
