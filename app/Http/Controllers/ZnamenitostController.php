<?php

namespace App\Http\Controllers;

use App\Models\Znamenitost;
use Illuminate\Http\Request;

class ZnamenitostController extends Controller
{
    public function index()
    {
        // Uzmi sve znamenitosti iz baze
        $znamenitosti = Znamenitost::all();

        // Vratiti ih kao JSON
        return response()->json(['znamenitosti' => $znamenitosti], 200);
    }
}
