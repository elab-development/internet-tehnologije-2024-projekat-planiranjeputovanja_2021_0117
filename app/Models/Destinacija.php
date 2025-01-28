<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Destinacija extends Model
{
    use HasFactory;

    // Relacija: Destinacija - Znamenitost (1:N)
    public function znamenitosti()
    {
        return $this->hasMany(Znamenitost::class, 'destinacija_id');
    }

    // Relacija: Destinacija - PopularnaDestinacija (1:1)
    public function popularnaDestinacija()
    {
        return $this->hasOne(PopularnaDestinacija::class);
    }

    protected $guarded = [];
    protected $table = 'destinacija';
}