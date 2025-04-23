<?php
namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;

class SocialLoginController extends Controller
{
    public function google(Request $request)
    {
        $googleUser = Http::get("https://www.googleapis.com/oauth2/v3/userinfo", [
            'access_token' => $request->access_token
        ])->json();

        if (!isset($googleUser['email'])) {
            return response()->json(['error' => 'Invalid Google token'], 401);
        }

        $user = User::firstOrCreate(
            ['email' => $googleUser['email']],
            [
                'name' => $googleUser['name'],
                'password' => bcrypt(Str::random(16)),
                'avatar' => $googleUser['picture'],
                'email_verified_at' => Carbon::now(),
            ]
        );

        if (!$user->avatar) {
            $user->avatar = $googleUser['picture'] ?? null;
            $user->save();
        }

        $token = $user->createToken($user->name.'auth_token')->plainTextToken;

        return response()->json([
            'user' => $user,
            'avatar' => $googleUser['picture'],
            'access_token' => $token
        ]);
    }

    public function facebook(Request $request)
    {
        $facebookUser = Http::get("https://graph.facebook.com/me", [
            'fields' => 'id,name,email,picture.type(large)',
            'access_token' => $request->access_token
        ])->json();

        if (!isset($facebookUser['email'])) {
            return response()->json(['error' => 'Invalid Facebook token'], 401);
        }

        $user = User::firstOrCreate(
            ['email' => $facebookUser['email']],
            [
                'name' => $facebookUser['name'],
                'password' => bcrypt(Str::random(16)),
                'avatar' => $facebookUser['picture']['data']['url'] ?? null,
                'email_verified_at' => now()
            ]
        );

        if (!$user->avatar) {
            $user->avatar = $facebookUser['picture']['data']['url'] ?? null;
            $user->save();
        }

        $token = $user->createToken('authToken')->plainTextToken;

        return response()->json([
            'user' => $user,
            'avatar' => $facebookUser['picture']['data']['url'],
            'access_token' => $token
        ]);
    }
}
