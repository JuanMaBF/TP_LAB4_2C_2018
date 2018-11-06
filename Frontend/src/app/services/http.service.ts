import { Injectable } from "@angular/core";
import { Http } from "@angular/http";

@Injectable()
export class HttpService {

    private baseUrl = 'http://lvh.me/TP_LAB4_2C_2018/Backend/index.php/';

    constructor(private http: Http) {
    }

    public get(url: string): Promise<any> {
        return this.http
            .get(this.baseUrl + url)
            .toPromise()
            .then(resp => resp)               
            .catch(err => err);
    }

    public post(url: string, data: any): Promise<any> {
        return this.http
            .post(this.baseUrl + url, JSON.stringify(data))
            .toPromise()
            .then(resp => resp)
            .catch(err => err);
    }

}