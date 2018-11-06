<?php

class LoginResponse {

    public $result;
    public $error;
    public $token;
    public $usrType;


    function __constructor($result, $error, $token, $usrType) {
        $this->result = $result;
        $this->error = $error;
        $this->token = $token;
        $this->usrType = $usrType;
    }

}

?>