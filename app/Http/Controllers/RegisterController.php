<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class RegisterController extends Controller
{
    public function index(Request $request)
    {
       $request->validate([
           'name' => ['required'],
           'username' => ['required','unique:users'],
           'email' => ['required','email','unique:users'],
           'password' => ['required','min:6','confirmed']
       ]);
       User::create([
           'name' => $request->name,
           'username' => $request->username,
           'email' => $request->email,
           'password' =>Hash::make($request->password,)
            
       ]);
    }
}
