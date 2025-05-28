<?php

use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::prefix('auth')->group(function () {
    Route::post('login', [AuthController::class, 'login']);

    Route::middleware('jwt')->group(function () {
        Route::post('refresh', [AuthController::class, 'refresh']);
        Route::post('logout', [AuthController::class, 'logout']);
        Route::post('me', [AuthController::class, 'me']);
    });
});

Route::middleware('jwt')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/teste', function (Request $request) {
    return response()->json(['message' => 'TESTEE2']);
});
