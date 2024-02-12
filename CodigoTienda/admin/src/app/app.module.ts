import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { InicioComponent } from './Components/inicio/inicio.component';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { routing } from './app.routing';
import { SidebarComponent } from './Components/sidebar/sidebar.component';
import { LoginComponent } from './Components/login/login.component';
import { IndexClienteComponent } from './Components/Clientes/index-cliente/index-cliente.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import {MatSelectModule} from '@angular/material/select';
import { MatMenuModule  } from '@angular/material/menu'
import { MatButtonModule } from '@angular/material/button';
import { CreateClienteComponent } from './Components/Clientes/create-cliente/create-cliente.component';
import { EditClienteComponent } from './Components/Clientes/edit-cliente/edit-cliente.component';

import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CreateProductoComponent } from './Components/productos/create-producto/create-producto.component';
import { EditProductoComponent } from './Components/productos/edit-producto/edit-producto.component';

import { NgxTinymceModule } from 'ngx-tinymce';
import { IndexProductoComponent } from './Components/productos/index-producto/index-producto.component';
import { InventarioComponent } from './Components/productos/inventario/inventario.component';
import { CreateCuponComponent } from './Components/cupones/create-cupon/create-cupon.component';
import { IndexCuponComponent } from './Components/cupones/index-cupon/index-cupon.component';
import { EditCuponComponent } from './Components/cupones/edit-cupon/edit-cupon.component';
import { ConfigComponent } from './Components/config/config.component';
import { VariedadProductosComponent } from './Components/productos/variedad-productos/variedad-productos.component';
import { GaleriaProductosComponent } from './Components/productos/galeria-productos/galeria-productos.component';


@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    SidebarComponent,
    LoginComponent,
    IndexClienteComponent,
    CreateClienteComponent,
    EditClienteComponent,
    CreateProductoComponent,
    EditProductoComponent,
    IndexProductoComponent,
    InventarioComponent,
    CreateCuponComponent,
    IndexCuponComponent,
    EditCuponComponent,
    ConfigComponent,
    VariedadProductosComponent,
    GaleriaProductosComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    routing,
    BrowserAnimationsModule,
    MatPaginatorModule,
    MatTableModule,
    MatSelectModule,
    MatMenuModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatProgressSpinnerModule,
    NgxTinymceModule.forRoot({
      baseURL:'../../../assets/tinymce/'
    })
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
