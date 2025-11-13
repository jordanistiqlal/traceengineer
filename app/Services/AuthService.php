<?php

namespace App\Services;

use App\Models\User;
use Exception;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Session;
use Illuminate\Validation\ValidationException;

/**
 * Class AuthService.
 */
class AuthService
{
    public function register($request)
    {
        DB::beginTransaction();
        try {
            $request->validate([
                'name'      => ['required','string','max:128'],
                'nohp'      => ['required','string','max:128','unique:users'],
                'email'     => ['required','string','email','max:64','unique:users'],
                'password'  => ['required','string'],
                'role'      => ['required','string'],
            ]);
            $users = User::where('name', '=', $request->input('name'))->first();

            if (!$users){
                $data = [
                    'name'      => $request->name,
                    'username'  => $request->name,
                    'nohp'      => $request->nohp,
                    'email'     => $request->email,
                    'role'      => $request->role,
                    'password'  => Hash::make($request->password),
                ];

                User::create($data); 

                DB::commit();
                return ['Success', 'User Registered'];
            }

            return throw new \Exception('User Already Exists');
            
        }
        catch (ValidationException $e) {
            DB::rollBack();
            // kirim error validasi ke controller
            return ['Validation Error', $e->errors()];
        }
        catch(Exception $error)
        {
            DB::rollBack();
            return ['Error', $error->getMessage()];
        }
    }

    public function login($request)
    {
            try{
                $request->validate([
                    'username' => 'required|string',
                    'password' => 'required|string'
                ]);

                $user = User::where('username', $request->username)->first();

                if (!$user) {
                    throw new \Exception ('User Not Found');
                }

                Auth::logout(); // Ensure no user is logged in before attempt
                Session::flush(); // Remove all session data

                $credentials = ['email'=>$user->email, 'password'=>$request->password];

                // dd(!Auth::guard('web')->attempt($credentials));
                // dd(!Auth::attempt($credentials));
                
                if(!Auth::attempt($credentials)){
                    throw new \Exception ('Invalid Unauthorized');
                }

                $user = Auth::user();

                if(!Hash::check($request->password, $user->password, [])){
                    throw new \Exception('Invalid Credentials');
                }

                return ['Success', 'Login Successful'];
                
            }catch(Exception $error){
                return [
                    'message' => $error->getMessage()
                ];
            }
    }

    public function logout($request)
    {
        $token = $request->user()->currentAccessToken()->delete();

        return [
            'message' => 'You have successfully logged out'
        ];
    }
}
