<?php 

include '../services/users.service.php';

class AuthService {

    public static function Authenticate($user, $pass) {
        $foundUser = UsersService.TraerPorUsuario($user);

    }

}

?>