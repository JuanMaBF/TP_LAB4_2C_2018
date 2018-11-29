import { Component } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import { Usuario } from "src/app/model/usuario";
import { Router } from "@angular/router";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";

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
    
    public captchaConfirmed: boolean = false;
    public errorMsg: string;
    
    public formGroup: FormGroup;

    constructor(private authService: AuthService,
        private router: Router,
        private fb: FormBuilder) {

        this.formGroup = this.fb.group({
            usr: ['', [Validators.required]],
            pass: ['', [Validators.required]],
            confirmPass: ['', [Validators.required]],
            type: ['Mozo', [Validators.required]],
        });

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
        let usr = this.formGroup.controls['usr'].value;
        let pass = this.formGroup.controls['pass'].value;
        let type = this.formGroup.controls['type'].value;
        this.errorMsg = this.validateFields();
        if(this.errorMsg == "") {
            let usuario = new Usuario(usr, pass, type);
            this.authService
                .registro(usuario)
                .then(rta => this.handleRta(rta));
        }
    }

    public resolved(captchaResponse: any) {
        this.captchaConfirmed = true;
    }

    public validateFields(): string {
        let usr = this.formGroup.controls['usr'].value;
        let pass = this.formGroup.controls['pass'].value;
        let confirmPass = this.formGroup.controls['confirmPass'].value;
        let type = this.formGroup.controls['type'].value;
        if(!usr) {
            return "Usuario incorrecto";
        } else if (!usr) {
            return "Usuario incorrecto";
        } else if (!pass) {
            return "Contraseña incorrecta";
        } else if (type == 'Tipo de usuario') {
            return "Tipo de usuario incorrecto";
        } else if (pass != confirmPass) {
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