<?php

require('model/pedido.php');

class PedidoService extends BaseService {

    public static function TraerTodos() {
        $conn = parent::doConnection();
        $result = $conn->query("SELECT * FROM Lab4SP.Pedidos");
        $listaPedidos = array();
        if ($result->num_rows > 0) {
            while($row = $result->fetch_assoc()) {
                array_push($listaPedidos, new Pedido($row['Pedido']));
            }
        }
        $conn->close();
        return $listaPedidos;
    }    

    public static function Alta($pedido) {
        $conn = parent::doConnection();
        $sql = "INSERT INTO Lab4SP.Pedidos (Nombre, Cantidad, Estado, Asignado, Iniciado) 
                VALUES ('$pedido->nombre', '$pedido->cantidad', '$pedido->estado', 
                        '$pedido->asignado', '$pedido->iniciado')";
        $conn->query($sql);
        $conn->close();
        return 'ok';
    }

}

?>