<?php

namespace App\Http\Controllers;

use App\Models\Sandbox;
use App\SandboxType;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class NewSandboxController extends Controller
{
    public function __invoke($type = SandboxType::Livewire->value)
    {
        $sandbox = Sandbox::create([
            'ulid' => Str::ulid(),
            'type' => $type,
        ]);

        $type = SandboxType::from($type);

        Storage::copy(
            $type->filePath(),
            storage_path("app/public/LaravelPlay-{$sandbox->ulid}.zip")
        );

        return redirect()->route('sandbox.show', $sandbox->ulid);
    }
}
