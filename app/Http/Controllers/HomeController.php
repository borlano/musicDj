<?php

namespace App\Http\Controllers;

use App\Http\Requests\QueueRequest;
use App\Models\Queue;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    public function setMusic(QueueRequest $request)
    {
        $parsed_url = parse_url($request->get('link'));
        if(isset($parsed_url['query'])) {
            parse_str($parsed_url['query'], $query);
            if(isset($query['v'])) {
                Queue::create([
                    'link' => 'https://www.youtube.com/embed/' . $query['v'],
                    'ip' => $request->ip(),
                ]);
            }
        }

        return ['status' => true, 'message' => 'Добавлено'];
    }

    public function deleteMusic($music_id)
    {
        Queue::find($music_id)->delete();
    }

    public function queue(Request $request){
        $queues = Queue::all();

        if($request->ajax()){
            $html = '';
            foreach ($queues as $queue) {
                $html .= view('blocks.queue.element', compact('queue'))->render();
            }

            return $html;
        }

        return view('pages.queue.index', compact('queues'));
    }
}
