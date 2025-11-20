<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ApiController;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Route;

Route::post('/login', [AuthController::class, 'jwt_login']);
Route::post('/refresh-token', [AuthController::class, 'refresh_token']);

Route::middleware('auth:api')->group(function () {
    Route::get('/user-profile', [ApiController::class, 'user_profile']);
    Route::get('/projects/{id}', [ApiController::class, 'projects']);

    Route::post('/logout', [AuthController::class, 'logout_api']);
});

Route::get('/test-token', function () {
    try {
        $token = request()->bearerToken();
        
        Log::info('Bearer Token:', ['token' => $token]);
        
        // Coba parse token secara manual
        $payload = \Tymon\JWTAuth\Facades\JWTAuth::parseToken()->getPayload();
        
        Log::info('Payload:', $payload->toArray());
        
        $user = auth('api')->user();
        
        return response()->json([
            'has_token' => !empty($token),
            'token_preview' => substr($token, 0, 50) . '...',
            'payload' => $payload->toArray(),
            'authenticated' => auth('api')->check(),
            'user' => $user,
        ]);
    } catch (\Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {
        return response()->json(['error' => 'Token expired'], 401);
    } catch (\Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {
        return response()->json(['error' => 'Token invalid'], 401);
    } catch (\Exception $e) {
        return response()->json([
            'error' => $e->getMessage(),
            'class' => get_class($e)
        ], 500);
    }
});