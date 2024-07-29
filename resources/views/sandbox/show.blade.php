@extends('layouts.app')

@push('start-head-scripts')
    <script>
        window.PWL = {}
        window.PWL.sandboxUlid = '{{ $sandbox->ulid }}'
    </script>

    @vite(['resources/js/sandbox-show.js'])
@endpush

@section('content')

    <div class="flex h-screen w-screen">
        <div class="w-1/2 bg-blue-200">
            @livewire(\App\Livewire\Sandbox::class)
        </div>

        <div class="w-1/2 bg-red-200">
            <div class="flex gap-2">
                <button> Refresh</button>
                <input type="text" id="address" class="flex-grow" value="/php-wasm/cgi-bin/{{ $sandbox->ulid }}" />
            </div>
            <iframe src="/php-wasm/cgi-bin/{{ $sandbox->ulid }}" class="w-full h-full"></iframe>
        </div>
    </div>
@endsection
