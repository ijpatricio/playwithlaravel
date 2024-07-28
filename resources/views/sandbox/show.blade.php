@extends('layouts.app')


@section('content')
    @vite(['resources/sass/app.scss', 'resources/js/app.js'])

    <div class="bg-blue-200">
        {{ $sandbox->ulid }}
    </div>

    <div>

    </div>

@endsection
