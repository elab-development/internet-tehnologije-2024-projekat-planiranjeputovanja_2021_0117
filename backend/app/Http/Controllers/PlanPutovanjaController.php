<?php

namespace App\Http\Controllers;

use App\Models\PlanPutovanja;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Facades\Auth;
use App\Models\Destinacija;
use App\Models\Znamenitost;
use App\Models\PlanZnamenitost;

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

    public function updatePlan($id, Request $request)
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

        // Pronaći plan putovanja prema ID-u i proveriti da li je korisnik vlasnik plana
        $plan = PlanPutovanja::where('id', $id)
                             ->where('user_id', $request->user()->id)  // Proverava da li je korisnik vlasnik plana
                             ->first();

        if (!$plan) {
            return response()->json(['message' => 'Plan putovanja nije pronađen ili nemate pravo da ga izmenite.'], 404);
        }

        // Ažuriranje plana
        $plan->update([
            'naziv' => $request->naziv,
            'ukupni_troskovi' => $request->ukupni_troskovi,
            'broj_dana' => $request->broj_dana,
        ]);

        return response()->json(['message' => 'Plan putovanja je uspešno izmenjen!', 'plan' => $plan], 200);
    }

    public function deletePlan($id, Request $request)
    {
        // Pronaći plan putovanja prema ID-u i proveriti da li je korisnik vlasnik plana
        $plan = PlanPutovanja::where('id', $id)
                             ->where('user_id', $request->user()->id)  // Proverava da li je korisnik vlasnik plana
                             ->first();

        if (!$plan) {
            return response()->json(['message' => 'Plan putovanja nije pronađen ili nemate pravo da ga obrišete.'], 404);
        }

        // Brisanje plana
        $plan->delete();

        return response()->json(['message' => 'Plan putovanja je uspešno obrisan.'], 200);
    }

     // Metod za deljenje plana putovanja
     public function sharePlan($id)
     {
         // Prvo proveri da li korisnik ima pristup ovom planu
         $plan = PlanPutovanja::findOrFail($id);
 
        if (!Auth::check() || $plan->user_id != Auth::id()) {
            return response()->json(['message' => 'Nemate pravo da delite ovaj plan.'], 403);
        }

         // Generisanje PDF-a sa podacima o planu
         $pdf = PDF::loadView('pdf.plan', ['plan' => $plan]);
 
         // Vratiti PDF kao preuzimanje
         return $pdf->download('plan-putovanja-'.$plan->naziv.'.pdf');
     }

     public function generatePlan(Request $request)
    {
        // Validacija parametara
        $validator = Validator::make($request->all(), [
            'destinacija_id' => 'required|exists:destinacija,id',  // Destinacija mora biti validna
            'broj_dana' => 'required|integer|min:1',  // Broj dana
            'budzet' => 'required|numeric|min:1',  // Budžet
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        // Pretraga znamenitosti na osnovu parametara
        $znamenitosti = Znamenitost::where('destinacija_id', $request->destinacija_id)
            ->where('cena_ulaznice', '<=', $request->budzet)
            ->take($request->broj_dana)  // Ovdje se može dodati još logike za filtriranje
            ->get();

        if ($znamenitosti->isEmpty()) {
            return response()->json(['message' => 'Nije moguće generisati plan. Pokušajte sa drugačijim parametrima.'], 404);
        }

        // Kreiranje plana putovanja
        $plan = PlanPutovanja::create([
            'user_id' => $request->user()->id,
            'naziv' => 'Plan putovanja za ' . $znamenitosti->first()->destinacija->naziv,
            'ukupni_troskovi' => $request->budzet,
            'broj_dana' => $request->broj_dana,
        ]);

        // Povezivanje znamenitosti sa planom putovanja
        foreach ($znamenitosti as $znamenitost) {
            PlanZnamenitost::create([
                'plan_putovanja_id' => $plan->id,
                'znamenitost_id' => $znamenitost->id,
            ]);
        }

        return response()->json(['message' => 'Plan putovanja uspešno generisan!', 'plan' => $plan], 201);
    }

}