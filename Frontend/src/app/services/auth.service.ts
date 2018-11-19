import { Injectable } from "@angular/core";
import { HttpService } from "./http.service";
import { Usuario } from "../model/usuario";
import { Router } from "@angular/router";

@Injectable()
export class AuthService {

    constructor(private httpService: HttpService,
        private router: Router) {
    }

    public login(usuario: Usuario): Promise<any> {
        return this.httpService
            .post('login', usuario)
            .then(rta => rta.json());
    }

    public registro(usuario: Usuario): Promise<any> {
        return this.httpService
            .post('registro', usuario)
            .then(rta => rta.json());
    }

    public logout() {
        localStorage.removeItem('comanda-usr');
        this.router.navigate(['login']);
    }

    public getCurrentUser() {
        let lsValue = localStorage.getItem('comanda-usr');
        return JSON.parse(lsValue);
    }

}