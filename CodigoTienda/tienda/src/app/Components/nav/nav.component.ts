import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClienteService } from '../../services/cliente.service';
import { Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { GLOBAL } from '../../services/global';
import { io } from "socket.io-client";

declare var $: any;
declare var iziToast: any;


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {

  public user: any = undefined;
  public token: any;
  public id: any;
  public user_lc: any = undefined;
  public configuracion: any = {};
  public openCar = false;
  public Carrito: Array<any> = [];
  public url;
  public SubTotal: number = 0;

  public socket = io(GLOBAL.url2);

  constructor(
    private _ClienteService: ClienteService,
    private _router: Router,
    @Inject(DOCUMENT) private document: Document
  ) {

    this.url = GLOBAL.url;

    const localStorage = this.document.defaultView?.localStorage

    if (typeof localStorage === 'undefined') {
      throw new Error('Error localStorage')
    }

    this.token = localStorage.getItem('token');
    this.id = localStorage.getItem('_id');

    if (this.token) {
      this._ClienteService.obtener_usuario_cliente(this.id, this.token).subscribe({
        next: (response) => {
          this.user = response.data;
          localStorage.setItem('user_data', JSON.stringify(this.user));

          if (localStorage.getItem('user_data')) {
            const local: any = localStorage.getItem('user_data');

            this.user_lc = JSON.parse(local);
            this.ObtenerCarrito();

          } else {
            this.user_lc = undefined;
          }


        },
        error: (err) => {
          console.log(err);
          this.user = undefined;
        }
      });

    }

    this._ClienteService.obtener_config_publico().subscribe({
      next: (response) => {
        // console.log(response);
        this.configuracion = response.data;
        //  console.log(this.configuracion);

      }
    });

  };

  ObtenerCarrito() {
    this._ClienteService.ObtenerCarrito(this.user_lc._id, this.token).subscribe({
      next: (response) => {
        //console.log(response);
        this.Carrito = response.data;
        this.SubtotalCarrito()
      },
      error: (err) => {
        console.log(err);

      }
    })
  }

  ngOnInit() {

    this.socket.on('ActCarritoDel', (data:any) => {
      //console.log(data);
      this.ObtenerCarrito();
      this.Carrito.forEach(element => {
        this.SubTotal = this.SubTotal - parseInt(element.producto.precio);
      });

    });

    this.socket.on('ActCarritoAdd', (data:any) => {
      this.ObtenerCarrito();
    })
  };

  logout() {

    window.location.reload();
    localStorage.clear();
    this._router.navigate(['/']);

  }

  OpenModalCar() {
    if (!this.openCar) {
      this.openCar = true;
      $('#cart').addClass('show');
    } else {
      this.openCar = false;
      $('#cart').removeClass('show');
    }
  }

  SubtotalCarrito() {
    this.SubTotal = 0; 
    this.Carrito.forEach(element => {
      this.SubTotal  = this.SubTotal +  parseInt(element.producto.precio);
      
    });
  }

  EliminarCarrito(id: string) {
    this._ClienteService.EliminarCarrito(id, this.token).subscribe({
      next: (response) => {
        this.socket.emit('deleteCarrito', { data: response.data })
        //console.log(response);
        iziToast.show({
          title: 'SUCCESS',
          titleColor: '#1DC74C',
          color:'#FFF',
          class: 'text-danger',
          position: 'topRight',
          message: `El producto se ha eliminado del carrito`
        });
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

}
