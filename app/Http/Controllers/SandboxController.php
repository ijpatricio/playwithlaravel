<?php

namespace App\Http\Controllers;

use App\Models\Sandbox;

class SandboxController extends Controller
{
    public const SUBDOMAIN_SUFFIX = '-sandbox';

    public function show($sandbox)
    {
        return view('sandbox.show', [
            'sandbox' => $this->getSandbox($sandbox),
        ]);
    }

    public function preview($sandbox)
    {
        return view('sandbox.preview', [
            'sandbox' => $this->getSandbox($sandbox),
        ]);
    }

    private function getSandbox($sandboxUlid)
    {
        return Sandbox::whereUlid(str($sandboxUlid)->upper()->value())->firstOrFail();
    }
}
