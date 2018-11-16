<?php

require('model/usuario.php');
require('base.service.php');

class UsersService extends BaseService {

    public static function TraerPorUsuario($usuario) {
        $conn = parent::doConnection();
        $result = $conn->query("SELECT * FROM Lab4SP.Usuarios WHERE User = '$usuario'");
        if ($result != null && $result->num_rows > 0) {
            while($row = $result->fetch_assoc()) {
                return new Usuario($row['User'], $row['Pass'], $row['Type']);
            }
        }
        $conn->close();
        return "NO-EXISTE";
    }    

    public static function AddUser($user, $pass, $tipo) {
        $foundUser = UsersService::TraerPorUsuario($user);
        if($foundUser == "NO-EXISTE") {
            $conn = parent::doConnection();
            $sql = "INSERT INTO Lab4SP.Usuarios (User, Pass, Type) 
                    VALUES ('$user', '$pass', '$tipo')";
            $result = $conn->query($sql);
            $conn->close();
            return 'ok';
        }
        return '{ "error": "usrExist" }';
    }

}

?>