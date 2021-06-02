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
        // if (Hash::check('plain-text-password', $hashedPassword)) {
//     // The passwords match...
// }

        // $userpassword = $user::find(1)->password;
        // // check if password match
        if(Hash::check($request->json('oldpassword'), $user->password)){
            return 'password matched';
        }

//         $hashedPassword = User::find(1)->password;
            // return $request->json('oldpassword');
            // return $userspassword = User::find(1)->password;
    }
}
