import { Component } from '@angular/core';
import { ClienteService } from '../../services/cliente.service';
import { GLOBAL } from '../../services/global';
import { io } from "socket.io-client";
import { ProductoService } from '../../services/producto.service';

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
  public loadDir = true;
  public socket = io(GLOBAL.url2);
  public DireccionesCliente: Array<any> = [];
  public envios: Array<any> = [];
  public precioEnvio  = "0";

  public venta : any = {};
  public detalleventa : Array<any> = [];


  constructor(
    private _ClienteService : ClienteService,
    private _ProductoService: ProductoService
  ) {

    this.token = localStorage.getItem('token');
    this.id = localStorage.getItem('_id');
    this.url = GLOBAL.url;
    this.ObtenerCarrito();
    this.getEnvios();

    this.venta.cliente = this.id;

  }

  ngOnInit(){
    this.socket.on('ActCarritoDel', (data)=>{
      this.ObtenerCarrito();
      this.Carrito.forEach( item =>{
        this.SubTotal = this.SubTotal - parseInt(item.producto.precio);
        this.detalleventa.push({
          producto: item.producto
        })
      })
    })
    this.obtenerDirecciones();    
  };

  ObtenerCarrito(){
    this._ClienteService.ObtenerCarrito(this.id,this.token).subscribe({
      next: (response)=>{
        //console.log(response);
        this.Carrito = response.data;  
        this.detalleventa  = [];
        this.Carrito.forEach( item =>{
          this.detalleventa.push({
            producto: item.producto._id,
            subtotal: item.producto.precio,
            variedad: item.variedad,
            cantidad: item.cantidad,
            cliente:this.id
          })
        })   

           
       this.SubtotalCarrito()
      },
      error: (err)=>{
        console.log(err);
        
      }
    })
  }

  obtenerDirecciones() {
    this._ClienteService.ObtenerDireccion(this.id, this.token).subscribe({
      next: (response) => {
        response.data.forEach((item: any) => {
          this._ClienteService.DatosDivipola().subscribe({
            next: (res) => {
              res.forEach((elem: any) => {
                if (item.municipio == elem.cod_mpio) {
                  item.municipio = elem.nom_mpio;
                }
                if (item.departamento == elem.cod_depto) {
                  item.departamento = elem.dpto;
                }
              })
            }
          })
        });
        this.DireccionesCliente = response.data;

        this.DireccionesCliente.forEach(item =>{
          if (item.DirPrincipal) {
            this.venta.direccion = item._id;
          } 
        })        
        this.loadDir = false;

      },
      error: (err) => {
        console.log(err);

      }
    })
  }

  SubtotalCarrito(){
    this.Carrito.forEach(element => {
       this.SubTotal = this.SubTotal + parseInt(element.producto.precio); 
    });
    this.TotalPagar = this.SubTotal ;
    
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

  getEnvios(){
    this._ProductoService.getEnvios().subscribe({
      next:(response)=>{
        this.envios = response;     
      }
    })
  }

  totalCarrito(envioTitulo:any){
    this.TotalPagar = this.SubTotal + parseInt(this.precioEnvio);
    this.venta.subtotal = this.TotalPagar;
    this.venta.envioPrecio = parseInt(this.precioEnvio);
    this.venta.envioTitulo = envioTitulo;

  }

  Pagar(){

    this.totalCarrito('Envio Gratis')
    this.venta.transaccion = 'pago en efectivo'
    
    this.venta.detalles  = this.detalleventa;

    this._ClienteService.RegitrarVenta(this.venta,this.token).subscribe({
      next: (response)=>{
        console.log(response);
        iziToast.show({
          title: 'SUCCESS',
          titleColor: '#1DC74C',
          color:'#FFF',
          class: 'text-danger',
          position: 'topRight',
          message: `la compra se ha realizado exitosamente`
        });
        this.ObtenerCarrito();
        this.SubTotal = 0;
        this.TotalPagar = 0;
      }
    })
    
  }
}
