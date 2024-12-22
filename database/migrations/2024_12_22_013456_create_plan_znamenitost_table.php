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
        Schema::create('plan_znamenitost', function (Blueprint $table) {
            $table->id();
            $table->foreignId('plan_putovanja_id')->constrained('plan_putovanja')->onDelete('cascade'); 
            $table->foreignId('znamenitost_id')->constrained('znamenitosti')->onDelete('cascade');
            $table->timestamps(); 
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('plan_znamenitost');
    }
};
