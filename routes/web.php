<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\EngineerController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;




Route::get('/login', [AuthController::class, 'login_index'])->name('login');
Route::post('/login', [AuthController::class, 'login'])->name('login.post');


// middleware
Route::middleware('auth:sanctum','verified')->prefix('')->group(function () {
    Route::get('/', function () {return Inertia::render('Home');})->name('dashboard');
    Route::get('/track', function () {return Inertia::render('Track');});
    
    Route::resource('/engineer', EngineerController::class);
    
    Route::resource('/user', UserController::class);
    
    // Project
    Route::prefix('project')->group(function () {
        Route::get('/instalasi', function () {return Inertia::render('Project/Instalasi');});
        Route::get('/maintanance', function () {return Inertia::render('Project/Maintanance');});
    });
    
    // Master Data
    Route::prefix('masterdata')->group(function () {
        Route::resource('/user', UserController::class);
        Route::get('/project', function () {return Inertia::render('Master/Project');});
        Route::get('/ticket', function () {return Inertia::render('Master/Ticket');});
    });
});




