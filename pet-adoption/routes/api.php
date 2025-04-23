<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Auth\SocialLoginController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\PetController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SpeciesController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\StripeController;
use App\Models\Message;
use Illuminate\Support\Facades\Broadcast;
use Illuminate\Support\Facades\Route;

Route::middleware('guest')->group(function () {
    Route::post('/register', [RegisteredUserController::class, 'store']);
    Route::post('/login', [AuthenticatedSessionController::class, 'store']);
    Route::get('/pets', [PetController::class, 'index']);
    Route::get('/pets/{pet}', [PetController::class, 'show']);
    Route::get('/species', [SpeciesController::class, 'index']);
});

Route::middleware('auth:sanctum')->group(function() {
    Route::get('/user', [UserController::class, 'getUser']);
    Route::post('/logout', [AuthenticatedSessionController::class, 'destroy']);
    Route::get('/profile', [ProfileController::class, 'profile']);
    Route::put('/user/update', [UserController::class, 'updateUser']);
    Route::get("/user/{id}", [UserController::class, 'getUserById']);
    Route::post('/auth/update-profile-image', [ProfileController::class, 'updateProfileImage']);

    Route::post('/pets', [PetController::class, 'store']);
    Route::post('/pets/{pet}/images', [PetController::class, 'uploadImages']);
    Route::put('/pets/{pet}', [PetController::class, 'update']);
    Route::delete('/pets/{pet}', [PetController::class, 'destroy']);

    Route::get('/chat/users', [MessageController::class, 'getUsers']);
    Route::get('/chat/messages/{user}', [MessageController::class, 'getMessages']);
    Route::post('/chat/send', [MessageController::class, 'sendMessage']);
});

Route::middleware('auth:sanctum')->post('/create-payment-intent', [StripeController::class, 'createPaymentIntent']);
Route::middleware('auth:sanctum')->post('/webhook', [StripeController::class, 'handleWebhook']);

Route::post('/auth/google', [SocialLoginController::class, 'google']);
Route::post('/auth/facebook', [SocialLoginController::class, 'facebook']);

Route::get('/sanctum/csrf-cookie', function () {
    return response()->json(['csrfToken' => csrf_token()]);
});

Broadcast::routes(['middleware' => ['auth:sanctum']]);

Route::get('/broadcast', function () {
    broadcast(new App\Events\MessageSent(new Message()));
});
