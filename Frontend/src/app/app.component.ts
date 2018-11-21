import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <header>
      <nav class="navbar navbar-fixed-top">
          <h2>La comanda</h2>
          <img src="assets/img/logo.png" width="50vw" [routerLink]="['informacion']">
      </nav>
    </header>
    <router-outlet></router-outlet>
  `,
  styles: [`
    img {
      cursor: pointer;
    }
    `]
})
export class AppComponent {
  
}
