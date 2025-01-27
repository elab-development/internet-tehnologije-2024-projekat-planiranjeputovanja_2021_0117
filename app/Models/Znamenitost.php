<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Znamenitost extends Model
{
    use HasFactory;

    // Relacija: Znamenitost - Destinacija (N:1)
    public function destinacija(){
        return $this->belongsTo(Destinacija::class);
    }

    //Relacija Znamenitost - PlanZnamenitost (1:N)
    public function planZnamenitost(){
        return $this->hasMany(PlanZnamenitost::class);
    }

    protected $guarded = [];
    protected $table = 'znamenitosti';

}
