<?php

namespace App\Http\Controllers;

use App\Http\Requests\Pets\StorePetRequest;
use App\Http\Resources\PetResource;
use App\Models\Pet;
use Cloudinary\Cloudinary as CloudinaryCloudinary;
use CloudinaryLabs\CloudinaryLaravel\Facades\Cloudinary;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PetController extends Controller
{
    use AuthorizesRequests;

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return PetResource::collection(Pet::all());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePetRequest  $request)
    {
        $validated = $request->validated();

        $cloudinary = new CloudinaryCloudinary();

        $imageUrls = [];
        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $image) {
                $uploadResult = $cloudinary->uploadApi()->upload($image->getRealPath());
                $imageUrls[] = $uploadResult['secure_url'];
            }
        }

        $pet = Pet::create([
            'user_id' => Auth::id(),
            'name' => $request->name,
            'species' => $request->species,
            'breed' => $request->breed,
            'age' => $request->age,
            'description' => $request->description,
            'gender' => $request->gender,
            'vaccinations' => $request->vaccinations,
            'allergies' => $request->allergies,
            'location' => $request->location,
            'images' => $imageUrls
        ]);

        return new PetResource($pet);
    }


    /**
     * Display the specified resource.
     */
    public function show(Pet $pet)
    {
        return new PetResource($pet);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Pet $pet)
    {
        $this->authorize('update', $pet);

        $pet->update($request->all());

        return new PetResource($pet);
    }

    // Delete a pet
    public function destroy(Pet $pet)
    {
        $this->authorize('delete', $pet);

        $pet->delete();

        return response()->json(['message' => 'Pet deleted']);
    }

    public function uploadImages(Request $request, $petId)
    {
        $request->validate([
            'images' => 'array',
            'images.*' => 'url',
        ]);

        $pet = Pet::findOrFail($petId);

        if (!Auth::check() || Auth::user()->id !== $pet->user_id) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $imagePaths = $pet->images ?? [];

        $imagePaths = array_merge($imagePaths, $request->images);

        $pet->update(['images' => $imagePaths]);

        return response()->json(['message' => 'Images uploaded successfully', 'images' => $imagePaths], 200);
    }


}
