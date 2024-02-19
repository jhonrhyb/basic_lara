<?php

namespace App\Http\Controllers;

use App\Models\member;
use Illuminate\Http\Request;

class UserMemberController extends Controller
{
  public function saveMember(Request $request)
  {
    $dataName = member::where('FullName', $request->name)->orWhere('Email', $request->email)->count();
    $dataEmail = member::where('Email', $request->email)->count();
    $data = member::where('FullName', $request->name)->first();
    if (($dataName == 0 || $request->job == 'edit') && $dataEmail == 0 || $request->name == $data->FullName) {
      member::getModel()->updateOrCreate(['FullName' => $request->name], ['FullName' => $request->name, 'Email' => $request->email, 'Mobile' => $request->contact]);
      $response = response()->json(['message' => 'Data inserted successfully', 'code' => 1]);
    } else {
      $response = response()->json(['message' => 'Data alreade exist']);
    }
    return $response;
  }

  public function deleteMember(Request $request)
  {
    member::getModel()->where('FullName', $request->name)->delete();
    return response()->json(['message' => 'Data deleted successfully']);
  }
}
