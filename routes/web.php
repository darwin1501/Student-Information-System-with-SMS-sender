<?php

use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\LogOutController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\StudentsController;
use App\Http\Controllers\UsersController;
use Illuminate\Support\Facades\Auth;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
// test route
// Route::get('/create', [UsersController::class, 'testCreate']);

Route::get('/', [LoginController::class, 'loginPage'])->name('loginPage');

// Route::get('/send', [MessageController::class, 'sendSMS']);

// Route::get('/create', [UsersController::class, 'createUser']);
Route::get('/profile/{user}', [ProfileController::class, 'getUserProfile']);
Route::post('/updateprofile/{user}', [ProfileController::class, 'updateUserProfile']);
Route::post('/updatepassword/{user}', [ProfileController::class, 'updatePassword']);

Route::get('/users', [UsersController::class, 'usersPage'])
->name('users')
->middleware(['auth', 'checkPermission']);
Route::get('/block/{user}', [UsersController::class, 'blockUser']);
Route::get('/unblock/{user}', [UsersController::class, 'unblockUser']);
Route::delete('/deleteuser/{user}', [UsersController::class, 'deleteUser']);
Route::get('/userlist', [UsersController::class, 'getAllUsers'])->middleware('checkStatus','checkPermission');
Route::post('/createuser', [UsersController::class, 'createUser']);
Route::get('/searchUser/{username}', [UsersController::class, 'searchUser']);

Route::get('/students', [StudentsController::class, 'getStudents'])->middleware(['auth', 'checkStatus'])
->name('students');

Route::post('/login', [LoginController::class, 'verifyUser'])->name('login');

Route::get('/logout', [LogOutController::class, 'logOut'])->name('logout');
