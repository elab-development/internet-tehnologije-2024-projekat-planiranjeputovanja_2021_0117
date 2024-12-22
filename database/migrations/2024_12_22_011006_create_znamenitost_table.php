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
        Schema::create('znamenitosti', function (Blueprint $table) {
            $table->id();
            $table->foreignId('destinacija_id')->constrained()->onDelete('cascade');
            $table->string('naziv');
            $table->text('opis');
            $table->decimal('cena_ulaznice', 10, 2);
        });
    }


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('znamenitost');
    }
};
