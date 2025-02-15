<?php

namespace App\Http\Requests\Pets;

use Illuminate\Foundation\Http\FormRequest;

class StorePetRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string',
            'age' => 'required|integer',
            'breed' => 'required|string',
            'gender' => 'required|string',
            'species' => 'required|string',
            'images.*' => 'image|mimes:jpeg,png,jpg|max:2048',
            'description' => 'string|max:500',
            'vaccinations' => 'string',
            'allergies' => 'string',
            'location' => 'string',
            //'images' => 'required',
        ];
    }
}
