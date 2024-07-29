@extends('layouts.app')

@push('start-head-scripts')
    <script>
        window.PWL = {}
        window.PWL.serviceWorkerUrl = '{{ url('/cgi-worker.mjs') }}'
        window.PWL.sandboxUlid = '{{ $sandbox->ulid }}'
    </script>
@endpush

@section('content')
    @vite(['resources/js/sandbox.js'])

    <div class="bg-blue-200">
        {{ $sandbox->ulid }}
    </div>

    <div>
        <a href="/php-wasm/cgi-bin/foo"> Go to service worker </a>
    </div>

@endsection
