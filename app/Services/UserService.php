<?php

namespace App\Services;

use App\Models\User;

/**
 * Class UserService.
 */
class UserService
{
    public function index($request)
    {
        $query = User::query();
        
        if ($request->has('role') && !empty($request->role)) {
            $query->where('role', $request->role);
        }
        
        if ($request->has('name') && !empty($request->name)) {
            $query->where('name', 'like', '%' . $request->name . '%');
        }
        
        if ($request->has('email') && !empty($request->email)) {
            $query->where('email', 'like', '%' . $request->email . '%');
        }
        
        if ($request->has('from') && $request->has('to')) {
            $query->whereBetween('created_at', [$request->from, $request->to]);
        }
        
        if ($request->has('sort_by')) {
            $query->orderBy($request->sort_by, $request->get('sort_dir', 'asc'));
        }
        
        return $query->get();
    }
}
