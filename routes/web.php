<?php

use App\Http\Controllers\FruitController;
use App\Http\Controllers\NewSandboxController;
use App\Http\Controllers\SandboxController;
use App\Http\Controllers\SandboxPreviewController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/new/{type?}', NewSandboxController::class)->name('new');

Route::get('/sandbox/{sandbox:ulid}', [SandboxController::class, 'show'])
    ->name('sandbox.show');
Route::get('/php-wasm/cgi-bin/{sandbox:ulid}', [SandboxPreviewController::class, 'show'])
    ->name('php-wasm.show');

Route::domain('{sandbox}-sandbox.' . config('app.domain'))->group(function () {
    Route::get('/{any}', fn($sandbox) => dd('sandbox-', $sandbox))
        ->where('{any}', '(.*)')
        ->name('sandbox');
});

Route::domain('{sandbox}.' . config('app.domain'))
    ->group(function () {
        Route::get('/', fn($sandbox) => dd($sandbox));
    });

Route::view('/', 'welcome')->name('home');


Route::get('/wasm/fruit', FruitController::class)->name('wasm.fruit');
Route::view('/wasm/counter', 'wasm.counter')->name('wasm.counter');
