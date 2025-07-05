<?php

namespace App\Http\Controllers;

use App\Models\PlanPutovanja;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Facades\Auth;
use App\Models\Znamenitost;
use App\Models\PlanZnamenitost;
use Illuminate\Support\Facades\DB;

class PlanPutovanjaController extends Controller
{
    public function createPlan(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'naziv' => 'required|string|max:255',
            'ukupni_troskovi' => 'required|numeric|min:1',
            'broj_dana' => 'required|integer|min:1',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        try {
            $plan = DB::transaction(function () use ($request) {
                return PlanPutovanja::create([
                    'user_id' => $request->user()->id,
                    'naziv' => $request->naziv,
                    'ukupni_troskovi' => $request->ukupni_troskovi,
                    'broj_dana' => $request->broj_dana,
                ]);
            });

            return response()->json(['message' => 'Plan putovanja je uspešno kreiran!', 'plan' => $plan], 201);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Greška pri kreiranju plana.', 'error' => $e->getMessage()], 500);
        }
    }

    public function getPlanDetails($id, Request $request)
    {
        $plan = PlanPutovanja::where('id', $id)
            ->where('user_id', $request->user()->id)
            ->first();

        if (!$plan) {
            return response()->json(['message' => 'Plan putovanja nije pronađen ili nemate pravo da ga pregledate.'], 404);
        }

        return response()->json(['plan' => $plan], 200);
    }

    public function updatePlan($id, Request $request)
    {
        $validator = Validator::make($request->all(), [
            'naziv' => 'required|string|max:255',
            'ukupni_troskovi' => 'required|numeric|min:1',
            'broj_dana' => 'required|integer|min:1',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        $plan = PlanPutovanja::where('id', $id)
            ->where('user_id', $request->user()->id)
            ->first();

        if (!$plan) {
            return response()->json(['message' => 'Plan putovanja nije pronađen ili nemate pravo da ga izmenite.'], 404);
        }

        $plan->update([
            'naziv' => $request->naziv,
            'ukupni_troskovi' => $request->ukupni_troskovi,
            'broj_dana' => $request->broj_dana,
        ]);

        return response()->json(['message' => 'Plan putovanja je uspešno izmenjen!', 'plan' => $plan], 200);
    }

    public function deletePlan($id, Request $request)
    {
        $plan = PlanPutovanja::where('id', $id)
            ->where('user_id', $request->user()->id)
            ->first();

        if (!$plan) {
            return response()->json(['message' => 'Plan putovanja nije pronađen ili nemate pravo da ga obrišete.'], 404);
        }

        $plan->delete();

        return response()->json(['message' => 'Plan putovanja je uspešno obrisan.'], 200);
    }

    public function sharePlan($id)
    {
        $plan = PlanPutovanja::findOrFail($id);

        if (!Auth::check() || $plan->user_id != Auth::id()) {
            return response()->json(['message' => 'Nemate pravo da delite ovaj plan.'], 403);
        }

        $pdf = PDF::loadView('pdf.plan', ['plan' => $plan]);

        return $pdf->download('plan-putovanja-' . $plan->naziv . '.pdf');
    }

    public function generatePlan(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'destinacija_id' => 'required|exists:destinacija,id',
            'broj_dana' => 'required|integer|min:1',
            'budzet' => 'required|numeric|min:1',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        $znamenitosti = Znamenitost::where('destinacija_id', $request->destinacija_id)
            ->where('cena_ulaznice', '<=', $request->budzet)
            ->take($request->broj_dana)
            ->get();

        if ($znamenitosti->isEmpty()) {
            return response()->json(['message' => 'Nije moguće generisati plan. Pokušajte sa drugačijim parametrima.'], 404);
        }

        try {
            $plan = DB::transaction(function () use ($request, $znamenitosti) {
                $plan = PlanPutovanja::create([
                    'user_id' => $request->user()->id,
                    'naziv' => 'Plan putovanja za ' . $znamenitosti->first()->destinacija->naziv,
                    'ukupni_troskovi' => $request->budzet,
                    'broj_dana' => $request->broj_dana,
                ]);

                foreach ($znamenitosti as $znamenitost) {
                    PlanZnamenitost::create([
                        'plan_putovanja_id' => $plan->id,
                        'znamenitost_id' => $znamenitost->id,
                    ]);
                }

                return $plan;
            });

            return response()->json(['message' => 'Plan putovanja uspešno generisan!', 'plan' => $plan], 201);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Greška prilikom generisanja plana.', 'error' => $e->getMessage()], 500);
        }
    }
}
