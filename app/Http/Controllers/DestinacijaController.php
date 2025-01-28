<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\PopularnaDestinacija;

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
}
