<?php

namespace App\Http\Controllers;

use App\Models\Pet;
use Illuminate\Http\JsonResponse;

class SpeciesController extends Controller
{
    public function index(): JsonResponse
    {
        // Fetch unique species and their corresponding breeds
        $speciesMap = Pet::select('species', 'breed')
            ->get()
            ->groupBy('species')
            ->map(fn($breeds) => $breeds->pluck('breed')->filter()->unique()->values())
            ->toArray();

        return response()->json($speciesMap);
    }
}
