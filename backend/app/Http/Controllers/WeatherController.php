<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class WeatherController extends Controller
{
    public function getWeather($city)
    {
        $apiKey = env('OPENWEATHER_API_KEY');
        Log::info("OPENWEATHER_API_KEY: $apiKey");

        $response = Http::get("https://api.openweathermap.org/data/2.5/weather", [
            'q' => $city,
            'appid' => $apiKey,
            'units' => 'metric',
            'lang' => 'sr'       
        ]);

        if ($response->failed()) {
            return response()->json(['message' => 'Greška prilikom dohvatanja vremena.'], 500);
        }
        Log::info($response->body());


        return response()->json($response->json());
    }
}
