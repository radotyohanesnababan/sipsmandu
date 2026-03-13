<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('rombel_borrows', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('user_nisn');
            $table->foreign('user_nisn')->references('nisn')->on('users')->onDelete('cascade');
            $table->foreignId('book_id')->constrained('books')->onDelete('cascade');
            $table->string('kelas'); 
            $table->unsignedInteger('qty');
            $table->timestamp('borrowed_at');
            $table->timestamp('due_at'); 
            $table->timestamp('returned_at')->nullable();
            $table->enum('status', ['Dipinjam', 'Dikembalikan', 'Terlambat'])->default('Dipinjam');
            $table->text('catatan')->nullable();
            $table->bigInteger('created_by');
            $table->foreign('created_by')->references('nisn')->on('users')->onDelete('cascade');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('rombel_borrows');
    }
};