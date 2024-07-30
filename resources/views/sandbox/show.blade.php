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
        <div class="w-1/2">
            @livewire(\App\Livewire\Sandbox::class)
        </div>

        <div class="w-1/2">
            <div class="flex">
                <span class="p-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-refresh-ccw"><path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/><path d="M16 16h5v5"/></svg>
                </span>
                <input type="text" id="address" class="flex-grow border-2 rounded p-1" value="/php-wasm/cgi-bin/{{ $sandbox->ulid }}" />
            </div>
            <iframe src="/php-wasm/cgi-bin/{{ $sandbox->ulid }}" class="w-full h-full"></iframe>
        </div>
    </div>
@endsection
