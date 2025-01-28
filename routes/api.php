<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\DestinacijaController;
use App\Http\Controllers\PlanPutovanjaController;
use Illuminate\Http\Request;

//Register i Login
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

//Nalog update i delete
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::middleware('auth:sanctum')->put('/user/update', [AuthController::class, 'updateProfile']);
Route::middleware('auth:sanctum')->delete('/user/delete', [AuthController::class, 'deleteAccount']);

//Planovi putovanja
Route::middleware('auth:sanctum')->get('/user/plans', [AuthController::class, 'getUserPlans']);
Route::middleware('auth:sanctum')->post('/user/plans', [PlanPutovanjaController::class, 'createPlan']);
Route::middleware('auth:sanctum')->get('/user/plans/{id}', [PlanPutovanjaController::class, 'getPlanDetails']);

//Popularne destinacije
Route::get('/popularne-destinacije', [DestinacijaController::class, 'getPopularDestinations']);