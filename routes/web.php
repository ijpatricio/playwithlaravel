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

Route::view('/', 'welcome')->name('home');

Route::get('/new/{type?}', NewSandboxController::class)->name('new');

Route::get('/sandbox/{sandbox:ulid}', [SandboxController::class, 'show'])
    ->name('sandbox.show');

Route::get('/php-wasm/cgi-bin/{sandbox:ulid}', [SandboxPreviewController::class, 'show'])
    ->name('php-wasm.show');


Route::get('/fruit', FruitController::class)->name('fruit.index');
