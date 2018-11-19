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
                this.errorMessage = 'Complete todos los campos';
            } else {
                p.estado = 'Pendiente';
                p.iniciado = new Date().toLocaleString();
                p.mesa = this.mesa;
                p.mozo = currentUser['user'];
            }
        });
        if(pedidosValid) {
            this.pedidosService
                .altaPedidos(currentUser.token, this.pedidosList)
                .then(rta => {
                    this.mesa = "";
                    this.pedidosList = new Array<Pedido>();
                    this.addPedido();
                });
        }
    }

}