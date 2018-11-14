<?php

class LoginResponse {

    public $result;
    public $error;
    public $token;
    public $user;
    public $usrType;


    function __constructor($result, $error, $token, $user, $usrType) {
        $this->result = $result;
        $this->error = $error;
        $this->token = $token;
        $this->user = $usrType;
        $this->usrType = $usrType;
    }

}

?>