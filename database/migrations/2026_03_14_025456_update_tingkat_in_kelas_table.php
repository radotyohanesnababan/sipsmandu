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
    Schema::table('kelas', function (Blueprint $table) {
        // Hapus ->unique(), biarkan hanya enum dan change
        $table->enum('tingkat', ['X', 'XI', 'XII'])->change();
    });
}

public function down(): void
{
    Schema::table('kelas', function (Blueprint $table) {
        $table->enum('tingkat', ['VII', 'VIII', 'IX'])->change();
    });
}
};
