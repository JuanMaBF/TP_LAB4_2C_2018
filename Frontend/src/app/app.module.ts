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
import { PedidoService } from './services/pedido.service';
import { EstadisticasComponent } from './pages/estadisticas/estadisticas.component';
import { ChartModule, HIGHCHARTS_MODULES } from 'angular-highcharts';
import exporting from 'highcharts/modules/exporting.src.js';
import { Ng2UploaderModule } from 'ng2-uploader';

let router: Routes = [
  { path:'', component: InicioComponent},
  { path: 'login', component: LoginComponent},
  { path: 'registro', component: RegistroComponent},
  { path: 'usuario', component: UsuarioComponent},
  { path: 'formulario', component: FormularioComponent},
  { path: 'estadisticas', component: EstadisticasComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    InicioComponent,
    UsuarioComponent,
    RegistroComponent,
    FormularioComponent,
    EstadisticasComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(router),
    HttpModule,
    FormsModule,
    RecaptchaModule.forRoot(),
    NgbModule.forRoot(),
    ChartModule,
    Ng2UploaderModule
  ],
  providers: [
    HttpService,
    AuthService,
    PedidoService,
    { provide: HIGHCHARTS_MODULES, useFactory: ()=>{return [exporting]} }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
