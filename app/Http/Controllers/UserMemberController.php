<?php

namespace App\Http\Controllers;

use App\Models\member;
use Illuminate\Http\Request;

class UserMemberController extends Controller
{
  public function saveMember(Request $request)
  {
    $dataName = member::where('FullName', $request->name)->where('User', $request->user)->count();
    $dataEmail = member::where('Email', $request->email)->count();
    $data = member::where('FullName', $request->name)->where('User', $request->user)->first();
    if (($dataName == 0 || $request->job == 'edit') && (($dataEmail == 0 || $request->email == '') || ($request->name == ($data->FullName ?? 'none') && $request->email == $data->Email))) {
      member::getModel()->updateOrCreate(['FullName' => $request->name, 'User' => $request->user], ['FullName' => $request->name, 'Email' => $request->email, 'Mobile' => $request->contact, 'User' => $request->user]);
      $response = response()->json(['message' => 'Data inserted successfully', 'code' => 1]);
    } else {
      $response = response()->json(['message' => 'Data alreade exist']);
    }
    return $response;
  }
  
  public function storeImage(Request $request) {
    member::getModel()->updateOrCreate(['FullName' => $request->name, 'User' => $request->user], ['UserImage' => addslashes($request->image)]);
    return response()->json(['message' => 'Data inserted successfully']);
  }

  public function deleteMember(Request $request)
  {
    member::getModel()->where('FullName', $request->name)->delete();
    return response()->json(['message' => 'Data deleted successfully']);
  }
}
