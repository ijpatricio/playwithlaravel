<?php

namespace App\Http\Controllers;

use App\Models\Sandbox;
use Illuminate\Http\Request;

class SandboxPreviewController extends Controller
{
    public function show(Sandbox $sandbox)
    {
        return view('sandbox.preview', [
            'sandbox' => $sandbox,
        ]);
    }
}
