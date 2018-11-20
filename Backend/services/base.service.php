<?php

class BaseService {

    public static function doConnection() {
        $servername = "localhost";
        $username = "id7281007_admin2";
        $password = "12345";
        $conn = new mysqli($servername, $username, $password);
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        } 
        return $conn;
    }

}


?>