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
        Schema::create('popularna_destinacija', function (Blueprint $table) {
            $table->id();
            $table->foreignId('destinacija_id')->constrained()->onDelete('cascade');
            $table->integer('broj_posetilaca');
            $table->timestamps();
        });
    }


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('popularna_destinacija');
    }
};
