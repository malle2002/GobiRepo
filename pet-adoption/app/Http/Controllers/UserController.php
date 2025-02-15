<?php
namespace App\Http\Controllers;

use App\Models\Preference;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class UserController extends Controller
{
    public function getUser(Request $request): JsonResponse
    {
        $user = $request->user()->load('preferences');
        return response()->json($user);
    }

    public function updateUser(Request $request): JsonResponse
    {
        Log::info('Incoming request:', $request->all());

        $user = $request->user();
        
        $validated = $request->validate([
            'speciesPreferences' => 'array',
            'speciesPreferences.*.species' => 'string|required',
            'speciesPreferences.*.breeds' => 'array',
            'speciesPreferences.*.breeds.*' => 'string',
            'speciesPreferences.*.age' => 'integer|min:0',
            'speciesPreferences.*.gender' => 'in:Male,Female,Any',
        ]);

        $user->preferences()->delete();

        foreach ($validated['speciesPreferences'] as $preference) {
            Preference::create([
                'user_id' => $user->id,
                'species' => $preference['species'],
                'breeds' => $preference['breeds'],
                'age' => $preference['age'],
                'gender' => $preference['gender'],
            ]);
        }

        return response()->json(['message' => 'Profile updated successfully!', 'speciesPreferences' => $user->preferences], 200);
    }
}
