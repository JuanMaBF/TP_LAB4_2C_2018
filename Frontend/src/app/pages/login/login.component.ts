import { Component } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import { Usuario } from "src/app/model/usuario";
import { Router } from "@angular/router";

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styles: [`
        input {
            width: 100%;
        }
    `]
}) export class LoginComponent {
    
    public usr: string
    public pass: string;
    public errorMsg: string;

    constructor(private authService: AuthService,
        private router: Router) {
    }

    public login() {
        if(this.usr && this.pass) {
            let usuario = new Usuario(this.usr, this.pass);
            this.authService
                .login(usuario)
                .then(rta => this.handleRta(rta));
        } else {
            this.errorMsg = !this.usr ? "Usuario incorrecto" : !this.pass ? "Contraseña incorrecta" : "";
        }
    }

    public handleRta(rta: any) {
        if(rta.result == "ok") {
            localStorage.setItem('comanda-usr', JSON.stringify(rta));
            this.router.navigate(['']);
        } else {
            if(rta.error == "usrError") {
                this.errorMsg = "Usuario incorrecto";
            } else if(rta.error == "passError") {
                this.errorMsg = "Contraseña incorrecta";
            } else {
                this.errorMsg = "Error";
            }
        }
    }

}