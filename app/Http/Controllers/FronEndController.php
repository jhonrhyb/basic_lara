<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class FronEndController extends Controller
{
  public function register()
  {
    return view('pages.register');
  }

  public function forgotpassword()
  {
    return view('pages.forgotpassword');
  }
}
