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
        Schema::create('pets', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('user_id')->constrained()->onDelete('cascade');
            $table->string('name');
            $table->string('species'); 
            $table->string('breed')->nullable();
            $table->integer('age')->nullable();
            $table->text('description')->nullable();
            $table->string('gender')->nullable(); 
            $table->json('vaccinations')->nullable();
            $table->json('allergies')->nullable();
            $table->string('location')->nullable();
            $table->json('images')->nullable(); 
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pets');
    }
};
