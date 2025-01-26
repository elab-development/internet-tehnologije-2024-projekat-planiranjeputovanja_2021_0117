<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PopularnaDestinacija extends Model
{
    use HasFactory;

    // Relacija: PopularnaDestinacija - Destinacija (1:1)
    public function destinacija(){
        return $this->belongsTo(Destinacija::class);
    }

    protected $guarded = [];
}
