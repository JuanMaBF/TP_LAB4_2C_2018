import { Injectable } from "@angular/core";
import { HttpService } from "./http.service";
import { Pedido } from "../model/pedido";
import { AuthService } from "./auth.service";
import { Router } from "@angular/router";

@Injectable()
export class PedidoService {

    constructor(public httpService: HttpService,
        public authService: AuthService,
        private router: Router) {
    }

    public altaPedidos(token: String, pedidos: Array<Pedido>): Promise<any> {
        let data = {
            pedidos: pedidos,
            token: token
        }
        return this.httpService
            .post('altaPedidos', data)
            .then(rta => this.handleRta(rta));
    }

    private handleRta(rta: any) {
        if(rta.text() == 'TokenExpirado') {
            this.authService.logout();
            this.router.navigate(['/login']);
        } else {
            return rta;
        }
    }

}