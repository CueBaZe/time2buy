<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use App\Services\AuthService;

class AuthController extends Controller
{

    protected $authService;

    public function __construct(AuthService $authService)
    {
        $this->authService = $authService;
    }

    public function fetchUserData(Request $request) {

        $user = $this->authService->getUserByToken($request->bearerToken());

        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'User not found'
            ], 404);
        }

        return response()->json($user);
    }

    public function login(Request $request) { //function to check if the login infomation is correct
        $request->validate([ //validate the data
            'name' => 'required|string',
            'password' => 'required|string',
        ]);

        $user = $this->authService->attemptLogin($request->name, $request->password);

        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized',
            ]);
        }

        return response()->json([
            'success' => true,
            'userId' => $user->id,
            'userToken' => $user->token,
        ], 200);

    }

    public function register(Request $request) { //function to let the user create an account

        //validate the data
        $request->validate([
            'name' => 'required|string|unique:users',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:8|regex:/^(?=.*[A-Z])(?=.*\d).+$/',
            'passwordconfirm' => 'same:password',
        ], [
            'password.regex' => 'Password must include a capital letter and a digit',
            'passwordconfirm.same' => 'This field must match the password field',
        ]);

        $user = $this->authService->registerUser($request->all());

        //return success message and status code (200)
        return response()->json([
            'success' => true,
            'message' => 'User created',
        ], 200);

    }

    public function deleteUser(Request $request) { //function to delete a user

        $deleted = $this->authService->deleteUserByToken($request->bearerToken());

        if (!$deleted) {
            return response()->json([
                'success' => false,
                'message' => 'Could not find user',
            ]);
        }
        
        return response()->json([
            'success' => true,
            'message' => 'User deleted'
        ]);
        

    }
}
