<?php

use App\Http\Controllers\LoginController;
use App\Http\Controllers\RegisterController;
use App\Http\Controllers\RoomController;
use App\Models\Room;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Symfony\Component\HttpFoundation\Response;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/room',[RoomController::class, 'store'])->middleware('auth:sanctum');
Route::get('/room',[RoomController::class, 'index'])->middleware('auth:sanctum');
Route::delete('/room/{id}',[RoomController::class, 'destroy'])->middleware('auth:sanctum');
Route::put('/room/{id}/update',[RoomController::class, 'update'])->middleware('auth:sanctum');
Route::post('/register',[RegisterController::class, 'index']);
Route::post('/login',[LoginController::class, 'index']);
Route::post('/logout',[LoginController::class, 'logout'])->middleware('auth:sanctum');
Route::get('/tes', function(){
    $user = Room::query()->with('user');
    $users = $user->where('id',25)->get();
    $response = [
        'message' => 'list rooms',
        'data' => $users
    ];
    return response()->json($response, Response::HTTP_OK);
});

Route::post('/kirim',function(Request $request){
    $user = new User();
    $user->name = $request->name;
    $user->email = $request->email;
    $user->password = $request->password;
    $user->save();
    return response()->json([
        'data' => $user
    ]);
});