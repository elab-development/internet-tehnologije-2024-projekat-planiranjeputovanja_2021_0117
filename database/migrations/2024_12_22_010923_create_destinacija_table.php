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
        Schema::create('destinacija', function (Blueprint $table) {
            $table->id();
            $table->string('naziv');
            $table->string('drzava');
            $table->decimal('prosecni_troskovi',10,2);
            $table->text('opis');
            $table->timestamps();
        });
    }


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('destinacija');
    }
};
