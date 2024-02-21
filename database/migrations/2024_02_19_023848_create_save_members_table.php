<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
      Schema::create('tblMember', function (Blueprint $table) {
        $table->id();
        $table->string('FullName');
        $table->string('Email')->nullable();
        $table->string('Mobile')->nullable();
        $table->string('User')->nullable();
        $table->timestamps();
      });

      DB::statement("ALTER TABLE tblMember ADD UserImage LONGBLOB AFTER User");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
      Schema::dropIfExists('tblMember');
    }
  };
