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
        'gender', 'vaccinations', 'allergies', 'location', 'images',
        'is_sponsored', 'sponsored_until', 'stripe_session_id'
    ];

    protected $casts = [
        'vaccinations' => 'array',
        'allergies' => 'array',
        'images' => 'array',
        'is_sponsored' => 'boolean',
        'sponsored_until' => 'datetime',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
