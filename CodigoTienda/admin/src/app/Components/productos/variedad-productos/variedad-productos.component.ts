import { Component,OnInit, ViewChild } from '@angular/core';
import { ProductoService } from 'src/app/services/producto.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { GLOBAL } from 'src/app/services/global';
declare var iziToast : any;

@Component({
  selector: 'app-variedad-productos',
  templateUrl: './variedad-productos.component.html',
  styleUrls: ['./variedad-productos.component.css']
})
export class VariedadProductosComponent {

  public producto : any = {};
  public token:any;
  public inv: Array<any> = [];
  public id:any;
  public nueva_variedad : any = '';
  public loadBtn = false;
  public url :any ;


  constructor(
    private _productoService: ProductoService,
    public _Router : Router,
    public _route : ActivatedRoute
    ) {
      this.url = GLOBAL.url;
      this.token = localStorage.getItem('token');
      this._route.params.subscribe((params) => {
        this.id = params['id'];

        this._productoService.obtener_producto(this.id, this.token).subscribe({
          next: (response) => {
            if (response.data == undefined) {

              this.producto = undefined;

            } else {

              this.producto = response.data;

            }
            console.log(this.producto);
            
          },
          error: (error) => {},
        });
      });

    
    }

  ngOnInit():void {
  }

  AgregarVariedad(){
      if (this.nueva_variedad) {

          this.producto.variedades.push({
            titulo : this.nueva_variedad,
          });

          this.nueva_variedad = '';
          
      } else {
        iziToast.show({
          title: 'ERROR',
          titleColor: '#FF0000',
          class: 'text-danger',
          position: 'topRight',
          message: 'EL campo de variedad esta vacio o no es valido',
        });
      }
  }

  eliminar_variedad(id:any){
    this.producto.variedades.splice(id,1);
  }

  ActualizarVariedad(){
    if (this.producto.titulo_variedad) {
      
        if (this.producto.variedades.length >= 1) {
          this.loadBtn = true;
          this._productoService.editar_variedad_admin({
            titulo_variedad:this.producto.titulo_variedad,
            variedades:this.producto.variedades
          },this.id,this.token).subscribe({
            next: (response)=>{
                //console.log(response);
                iziToast.show({
                  title: 'SUCCESS',
                  titleColor: '#1DC74C',
                  class: 'text-success',
                  position: 'topRight',
                  message: 'se ha Agregado correctamente la variedad',
                });
                this.loadBtn = false;
                
            },
            error: (error)=>{
              
            }
          })
        } else {
          iziToast.show({
            title: 'ERROR',
            titleColor: '#FF0000',
            class: 'text-danger',
            position: 'topRight',
            message: 'Se debe agregar al menos una variedad',
          });
        }
    } else {
      iziToast.show({
        title: 'ERROR',
        titleColor: '#FF0000',
        class: 'text-danger',
        position: 'topRight',
        message: 'EL campo de titulo esta vacio o no es valido',
      });
    }
  }

}
