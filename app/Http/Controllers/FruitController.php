<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class FruitController extends Controller
{
    public function __invoke()
    {
        // Pretend data came from some calculations/queriers, etc...
        $fruits = ['Apple', 'Banana', 'Orange', 'Mango', 'Pineapple', 'Grapes'];

        return view('wasm.fruit', ['fruits' => $fruits]);
    }
}
