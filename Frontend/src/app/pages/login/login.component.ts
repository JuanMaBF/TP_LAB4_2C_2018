import { Component } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import { Usuario } from "src/app/model/usuario";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styles: [`
        input {
            width: 100%;
        }
    `]
}) export class LoginComponent {

    public errorMsg: string;

    public formGroup: FormGroup;

    constructor(private authService: AuthService,
        private router: Router,
        private fb: FormBuilder) {
        this.formGroup = this.fb.group({
            usr: ['', [Validators.required]],
            pass: ['', [Validators.required]]
        });
    }

    public login() {
        let usr = this.formGroup.controls['usr'].value;
        let pass = this.formGroup.controls['pass'].value
        if(this.formGroup.controls['usr'].value && this.formGroup.controls[''].value) {
            let usuario = new Usuario(usr, pass);
            this.authService
                .login(usuario)
                .then(rta => this.handleRta(rta));
        } else {
            this.errorMsg = !usr ? "Ingrese el usuario" : !pass ? "Ingrese la contraseña" : "";
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