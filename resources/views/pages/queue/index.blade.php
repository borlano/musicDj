@extends('layouts.app')

@section('content')
    <section class="section">
        <div class="queue">
            <div class="container">
                <ul class="list-group" id="video-list">
                    @foreach($queues as $queue)
                        @include('blocks.queue.element')
                    @endforeach
                </ul>
                @include('blocks.forms.index')
                <div class="mt-5" id="ytplayer" data-default="5qap5aO4i9A">
                </div>
            </div>
        </div>
    </section>
@endsection
