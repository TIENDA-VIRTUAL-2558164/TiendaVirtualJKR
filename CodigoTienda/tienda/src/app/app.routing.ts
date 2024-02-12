import { Routes,RouterModule } from "@angular/router";
import { ModuleWithProviders } from "@angular/core";
import { InicioComponent } from "./Components/inicio/inicio.component";
import { LoginComponent } from "./Components/login/login.component";
import { PerfilComponent } from "./Components/usuario/perfil/perfil.component";

import { authGuard } from "./guards/auth.guard";
import { IndexProductoComponent } from "./Components/productos/index-producto/index-producto.component";
import { ShowProductoComponent } from "./Components/productos/show-producto/show-producto.component";

const appRoute : Routes = [
    {path: '', component:InicioComponent },
    {path: 'login', component:LoginComponent },

    {path: 'Cuenta/perfil', component:PerfilComponent,canActivate:[authGuard] },

    {path: 'productos', component:IndexProductoComponent },

    {path: 'productos/categoria/:categoria', component:IndexProductoComponent },
    {path: 'productos/:slug', component:ShowProductoComponent },
    
]

export const appRoutingProviders : any[] = [];
export const routing : ModuleWithProviders<any> =  RouterModule.forRoot(appRoute);