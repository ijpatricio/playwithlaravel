@extends('layouts.app')

@push('start-head-scripts')
    <script>
        window.PWL = {}
        window.PWL.sandboxUlid = '{{ $sandbox->ulid }}'
    </script>

    @vite(['resources/js/sandbox-show.js'])
    <script src="https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.30.1/min/vs/loader.min.js"></script>

@endpush

@section('content')

    <div class="flex h-screen w-screen">
        <div class="w-1/2 bg-blue-200">
            <div class="container mx-auto p-4">
                <h1 class="text-2xl font-bold mb-4">Web-based Code Editor</h1>
                <div class="flex">
                    <!-- File tree -->
                    <div class="w-1/4 bg-white p-4 rounded-l shadow-md">
                        <h2 class="text-lg font-semibold mb-2">File Tree</h2>
                        <ul id="fileTree" class="text-sm"></ul>
                    </div>
                    <!-- Code editor -->
                    <div class="w-3/4 bg-white p-4 rounded-r shadow-md">
                        <div id="editor" style="height: 500px;"></div>
                    </div>
                </div>
            </div>
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
