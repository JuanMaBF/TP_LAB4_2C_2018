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
            'aud' => self::GetAud(),
            'data' => $data
        );
        return JWT::encode($payload, self::$secret_key);
    }

    public static function GetTokenData($token) {
        $decoded = null;
        try {
            $decoded = JWT::decode($token, self::$claveSecreta, self::$tipoEncriptacion);
        } catch (ExpiredException $e) {
           throw new Exception("Token invalido");
        }
        if($decodificado->aud !== self::Aud()) {
            throw new Exception("No es el usuario valido");
        }
        return $decoded->data;
    }

    private static function GetAud()
    {
        $aud = null;
        if (!empty($_SERVER['HTTP_CLIENT_IP'])) {
            $aud = $_SERVER['HTTP_CLIENT_IP'];
        } elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
            $aud = $_SERVER['HTTP_X_FORWARDED_FOR'];
        } else {
            $aud = $_SERVER['REMOTE_ADDR'];
        }
        $aud .= @$_SERVER['HTTP_USER_AGENT'];
        $aud .= gethostname();
        return sha1($aud);
    }

}

?>