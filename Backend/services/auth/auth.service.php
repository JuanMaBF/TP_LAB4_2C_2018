<?php 

class AuthService {

    public static function Authenticate($user, $pass) {
        $loginResponse = new LoginResponse();
        $foundUser = UsersService::TraerPorUsuario($user);
        if(count($foundUser) > 0) {
            if($foundUser->password == $pass) {
                $loginResponse->result = "ok";
                $loginResponse->token = "ahora vemos wacho";
                $loginResponse->usrType = "tu vieja";
            } else {
                $loginResponse->result = "error";
                $loginResponse->error = "usrError";
            }   
        } else {
            $loginResponse->result = "error";
            $loginResponse->error = "passError";
        }
        return $loginResponse;
    }

}

?>