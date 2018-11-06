<?php

class UsersService extends BaseService {

    public static function TraerPorUsuario($usuario) {
        $conn = doConnection();
        $result = $conn->query("SELECT * FROM Lav4SP.Usuarios WHERE User = \'$usuario\''");
        if ($result->num_rows > 0) {
            while($row = $result->fetch_assoc()) {
                return new Usuario($row['User'], $row['Password'], $row['Type']);
            }
        }
        $conn->close();
        return null;
    }    

}

?>