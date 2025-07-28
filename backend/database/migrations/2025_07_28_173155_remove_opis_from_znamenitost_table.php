<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('znamenitost', function (Blueprint $table) {
            $table->dropColumn('opis');
        });
    }

    public function down(): void
    {
        Schema::table('znamenitost', function (Blueprint $table) {
            $table->text('opis')->nullable(); // pod pretpostavkom da je bio `text`
        });
    }

};
