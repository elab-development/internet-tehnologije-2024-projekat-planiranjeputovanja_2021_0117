<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('znamenitost', function (Blueprint $table) {
            $table->string('opis', 300)->change();
        });
    }

    public function down(): void
    {
        Schema::table('znamenitost', function (Blueprint $table) {
            $table->text('opis')->change(); // vraćanje na originalni tip
        });
    }
};
