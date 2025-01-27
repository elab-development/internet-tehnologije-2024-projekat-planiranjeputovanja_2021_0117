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
        Schema::create('cached_plans', function (Blueprint $table) {
            $table->id();
            $table->foreignId('plan_putovanja_id')->constrained('plan_putovanja')->onDelete('cascade');
            $table->json('data'); // Keširani JSON podaci o planu
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cached_plans');
    }
};
