<?php

use App\Http\Controllers\FruitController;
use App\Http\Controllers\NewSandboxController;
use App\Http\Controllers\SandboxController;
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

//Route::get('/sandbox/{sandbox:ulid}', [SandboxController::class, 'show'])
//    ->name('sandbox.show');
//
//Route::get('/php-wasm/cgi-bin/{sandbox:ulid}', [SandboxController::class, 'preview'])
//    ->name('sandbox.preview');


// https://123123123-sandbox.playwithlaravel.com # sandbox

Route::domain('{sandbox}' . SandboxController::SUBDOMAIN_SUFFIX . '.' . config('app.domain'))->group(function () {
    Route::get('/', [SandboxController::class, 'show'])
        ->name('sandbox.show');
});

// https://123123123.playwithlaravel.com # preview / full running website (cgi)

Route::domain('{sandbox}.' . config('app.domain'))
    ->group(function () {
        Route::get('/___home', fn() => 'Hey it works!!')->name('another_home');
        Route::get('/', [SandboxController::class, 'preview'])
            ->name('sandbox.preview');
        Route::get('/{any}', [SandboxController::class, 'preview'])
            ->where('{any}', '(.*)')
            ->name('sandbox.preview');
    });

Route::view('/', 'welcome')->name('home');



Route::get('/wasm/fruit', FruitController::class)->name('wasm.fruit');
Route::view('/wasm/counter', 'wasm.counter')->name('wasm.counter');
