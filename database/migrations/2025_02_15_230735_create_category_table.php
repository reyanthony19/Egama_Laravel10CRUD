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
        Schema::create('category', function (Blueprint $table) {
            $table->id();
            $table->enum("name", ["T Shirt", "Mugs", "Lanyards"])->default("T Shirt");
            $table->enum("size", ["Small", "Medium", "Large"])->default("Medium");
            $table->unsignedBigInteger("category_id");
            $table->foreign("category_id")->references("id")->on("products")->onDelete("cascade")->onUpdate("cascade");
            $table->timestamps();
  
        


        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('category');
    }
};
