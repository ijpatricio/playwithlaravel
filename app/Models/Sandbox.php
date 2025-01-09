<?php

namespace App\Models;

use App\SandboxType;
use Illuminate\Database\Eloquent\Model;

class Sandbox extends Model
{
    protected $guarded = ['id'];

    protected $casts = [
        'kind' => SandboxType::class,
    ];

    public function getUrl(): string
    {
        $appDomain = config('app.domain');
        $appUrl = config('app.url');

        return str($appUrl)
            ->replace($appDomain, "{$this->slug}.{$appDomain}");
    }
}
