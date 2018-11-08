<?php

require('base.service.php');
require('model/pedido.php');

class PedidoService extends BaseService {

    public static function TraerTodos() {
        $conn = parent::doConnection();
        $result = $conn->query("SELECT * FROM Lav4SP.Pedidos");
        $listaPedidos = array();
        if ($result->num_rows > 0) {
            while($row = $result->fetch_assoc()) {
                array_push($listaPedidos, new Pedido($row['Pedido']));
            }
        }
        $conn->close();
        return $listaPedidos;
    }    

    public static function AddUser($pedido) {
        $conn = parent::doConnection();
        $sql = "INSERT INTO Lav4SP.Pedidos (Pedido) 
                VALUES ('$pedido')";
        $conn->query($sql);
        $conn->close();
        return 'ok';
    }

}

?>