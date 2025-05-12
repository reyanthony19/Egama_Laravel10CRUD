<?php

use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\BookController;
use App\Http\Controllers\API\BorrowingController;
use App\Http\Controllers\API\StudentController;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::get('/users', [AuthController::class, 'listUsers']);
Route::get('/users/{id}', [AuthController::class, 'showUser']);

Route::get('/books', [BookController::class, 'show']);
Route::get('/books/deleted', [BookController::class, 'deletedBooks']);

Route::middleware(['auth:sanctum'])->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);

    Route::apiResource('/books', BookController::class);
    Route::apiResource('/borrowings', BorrowingController::class);

    Route::apiResource('/students', StudentController::class);
    Route::get('/students/deleted', [StudentController::class, 'deletedStudents']);

    Route::get('/user', function (Request $request) {
        return $request->user();
    });
});
