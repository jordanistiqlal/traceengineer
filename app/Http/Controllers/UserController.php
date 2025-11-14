<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Services\AuthService;
use App\Services\UserService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class UserController extends Controller
{
    protected $UserService;
    protected $AuthService;
    public function __construct(
        UserService $UserService, 
        AuthService $AuthService, 
    ) {
        $this->UserService = $UserService;
        $this->AuthService = $AuthService;
    }
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request) : Response
    {
        $response = $this->UserService->index($request);

        return Inertia::render('Master/User', [
            'response' => $response
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $result = $this->AuthService->register($request);
        
        if ($result[0] === 'Success') {
            return back()->with('success', $result[1]);
        } elseif ($result[0] === 'Validation Error') {
            return back()->withErrors($result[1]);
        } else {
            return back()->with('error', $result[1]);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $result = $this->UserService->update($request, $id);
        
        if ($result[0] === 'Success') {
            return back()->with('success', $result[1]);
        } elseif ($result[0] === 'Validation Error') {
            return back()->withErrors($result[1]);
        } else {
            return back()->with('error', $result[1]);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $result = $this->UserService->destroy($id);

        if ($result[0] === 'Success') {
            return back()->with('success', $result[1]);
        } elseif ($result[0] === 'Validation Error') {
            return back()->withErrors($result[1]);
        } else {
            return back()->with('error', $result[1]);
        }
    }
}
