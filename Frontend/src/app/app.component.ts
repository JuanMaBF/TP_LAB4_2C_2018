import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <header>
      <nav class="navbar navbar-fixed-top">
          <h2>La comanda</h2>
          <img src="assets/img/logo.png" width="50vw">
      </nav>
    </header>
    <router-outlet></router-outlet>
  `,
  styles: [`
    `]
})
export class AppComponent {
  
}
