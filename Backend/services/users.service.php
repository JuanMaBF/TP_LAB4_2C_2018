<?php

require('model/usuario.php');
require('base.service.php');

class UsersService extends BaseService {

    public static function TraerPorUsuario($usuario) {
        $conn = parent::doConnection();
        $result = $conn->query("SELECT * FROM Lab4SP.Usuarios WHERE User = '$usuario'");
        if ($result != null && $result->num_rows > 0) {
            while($row = $result->fetch_assoc()) {
                return new Usuario($row['User'], $row['Password'], $row['Type']);
            }
        }
        $conn->close();
        return null;
    }    

    public static function AddUser($user, $pass, $tipo) {
        if(self::TraerPorUsuario($user) == null) {
            $conn = parent::doConnection();
            $sql = "INSERT INTO Lab4SP.Usuarios (User, Password, Type) 
                    VALUES ('$user', '$pass', '$tipo')";
            $result = $conn->query($sql);
            return $sql;
            $conn->close();
            return 'ok';
        }
        return 'usrExist';
    }

}

?>