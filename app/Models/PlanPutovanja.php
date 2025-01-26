<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PlanPutovanja extends Model
{
    use HasFactory;

    // Relacija: PlanPutovanja - User (N:1)
    public function user(){
        return $this->belongsTo(User::class);
    }

    // Relacija: PlanPutovanja - PlanZnamenitost (1:N)
    public function planZnamenitost(){
        return $this->hasMany(PlanZnamenitost::class);
    }

    protected $guarded = [];
}
