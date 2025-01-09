@extends('layouts.app')

@section('content')

    <style>
        @media(prefers-color-scheme: dark){ .bg-dots{background-image:url("data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1.22676 0C1.91374 0 2.45351 0.539773 2.45351 1.22676C2.45351 1.91374 1.91374 2.45351 1.22676 2.45351C0.539773 2.45351 0 1.91374 0 1.22676C0 0.539773 0.539773 0 1.22676 0Z' fill='rgba(200,200,255,0.15)'/%3E%3C/svg%3E");}}@media(prefers-color-scheme: light){.bg-dots{background-image:url("data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1.22676 0C1.91374 0 2.45351 0.539773 2.45351 1.22676C2.45351 1.91374 1.91374 2.45351 1.22676 2.45351C0.539773 2.45351 0 1.91374 0 1.22676C0 0.539773 0.539773 0 1.22676 0Z' fill='rgba(0,0,50,0.10)'/%3E%3C/svg%3E")}}
    </style>

    <div class="relative min-h-screen bg-gray-100 bg-center sm:flex sm:justify-center sm:items-center bg-dots dark:bg-gray-900 selection:bg-indigo-500 selection:text-white">

        @if (Route::has('login'))
            <div class="p-6 text-right sm:fixed sm:top-0 sm:right-0">
                @auth
                    <a href="{{ route('home') }}" class="font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-indigo-500">Home</a>
                @else
                    <a href="{{ route('login') }}" class="font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-indigo-500">Log in</a>

                    @if (Route::has('register'))
                        <a href="{{ route('register') }}" class="ml-4 font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-indigo-500">Register</a>
                    @endif
                @endauth
            </div>
        @endif

        <div class="p-6 mx-auto max-w-7xl lg:p-8">
            <div class="flex justify-center px-0 mt-16 sm:items-center sm:justify-between">
                <div class="text-sm text-center text-gray-500 dark:text-gray-400 sm:text-left">
                </div>
                <div class="ml-4 text-lg text-center text-gray-500 dark:text-gray-400 sm:text-right sm:ml-0">
                    <p class="text-2xl">
                        Playgrounds with PHP/Laravel
                    </p>
                    <p class="text-xl mt-8">
                        All
                        <span class="uppercase underline bg-indigo-400 rounded-lg text-white font-bold px-2 py-0.5 mx-1">
                            in browser
                        </span> thanks to WebAssembly
                    </p>
                    <p class="mt-8">
                        We're just getting started, so please be patient. :)
                        The first sandbox out in the wild is a full "laravel new installation" with a "Breeze Livewire/Volt App".
                    </p>
                    <p>
                        The editor is under construction. You could see it working here
                        <a class="cursor-pointer text-indigo-600 hover:text-indigo-700" href="https://www.youtube.com/watch?v=L-MAzsDm5d0" target="_blank">
                            Youtube video with a demo
                        </a>.
                    </p>
                    <p>
                        It's not finished yet, but it's well on the way!
                    </p>
{{--                    <p class="mt-8">--}}
{{--                        Check the sandbox running in your browser: <br>--}}
{{--                        <a class="cursor-pointer text-indigo-600 hover:text-indigo-700" href="https://laravel-breeze-livewire-volt.playwithlaravel.com" target="_blank">--}}
{{--                            https://laravel-breeze-livewire-volt.playwithlaravel.com--}}
{{--                        </a>--}}
{{--                    </p>--}}
                    @php
                        $sandboxes = \App\Models\Sandbox::get();
                    @endphp
                    <div>
                        <p class="mt-8">
                            Available sandboxes:
                        </p>
                        @foreach($sandboxes as $sandbox)
                            <p class="mt-2">
                                Sandbox:
                                <a
                                    class="cursor-pointer text-indigo-600 hover:text-indigo-700"
                                    href="{{ 'http://' . $sandbox->slug . '.' . config('app.domain') . ':8000' }}"
                                    target="_blank"
                                >
                                    {{ $sandbox->title }}
                                </a>
                            </p>
                        @endforeach
                    </div>
                    <p class="mt-8">
                        Now, we can also run PHP in a webpage: <br>
                        <a class="cursor-pointer text-indigo-600 hover:text-indigo-700" href="{{ route('wasm.counter')  }}" target="_blank">
                            Visit a PHP counter in a webapge
                        </a>
                    </p>
                    <p class="mt-8">
                        Check the repository: <br>
                        <a class="cursor-pointer text-indigo-600 hover:text-indigo-700" href="https://github.com/ijpatricio/playwithlaravel" target="_blank">
                            https://github.com/ijpatricio/playwithlaravel
                        </a>
                    </p>
                    <p class="mt-16">
                        PHP-WASM Apprentice <a href="https://github.com/ijpatricio" target="_blank" class="text-indigo-600 hover:text-indigo-700">Patricio</a>
                    </p>
                    <p class="mt-2">
                        PHP-WASM Master <a href="https://github.com/seanmorris" target="_blank" class="text-indigo-600 hover:text-indigo-700">Sean</a>
                    </p>
                </div>
            </div>

        </div>
    </div>
@endsection
