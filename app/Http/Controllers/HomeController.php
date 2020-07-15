<?php

namespace App\Http\Controllers;

use App\Http\Requests\QueueRequest;
use App\Models\Queue;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    public function setMusic(QueueRequest $request)
    {
        Queue::create([
            'link' => $request->get('link'),
            'ip' => $request->ip(),
        ]);

        return ['status' => true, 'message' => 'Добавлено'];
    }

    public function deleteMusic($music_id)
    {
        Queue::find($music_id)->delete();
    }

    public function queue(Request $request){
        $queues = Queue::all();

        if($request->ajax()){
            return $queues;
        }

        return view('pages.queue.index', compact('queues'));
    }
}
