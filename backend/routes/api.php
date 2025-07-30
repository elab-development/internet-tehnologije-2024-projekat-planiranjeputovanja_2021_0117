<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\DestinacijaController;
use App\Http\Controllers\PlanPutovanjaController;
use App\Http\Controllers\ZnamenitostController;
use App\Http\Controllers\WeatherController;
use App\Http\Controllers\PopularnaDestinacijaController;
use App\Http\Middleware\CheckUloga; // ← OBAVEZNO
use App\Models\Znamenitost;

// Register i Login
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::middleware('auth:sanctum')->post('/user/logout', [AuthController::class, 'logout']);

// Nalog update i delete
Route::middleware('auth:sanctum')->get('/user', fn (Request $request) => $request->user());
Route::middleware('auth:sanctum')->put('/user/update', [AuthController::class, 'updateProfile']);
Route::middleware('auth:sanctum')->delete('/user/delete', [AuthController::class, 'deleteAccount']);

// Planovi
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user/plans', [AuthController::class, 'getUserPlans']);
    Route::post('/user/plans', [PlanPutovanjaController::class, 'createPlan']);
    Route::post('/user/plans/generate', [PlanPutovanjaController::class, 'generatePlan']);
    Route::get('/user/plans/{id}', [PlanPutovanjaController::class, 'getPlanDetails']);
    Route::put('/user/plans/{id}', [PlanPutovanjaController::class, 'updatePlan']);
    Route::delete('/user/plans/{id}', [PlanPutovanjaController::class, 'deletePlan']);
    Route::get('/user/plans/{id}/share', [PlanPutovanjaController::class, 'sharePlan']);
});

// Destinacije
Route::get('/destinacije', [DestinacijaController::class, 'getAllDestinacije']);
Route::get('/destinacija/{id}', [DestinacijaController::class, 'getDestinacijaDetails']);

//Znamenitost


// BEZ uloge:
Route::middleware(['auth:sanctum', 'check.uloga'])->group(function () {
    Route::post('/admin/destinacije', [DestinacijaController::class, 'store']);
    Route::post('/admin/znamenitosti', [ZnamenitostController::class, 'store']);
});

// Popularne destinacije i vreme
Route::get('/popularne-destinacije', [DestinacijaController::class, 'getPopularDestinations']);
Route::get('/weather/{city}', [WeatherController::class, 'getWeather']);

Route::middleware(['auth:sanctum', CheckUloga::class])->prefix('admin')->group(function () {
    Route::apiResource('/popularne-destinacije', PopularnaDestinacijaController::class)->only(['store', 'destroy']);
});
