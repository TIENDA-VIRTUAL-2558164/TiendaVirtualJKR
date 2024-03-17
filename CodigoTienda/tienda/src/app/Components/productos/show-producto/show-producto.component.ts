import { Component } from '@angular/core';
import { ProductoService } from '../../../services/producto.service';
import { ActivatedRoute } from '@angular/router';
import { GLOBAL } from '../../../services/global';
import { ClienteService } from '../../../services/cliente.service';

declare var tns:any;
declare var lightGallery: any;
declare var iziToast : any;

@Component({
  selector: 'app-show-producto',
  templateUrl: './show-producto.component.html',
  styleUrl: './show-producto.component.css'
})
export class ShowProductoComponent {


  public slug :any ;
  public producto : any = {};
  public url = '';
  public productoRec : Array<any> = [];
  public token : string | null;
  public LoadBtnCart = false;

  public CarritoData : any = {
    variedad: '',
    cantidad: 1
  };


  constructor(
    private _ProductService : ProductoService,
    private _route: ActivatedRoute,
    private _ClienteService : ClienteService
  ) {
    this.token = localStorage.getItem('token');
    this.url = GLOBAL.url;

    this._route.params.subscribe(
      params=>{
        this.slug = params['slug'];

        this._ProductService.InfoProductos(this.slug).subscribe({
          next : (response)=>{     
              this.producto = response.data;

              this._ProductService.ProductosRecomendados(this.producto.categoria).subscribe({
                next: (response)=>{
                  console.log(response);
                  this.productoRec = response.data;
                },
                error: (err)=>{

                }
              })
          },
          error: (err)=>{
          }
        })
        
      }
    )
  }

  ngOnInit(): void { 

    setTimeout(()=>{
      tns({
        container: '.cs-carousel-inner',
        controlsText: ['<i class="cxi-arrow-left"></i>', '<i class="cxi-arrow-right"></i>'],
        navPosition: "top",
        controlsPosition: "top",
        mouseDrag: !0,
        speed: 600,
        autoplayHoverPause: !0,
        autoplayButtonOutput: !1,
        navContainer: "#cs-thumbnails",
        navAsThumbnails: true,
        gutter: 15,
      });

      var e = document.querySelectorAll(".cs-gallery");
      if (e.length){
        for (var t = 0; t < e.length; t++){
          lightGallery(e[t], 
            { 
              selector: ".cs-gallery-item", 
              download: !1, 
              videojs: !0, 
              youtubePlayerParams: { modestbranding: 1, showinfo: 0, rel: 0 }, 
              vimeoPlayerParams: { byline: 0, portrait: 0 } });
        }
      }

      tns({
        container: '.cs-carousel-inner-two',
        controlsText: ['<i class="cxi-arrow-left"></i>', '<i class="cxi-arrow-right"></i>'],
        navPosition: "top",
        controlsPosition: "top",
        mouseDrag: !0,
        speed: 600,
        autoplayHoverPause: !0,
        autoplayButtonOutput: !1,
        nav: false,
        controlsContainer: "#custom-controls-related",
        responsive: {
          0: {
            items: 1,
            gutter: 20
          },
          480: {
            items: 2,
            gutter: 24
          },
          700: {
            items: 3,
            gutter: 24
          },
          1100: {
            items: 4,
            gutter: 30
          }
        }
      });
  
    },500)


  }

  AgregarProductCarrito(){
    if (this.CarritoData.variedad) {
      if (this.CarritoData.cantidad <= this.producto.stock ) {
        let data = {
          producto: this.producto._id,
          cliente: localStorage.getItem('_id'),
          cantidad: this.CarritoData.cantidad,
          variedad: this.CarritoData.variedad
        }
        this.LoadBtnCart = true;
        this._ClienteService.AgregarCarrito(data,this.token).subscribe({
          next: (response)=>{
            if (response.data == undefined) {
              iziToast.show({
                title: 'ERROR',
                titleColor: '#FF0000',
                color:'#FFF',
                class: 'text-danger',
                position: 'topRight',
                message: `El producto ya esta agregado en el carrito`
              });
              this.LoadBtnCart = false;
            } else {
            iziToast.show({
              title: 'SUCCESS',
              titleColor: '#1DC74C',
              class: 'text-success',
              position: 'topRight',
              message: 'El producto se ha agregado al carrito',
            });
            this.LoadBtnCart = false;
            }
          },
          error: (err)=>{
            console.log(err);
            
          }
        })
      } else {
        iziToast.show({
          title: 'ERROR',
          titleColor: '#FF0000',
          color:'#FFF',
          class: 'text-danger',
          position: 'topRight',
          message: `La cantidad maxima disponible es ${this.producto.stock}`
        });
      }
    } else {
      iziToast.show({
        title: 'ERROR',
        titleColor: '#FF0000',
        color:'#FFF',
        class: 'text-danger',
        position: 'topRight',
        message: 'seleccionar el tamaño del producto',
      });
    }
  }

}
