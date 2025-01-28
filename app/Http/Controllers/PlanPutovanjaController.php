<?php

namespace App\Http\Controllers;

use App\Models\PlanPutovanja;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class PlanPutovanjaController extends Controller
{
    public function createPlan(Request $request)
    {
        // Validacija podataka
        $validator = Validator::make($request->all(), [
            'naziv' => 'required|string|max:255',  // Validacija naziva plana
            'ukupni_troskovi' => 'required|numeric|min:1',  // Validacija ukupnih troškova
            'broj_dana' => 'required|integer|min:1',  // Validacija broja dana
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        // Kreiranje plana putovanja i povezivanje sa korisnikom
        $plan = PlanPutovanja::create([
            'user_id' => $request->user()->id,  // Povezivanje sa trenutnim korisnikom
            'naziv' => $request->naziv,
            'ukupni_troskovi' => $request->ukupni_troskovi,
            'broj_dana' => $request->broj_dana,
        ]);

        return response()->json(['message' => 'Plan putovanja je uspešno kreiran!', 'plan' => $plan], 201);
    }

    public function getPlanDetails($id, Request $request)
    {
        // Pronaći plan putovanja prema ID-u i proveriti da li je korisnik vlasnik plana
        $plan = PlanPutovanja::where('id', $id)
                             ->where('user_id', $request->user()->id)  // Proverava da li je korisnik vlasnik plana
                             ->first();

        if (!$plan) {
            return response()->json(['message' => 'Plan putovanja nije pronađen ili nemate pravo da ga pregledate.'], 404);
        }

        return response()->json(['plan' => $plan], 200);
    }
}