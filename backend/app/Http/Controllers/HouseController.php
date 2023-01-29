<?php

namespace App\Http\Controllers;
use App\Services\HouseService;
use Illuminate\Http\Request;

class HouseController extends Controller
{
    public function getHouses(){
        return HouseService::getHouses();
    }
}
