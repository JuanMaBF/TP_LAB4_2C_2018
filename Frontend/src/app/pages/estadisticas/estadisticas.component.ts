import { Component } from "@angular/core";
import { Pedido } from "src/app/model/pedido";
import { PedidoService } from "src/app/services/pedido.service";
import { AuthService } from "src/app/services/auth.service";
import * as Highcharts from 'highcharts';
import { ExcelService } from "src/app/services/excel.service";
declare var $: any;

@Component({
    selector: 'estadisticas',
    templateUrl: './estadisticas.component.html'
}) export class EstadisticasComponent {

    public allPedidos: Array<Pedido> = new Array<Pedido>();

    constructor(private pedidosService: PedidoService,
        public authService: AuthService,
        public excelService: ExcelService) {
            this.treerTodos();
    }

    private treerTodos() {
        let token = this.authService.getCurrentUser().token;
        this.pedidosService
            .traerTodos(token)
            .then(pedidos => { 
                this.allPedidos = pedidos;
                this.initItemsChart();
                this.initMesaChart();
                this.initMozoChart();
            });
    }

    private initItemsChart(): void {
       let vinoTinto = this.countItems('nombre', 'Vino tinto');
       let vinoBlanco = this.countItems('nombre', 'Vino blanco');
       let cervezaRubia = this.countItems('nombre', 'Cerveza rubia');
       let cervezaNegra = this.countItems('nombre', 'Cerveza negra');
       let empanada = this.countItems('nombre', 'Empanada');
       let tarta = this.countItems('nombre', 'Tarta');
       let torta = this.countItems('nombre', 'Torta');
        $(function () { 
            Highcharts.chart('containerItems', {
                chart: {
                    type: 'column'
                },
                title: {
                    text: 'Items más pedidos'
                },
                subtitle: {
                    text: 'Source: <a href="http://en.wikipedia.org/wiki/List_of_cities_proper_by_population">Wikipedia</a>'
                },
                xAxis: {
                    type: 'category',
                    labels: {
                        rotation: -45,
                        style: {
                            fontSize: '13px',
                            fontFamily: 'Verdana, sans-serif'
                        }
                    }
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: 'Items pedidos totales'
                    }
                },
                legend: {
                    enabled: false
                },
                tooltip: {
                    pointFormat: 'Se pidieron un total de <b>{point.y:.0f}</b>'
                },
                series: [{
                    name: 'Items',
                    data: [
                        ['Vino tinto', vinoTinto],
                        ['Vino blanco', vinoBlanco],
                        ['Cerveza rubia', cervezaRubia],
                        ['Cerveza negra', cervezaNegra],
                        ['Empanada', empanada],
                        ['Tarta', tarta],
                        ['Torta', torta]
                    ],
                    dataLabels: {
                        enabled: true,
                        rotation: -90,
                        color: '#FFFFFF',
                        align: 'right',
                        format: '{point.y:.0f}', // one decimal
                        y: 10, // 10 pixels down from the top
                        style: {
                            fontSize: '13px',
                            fontFamily: 'Verdana, sans-serif'
                        }
                    }
                }]
            });
        });
    }

    private initMesaChart(): void {
        let mesa1 = this.countItems('mesa', '1');
        let mesa2 = this.countItems('mesa', '2');
        let mesa3 = this.countItems('mesa', '3');
        let mesa4 = this.countItems('mesa', '4');
        let mesa5 = this.countItems('mesa', '5');
        $(function() {
            Highcharts.chart('containerMesas', {
                chart: {
                    plotBackgroundColor: null,
                    plotBorderWidth: 0,
                    plotShadow: false
                },
                title: {
                    text: 'Pedidos por mesa'
                },
                tooltip: {
                    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                },
                plotOptions: {
                    pie: {
                        dataLabels: {
                            enabled: true,
                            distance: -50,
                            style: {
                                fontWeight: 'bold',
                                color: 'white'
                            }
                        },
                        startAngle: -90,
                        endAngle: 90,
                        center: ['50%', '75%'],
                        size: '110%'
                    }
                },
                series: [{
                    type: 'pie',
                    name: 'Pedidos por mesa',
                    innerSize: '50%',
                    data: [
                        ['1', mesa1],
                        ['2', mesa2],
                        ['3', mesa3],
                        ['4', mesa4],
                        ['5', mesa5],
                    ]
                }]
            });
        });
    }

    private initMozoChart(): void {
        let data = new Array<any>();
        this.allPedidos.forEach( p => {
            let find = data.find(d => d.name == p.mozo);
            if(find) {
                find.y += Number.parseInt(p.cantidad);
            } else {
                data.push({
                    name: p.mozo,
                    y: Number.parseInt(p.cantidad)
                })
            }
        })

        $(function() {
            Highcharts.chart('containerMozo', {
                chart: {
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false,
                    type: 'pie'
                },
                title: {
                    text: 'Porcentaje de pedidos por mozo'
                },
                tooltip: {
                    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: true,
                            format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                            style: {
                                color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                            }
                        }
                    }
                },
                series: [{
                    name: 'Porcentaje',
                    colorByPoint: true,
                    data: data
                }]
            });
        });
    }

    private countItems(property: string, item: string) {
        let acum = 0;
        this.allPedidos.filter(p => p[property] == item).forEach(p => {
            acum += Number.parseInt(p.cantidad);
        });
        return acum;
    }

    public exportItemsExcel(): void {
        let vinoTinto = this.countItems('nombre', 'Vino tinto');
        let vinoBlanco = this.countItems('nombre', 'Vino blanco');
        let cervezaRubia = this.countItems('nombre', 'Cerveza rubia');
        let cervezaNegra = this.countItems('nombre', 'Cerveza negra');
        let empanada = this.countItems('nombre', 'Empanada');
        let tarta = this.countItems('nombre', 'Tarta');
        let torta = this.countItems('nombre', 'Torta');

        let data = [
            {Item: 'Vino tinto', Cantidad: vinoTinto},
            {Item: 'Vino blanco', Cantidad: vinoBlanco},
            {Item: 'Cerveza rubia', Cantidad: cervezaRubia},
            {Item: 'Cerveza negra', Cantidad: cervezaNegra},
            {Item: 'Empanada', Cantidad: empanada},
            {Item: 'Tarta', Cantidad: tarta},
            {Item: 'Torta', Cantidad: torta}
        ];
        this.excelService.exportAsExcelFile(data, 'Items');
    }

    public exportMesasExcel(): void {
        let mesa1 = this.countItems('mesa', '1');
        let mesa2 = this.countItems('mesa', '2');
        let mesa3 = this.countItems('mesa', '3');
        let mesa4 = this.countItems('mesa', '4');
        let mesa5 = this.countItems('mesa', '5');

        let data = [
            { Mesa: '1', Pedidos: mesa1 },
            { Mesa: '2', Pedidos: mesa2 },
            { Mesa: '3', Pedidos: mesa3 },
            { Mesa: '4', Pedidos: mesa4 },
            { Mesa: '5', Pedidos: mesa5 }
        ];
        this.excelService.exportAsExcelFile(data, 'Mesas');
    }

    public exportMozosExcel(): void {
        let data = new Array<any>();
        this.allPedidos.forEach( p => {
            let find = data.find(d => d.Mozo == p.mozo);
            if(find) {
                find.Cantidad += Number.parseInt(p.cantidad);
            } else {
                data.push({
                    Mozo: p.mozo,
                    Cantidad: Number.parseInt(p.cantidad)
                })
            }
        });
        this.excelService.exportAsExcelFile(data, 'Mozos');
    }

}