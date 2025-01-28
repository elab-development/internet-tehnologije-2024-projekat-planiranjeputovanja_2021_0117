<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\DestinacijaController;
use Illuminate\Http\Request;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::middleware('auth:sanctum')->put('/user/update', [AuthController::class, 'updateProfile']);
Route::middleware('auth:sanctum')->delete('/user/delete', [AuthController::class, 'deleteAccount']);
Route::middleware('auth:sanctum')->get('/user/plans', [AuthController::class, 'getUserPlans']);

Route::get('/popularne-destinacije', [DestinacijaController::class, 'getPopularDestinations']);