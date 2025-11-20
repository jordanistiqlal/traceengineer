<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Services\ProjectService;
use App\Services\TaskService;
use App\Services\TicketService;
use App\Services\UserService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    protected $ProjectService;
    protected $UserService;
    protected $TaskService;
    protected $TicketService;

    public function __construct(
        TaskService $TaskService,
        UserService $UserService,
        ProjectService $ProjectService,
        TicketService $TicketService,
    ) {
        $this->TaskService = $TaskService;
        $this->UserService = $UserService;
        $this->ProjectService = $ProjectService;
        $this->TicketService = $TicketService;
    }

    public function dashboard(Request $request): Response
    {
        // $projects = $this->ProjectService->index($request);
        // $tasks = $this->TaskService->index($request);
        // $tickets = $this->TicketService->index($request);
        $user = ($this->UserService->index((clone $request)->merge(['role' => 'ENGINEER'])))->count();
        

        return Inertia::render('Home', [
            'response' => [
                'total_engineers' => $user,
                'ongoing_projects' => 30,
                'active_engineers' => 50,
            ],
        ]);
    }
}
