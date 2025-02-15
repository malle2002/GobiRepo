<?php

namespace App\Http\Controllers;

use Laravel\Socialite\Facades\Socialite;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class SocialAuthController extends Controller
{
    public function redirectToProvider($provider)
    {
        return Socialite::driver($provider)->redirect();

    }

    public function handleProviderCallback(Request $request, $provider)
    {
        $socialUser = Socialite::driver($provider)->user();

        $user = User::where('email', $socialUser->getEmail())->first();

        if (!$user) {
            return response()->json([
                'message' => 'Username required',
                'email' => $socialUser->getEmail(),
                'name' => $socialUser->getName(),
                'provider' => $provider,
                'provider_id' => $socialUser->getId(),
            ], 200);
        }

        Auth::login($user);

        return response()->json(['token' => $user->createToken('API Token')->plainTextToken]);
    }

    public function completeRegistration(Request $request)
    {
        $request->validate([
            'email' => 'required|email|unique:users,email',
            'username' => 'required|string|max:255|unique:users,username',
            'provider' => 'required',
            'provider_id' => 'required',
        ]);

        $user = User::create([
            'name' => $request->input('username'),
            'email' => $request->input('email'),
            'password' => bcrypt(str()->random(16)),
            'provider' => $request->input('provider'),
            'provider_id' => $request->input('provider_id'),
        ]);

        Auth::login($user);

        return response()->json(['token' => $user->createToken('API Token')->plainTextToken]);
    }
}

