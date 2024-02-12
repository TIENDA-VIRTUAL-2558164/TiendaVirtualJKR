import { Routes,RouterModule } from "@angular/router";
import { ModuleWithProviders } from "@angular/core";
import { InicioComponent } from "./Components/inicio/inicio.component";
import { LoginComponent } from "./Components/login/login.component";
import { adminGuard } from "./guards/admin.guard";
import { IndexClienteComponent } from "./Components/Clientes/index-cliente/index-cliente.component";
import { CreateClienteComponent } from "./Components/Clientes/create-cliente/create-cliente.component";
import { EditClienteComponent } from "./Components/Clientes/edit-cliente/edit-cliente.component";
import { CreateProductoComponent } from "./Components/productos/create-producto/create-producto.component";
import { IndexProductoComponent } from "./Components/productos/index-producto/index-producto.component";
import { EditProductoComponent } from "./Components/productos/edit-producto/edit-producto.component";
import { InventarioComponent } from "./Components/productos/inventario/inventario.component";
import { CreateCuponComponent } from "./Components/cupones/create-cupon/create-cupon.component";
import { IndexCuponComponent } from "./Components/cupones/index-cupon/index-cupon.component";
import { EditCuponComponent } from "./Components/cupones/edit-cupon/edit-cupon.component";
import { ConfigComponent } from "./Components/config/config.component";
import { VariedadProductosComponent } from "./Components/productos/variedad-productos/variedad-productos.component";
import { GaleriaProductosComponent } from "./Components/productos/galeria-productos/galeria-productos.component";


const appRoute : Routes = [
    {path:'', redirectTo:'inicio', pathMatch:'full' },
    {path: 'inicio', component:InicioComponent, canActivate: [adminGuard] },
    {path: 'panel', children:[

        //clientes
        {path:'clientes',component: IndexClienteComponent, canActivate:[adminGuard]},
        {path:'clientes/registro',component: CreateClienteComponent, canActivate:[adminGuard]},
        {path:'clientes/:id',component: EditClienteComponent, canActivate:[adminGuard]},

        //productos
        {path:'productos/registro',component:CreateProductoComponent,canActivate:[adminGuard]},
        {path:'productos',component:IndexProductoComponent,canActivate:[adminGuard]},
        {path:'productos/:id',component:EditProductoComponent,canActivate:[adminGuard]},
        {path:'productos/inventario/:id',component:InventarioComponent,canActivate:[adminGuard]},
        { path:'productos/variedadProductos/:id',component:VariedadProductosComponent,canActivate:[adminGuard] },
        { path:'productos/galeria/:id',component:GaleriaProductosComponent,canActivate:[adminGuard] },
        //cupones
        { path:'cupones/registro',component:CreateCuponComponent,canActivate:[adminGuard] },
        { path:'cupones',component:IndexCuponComponent,canActivate:[adminGuard] },
        { path:'cupones/:id',component:EditCuponComponent,canActivate:[adminGuard] },

        { path:'configuraciones',component:ConfigComponent,canActivate:[adminGuard] }


    ]},
    {path: 'login',component:LoginComponent}
]

export const appRoutingProviders : any[] = [];
export const routing : ModuleWithProviders<any> =  RouterModule.forRoot(appRoute);