<?php

namespace App\Http\Controllers;

use App\Models\Znamenitost;
use Illuminate\Http\Request;

class ZnamenitostController extends Controller
{
    // GET /znamenitosti
    public function index()
    {
        $znamenitosti = Znamenitost::all();
        return response()->json(['znamenitosti' => $znamenitosti], 200);
    }

    // POST /znamenitosti
    public function store(Request $request)
    {
        $request->validate([
            'naziv' => 'required|string|max:255',
            'opis' => 'nullable|string',
            'cena_ulaznice' => 'required|numeric',
            'destinacija_id' => 'required|integer|exists:destinacija,id',
        ]);

        $znamenitost = Znamenitost::create($request->all());

        return response()->json(['message' => 'Znamenitost kreirana', 'znamenitost' => $znamenitost], 201);
    }

    // GET /znamenitosti/{id}
    public function show($id)
    {
        $znamenitost = Znamenitost::find($id);
        if (!$znamenitost) {
            return response()->json(['message' => 'Nije pronađena'], 404);
        }

        return response()->json($znamenitost);
    }

    // PUT /znamenitosti/{id}
    public function update(Request $request, $id)
    {
        $znamenitost = Znamenitost::find($id);
        if (!$znamenitost) {
            return response()->json(['message' => 'Nije pronađena'], 404);
        }

        $znamenitost->update($request->all());

        return response()->json(['message' => 'Znamenitost izmenjena', 'znamenitost' => $znamenitost]);
    }

    // DELETE /znamenitosti/{id}
    public function destroy($id)
    {
        $znamenitost = Znamenitost::find($id);
        if (!$znamenitost) {
            return response()->json(['message' => 'Nije pronađena'], 404);
        }

        $znamenitost->delete();

        return response()->json(['message' => 'Znamenitost obrisana']);
    }
}
