<?php

namespace App\Http\Controllers;

use App\Models\Sandbox;

class SandboxController extends Controller
{
    public function show(Sandbox $sandbox)
    {
        return view('sandbox.show', [
            'sandbox' => $sandbox,
        ]);
    }

    public function preview(Sandbox $sandbox)
    {
        return view('sandbox.preview', [
            'sandbox' => $sandbox,
        ]);
    }
}
