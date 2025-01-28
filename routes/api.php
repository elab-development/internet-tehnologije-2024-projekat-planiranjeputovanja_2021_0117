<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\DestinacijaController;
use App\Http\Controllers\PlanPutovanjaController;
use Illuminate\Http\Request;

//Register i Login
Route::post('/register', [AuthController::class, 'register']); //SK1
Route::post('/login', [AuthController::class, 'login']); //SK2

//Nalog update i delete
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::middleware('auth:sanctum')->put('/user/update', [AuthController::class, 'updateProfile']);
Route::middleware('auth:sanctum')->delete('/user/delete', [AuthController::class, 'deleteAccount']);

//Planovi putovanja
Route::middleware('auth:sanctum')->get('/user/plans', [AuthController::class, 'getUserPlans']);
Route::middleware('auth:sanctum')->post('/user/plans', [PlanPutovanjaController::class, 'createPlan']); //SK3
Route::middleware('auth:sanctum')->get('/user/plans/{id}', [PlanPutovanjaController::class, 'getPlanDetails']); //SK5
Route::middleware('auth:sanctum')->put('/user/plans/{id}', [PlanPutovanjaController::class, 'updatePlan']); //SK6
Route::middleware('auth:sanctum')->delete('/user/plans/{id}', [PlanPutovanjaController::class, 'deletePlan']); //SK10

//Popularne destinacije
Route::get('/popularne-destinacije', [DestinacijaController::class, 'getPopularDestinations']); //SK8
Route::get('/destinacija/{id}', [DestinacijaController::class, 'getDestinacijaDetails']); //SK9