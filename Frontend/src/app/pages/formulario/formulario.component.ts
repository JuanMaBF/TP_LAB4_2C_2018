import { Component } from "@angular/core";
import { Pedido } from "src/app/model/pedido";

@Component({
    selector: 'formulario',
    templateUrl: './formulario.component.html'
}) export class FormularioComponent {

    public pedidosList: Array<Pedido> = new Array<Pedido>();
    
    constructor() {
        this.addPedido();
    }

    public addPedido(): void {
        this.pedidosList.push(new Pedido());
    }

    public removePedido(pedido: Pedido): void {
        this.pedidosList = this.pedidosList.filter(p => p != pedido);
    }

}