<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        // Validacija unosa
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email',
            'password' => 'required|string|min:8|confirmed',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        // Kreiranje korisnika
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'uloga' => 'korisnik',  // Dodeljujemo vrednost za ulogu
        ]);
        

        // Uspešan odgovor sa podacima korisnika (osim lozinke)
        return response()->json(['user' => $user], 201);
    }

    public function login(Request $request)
    {
        // Validacija unosa
        $validator = Validator::make($request->all(), [
            'email' => 'required|string|email|max:255',
            'password' => 'required|string|min:8',
        ]);
    
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }
    
        // Proveri da li korisnik postoji
        $user = User::where('email', $request->email)->first();
    
        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }
    
        // Generiši token i vrati ga korisniku
        $token = $user->createToken('YourAppName')->plainTextToken;
    
        return response()->json([
            'user' => $user,
            'token' => $token
        ]);
    }

    public function updateProfile(Request $request)
    {
        $user = $request->user();  // Dobijamo trenutnog korisnika

        // Validacija podataka
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . $user->id,
            'password' => 'nullable|string|min:8|confirmed', // Lozinka je optional, ali ako je unesena, mora biti potvrđena
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        // Ažuriranje korisničkog imena i emaila
        $user->name = $request->name;
        $user->email = $request->email;

        // Ako je unesena nova lozinka, ažuriraj je
        if ($request->password) {
            $user->password = Hash::make($request->password);
        }
    
        $user->save();  // Spasi promene u bazi

        return response()->json(['message' => 'Profil je uspešno ažuriran!', 'user' => $user]);
    }

    public function deleteAccount(Request $request)
    {
        $user = $request->user();  // Dobijamo trenutnog korisnika

        // Obriši povezane podatke (ako je potrebno)
        // Na primer, obriši planove, znamenitosti, i druge povezane podatke
        // $user->plans()->delete();
        // $user->znamenitosti()->delete();
        // Možeš dodati dodatne slične odnose ako postoje

        // Zatvori session ako je korisnik trenutno ulogovan
        $user->tokens->each(function ($token) {
            $token->delete();
        });

        // Obriši korisnika iz baze
        $user->delete();

        // Vratiti uspešan odgovor
        return response()->json(['message' => 'Korisnički nalog je uspešno obrisan!']);
    }   

    public function getUserPlans(Request $request)
    {
        $user = $request->user();  // Dobijamo trenutnog korisnika

        // Pretpostavljamo da postoji veza između korisnika i planova putovanja
        // Na primer: $user->plans() <- odnosi se na relaciju između korisnika i planova

        $plans = $user->plans;  // Dobijamo sve planove korisnika

        if ($plans->isEmpty()) {
            return response()->json(['message' => 'Nemate nijedan plan putovanja.'], 404);
        }

        return response()->json(['plans' => $plans], 200);
    }   
}
