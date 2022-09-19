<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TaskController extends Controller
{
    public function index(){
        $tasks = Task::query()->with('user');
        $data = $tasks->latest()->where('user_id', Auth::user()->id)->get();
        return response()->json([
            'data' => $data
        ]);
    }

    public function status($id){
        $task = Task::find($id);
        $task->status = !$task->status;
        $task->save();
    }

    public function store(Request $request){
        $task = Task::create([
            'name' => $request->name,
            'user_id' => Auth::user()->id,
            'status' => false,
            'date' => $request->date
        ]);
        return response()->json([
            'data' => $task,
            'message' => 'data successfully created'
        ]);
    }
}
