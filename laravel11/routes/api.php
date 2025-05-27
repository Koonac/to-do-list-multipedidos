<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/teste', function (Request $request) {
    return 'BBBBBB';
});

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
