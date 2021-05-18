<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UsersController extends Controller
{
    public function usersPage()
    {
        // redirect and set value for the header
        return view('web.users.users')->with([
            'header' => 'Users'
        ]);
    }

    public function getAllUsers()
    {
        $users = User::where('user_type', 'user')->latest()->paginate(4);
        return $users;
    }

    // public function createUser(){
    //     $user = new User;
    //     $user->username = 'user105';
    //     $user->email = 'user105@email.com';
    //     $user->password = Hash::make('1234');
    //     $user->user_type = 'user';
    //     $user->save();
    // }
}
