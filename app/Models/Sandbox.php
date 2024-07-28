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
}
