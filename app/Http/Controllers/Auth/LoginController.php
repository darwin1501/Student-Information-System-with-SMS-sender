<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
    public function loginPage()
    {
        return view('auth.login');
    }

    public function verifyUser(Request $request)
    {
        //sign in the user
        if (Auth::attempt($request->only('email', 'password'))){
             //success
            //redirect on inside the system
             return 'success'.auth()->user()->username;
         }else{
            //  failed
             return 'login failed';
         }
    }
}
