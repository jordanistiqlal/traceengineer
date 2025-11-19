<?php

namespace App\Services;

use App\Models\Task;
use Exception;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

/**
 * Class TaskService.
 */
class TaskService
{
    public function index($request)
    {
        $query = Task::query();
        
        if ($request->has('task_type') && !empty($request->task_type)) {
            $query->where('task_type', $request->task_type);
        }
        
        if ($request->has('sort_by')) {
            $query->orderBy($request->sort_by, $request->get('sort_dir', 'asc'));
        }
        
        return $query->get();
    }

    public function store($request)
    {
        DB::beginTransaction();
        try {
            $request->validate([
                'name' => ['required','string','max:128'],
                'tipe' => ['required','string','max:64'],
                'project_id' => ['required','string'],
                'user_id' => ['required','string'],
            ]);

            $data = [
                'task_name' => $request->name,
                'task_type' => $request->tipe,
                'project_id' => $request->project_id,
                'user_id' => $request->user_id,
            ];

            Task::create($data);
            DB::commit();

            return ['Success', 'Ticket created successfully'];

        } catch (ValidationException $e) {
            DB::rollBack();
            return ['Validation Error', $e->errors()];
        } catch (Exception $error) {
            DB::rollBack();
            return ['Error', $error->getMessage()];
        }
    }
    public function update($request, $id)
    {
        DB::beginTransaction();
        try {
            $request->validate([
                'name' => ['required','string','max:128'],
                'tipe' => ['required','string','max:64'],
                'project_id' => ['required','string'],
                'user_id' => ['required','string'],
            ]);
    
            $update = [
                'task_name' => $request->name,
                'task_type' => $request->tipe,
                'project_id' => $request->project_id,
                'user_id' => $request->user_id,
            ];
    
            Task::where('task_id',$id)->update($update); 
            DB::commit();
    
            return ['Success', 'Task Updated'];
        } catch (ValidationException $e) {
            DB::rollBack();
            return ['Validation Error', $e->errors()];
        } catch (Exception $error) {
            DB::rollBack();
            return ['Failed', $error->getMessage()];
        }
    }

    public function destroy($id)
    {
        DB::beginTransaction();
        try {
            Task::where('ticket_id', $id)->delete();
            DB::commit();
            return ['Success', 'Task Deleted'];
        } 
        catch (Exception $error) {
            DB::rollBack();
            return ['Failed', $error->getMessage()];
        }
    }
}
