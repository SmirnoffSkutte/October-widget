<?php

namespace App\Http\Controllers;

use App\Services\DebtService;
use Illuminate\Http\Request;

class DebtController extends Controller
{
    public function getHouseDebtors($build_id){
        return DebtService::getHouseDebtors($build_id);
    }

    public function getHouseDebtorsByMonthsQuant($build_id,$months){
       return DebtService::getHouseDebtorsByMonthsQuant($build_id,$months);
    }

    public function getDebtorsByMonthsQuant($months){
        return DebtService::getDebtorsByMonthsQuant($months);
    }
}
