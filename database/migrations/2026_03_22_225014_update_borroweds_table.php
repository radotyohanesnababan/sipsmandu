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
    Schema::table('borroweds', function (Blueprint $table) {
        $table->date('borrowed_at')->nullable()->change();
        $table->enum('status', ['pending', 'active', 'returned', 'expired', 'cancelled'])
              ->default('pending')
              ->after('book_id');
        $table->timestamp('expired_at')->nullable()->after('status');
    });
}

public function down(): void
{
    Schema::table('borroweds', function (Blueprint $table) {
        $table->date('borrowed_at')->nullable(false)->change();
        $table->dropColumn(['status', 'expired_at']);
    });
}
};
