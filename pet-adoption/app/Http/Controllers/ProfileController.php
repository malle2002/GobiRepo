<?php

namespace App\Http\Controllers;

use Cloudinary\Cloudinary;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class ProfileController extends Controller
{
    public function profile(Request $request) {

        if (!Auth::check()) {
            Log::alert('User not authenticated');
            return response()->json(['error' => 'Unauthorized'], 401);
        }
        
        try {
            Log::alert($request->user());
            return response()->json($request->user());
        } catch (\Exception $e) {
            Log::error("Profile Error: " . $e->getMessage());
            return response()->json(['error' => 'Something went wrong'], 500);
        }
    }
    public function updateProfileImage(Request $request)
    {
        $request->validate([
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $user = Auth::guard('sanctum')->user();

        $cloudinary = new Cloudinary();

        $uploadedFile = $cloudinary->uploadApi()->upload($request->file('image')->getRealPath(), [
            'folder' => 'user_profiles'
        ]);

        $imageUrl = $uploadedFile['secure_url'];

        $user->avatar = $imageUrl;
        
        /** @var \App\Models\User $user **/
        $user->save();

        return response()->json(['success' => true, 'image' => $imageUrl]);
    }
}
