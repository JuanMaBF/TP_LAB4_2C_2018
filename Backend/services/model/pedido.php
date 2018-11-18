<?php

class Pedido {

    public $id;
    public $nombre;
    public $cantidad;
    public $estado;
    public $asignado;
    public $iniciado;
    public $estimado;
    public $mesa;

    function __construct($id, $nombre, $cantidad, $estado, $adignado, $iniciado, $estimado, $mesa) {
        $this->id = $id;
        $this->nombre = $nombre;
        $this->cantidad = $cantidad;
        $this->estado = $estado;
        $this->adignado = $adignado;
        $this->iniciado = $iniciado;
        $this->estimado = $estimado;
        $this->mesa = $mesa;
    }

}

?>