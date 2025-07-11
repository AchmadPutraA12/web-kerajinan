<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class CekCategory
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, ...$Category)
    {
        $user = Auth::user();

        if (!$user || !in_array($user->category_id, $Category)) {
            abort(403, 'Akses ditolak: Anda tidak memiliki izin.');
        }

        return $next($request);
    }
}
