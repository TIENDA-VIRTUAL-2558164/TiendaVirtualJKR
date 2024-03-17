import { Component } from '@angular/core';
import { ClienteService } from '../../services/cliente.service';
import { GLOBAL } from '../../services/global';

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

  constructor(
    private _ClienteService : ClienteService
  ) {

    this.token = localStorage.getItem('token');
    this.id = localStorage.getItem('_id');
    this.url = GLOBAL.url;

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

  ngOnInit(){};

  SubtotalCarrito(){
    this.Carrito.forEach(element => {
       this.SubTotal = this.SubTotal + parseInt(element.producto.precio); 
    });
    this.TotalPagar = this.SubTotal;
  }

}
