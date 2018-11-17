import { Injectable } from "@angular/core";
import { HttpService } from "./http.service";
import { Pedido } from "../model/pedido";

@Injectable()
export class PedidoService {

    constructor(public httpService: HttpService) {

    }

    public altaPedidos(token: String, pedidos: Array<Pedido>): Promise<any> {
        let data = {
            pedidos: pedidos,
            token: token
        }
        return this.httpService
            .post('altaPedidos', data)
            .then(rta => rta);
    }

}