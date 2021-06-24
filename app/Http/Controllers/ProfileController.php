<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Http\Requests\StoreUserRequest;


class ProfileController extends Controller
{
    public function getUserProfile(User $user)
    {
        return $user;
    }

    public function updateUserProfile(User $user, StoreUserRequest $request)
    {
        // loop each request and then save
        foreach($request->all() as $key => $value){
            $user->$key = $value;
            $user->save();
        }
    }

    public function updatePassword(User $user, Request $request)
    {
        $newPassword = $request->json('newPassword');
        $oldPassword = $request->json('oldPassword');
        // // check if password match
        if(Hash::check($oldPassword, $user->password)){
            $user->password = Hash::make($newPassword);
            $user->save();
            return 'passwordMatched';
        }else{
            return 'incorrectPassword';
        }

//         $hashedPassword = User::find(1)->password;
            // return $request->json('oldpassword');
            // return $userspassword = User::find(1)->password;
    }
}
