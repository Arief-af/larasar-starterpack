<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function login(Request $request)
    {
    $request->validate([
        'username' => 'required',
        'password' => 'required',
    ]);
 
    $user = User::where('username', $request->username)->first();
 
    if (! $user || ! Hash::check($request->password, $user->password)) {
        throw ValidationException::withMessages([
            'message' => ['The provided credentials are incorrect.'],
        ]);
    }
 
    return response()->json([
        'token' => $user->createToken('browser')->plainTextToken,
        'user' => $user
    ]);
   }

   public function register(Request $request){
        $request->validate([
            'name' => ['required'],
            'username' => ['required','unique:users'],
            'email' => ['required','email','unique:users'],
            'password' => ['required','min:6','confirmed']
        ]);
        $user = User::create([
            'name' => $request->name,
            'username' => $request->username,
            'email' => $request->email,
            'password' =>Hash::make($request->password,)
            
        ]);
   }

   public function logout(Request $request)
   {
       $request->user()->currentAccessToken()->delete();
       response()->json(['message'=> 'logout success']);
   }
}
