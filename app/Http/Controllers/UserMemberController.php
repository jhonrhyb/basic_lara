<?php

namespace App\Http\Controllers;

use App\Models\member;
use Illuminate\Http\Request;

class UserMemberController extends Controller
{
    public function saveMember(Request $request)
    {
        member::getModel()->updateOrCreate(['FullName' => $request->name], ['FullName' => $request->name, 'Email' => $request->email, 'Mobile' => $request->contact]);
        return response()->json(['message' => 'Data inserted successfully']);
    }

    public function deleteMember(Request $request)
    {
        member::getModel()->where('FullName', $request->name)->delete();
        return response()->json(['message' => 'Data deleted successfully']);
    }
}
