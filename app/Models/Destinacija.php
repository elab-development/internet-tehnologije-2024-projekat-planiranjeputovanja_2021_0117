<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Destinacija extends Model
{
    // Relacija: Destinacija - Znamenitost (1:N)
    public function znamenitost(){
        return $this->hasMany(PlanZnamenitost::class);
    }

    // Relacija: Destinacija - PopularnaDestinacija (1:1)
    public function popularnaDestinacija(){
        return $this->hasOne(PopularnaDestinacija::class);
    }

    protected $guarded = [];
}
