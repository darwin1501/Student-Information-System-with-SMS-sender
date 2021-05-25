<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use App\Http\Requests\StoreUserRequest;
use Illuminate\Database\QueryException;

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

    //validates the request using StoreUserRequest 
    public function createUser(StoreUserRequest $request){
        $username = $request->json('username');
        $email = $request->json('email');
        $password = $request->json('password');

        // save to database
        $user = new User;
        $user->username = $username;
        $user->email = $email;
        $user->password = Hash::make($password);
        $user->user_type = 'user';
        $user->status = 1;
        $user->save();

    }

    public function blockUser(User $user)
    {
        $user->status = 0;
        $user->save();
    }

    public function unblockUser(User $user)
    {
        $user->status = 1;
        $user->save();
    }

    public function deleteUser(User $user)
    {
        $user->delete();
        // return $user;
    }

}
