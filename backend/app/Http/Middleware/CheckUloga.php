<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckUloga
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     * @param  string  $uloga
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function handle(Request $request, Closure $next, $uloga): Response
    {
        $user = $request->user();

        if (!$user || $user->prava_pristupa !== $uloga) {
            return response()->json([
                'message' => 'Zabranjen pristup – dozvoljeno samo za ' . $uloga . ' korisnike.'
            ], 403);
        }

        return $next($request);
    }
}
