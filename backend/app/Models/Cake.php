<?php

namespace App\Models;

use App\Models\Reservation;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Cake extends Model
{
    use HasFactory;

    public $timestamps = false;

    public function reservation(): BelongsTo
    {
        $this->belongsTo(Reservation::class);
    }
    
}
