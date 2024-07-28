<?php

namespace App;

enum SandboxType: string
{
    case Livewire = 'livewire';

    public function filePath(): string
    {
        return match ($this) {
            self::Livewire => storage_path('sandboxes/laravel-11.zip'),
        };
    }
}
