<?php

use App\Http\Controllers\Api\ResidenceController;
use App\Http\Controllers\Api\ResidentController;
use App\Http\Controllers\Api\TypeVisitController;
use App\Http\Controllers\Api\VisitController;
use App\Http\Controllers\Api\VisitorController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\UserTypeController;
use App\Http\Controllers\Api\UserController;

Route::post("/auth/login", [AuthController::class, "login"]);
Route::post("/auth/reset-password", [AuthController::class, "resetPassword"]);
Route::post("/auth/create-password", [AuthController::class, "createPassword"]);

//only authenticated
Route::group(["middleware" => ["auth:sanctum"]], function () {
    Route::get("/auth/profile", [AuthController::class, "profile"]);
    Route::delete("/auth/logout", [AuthController::class, "logout"]);
    Route::put("/users/update-password/{id}", [UserController::class, "updatePassword"]);
    
    Route::get("/visitors", [VisitorController::class, "index"]);
    Route::get("/visitors/{id}", [VisitorController::class, "show"]);
    Route::post("/visitors", [VisitorController::class, "store"]);
    Route::delete("/visitors/{id}", [VisitorController::class, "destroy"]);
    Route::put("/visitors/{id}", [VisitorController::class, "update"]);

    Route::get("/residences", [ResidenceController::class, "index"]);
    Route::get("/residences/{id}", [ResidenceController::class, "show"]);
    Route::post("/residences", [ResidenceController::class, "store"]);
    Route::delete("/residences/{id}", [ResidenceController::class, "destroy"]);
    Route::put("/residences/{id}", [ResidenceController::class, "update"]);

    Route::get("/residents", [ResidentController::class, "index"]);
    Route::get("/residents/{id}", [ResidentController::class, "show"]);
    Route::post("/residents", [ResidentController::class, "store"]);
    Route::delete("/residents/{id}", [ResidentController::class, "destroy"]);
    Route::put("/residents/{id}", [ResidentController::class, "update"]);

    Route::get("/visits", [VisitController::class, "index"]);
    Route::get("/visits/{id}", [VisitController::class, "show"]);
    Route::get("/visits/{id}/leave", [VisitController::class, "leave"]);
    Route::post("/visits", [VisitController::class, "store"]);
    Route::delete("/visits/{id}", [VisitController::class, "destroy"]);
    Route::put("/visits/{id}", [VisitController::class, "update"]);
});

Route::group(["middleware" => ["auth:sanctum", 'abilities:configs']], function () {
    Route::get("/type-visits", [TypeVisitController::class, "index"]);
    Route::get("/type-visits/{id}", [TypeVisitController::class, "show"]);
    Route::post("/type-visits", [TypeVisitController::class, "store"]);
    Route::put("/type-visits/{id}", [TypeVisitController::class, "update"]);
    Route::delete("/type-visits/{id}", [TypeVisitController::class, "destroy"]);
});

//users
Route::group(["middleware" => ["auth:sanctum", 'abilities:users']], function () {
    Route::get("/users", [UserController::class, "index"]);
    Route::get("/users/{id}", [UserController::class, "show"]);
    Route::post("/users", [UserController::class, "store"]);
    Route::put("/users/{id}", [UserController::class, "update"]);
    Route::delete("/users/{id}", [UserController::class, "destroy"]);
});
//user-type
Route::group(["middleware" => ["auth:sanctum", 'abilities:abilities,users']], function () {
    Route::get("/user-types", [UserTypeController::class, "index"]);
});
Route::group(["middleware" => ["auth:sanctum", 'abilities:abilities']], function () {
    Route::get("/user-types/abilities", [UserTypeController::class, "abilitiesList"]);
    Route::get("/user-types/{id}", [UserTypeController::class, "show"]);
    Route::post("/user-types", [UserTypeController::class, "store"]);
    Route::put("/user-types/{id}", [UserTypeController::class, "update"]);
    Route::delete("/user-types/{id}", [UserTypeController::class, "destroy"]);
});