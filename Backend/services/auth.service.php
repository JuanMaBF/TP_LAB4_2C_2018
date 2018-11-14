<?php 

require 'login-response.php';
require 'users.service.php';
require 'jwt.service.php';

class AuthService {

    public static function Authenticate($user, $pass) {
        $loginResponse = new LoginResponse();
        $foundUser = UsersService::TraerPorUsuario($user);
        if(count($foundUser) > 0) {
            if($foundUser->password == $pass) {
                $loginResponse->result = "ok";
                $loginResponse->token = JWTService::CreateToken($foundUser);
                $loginResponse->user = $foundUser->user;
                $loginResponse->usrType = $foundUser->type;
            } else {
                $loginResponse->result = "error";
                $loginResponse->error = "passError";
            }   
        } else {
            $loginResponse->result = "error";
            $loginResponse->error = "usrError";
        }
        return $loginResponse;
    }

}

?>