import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { UsuarioComponent } from './pages/usuario/usuario.component';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';
import { HttpService } from './services/http.service';
import { UsersService } from './services/users.service';

let router: Routes = [
  { path:'', component: InicioComponent},
  { path: 'login', component: LoginComponent},
  { path: 'usuario', component: UsuarioComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    InicioComponent,
    UsuarioComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(router),
    HttpModule
  ],
  providers: [
    HttpService,
    UsersService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
