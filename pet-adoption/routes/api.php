<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\PetController;
use App\Http\Controllers\SocialAuthController;
use App\Http\Controllers\SpeciesController;
use App\Http\Controllers\UserController;
use App\Models\Message;
use Illuminate\Support\Facades\Broadcast;
use Illuminate\Support\Facades\Route;

Route::middleware('guest')->group(function () {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);
    Route::get('/pets', [PetController::class, 'index']);
    Route::get('/pets/{pet}', [PetController::class, 'show']);
    Route::get('/species', [SpeciesController::class, 'index']);
});

Route::middleware('auth:sanctum')->group(function() {
    Route::get('/user', [UserController::class, 'getUser']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/profile', [AuthController::class, 'profile']);
    Route::put('/user/update', [UserController::class, 'updateUser']);
    Route::get("/user/{id}", [UserController::class, 'getUserById']);

    Route::post('/pets', [PetController::class, 'store']);
    Route::post('/pets/{pet}/images', [PetController::class, 'uploadImages']);
    Route::put('/pets/{pet}', [PetController::class, 'update']);
    Route::delete('/pets/{pet}', [PetController::class, 'destroy']);

    Route::get('/chat/users', [MessageController::class, 'getUsers']);
    Route::get('/chat/messages/{user}', [MessageController::class, 'getMessages']);
    Route::post('/chat/send', [MessageController::class, 'sendMessage']);
});

Route::post('/auth/google', [AuthController::class, 'googleLogin']);
Route::get('/auth/{provider}/redirect', [SocialAuthController::class, 'redirectToProvider']);
Route::get('/auth/{provider}/callback', [SocialAuthController::class, 'handleProviderCallback']);

Route::get('/sanctum/csrf-cookie', function () {
    return response()->json(['csrfToken' => csrf_token()]);
});

Broadcast::routes(['middleware' => ['auth:sanctum']]);

Route::get('/broadcast', function () {
    broadcast(new App\Events\MessageSent(new Message()));
});
