<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreUserRequest;
use App\Models\User;
use Illuminate\Http\Request;

class ProfileController extends Controller
{
    public function getUserProfile(User $user)
    {
        return $user;
    }

    public function updateUserProfile(User $user, StoreUserRequest $request)
    {
        // check new changes on user profile based on user request

        // get all request that will change user profile

        // store request

        //store
        // $user->username = $request->json('username');
        // $user->email = $request->json('email');
        // $user->save();
    }
}
