import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './Components/usuario/sidebar/sidebar.component';
import { PerfilComponent } from './Components/usuario/perfil/perfil.component';
import { IndexProductoComponent } from './Components/productos/index-producto/index-producto.component';
import { NavComponent } from './Components/nav/nav.component';
import { LoginComponent } from './Components/login/login.component';
import { InicioComponent } from './Components/inicio/inicio.component';
import { FooterComponent } from './Components/footer/footer.component';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap'; 

import { FormsModule } from '@angular/forms'; 
import { routing } from './app.routing';
import { HttpClientModule } from '@angular/common/http';
import { ShowProductoComponent } from './Components/productos/show-producto/show-producto.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { CarritoComponent } from './Components/carrito/carrito.component';
import { DireccionesComponent } from './Components/usuario/direcciones/direcciones.component';


@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    PerfilComponent,
    IndexProductoComponent,
    NavComponent,
    LoginComponent,
    InicioComponent,
    FooterComponent,
    ShowProductoComponent,
    CarritoComponent,
    DireccionesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    routing,
    HttpClientModule,
    NgbPaginationModule,
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
