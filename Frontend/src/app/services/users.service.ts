import { Injectable } from "@angular/core";
import { HttpService } from "./http.service";

@Injectable()
export class UsersService {

    constructor(private httpService: HttpService) {
    }

    public login(data: {}) {
        this.httpService
            .post('', data)
            .then(rta => localStorage.setItem('comanda-usr', rta))
            .catch(err => err)
    }

    public logout() {
        localStorage.removeItem('comanda-usr');
    }

}