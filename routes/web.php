<?php

use App\Http\Controllers\FronEndController;
use App\Http\Controllers\retrieveData;
use App\Http\Controllers\UserAcctController;
use App\Http\Controllers\UserMemberController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});
Route::redirect('/home', '/');
Route::get('/register', [FronEndController::class, 'register'])->name('register');
Route::get('/forgotpassword', [FronEndController::class, 'forgotpassword'])->name('forgotpassword');
Route::get('/login', [UserAcctController::class, 'loginUserAcct'])->name('loginUserAcct');
Route::post('/save', [UserAcctController::class, 'saveUserAcct'])->name('saveUserAcct');
Route::post('/saveMember', [UserMemberController::class, 'saveMember'])->name('save.Member');
Route::post('/uploadImg', [UserMemberController::class, 'storeImage'])->name('store.Image');
Route::post('/deleteMember', [UserMemberController::class, 'deleteMember'])->name('delete.Member');

// Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
