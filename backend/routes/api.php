<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ReservationController;

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

Route::name('api.v1.')->prefix('v1')->group(function() {
    Route::get('/products', [ProductController::class, 'index'])->name('products.index');
    Route::get('/product/{id}', [ProductController::class, 'show'])->name('products.show');
    Route::get('/reservations', [ReservationController::class, 'index'])->name('reservations.index');
    Route::get('/reviews', [ReviewController::class, 'index'])->name('reviews.index');
});