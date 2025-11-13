<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Services\AuthService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AuthController extends Controller
{
    protected $authService;

    
    public function __construct(AuthService $service)
    {
        $this->authService = $service;
    }

    public function login_index(){
        return Inertia::render('Login');
    }

    public function login(Request $request)
    {
        $result = $this->authService->login($request);

        if ($result[0] === 'Success') {
            return redirect()->route('dashboard');
        }else{
            return back()->with('error', $result[1]);
        }
    }
}
