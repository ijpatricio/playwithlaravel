@extends('layouts.app')

@push('start-head-scripts')
    <script>
        window.PWL = {}
        window.PWL.sandboxSlug = '{{ $sandbox->slug }}'
    </script>

    @vite(['resources/js/sandbox-show.js'])
@endpush

@section('content')

    <div class="flex h-screen w-screen">
        <div class="w-1/2">
            @livewire(\App\Livewire\Sandbox::class)
        </div>

        <div class="w-1/2 border rounded-lg">
            <div class="flex">
                <a
                    {{ route('sandbox.preview', [ 'sandbox' => $sandbox->slug , 'any' => '/']) }}
                    target="_blank"
                   class="p-2 border"
                >
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-external-link"><path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></svg>
                    </span>
                </a>
                <span class="p-2 border">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-refresh-ccw"><path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/><path d="M16 16h5v5"/></svg>
                </span>
                <input type="text" id="address" class="flex-grow border rounded-r p-1"
                       value="/playground/{{ $sandbox->slug }}" />
            </div>
            <iframe src="{{ route('sandbox.preview', [ 'sandbox' => $sandbox->slug , 'any' => '/']) }}" class="w-full h-full border"></iframe>
        </div>
    </div>
@endsection
