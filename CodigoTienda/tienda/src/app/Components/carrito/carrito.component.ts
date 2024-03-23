import { Component } from '@angular/core';
import { ClienteService } from '../../services/cliente.service';
import { GLOBAL } from '../../services/global';
import { io } from "socket.io-client";

declare var iziToast : any;


@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrl: './carrito.component.css'
})

  

export class CarritoComponent {

  public token;
  public id;
  public Carrito : Array<any> = [];
  public SubTotal : number = 0;
  public TotalPagar : number = 0;
  public url: string;

  public socket = io(GLOBAL.url2);

  constructor(
    private _ClienteService : ClienteService
  ) {

    this.token = localStorage.getItem('token');
    this.id = localStorage.getItem('_id');
    this.url = GLOBAL.url;
    this.ObtenerCarrito();

  }

  ObtenerCarrito(){
    this._ClienteService.ObtenerCarrito(this.id,this.token).subscribe({
      next: (response)=>{
        //console.log(response);
        this.Carrito = response.data;
       this.SubtotalCarrito()
      },
      error: (err)=>{
        console.log(err);
        
      }
    })
  }

  ngOnInit(){
    this.socket.on('ActCarritoDel', (data)=>{
      this.ObtenerCarrito();
      this.Carrito.forEach( item =>{
        this.SubTotal = this.SubTotal - parseInt(item.producto.precio);
      } )
    })
  };

  SubtotalCarrito(){
    this.Carrito.forEach(element => {
       this.SubTotal = this.SubTotal + parseInt(element.producto.precio); 
    });
    this.TotalPagar = this.SubTotal;
  }

  EliminarCarrito(id:string){
    this._ClienteService.EliminarCarrito(id,this.token).subscribe({
      next: (response)=>{
        this.socket.emit('deleteCarrito',{ data:response.data });
        iziToast.show({
          title: 'SUCCESS',
          titleColor: '#1DC74C',
          color:'#FFF',
          class: 'text-danger',
          position: 'topRight',
          message: `El producto se ha eliminado del carrito`
        });
      },
      error: (err)=>[

      ]
    })
  }

}
