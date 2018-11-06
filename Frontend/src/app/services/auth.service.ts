import { Injectable } from "@angular/core";
import { HttpService } from "./http.service";
import { Usuario } from "../model/usuario";

@Injectable()
export class AuthService {

    constructor(private httpService: HttpService) {
    }

    public login(usuario: Usuario) {
        /*return this.httpService
            .post('login', JSON.stringify(usuario))
            .then(rta => console.log(rta));*/
        return this.httpService
            .post('login', {})
            .then(rta => console.log(rta));
    }

    public logout() {
        localStorage.removeItem('comanda-usr');
    }

}