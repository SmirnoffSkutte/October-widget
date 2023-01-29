<?php

namespace App\Http\Controllers;
use App\Services\AuthService;
use App\Services\JwtService;
use Illuminate\Http\Request;


class AuthController extends Controller
{
    public function registration(Request $request){
        $body=json_decode($request->getContent(),true);
        $username=$body['username'];
        $password=$body['password'];
        $authService=new AuthService();
        $newUser=$authService->registration($username,$password);
        return $newUser;
    }

    public function login(Request $request){
        $body=json_decode($request->getContent(),true);
        $username=$body['username'];
        $password=$body['password'];
        $authService=new AuthService();
        $user=$authService->login($username,$password);
        return $user;
    }

    public function checkToken(Request $request){
        $body=json_decode($request->getContent(),true);
        $accessToken=$body['accessToken'];
        $jwtService=new JwtService();
        $isValidToken=$jwtService->verifyToken($accessToken);
        if ($isValidToken instanceof \Illuminate\Http\JsonResponse){
            return $isValidToken;
        }
        if ($isValidToken===false){
            $resBody=json_encode([
                'isValidToken'=>'false'
            ]);
            return response($resBody,406)
                ->header('Content-Type','application/json' );
        }
        if ($isValidToken===true){
            $resBody=json_encode([
                'isValidToken'=>'true'
            ]);
            return response($resBody,200)
                ->header('Content-Type','application/json' );
        }
    }

    public function refreshTokens(Request $request){
        $body=json_decode($request->getContent(),true);
        $refreshToken=$body['refreshToken'];
        $jwtService=new JwtService();
        $newTokens=$jwtService->refreshTokenPair($refreshToken);
        return $newTokens;
    }
}
