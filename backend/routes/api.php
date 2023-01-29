<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\DebtController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::controller(AuthController::class)->group(function () {
    Route::post('/registration','registration');
    Route::post('/login','login');
    Route::post('/check-token','checkToken');
    Route::post('/refresh','refreshTokens');
});

Route::controller(DebtController::class)->middleware('authedUser')->group(function () {
    Route::get('/debts-by-house/{build_id}','getHouseDebtors');
    Route::get('/debts-by-house-and-months/{build_id}/{months}','getHouseDebtorsByMonthsQuant');
    Route::get('/debts-by-months/{months}','getDebtorsByMonthsQuant');
});

Route::controller(HouseController::class)->middleware('authedUser')->group(function () {
    Route::get('/houses','getHouses');
});
