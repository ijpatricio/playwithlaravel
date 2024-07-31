@extends('layouts.app')

@push('start-head-scripts')

    <script async type="text/javascript" src="https://cdn.jsdelivr.net/npm/php-wasm/php-tags.mjs"></script>

    @wasmScript('counter.php')

@endpush

@section('content')
    <div class="h-screen flex flex-col gap-2 space-y-12 items-center justify-center">
        <div>
            Thank you to Sean Morris for creating the
            <a
                class="cursor-pointer text-blue-500 hover:text-blue-700"
                target="_blank"
                href="https://github.com/seanmorris/php-wasm"
            >
                PHP-WASM
            </a> library, and teaching me all this new stuff.
        </div>

        <div class="flex items-center gap-4">
            <button
                class="my-2 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-lg px-2"
                id="decrement"
            >
                -
            </button>
            <span class="text-2xl" id="counter"></span>
            <button
                class="my-2 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-lg px-2"
                id="increment"
            >
                +
            </button>
        </div>


        <pre id="output"></pre>
        <pre id="error"></pre>
        </div>


    </div>
@endsection
