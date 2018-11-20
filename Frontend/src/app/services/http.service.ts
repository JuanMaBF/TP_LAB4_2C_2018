import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { Modal } from 'ngx-modialog/plugins/bootstrap';

@Injectable()
export class HttpService {

    private baseUrl = 'http://lvh.me/TP_LAB4_2C_2018/Backend/index.php/';

    constructor(private http: Http,
        private modal: Modal) {
    }

    public get(url: string): Promise<any> {
        return this.http
            .get(this.baseUrl + url)
            .toPromise()
            .then(resp => {
                this.showSpinner();
                return resp;
            })
            .catch(err => err);
    }

    public post(url: string, data: any): Promise<any> {
        return this.http
            .post(this.baseUrl + url, JSON.stringify(data))
            .toPromise()
            .then(resp => {
                console.log(resp);
                this.showSpinner();
                return resp;
            })
            .catch(err => err);
    }

    public showSpinner() {
        let modal = this.modal.alert()
            .size('sm')
            .showClose(false)
            .okBtnClass('invisible-btn')
            .body('<img src="../assets/img/spinner.gif" width="50%" class="margin-img">')
            .open();
        setTimeout(modal.close.bind(modal), 500);
    }

}