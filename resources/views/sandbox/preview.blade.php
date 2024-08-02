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
@endsection
