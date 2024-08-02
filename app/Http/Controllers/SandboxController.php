<?php

namespace App\Http\Controllers;

use App\Models\Sandbox;

class SandboxController extends Controller
{
    public function show($sandbox)
    {
        dd($sandbox);
        $sandbox = Sandbox::whereUlid($sandbox)->firstOrFail();

        return view('sandbox.show', [
            'sandbox' => $sandbox,
        ]);
    }

    public function preview($sandbox)
    {
//        dd($sandbox);
        $sandbox = Sandbox::whereUlid(str($sandbox)->upper()->value())->firstOrFail();

        return view('sandbox.preview', [
            'sandbox' => $sandbox,
        ]);
    }
}
