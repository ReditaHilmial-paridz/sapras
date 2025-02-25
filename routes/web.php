<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\View;

// Rute utama akan memuat tampilan Vue
Route::get('/{any}', function () {
    return View::file(resource_path('views/app.blade.php'));
})->where('any', '.*');
