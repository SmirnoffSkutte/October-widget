<?php

namespace App\Services;
use App\Models\Debt;

class DebtService
{
    public static function getHouseDebtors(int $build_id){
        $data=Debt::where('build_id',$build_id)->orderBy('quant_bal','desc')->get();
        return $data;
    }

    public static function getDebtorsByMonthsQuant(int $monthsQuant){
        $data=Debt::where([
            ['quant_month','>=',$monthsQuant]
        ])->orderBy('quant_bal','desc')->get();
        return $data;
    }

    public static function getHouseDebtorsByMonthsQuant(int $build_id,int $monthsQuant){
        $data=Debt::where([
            ['build_id','=',$build_id],
            ['quant_month','>=',$monthsQuant]
        ])->orderBy('quant_bal','desc')->get();
        return $data;
    }
}
