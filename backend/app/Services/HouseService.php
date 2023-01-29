<?php

namespace App\Services;
use App\Models\House;

class HouseService
{
    public static function getHouses(){
        $data=House::all();
        return $data;
    }
}
