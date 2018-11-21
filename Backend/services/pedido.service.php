<?php

require('model/pedido.php');

class PedidoService extends BaseService {

    public static function TraerTodos() {
        $conn = parent::doConnection();
        $result = $conn->query("SELECT * FROM id7281007_labtp.Pedidos");
        $listaPedidos = array();
        if ($result->num_rows > 0) {
            while($row = $result->fetch_assoc()) {
                array_push($listaPedidos, new Pedido($row['Id'], $row['Nombre'], $row['Cantidad']
                    ,$row['Estado'], $row['Asignado'], $row['Iniciado'],$row['Estimado'], $row['Mesa']
                    , $row['Mozo'], $row['ImgName']));
            }
        }
        $conn->close();
        return $listaPedidos;
    }    

    public static function Alta($pedido) {
        $conn = parent::doConnection();
        $sql = "INSERT INTO id7281007_labtp.Pedidos (Nombre, Cantidad, Estado, Iniciado, Mesa, Mozo, ImgName) 
                VALUES ('$pedido->nombre', '$pedido->cantidad', '$pedido->estado', '$pedido->iniciado', 
                        '$pedido->mesa', '$pedido->mozo', '$pedido->imgName')";
        $conn->query($sql);
        $conn->close();
        return 'ok';
    }

    public static function Update($pedido) {
        $conn = parent::doConnection();
        $sql = "UPDATE id7281007_labtp.Pedidos 
                SET Nombre = '$pedido->nombre', Cantidad = '$pedido->cantidad', Estado = '$pedido->estado', 
                    Iniciado = '$pedido->iniciado', Mesa = '$pedido->mesa', Mozo = '$pedido->mozo', 
                    Asignado = '$pedido->asignado', Estimado = '$pedido->estimado', ImgName = '$pedido->imgName'
                WHERE Id = $pedido->id";
        $conn->query($sql);
        $conn->close();
        return 'ok';
    }

}

?>