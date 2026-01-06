<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
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
            ], 200);
        } else { // If not return error message and status code (403)
            return response()->json([
                'success' => false,
                'message' => 'The provided credentials do not match our records.',
            ], 403);
        }
    }

    public function logout() { //function to logout the user
        //check if the user has an active session. If not retrun error message and status code (404)

        //remove the session

        //return success message and status code (200)
    }

    public function register(Request $request) { //function to let the user create an account

        //validate the data

        //check if the username or email already exists, if it does return error message and status code (403)

        //add the new account data into the user table

        //return success message and status code (200)

    }
}
