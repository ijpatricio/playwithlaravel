@extends('layouts.app')

@push('start-head-scripts')
    <script>
        window.PWL = {}
        window.PWL.serviceWorkerUrl = '{{ url('/cgi-worker.mjs') }}'
        window.PWL.sandboxUlid = '{{ $sandbox->ulid }}'
    </script>
@endpush

@section('content')
    @vite(['resources/js/sandbox-preview.js'])
@endsection
