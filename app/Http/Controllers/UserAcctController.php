<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\userAcct;
use App\Models\member;

class UserAcctController extends Controller
{
    public function loginUserAcct(Request $request)
    {
        $userInfo = userAcct::where('UserName', $request->username)->where('Password', $request->password)->first();
        $data = member::where('User', $request->username)->orderBy('created_at', 'desc')->get();
        return ($userInfo && ($request->username == $userInfo->UserName && $request->password == $userInfo->Password)) ? view('pages.dashboard', ['data' => $data, 'user' => $request]) : view('welcome', array('invalid' => 1, 'username' => $request->username));
    }

    public function saveUserAcct(Request $request)
    {
        $user = new userAcct;
        $user->UserName = $request->input('username');
        $user->Password = $request->input('password');
        $user->save();

        $tmp = array('alert' => '1');
        return view('welcome', $tmp);
    }
}
