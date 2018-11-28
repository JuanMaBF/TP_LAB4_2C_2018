import { Component } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import { Usuario } from "src/app/model/usuario";
import { Router } from "@angular/router";

@Component({
    selector: 'registro',
    templateUrl: './registro.component.html',
    styles: [`
        input {
            width: 100%;
        }
    `]
}) export class RegistroComponent {
    
    public tiposUsuario: Array<any>;
    public usr: string
    public pass: string;
    public confirmPass: string;
    public captchaConfirmed: boolean = false;
    public type: string = 'Tipo de usuario';
    public errorMsg: string;

    constructor(private authService: AuthService,
        private router: Router) {
        this.tiposUsuario = [
            {label:'Mozo', value: 'Mozo'},
            {label:'Socio', value: 'Socio'},
            {label:'Cocinero (Cocina)', value: 'CocineroCoc'},
            {label:'Cocinero (Postres)', value: 'CocineroPost'},
            {label:'Cervecero', value: 'Cervecero'},
            {label:'Bartender', value: 'Bartender'}
        ]
    }

    public registro(): void {
        this.errorMsg = this.validateFields();
        if(this.errorMsg == "") {
            let usuario = new Usuario(this.usr, this.pass, this.type);
            this.authService
                .registro(usuario)
                .then(rta => this.handleRta(rta));
        }
    }

    public resolved(captchaResponse: any) {
        this.captchaConfirmed = true;
    }

    public validateFields(): string {
        if(!this.usr) {
            return "Usuario incorrecto";
        } else if (!this.usr) {
            return "Usuario incorrecto";
        } else if (!this.pass) {
            return "Contraseña incorrecta";
        } else if (this.type == 'Tipo de usuario') {
            return "Tipo de usuario incorrecto";
        } else if (this.pass != this.confirmPass) {
            return "Las contraseñas no coinciden";
        } else if (!this.captchaConfirmed) {
            return "Confirme el captcha";
        }
        return "";
    }

    public handleRta(rta: any): void {
        if(rta.error == "usrExist") {
            this.errorMsg = "Este usuario ya existe";
        } else if(rta.error == "passError") {
            this.errorMsg = "Error en el servidor.";
        } else if(rta.result == "ok"){
            localStorage.setItem('comanda-usr', JSON.stringify(rta));
            this.router.navigate([''])
        }
    }

}