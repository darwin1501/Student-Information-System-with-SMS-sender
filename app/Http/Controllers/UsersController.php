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

    // public function createUser(StoreUserRequest $request){
    //     $username = $request->json('username');
    //     $email = $request->json('email');
    //     $password = $request->json('password');
    //     // check username if already exists
    //     // $usernameDuplicate = User::select('username')
    //     //             ->where('username', $username);
    //     // // count existing username
    //     // return $usernameDuplicate->count();

    //     // handle duplicate email error
    //     try{
    //         // store to database
    //         // DB::table('users')->insert([
    //         //     'name' => $request->json('name'),
    //         //     'email' => $request->json('email'),
    //         //     'created_at' =>  \Carbon\Carbon::now()
    //         // ]);

    //     // save to database
    //         $user = new User;
    //         $user->username = $username;
    //         $user->email = $email;
    //         $user->password = Hash::make($password);
    //         $user->user_type = 'user';
    //         $user->status = 1;
    //         $user->save();

    //         return "stored successfully";
    //     }
    //     catch(QueryException $e){
    //         $errorCode = $e->errorInfo[1];
    //         // check email already exists
    //         // email has unique attributes
    //         // if($errorCode == 1062)
    //         // {
    //         //     return "usedEmail";
    //         // }
    //         return $errorCode;
    //     }
    // }

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

}
