<?php

namespace App\Http\Controllers;

use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email|max:255',
            'password' => 'required|string|min:8|max:255'
        ]);

        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => Hash::make($data['password'])
        ]);

        if($user) {
            $token = $user->createToken($user->name.'auth_token')->plainTextToken;

            return response()->json([
                'message' => "Registration is successful",
                'access_token' => $token,
                'token_type' => 'Bearer'
            ], 201);
        } else {
            return response()->json([
                'message' => "Registration has failed."
            ], 500);
        }
    }


    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email|max:255',
            'password' => 'required|string|max:255|min:8'
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password,$user->password)) {
            return response()->json(['error' => 'The provided credentials are incorrect'], 401);
        }

        $user->tokens()->delete();

        $token = $user->createToken($user->name.'auth_token')->plainTextToken;

        return response()->json([
            'message' => "Login Successful",
            'access_token' => $token,
        ], 200);

        // return response("Login Successful")->withCookie(cookie('token', $token));
    }

    public function logout(Request $request)
    {
        $user = User::where('id', $request->user()->id)->first();

        if ($user) {
            $user->tokens()->delete();

            return response()->json([
                'message' => "Logout Successful"
            ], 200)->cookie('auth_token', '', -1);
        } else {
            return response()->json([
                'message' => 'User Not Found.'
            ]);
        }
    }

    public function profile(Request $request) {

        if (!Auth::check()) {
            Log::alert('User not authenticated');
            return response()->json(['error' => 'Unauthorized'], 401);
        }
        
        Log::alert(1);
        try {
            Log::alert($request->user());
            return response()->json($request->user());
        } catch (\Exception $e) {
            Log::error("Profile Error: " . $e->getMessage());
            return response()->json(['error' => 'Something went wrong'], 500);
        }
    }
    
    public function googleLogin(Request $request) {
        $googleToken = $request->access_token;
        $googleUser = Http::get("https://www.googleapis.com/oauth2/v3/userinfo", [
            'access_token' => $googleToken
        ])->json();

        if (!isset($googleUser['email'])) {
            return response()->json(['error' => 'Invalid Google token'], 401);
        }

        $user = User::firstOrCreate(
            ['email' => $googleUser['email']],
            [
                'name' => $googleUser['name'],
                'password' => bcrypt(Str::random(16)), // Set a random password since Google handles authentication
                'avatar' => $googleUser['picture'],
                'email_verified_at' => Carbon::now()
            ]
        );

        if (!$user->avatar) {
            $user->avatar = $googleUser['picture'] ?? null;
            $user->save();
        }

        $sanctumToken = $user->createToken('authToken')->plainTextToken;

        return response()->json([
            'user' => $user,
            'avatar' => $googleUser['picture'],
            'access_token' => $sanctumToken
        ]);
    }

}
