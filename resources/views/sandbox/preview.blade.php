@extends('layouts.app')

@push('start-head-scripts')
    <script>
        window.PWL = {}
        window.PWL.serviceWorkerUrl = '{{ url('/cgi-worker.mjs') }}'
        window.PWL.sandboxSlug = '{{ $sandbox->slug }}'
    </script>
@endpush

@section('content')
    @vite(['resources/js/sandbox-preview/index.js'])
    <div class="flex justify-center items-center h-screen">
        <div id="message" class="text-lg">Starting sandbox...</div>
    </div>
    <script>
        window.addEventListener('install-status', event => {
            document.getElementById('message').innerHTML = event.detail;
        });
        window.addEventListener('install-complete', event => {
            document.getElementById('message').innerHTML = 'Sandbox installed! Starting...';
        });
    </script>
@endsection
