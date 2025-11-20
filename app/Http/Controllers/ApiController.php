<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Services\ProjectService;
use App\Services\TaskService;
use App\Services\TicketService;
use App\Services\UserService;
use Illuminate\Http\Request;

class ApiController extends Controller
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

    public function user_profile(Request $request)
    {
        $user = $request->user();

        return response()->json([
            'status' => 'Success',
            'message'=> 'User Profile Retrieved',
            'data' => [
                'user' => [
                    'id' => $user->user_id,
                    'name' => $user->name,
                    'username' => $user->username,
                    'email' => $user->email,
                    'role' => $user->role,
                ],
            ],
        ]);
    }

    public function projects($id)
    {
        $projects = $this->UserService->projectsUser($id);

        return response()->json([
            'status' => 'Success',
            'message'=> 'Projects Retrieved',
            'data' => [
                'projects' => $projects,
            ],
        ]);
    }
}
