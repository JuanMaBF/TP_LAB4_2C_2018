import { Injectable } from "@angular/core";
import { Http } from "@angular/http";

@Injectable()
export class HttpService {

    constructor(private http: Http) {
    }

    public get(url: string): Promise<any> {
        return this.http
            .get(url)
            .toPromise()
            .then(resp => resp)               
            .catch(err => err);
    }

    public post(url: string, data: any): Promise<any> {
        return this.http
            .post(url, JSON.stringify(data))
            .toPromise()
            .then(resp => resp)
            .catch(err => err);
    }

}