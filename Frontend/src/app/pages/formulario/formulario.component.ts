import { Component } from "@angular/core";
import { Pedido } from "src/app/model/pedido";
import { PedidoService } from "src/app/services/pedido.service";
import { AuthService } from "src/app/services/auth.service";

@Component({
    selector: 'formulario',
    templateUrl: './formulario.component.html'
}) export class FormularioComponent {

    public mesa: string;
    public pedidosList: Array<Pedido> = new Array<Pedido>();
    public errorMessage: string;
    
    constructor(private pedidosService: PedidoService,
        public authService: AuthService) {
        this.addPedido();
    }

    public addPedido(): void {
        this.pedidosList.push(new Pedido());
    }

    public removePedido(pedido: Pedido): void {
        this.pedidosList = this.pedidosList.filter(p => p != pedido);
    }

    public cargarPedidos() {
        if(!this.mesa) {
            this.errorMessage = 'Seleccione un numero de mesa';
            return;
        }
        let pedidosValid = true;
        let currentUser = this.authService.getCurrentUser();
        this.pedidosList.forEach(p => {
            if(!p.cantidad || !p.nombre) {
                pedidosValid = false;
            } else {
                p.asignado = currentUser['user'];
                p.estado = 'Pendiente';
                p.iniciado = new Date().toLocaleString();
                p.mesa = this.mesa;
            }
        });
        if(pedidosValid) {
            this.pedidosService.altaPedidos(this.pedidosList);
        }
    }

}