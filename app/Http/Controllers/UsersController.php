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

        $user->username = 'admin';
        $user->email = 'admin@email.com';
        $user->password = Hash::make('admin');
        $user->user_type = 'admin';
        $user->save();
    }
}
