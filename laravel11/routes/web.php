<?php

use Illuminate\Support\Facades\Route;

Route::any('{any}', function ($any) {
    return redirect('/api/' . $any);
})->where('any', '.*');
