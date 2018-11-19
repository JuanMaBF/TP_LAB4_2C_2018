import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <header>
      <nav class="navbar navbar-fixed-top">
          <h2>La comanda</h2>
      </nav>
    </header>
    <router-outlet></router-outlet>
  `,
  styles: [`
    `]
})
export class AppComponent {
  
}
