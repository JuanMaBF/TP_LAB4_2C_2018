import { Injectable } from "@angular/core";
import { HttpService } from "./http.service";
import { Usuario } from "../model/usuario";

@Injectable()
export class AuthService {

    constructor(private httpService: HttpService) {
    }

    public login(usuario: Usuario) {
        return this.httpService
            .post('', JSON.stringify(usuario));
    }

    public logout() {
        localStorage.removeItem('comanda-usr');
    }

}