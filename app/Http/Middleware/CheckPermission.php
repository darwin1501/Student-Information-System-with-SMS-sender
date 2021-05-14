<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class CheckPermission
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        // check if the user is not admin
        if(auth()->user()->user_type !== 'admin'){
            abort(404, 'Page not found');
            // dd('abort');
        }else{
            return $next($request);
        }
        
    }
}
