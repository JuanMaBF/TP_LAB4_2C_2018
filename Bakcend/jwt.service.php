<?php

require_once './composer/vendor/autoload.php';
use Firebase\JWT\JWT;

class JWTService {

    private static $secret_key = '3570217741';
    private static $encryp_type = ['HS256'];

    public static function CreateToken($data) {
        $now = time();
        $payload = array(
        	'iat'=>$now,
            'exp' => $now + (100*100),
            'aud' => self::Aud(),
            'data' => $data
        );
        return JWT::encode($payload, self::$secret_key);
    }

    public static function VerifyToken($token) {

    }

}

?>