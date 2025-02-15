<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pet extends Model
{
    use HasFactory, HasUuids;

    protected $keyType = 'string';
    public $incrementing = false;
    protected $fillable = [
        'user_id', 'name', 'species', 'breed', 'age', 'description',
        'gender', 'vaccinations', 'allergies', 'location', 'images'
    ];

    protected $casts = [
        'vaccinations' => 'array',
        'allergies' => 'array',
        'images' => 'array'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
