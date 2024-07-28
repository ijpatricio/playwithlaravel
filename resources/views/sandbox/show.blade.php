@extends('layouts.app')


@section('content')
    @vite(['resources/js/sandbox.js'])

    <div class="bg-blue-200">
        {{ $sandbox->ulid }}
    </div>

    <div>

    </div>

@endsection
