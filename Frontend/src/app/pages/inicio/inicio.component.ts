import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { PedidoService } from "src/app/services/pedido.service";
import { Pedido } from "src/app/model/pedido";
import { AuthService } from "src/app/services/auth.service";
import { Modal } from 'ngx-modialog/plugins/bootstrap';
import { routerTransition } from "src/app/animations/transition.animation";

@Component({
    selector: 'inicio',
    templateUrl: './inicio.component.html',
    animations: [routerTransition()],
    host: {'[@routerTransition]': ''},
    styles: [`
        #footer {
            bottom: 0;
            width: 100%;
            margin-top: 25px;
            height: 60px;      
            background-color: #f7f7f7;
            padding-top: 10px;
            padding-left: 10px;
            padding-bottom: 10px;
            margin-bottom: -5px;
            .footer-block {
                margin: 20px 0;
            }
        }
    `]
}) export class InicioComponent implements OnInit {

    public pedidos: Array<Pedido>;
    public currentFilter: string;
    public isMobile: boolean;
    public userType: string;

    constructor(private router: Router,
        private pedidosService: PedidoService,
        private authService: AuthService,
        private modal: Modal) {
        let currentUser = this.authService.getCurrentUser();
        if(currentUser) {
            this.getAllWithState('Pendiente');
            this.userType = currentUser.userType;
        } else {
            this.router.navigate['/login'];
        }
    }

    public ngOnInit(): void {
        let usr = localStorage.getItem('comanda-usr');
        if(!usr) {
            this.router.navigate(['login']);
        }
        this.isMobile = window.screen.width < 440;
        
    }

    private getAllWithState(state: string): void {
        let token = this.authService.getCurrentUser().token;
        this.pedidosService
            .traerTodos(token)
            .then(rta => { 
                let todos = rta as Array<Pedido>;
                todos = todos.reverse();
                this.pedidos = todos.filter(p => p.estado == state);
            });
        this.currentFilter = state;
    }

    public onFilterChange(filter: string) {
        if(filter != 'Todos') {
            this.getAllWithState(filter);
        } else {
            let token = this.authService.getCurrentUser().token;
            this.pedidosService
                .traerTodos(token)
                .then(rta => { this.pedidos = rta as Array<Pedido> });
            this.currentFilter = 'Todos';
        }
    }

    public verDetalle(pedido: Pedido) {
        let html = `
            <b>Pedido</b>: ${pedido.nombre} </br>
            <b>Cantidad</b>: ${pedido.cantidad} </br>
            <b>Estado</b>: ${pedido.estado} </br>
            <b>Asignado a</b>: ${pedido.asignado ? pedido.asignado : "<i>Sin definir</i>"} </br>
            <b>Tiempo estimado</b>: ${pedido.estimado ? pedido.estado :"<i>Sin definir</i>"} </br>
            <b>Mesa</b>: ${pedido.mesa} </br>
            <b>Mozo</b>: ${pedido.mozo} </br>`;
            if(pedido.imgName) {
                html += `<b>Foto</b>:<img width="100%" src="https://apitplav.000webhostapp.com/uploads/${pedido.imgName}"/>`;
            }
        
        this.modal.alert()
            .size('lg')
            .showClose(false)
            .title('Detalle')
            .body(html)
            .open()
        this.isCurrentUser('s');
    }

    public logout(): void {
        this.authService.logout();
        this.modal.alert()
            .size('lg')
            .showClose(false)
            .body('Sesion cerrada')
            .open()
    }

    public onStateChange(pedido: Pedido) {
        let token = this.authService.getCurrentUser().token;
        this.pedidosService
            .actualizarPedido(token, [pedido])
            .then(rta => this.onFilterChange(this.currentFilter));
    }

    public isCurrentUser(name: string) {
        let user = this.authService.getCurrentUser().user;
        return name == user;
    }

}