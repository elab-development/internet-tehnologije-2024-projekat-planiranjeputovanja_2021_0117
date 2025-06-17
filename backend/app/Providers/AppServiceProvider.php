<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Route;
use Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Route::prefix('api')
        ->middleware('api')
        ->group(base_path('routes/api.php'));
    }

    public function mapApiRoutes()
{
    $this->mapApiRoutes();
    Route::middleware('auth:sanctum')  // Dodaj Sanctum middleware
         ->prefix('api')
         ->group(base_path('routes/api.php'));
}
}
