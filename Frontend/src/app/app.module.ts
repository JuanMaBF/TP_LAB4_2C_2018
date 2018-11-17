import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { UsuarioComponent } from './pages/usuario/usuario.component';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';
import { HttpService } from './services/http.service';
import { AuthService } from './services/auth.service';
import { FormsModule } from '@angular/forms';
import { RegistroComponent } from './pages/registro/registro.component';
import { RecaptchaModule } from 'ng-recaptcha';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormularioComponent } from './pages/formulario/formulario.component';

let router: Routes = [
  { path:'', component: InicioComponent},
  { path: 'login', component: LoginComponent},
  { path: 'registro', component: RegistroComponent},
  { path: 'usuario', component: UsuarioComponent},
  { path: 'formulario', component: FormularioComponent},
]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    InicioComponent,
    UsuarioComponent,
    RegistroComponent,
    FormularioComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(router),
    HttpModule,
    FormsModule,
    RecaptchaModule.forRoot(),
    NgbModule.forRoot()
  ],
  providers: [
    HttpService,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
