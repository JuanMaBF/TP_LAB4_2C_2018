import { Injectable } from "@angular/core";
import { HttpService } from "./http.service";
import { Pedido } from "../model/pedido";

@Injectable()
export class PedidoService {

    constructor(public httpService: HttpService) {

    }

    public altaPedidos(pedidos: Array<Pedido>) {
        this.httpService
            .post('altaPedidos', pedidos)
            .then(rta => console.log(rta));
    }

}