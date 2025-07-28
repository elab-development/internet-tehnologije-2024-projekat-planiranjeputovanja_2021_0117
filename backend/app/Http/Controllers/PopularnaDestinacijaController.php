<?php

namespace App\Http\Controllers;

use App\Models\PopularnaDestinacija;
use Illuminate\Http\Request;

class PopularnaDestinacijaController extends Controller
{
    public function index()
    {
        return PopularnaDestinacija::with('destinacija')->get();
    }

    public function store(Request $request)
    {
        $request->validate([
            'destinacija_id' => 'required|exists:destinacija,id',
            'broj_posetilaca' => 'required|integer',
            'prosecna_ocena' => 'required|numeric',
        ]);

        $popularna = PopularnaDestinacija::create($request->all());
        $popularna->load('destinacija'); // učitavanje relacije odmah

        return response()->json(['message' => 'Uspešno dodato', 'data' => $popularna], 201);
    }

    public function destroy($id)
    {
        $dest = PopularnaDestinacija::find($id);
        if (!$dest) {
            return response()->json(['message' => 'Nije pronađena destinacija'], 404);
        }

        try {
            $dest->delete();
            return response()->json(['message' => 'Uspešno obrisano']);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Greška pri brisanju',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
