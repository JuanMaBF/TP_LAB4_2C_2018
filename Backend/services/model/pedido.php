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
    public $mozo;

    function __construct($id, $nombre, $cantidad, $estado, $asignado, $iniciado, $estimado, $mesa, $mozo) {
        $this->id = $id;
        $this->nombre = $nombre;
        $this->cantidad = $cantidad;
        $this->estado = $estado;
        $this->asignado = $asignado;
        $this->iniciado = $iniciado;
        $this->estimado = $estimado;
        $this->mesa = $mesa;
        $this->mozo = $mozo;
    }

}

?>