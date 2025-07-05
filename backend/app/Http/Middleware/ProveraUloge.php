<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class ProveraUloge
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle($request, Closure $next, $uloga)
    {
        if (!$request->user() || $request->user()->prava !== $uloga) {
            return response()->json(['message' => 'Pristup zabranjen.'], 403);
        }
    
        return $next($request);
    }

}
