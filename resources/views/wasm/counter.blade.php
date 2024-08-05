@extends('layouts.app')

@push('start-head-scripts')

    <script async type="text/javascript" src="https://cdn.jsdelivr.net/npm/php-wasm/php-tags.mjs"></script>

    @wasmScript('counter.php')

@endpush

@section('content')
    <div class="h-screen flex flex-col gap-2 space-y-12 items-center justify-center">

        <div class="mt-8">
            <a class="cursor-pointer text-indigo-600 hover:text-indigo-700" href="{{ route('home')  }}" target="_blank">
                Back home
            </a>
        </div>


        <div>
            <p>This is a simple counter that increments and decrements a counter every time you click the buttons.</p>
            <p>BUT, it's written in PHP, and running in the browser. Right-click, and check the page source.</p>
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
