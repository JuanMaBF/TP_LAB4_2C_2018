import { Component } from "@angular/core";
import { Pedido } from "src/app/model/pedido";
import { PedidoService } from "src/app/services/pedido.service";
import { AuthService } from "src/app/services/auth.service";
import { Modal } from 'ngx-modialog/plugins/bootstrap';

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
    public uploadFile: any;
    public hasBaseDropZoneOver: boolean = false;
    public options = { 
        url: 'http://lvh.me/TP_LAB4_2C_2018/Backend/subirImagen.php'
    };
    public sizeLimit = 2000000;
    public fileName: string;
    
    constructor(private pedidosService: PedidoService,
        private authService: AuthService,
        private modal: Modal) {
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
                });
        }
    }

    handleUpload(data): void {
        if (data && data.response) {
          data = JSON.parse(data.response);
          this.fileName = data.generatedName;
        }
        //setTimeout(console.clear.bind(console), 10);
    }
     
    fileOverBase(e:any):void {
        this.hasBaseDropZoneOver = e;
    }
    
    beforeUpload(uploadingFile): void {
        let extension = uploadingFile.originalName
            .substr(uploadingFile.originalName.lastIndexOf('.') + 1)
            .toLowerCase();
        if (uploadingFile.size > this.sizeLimit) {
            uploadingFile.setAbort();
            this.modal.alert()
                .size('lg')
                .showClose(false)
                .title('Error')
                .body('El archivo es demasiado pesado')
                .open();
        } else if (extension != 'jpg' && extension != 'png'){
            uploadingFile.setAbort();
            this.modal.alert()
                .size('lg')
                .showClose(false)
                .title('Error')
                .body('Solo se pueden subir imágenes en formato PNG o JPG')
                .open();
        }
    }

}