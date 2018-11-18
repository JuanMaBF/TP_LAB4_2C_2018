<?php

require_once 'vendor/autoload.php';
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

    public static function GetDecodedToken($token) {
        $decoded = null;
        try {
            $decoded = JWT::decode($token, self::$secret_key, self::$encryp_type);
        } catch(ExpiredException $ex) {
            return 'Expired token';
        } catch (Exception $e) {
           return 'Error';
        }
        return $decoded;
    }

    public static function TokenIsExpired($token) {
        return self::GetDecodedToken($token) == 'Expired token';
    }

    public static function GetTokenData($token) {
        $decoded = self::GetDecodedToken($token);
        return $decoded;
        if($decoded != 'Expired token' && $decoded != 'Error') {
            return $decoded->data;   
        } else {
            $decoded;
        }
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