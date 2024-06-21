<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Product extends Model
{
    use HasFactory;

    public function reservations(): BelongsToMany
    {
        return $this->belongsToMany(Reservation::class)->withPivot('amount');
    }

    public function reviews(): HasMany
    {
        return $this->hasMany(Review::class);
    }
}
