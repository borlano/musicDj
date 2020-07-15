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
                <div class="mt-5" id="video" data-default="https://www.youtube.com/embed/5qap5aO4i9A?controls=1&autoplay=1">
                    <iframe width="100%" height="500" src="https://www.youtube.com/embed/5qap5aO4i9A?controls=1&autoplay=1"
                            frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                            allowfullscreen></iframe>
                </div>
            </div>
        </div>
    </section>
@endsection
