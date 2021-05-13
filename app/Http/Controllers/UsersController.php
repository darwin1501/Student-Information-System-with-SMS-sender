<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UsersController extends Controller
{
    //
    public function createUser(){
        $user = new User;

        $user->username = 'user101';
        $user->email = 'user@email.com';
        $user->password = Hash::make('1234');
        $user->user_type = 'user';
        $user->save();
    }
}
