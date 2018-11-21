import { Component } from "@angular/core";
import { Pedido } from "src/app/model/pedido";
import { PedidoService } from "src/app/services/pedido.service";
import { AuthService } from "src/app/services/auth.service";
import { Modal } from 'ngx-modialog/plugins/bootstrap';
import { AngularFireStorage } from 'angularfire2/storage';

@Component({
    selector: 'formulario',
    templateUrl: './formulario.component.html',
    styles: [`
        .file-button {
            color: #fff;
            background-color: #007bff;
            border-color: #007bff;
            display: inline-block;
            font-weight: 400;
            text-align: center;
            white-space: nowrap;
            vertical-align: middle;
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
            border: 1px solid transparent;
            padding: .375rem .75rem;
            font-size: 1rem;
            line-height: 1.5;
            border-radius: .25rem;
            transition: color 
                .15s ease-in-out,background-color 
                .15s ease-in-out,border-color 
                .15s ease-in-out,box-shadow 
                .15s ease-in-out;
        }

        input[type="file"] {
            display: none;
        }
    `]
}) export class FormularioComponent {

    public mesa: string;
    public pedidosList: Array<Pedido> = new Array<Pedido>();
    public errorMessage: string;
    public fileName: string;
    public fileLink: string;
    public showSpinner: boolean = false;
    
    constructor(private pedidosService: PedidoService,
        private authService: AuthService,
        private modal: Modal,
        private afStorage: AngularFireStorage) {
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
                p.imgName = this.fileName;
            }
        }); 
        if(pedidosValid) {
            this.pedidosService
                .altaPedidos(currentUser.token, this.pedidosList)
                .then(rta => {
                    this.mesa = "";
                    this.pedidosList = new Array<Pedido>();
                    this.addPedido();
                    this.errorMessage = "";
                    this.deleteImg();
                });
        }
    }

    public uploadFile(event) {
        this.showSpinner = true;
        let timeStamp = (Math.floor(Date.now() / 1000)).toString();
        let ref = this.afStorage.ref(timeStamp);
        ref.put(event.target.files[0]).then(() => {
            this.fileName = timeStamp;
            this.fileLink = "https://firebasestorage.googleapis.com/v0/b/tplab4-3498e.appspot.com/o/" + this.fileName + "?alt=media&token=8d6b919e-63c6-4998-ad7b-f041dd13ace7"
            this.showSpinner = false;
        });
      }

    public deleteImg() {
        this.fileName = undefined;
        this.fileLink = undefined;
    }

}