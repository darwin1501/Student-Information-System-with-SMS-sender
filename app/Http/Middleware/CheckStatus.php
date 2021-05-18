<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CheckStatus
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
        // check if the user was block
        if(auth()->user()->status === 0){
            Auth::logout();
            return redirect()->route('loginPage');
        }else{
            return $next($request);
        }
        
    }
}
