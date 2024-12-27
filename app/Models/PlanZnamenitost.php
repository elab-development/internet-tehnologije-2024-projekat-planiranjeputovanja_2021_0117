<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PlanZnamenitost extends Model
{
    use HasFactory;

    // Relacija: PlanZnamenitost - PlanPutovanja (N:1)
    public function planPutovanja()
    {
        return $this->belongsTo(PlanPutovanja::class, 'plan_putovanja_id');
    }

    // Relacija: PlanZnamenitost - Znamenitost (N:1)
    public function znamenitost()
    {
        return $this->belongsTo(Znamenitost::class, 'znamenitost_id');
    }
}
