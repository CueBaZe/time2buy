<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class AuthController extends Controller
{
    public function fetchUserData(Request $request, $id) {
        $token = $request->bearerToken();
        $user = DB::table('users')
            ->where('id', $id)
            ->where('token', $token)
            ->first();
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

        //check if the login infomation is correct (user or email matches the password).
        $user = DB::table('users')->Where('name', $request->name)->orWhere('email', $request->name)->first();

        if ($user && Hash::check($request->password, $user->password)) { //return success message and status code
            return response()->json([
                'success' => true,
                'message' => 'User logged in',
                'userId' => $user->id,
                'userToken' => $user->token,
            ], 200);
        } else { // If not return error message and status code (403)
            return response()->json([
                'success' => false,
                'message' => 'The provided credentials do not match our records.',
            ], 401);
        }
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

        $hashedPassword = Hash::make($request->password);
        $token = $this->generateUserToken();

        //add the new account data into the user table
        User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => $hashedPassword,
            'token' => $token,
        ]);

        //return success message and status code (200)
        return response()->json([
            'success' => true,
            'message' => 'User created',
        ], 200);

    }

    private function generateUserToken() {
        return str()->random(12);
    }
}
