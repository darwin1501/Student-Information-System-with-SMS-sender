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

    public function verifyUser(Request $request){
        // return 'request success';
        $email = $request->json('email');
        $password = $request->json('password');

        return $email.' '.$password;
        
        //sign in the user
        // if (Auth::attempt($request->only('email', 'password')))
        //  {
        //      //success
        //     //redirect on dashboard
        //      return 'success';
        //  }else{
        //      return 'login failed';
        //  }
    }
}
