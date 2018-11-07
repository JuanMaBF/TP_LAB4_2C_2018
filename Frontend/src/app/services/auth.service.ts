import { Injectable } from "@angular/core";
import { HttpService } from "./http.service";
import { Usuario } from "../model/usuario";

@Injectable()
export class AuthService {

    constructor(private httpService: HttpService) {
    }

    public login(usuario: Usuario): Promise<any> {
        return this.httpService
            .post('login', usuario)
            .then(rta => console.log(rta));
    }

    public logout() {
        localStorage.removeItem('comanda-usr');
    }

}