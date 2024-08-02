<?php

namespace App\Providers;

use Illuminate\Support\Facades\Blade;
use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Vite::useBuildDirectory('___/build');

        Blade::directive('wasmScript', function($expression) {
            return <<<EOT
            <script type="text/php" data-stdout="#output" data-stderr="#error">
                {!! \Illuminate\Support\Facades\File::get(
                    resource_path('wasm-scripts/'.{$expression})
                ) !!}
            </script>
            EOT;
        });
    }
}
