<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Services\UserService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EngineerController extends Controller
{
    protected $UserService;
    protected $TaskService;
    protected $TicketService;

    public function __construct(
        UserService $UserService, 
    ) {
        $this->UserService = $UserService;
        // $this->TaskService = $TaskService;
        // $this->TicketService = $TicketService;
    }

    public function index(Request $request)
    {
        $userrequest = clone $request;
        $taskrequest = clone $request;
        $ticketrequest = clone $request;

        $userrequest['role'] = 'ENGINEER';
        $taskrequest['status'] = 'Active';
        $ticketrequest['status'] = 'Active';

        $users = $this->UserService->index($userrequest);
        $tasks = [];
        $tickets = [];

        return Inertia::render('Engineer', [
            'response' => [
                'engineers' => $users,
                'tasks' => $tasks,
                'tickets' => $tickets,
            ],
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
        //
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
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
