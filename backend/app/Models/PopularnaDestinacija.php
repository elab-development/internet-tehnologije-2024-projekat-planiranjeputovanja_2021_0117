<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PopularnaDestinacija extends Model
{
    use HasFactory;

    protected $table = 'popularna_destinacija';
    protected $guarded = []; // dozvoljava mass assignment za sve kolone

    public function destinacija()
    {
        return $this->belongsTo(Destinacija::class);
    }
}

?>