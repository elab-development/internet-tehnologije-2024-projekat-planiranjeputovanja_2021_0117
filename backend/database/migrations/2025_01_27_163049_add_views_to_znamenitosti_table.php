<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('znamenitosti', function (Blueprint $table) {
            $table->unsignedBigInteger('broj_pregleda')->default(0)->after('cena_ulaznice');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('znamenitosti', function (Blueprint $table) {
            $table->dropColumn('broj_pregleda');
        });
    }
};
