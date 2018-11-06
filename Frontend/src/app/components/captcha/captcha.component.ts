import { Component } from "@angular/core";

@Component({
    selector: 'captcha',
    template: `
        {{numero1}} {{operador}} {{numero2}} = <input [(ngModel)]="resultado"/>
    `
}) export class CaptchaComponent {

    public numero1: number;
    public operator: string;
    public numero2: number;    

    

}