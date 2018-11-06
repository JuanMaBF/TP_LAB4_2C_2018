import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
    selector: 'inicio',
    templateUrl: './inicio.component.html'
}) export class InicioComponent implements OnInit {
    
    constructor(private router: Router) {
    }

    public ngOnInit(): void {
        let usr = localStorage.getItem('comanda-usr');
        if(!usr) {
            this.router.navigate(['login']);
        }
    }

}