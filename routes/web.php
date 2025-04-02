<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Todo;
use App\Http\Controllers\ProductController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', [Todo::class, 'index']);
Route::post('/todos', [Todo::class, 'store']);
Route::put('/todos/{id}', [Todo::class, 'update']);
Route::delete('/todos/{id}', [Todo::class, 'destroy']);

Route::get('products', [ProductController::class, 'index'])->name('products.index');
Route::get('products/create', [ProductController::class, 'create'])->name('products.create');
Route::post('products/store', [ProductController::class, 'store'])->name('products.store');
Route::get('products/show/{id}', [ProductController::class, 'show'])->name('products.show');
Route::get('products/edit/{id}', [ProductController::class, 'edit'])->name('products.edit');
Route::delete('products/destroy/{id}', [ProductController::class, 'destroy'])->name('products.destroy');
Route::put('products/update/{id}', [ProductController::class, 'update'])->name('products.update');


