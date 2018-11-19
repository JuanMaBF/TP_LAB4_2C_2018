<?php

require('model/pedido.php');

class PedidoService extends BaseService {

    public static function TraerTodos() {
        $conn = parent::doConnection();
        $result = $conn->query("SELECT * FROM Lab4SP.Pedidos");
        $listaPedidos = array();
        if ($result->num_rows > 0) {
            while($row = $result->fetch_assoc()) {
                //return $row;
                array_push($listaPedidos, new Pedido($row['Id'], $row['Nombre'], $row['Cantidad']
                    ,$row['Estado'], $row['Asignado'], $row['Iniciado'],$row['Estimado'], $row['Mesa']
                    , $row['Mozo']));
            }
        }
        $conn->close();
        return $listaPedidos;
    }    

    public static function Alta($pedido) {
        $conn = parent::doConnection();
        $sql = "INSERT INTO Lab4SP.Pedidos (Nombre, Cantidad, Estado, Iniciado, Mesa, Mozo) 
                VALUES ('$pedido->nombre', '$pedido->cantidad', '$pedido->estado'
                        , '$pedido->iniciado', '$pedido->mesa', '$pedido->mozo')";
        $conn->query($sql);
        $conn->close();
        return 'ok';
    }

}

?>