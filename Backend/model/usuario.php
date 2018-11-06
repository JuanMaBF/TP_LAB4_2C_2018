<?php 

class Usuario {
    public $user;
    public $password;
    public $type;

    function __constructor($user, $password, $type) {
        $this->user = $user;
        $this->password = $password;
        $this->type = $type;
    }
}

?>