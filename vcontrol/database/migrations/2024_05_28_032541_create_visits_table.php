<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('visits', function (Blueprint $table) {
            $table->id();
            $table->integer('visitors_id')
                ->references('id')->on('visitors');
            $table->integer('residences_id')
                ->references('id')->on('houstings');
            $table->integer('residents_id')->nullable(true)
                ->references('id')->on('residents');
            $table->integer('type_visits_id')
                ->references('id')->on('type_visits');
            $table->timestamps();
            $table->string('car_license_plate')->nullable(true);
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('visits');
    }
};
