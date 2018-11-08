<?php 

class Usuario {
    public $user;
    public $password;
    public $type;

    function __construct($user, $password, $type) {
        $this->user = $user;
        $this->password = $password;
        $this->type = $type;
    }
}

?>