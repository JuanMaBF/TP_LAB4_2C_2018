import { Component } from "@angular/core";
import { Pedido } from "src/app/model/pedido";
import { PedidoService } from "src/app/services/pedido.service";
import { AuthService } from "src/app/services/auth.service";
import * as Highcharts from 'highcharts';

@Component({
    selector: 'estadisticas',
    templateUrl: './estadisticas.component.html'
}) export class EstadisticasComponent {

    public allPedidos: Array<Pedido> = new Array<Pedido>();

    constructor(private pedidosService: PedidoService,
        public authService: AuthService) {
            this.treerTodos();
    }

    private treerTodos() {
        let token = this.authService.getCurrentUser().token;
        this.pedidosService
            .traerTodos(token)
            .then(pedidos => { 
                this.allPedidos = pedidos;
                this.initChart();
                console.log(pedidos);
            });
    }

    private initChart(): void {
        $(function () { 
            var myChart = Highcharts.chart('container', {
                chart: { type: 'bar' },
                title: { text: 'Fruit Consumption' },
                xAxis: {
                    categories: ['Apples', 'Bananas', 'Oranges']
                },
                yAxis: {
                    title: {
                        text: 'Fruit eaten'
                    }
                },
                series: [{
                    name: 'Jane',
                    data: [1, 0, 4]
                }, {
                    name: 'John',
                    data: [5, 7, 3]
                }]
            });
        });
    }

}