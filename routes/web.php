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

// login
Route::get('/', [LoginController::class, 'loginPage'])->name('loginPage');

// Route::get('/send', [MessageController::class, 'sendSMS']);

// Route::get('/create', [UsersController::class, 'createUser']);

// profiles
Route::get('/profile/{user}', [ProfileController::class, 'getUserProfile'])
->middleware('auth');
Route::post('/updateprofile/{user}', [ProfileController::class, 'updateUserProfile'])
->middleware('auth');
Route::post('/updatepassword/{user}', [ProfileController::class, 'updatePassword'])
->middleware('auth');

// admin only
Route::get('/users', [UsersController::class, 'usersPage'])
->name('users')
->middleware(['auth', 'checkPermission']);
Route::get('/block/{user}', [UsersController::class, 'blockUser'])
->middleware(['auth', 'checkPermission']);;
Route::get('/unblock/{user}', [UsersController::class, 'unblockUser'])
->middleware(['auth', 'checkPermission']);
Route::delete('/deleteuser/{user}', [UsersController::class, 'deleteUser'])
->middleware(['auth', 'checkPermission']);
Route::get('/userlist', [UsersController::class, 'getAllUsers'])
->middleware(['auth', 'checkPermission']);
Route::post('/createuser', [UsersController::class, 'createUser'])
->middleware(['auth', 'checkPermission']);
Route::get('/searchUser/{username}', [UsersController::class, 'searchUser'])
->middleware(['auth', 'checkPermission']);

// students
Route::get('/studentspage', [StudentsController::class, 'studentspage'])
->middleware(['auth', 'checkStatus'])
->name('students');
Route::post('/addstudent', [StudentsController::class, 'addStudent'])
->middleware(['auth', 'checkStatus']);
Route::get('/getstudents', [StudentsController::class, 'getStudents'])
->middleware(['auth', 'checkStatus']);
Route::get('/editstudent/{student}', [StudentsController::class, 'editStudent'])
->middleware(['auth', 'checkStatus']);
Route::post('/updatestudent/{student}', [StudentsController::class, 'updateStudent'])
->middleware(['auth', 'checkStatus']);
Route::delete('/deletestudent/{student}', [StudentsController::class, 'deleteStudent'])
->middleware(['auth', 'checkStatus']);
Route::get('/searchstudent/{studentsname}', [StudentsController::class, 'searchStudent'])
->middleware(['auth', 'checkStatus']);

// auth
Route::post('/login', [LoginController::class, 'verifyUser'])->name('login');
Route::get('/logout', [LogOutController::class, 'logOut'])->name('logout');
