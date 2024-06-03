<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return [];
});
Route::get('password/reset/{token}', function ($token) {
    return redirect(env('FRONT_END_ROUTE').'/entrar/nova-senha/' . $token);
})->name('password.reset');
Route::get('password/reset/{token}', function ($token) {
    return redirect(env('FRONT_END_ROUTE').'/entrar');
})->name('slogin');