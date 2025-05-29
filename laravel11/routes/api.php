<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\TaskController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::prefix('auth')->group(function () {
    Route::post('login', [AuthController::class, 'login']);
    Route::post('register', [AuthController::class, 'register']);

    Route::middleware('jwt')->group(function () {
        Route::post('refresh', [AuthController::class, 'refresh']);
        Route::post('logout', [AuthController::class, 'logout']);
        Route::get('me', [AuthController::class, 'me']);
    });
});

Route::middleware('jwt')->group(function () {
    Route::get('tasks', [TaskController::class, 'all']);
    Route::get('tasks/{id}', [TaskController::class, 'find']);
    Route::post('tasks', [TaskController::class, 'create']);
    Route::put('tasks/{id}', [TaskController::class, 'update']);
    Route::delete('tasks/{id}', [TaskController::class, 'delete']);
});

Route::get('/teste', function (Request $request) {
    abort(500, 'teste');
    return response()->json(['Estou diante do mauro ou ORuam?' => 'Ãnn ORuam']);
});
