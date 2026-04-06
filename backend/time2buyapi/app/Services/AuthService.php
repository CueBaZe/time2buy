<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;

class AuthService 
{

    public function getUserByToken(string $token) {
        if (!$token) return null;

        return User::where('token', $token)->first();
    }

    public function registerUser(array $data) {

        $hashedPassword = Hash::make($data['password']);
        $token = $this->generateUserToken();

        return User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => $hashedPassword,
            'token' => $token,
        ]);
    }

    public function attemptLogin(string $identifier, string $password) {
        $user = DB::table('users')
            ->Where('name', $identifier)
            ->orWhere('email', $identifier)
            ->first();

        if ($user && Hash::check($password, $user->password)) {
            return $user;
        }

        return null;
    }

    public function deleteUserByToken(string $token) {
        $user = User::where('token', $token)->first();

        if (!$user) {
            return false;
        }

        $user->delete();
        return true;
    }


    private function generateUserToken() {
        return str()->random(12);
    }
}