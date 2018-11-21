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
import { ModalModule } from 'ngx-modialog';
import { BootstrapModalModule } from 'ngx-modialog/plugins/bootstrap';
import { ExcelService } from './services/excel.service';
import { HighlightDirective } from './directives/highlight.directive';
import { RowHighlightDirective } from './directives/row-highlight.directive';
import { CargandoDirective } from './directives/cargando.directive';
import { VinoTintoPipe } from './pipes/vino-tinto.pipe';
import { MayusculaPipe } from './pipes/mayuscula.pipe';
import { SinAsignarPipe } from './pipes/sin-asignar.pipe';
import { InformacionComponent } from './pages/informacion/informacion.component';
import { Ng2UploaderModule } from './ng2-uploader';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { DropdownModule } from 'primeng/dropdown';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { UserDisabledDirective } from './directives/user-disabled.directive';

let router: Routes = [
  { path:'', component: InicioComponent},
  { path: 'login', component: LoginComponent},
  { path: 'registro', component: RegistroComponent},
  { path: 'usuario', component: UsuarioComponent},
  { path: 'formulario', component: FormularioComponent},
  { path: 'estadisticas', component: EstadisticasComponent},
  { path: 'informacion', component: InformacionComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    InicioComponent,
    UsuarioComponent,
    RegistroComponent,
    FormularioComponent,
    EstadisticasComponent,
    HighlightDirective,
    RowHighlightDirective,
    CargandoDirective,
    VinoTintoPipe,
    MayusculaPipe,
    SinAsignarPipe,
    InformacionComponent,
    UserDisabledDirective
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(router),
    HttpModule,
    FormsModule,
    RecaptchaModule.forRoot(),
    NgbModule.forRoot(),
    ChartModule,
    Ng2UploaderModule,
    ModalModule.forRoot(),
    BootstrapModalModule,
    InputTextModule,
    DropdownModule,
    PasswordModule,
    BrowserAnimationsModule,
    TableModule,
    ButtonModule
  ],
  providers: [
    HttpService,
    AuthService,
    PedidoService,
    ExcelService,
    { provide: HIGHCHARTS_MODULES, useFactory: ()=>{return [exporting]} }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
