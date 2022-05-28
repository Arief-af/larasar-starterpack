<?php

namespace App\Http\Controllers;

use App\Events\RoomCreated;
use App\Events\RoomDeleted;
use Illuminate\Support\Str;
use App\Models\Room;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class RoomController extends Controller
{
    public function index(){
        // $data = DB::table('rooms')
        // ->join('users', 'users.id', '=', 'rooms.user_id')
        // ->select('rooms.*', 'users.username')
        // ->get();

        $room = Room::query()->with('user');
        $data = $room->get();
        return response()->json([
            'data' => $data
        ]);
    }

    public function store(Request $request)
   {
    $request->validate([
        'name' => 'required'
    ]);
    $query = Room::query()->with('user');
    $data = $query->create([
        'user_id' => Auth::user()->id,
        'token' => Str::random(5),
        'name' => $request->name
    ]);
    
    $response = $query->find($data->id);
    RoomCreated::dispatch($response);
 
    return response()->json([
        'data' => $response
    ]);
   }

   public function update($id, Request $request)
   {
    
    $request->validate([
        'name' => 'required'
    ]);

    $data = Room::where('id',$id)
        ->update([
            'name' => $request->name
        ]);

    $data = Room::find($id);
 
    return response()->json([
        'data' => $data
    ]);
   }

   public function destroy($id){
       $query = Room::query()->with('user');
       $data = $query->find($id);
       RoomDeleted::dispatch($data);
       $data->delete();
       
       return response()->json([
            'msg' => "data berhasil dihapus",
            'data' => $data
        ]);
   }
}
