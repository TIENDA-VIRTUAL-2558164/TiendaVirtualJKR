import { Component } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { ClienteService } from '../../../services/cliente.service';
import { GLOBAL } from '../../../services/global';

declare var $ : any;
declare var noUiSlider : any;


@Component({
  selector: 'app-index-producto',
  templateUrl: './index-producto.component.html',
  styleUrls: ['./index-producto.component.css']
})
export class IndexProductoComponent {

  public configuracion : any = {}; 
  public filtroCategoria: any = '';
  public productos: Array<any> = [];
  public loadData = true;
  public url = '';
  public filtroProducto: any = '';
  public filtroCatProductos = 'todos';
  public routeCategoria: any;
  public page = 1;
  public pagesize = 12;

  public SortBy = 'Por Defecto';

  constructor(
    private _ClienteService: ClienteService,
    private _route : ActivatedRoute
   ){

    this.url = GLOBAL.url;

    this._ClienteService.obtener_config_publico().subscribe({
      next: (response)=>{
       // console.log(response);
        this.configuracion = response.data;
        //console.log(this.configuracion);
        
      }
    });

    this._route.params.subscribe(
      params => {
        this.routeCategoria = params['categoria'];
        if (this.routeCategoria) {
          this._ClienteService.listar_productos_tienda('').subscribe({
            next:(response)=>{
              this.productos = response.data;
              this.productos = this.productos.filter( (item: {categoria: string} ) =>  item.categoria.toLowerCase() == this.routeCategoria  );
              setTimeout(() => {
                this.loadData = false;
              }, 1000);
            }
          });
        } else {
          this._ClienteService.listar_productos_tienda('').subscribe({
            next:(response)=>{
              this.productos = response.data;
              setTimeout(() => {
                this.loadData = false;
              }, 1000);
            }
          });
        }        
      }
    );

  }


  ngOnInit(): void {
    var slider: any = document.getElementById('slider');
    noUiSlider.create(slider, {
      start: [0, 500000],
      connect: true,
      range: {
        min: 0,
        max: 500000,
      },
      tooltips: [true, true],
      pips: {
        mode: 'count',
        values: 5,
      },
    });

    slider.noUiSlider.on('update', function (values:any) {
      $('.cs-range-slider-value-min').val(values[0]);
      $('.cs-range-slider-value-max').val(values[1]);
    });
    $('.noUi-tooltip').css('font-size', '11px');
  }

  BuscarCategorias(){
    //console.log(this.filtroCategoria);
    if (this.filtroCategoria) {
      let search = new RegExp(this.filtroCategoria, 'i');
      this.configuracion.categorias = this.configuracion.categorias.filter(
        (        item: { razonsocial: string; }) => search.test(item.razonsocial)
      )
    }else{
      this._ClienteService.obtener_config_publico().subscribe({
        next: (response)=>{
         // console.log(response);
          this.configuracion = response.data;
        //  console.log(this.configuracion);
          
        }
      })
    }
  }

  BuscarProducto(){
    //console.log(this.filtroProducto);
    this._ClienteService.listar_productos_tienda(this.filtroProducto).subscribe({
      next:(response)=>{
       //console.log(response);
        this.productos = response.data;
        this.loadData = false; 
      }
    })  
  }

  FiltrarPrecio(){
    this._ClienteService.listar_productos_tienda(this.filtroProducto).subscribe({
      next:(response)=>{
        this.productos = response.data;

        let min = parseInt( $('.cs-range-slider-value-min').val());
        let max = parseInt( $('.cs-range-slider-value-max').val());
     
         this.productos = this.productos.filter((item: { precio: any; })=>{
           return item.precio >= min && 
                   item.precio <= max
         });
      }
    })
  }

  buscarPorCategoria(){
    if (this.filtroCatProductos == 'todos') {
      this._ClienteService.listar_productos_tienda(this.filtroProducto).subscribe({
        next:(response)=>{
          this.productos = response.data;
          setTimeout(() => {
            this.loadData = false;
          }, 1000);
        }
      });
    } else {
      this._ClienteService.listar_productos_tienda(this.filtroProducto).subscribe({
        next:(response)=>{
          this.productos = response.data;        
          this.productos = this.productos.filter( (item: {categoria: string} ) =>  item.categoria == this.filtroCatProductos  );
          setTimeout(() => {
            this.loadData = false;
          }, 1000);
        }
      });
    }
  }

  resetProducts(){
    this.filtroProducto = '';
    this._ClienteService.listar_productos_tienda('').subscribe({
      next:(response)=>{
        this.productos = response.data;
        setTimeout(() => {
          this.loadData = false;
        }, 1000);
      }
    });
  }

  OrdenarPor (){
    if (this.SortBy == 'Por Defecto') {
      this._ClienteService.listar_productos_tienda('').subscribe({
        next:(response)=>{
          this.productos = response.data;
          setTimeout(() => {
            this.loadData = false;
          }, 1000);
        }
      });
    }else if(this.SortBy == 'Popularidad'){
        this.productos.sort(function (a ,b){
          if(a.nventas < b.nventas ){
            return 1;
          }
         if (a.nventas > b.nventas) {
            return -1;
         }
         return 0;
        })
    }else if (this.SortBy == '-+precio') {
      this.productos.sort(function (a ,b){
        if(a.precio > b.precio ){
          return 1;
        }
       if (a.precio < b.precio) {
          return -1;
       }
       return 0;
      })
    }else if ( this.SortBy == '+-precio' ) {
      this.productos.sort(function (a ,b){
        if(a.precio < b.precio ){
          return 1;
        }
       if (a.precio > b.precio) {
          return -1;
       }
       return 0;
      })
    }else if (this.SortBy == 'AZTitulo') {
      this.productos.sort(function (a ,b){
        if(a.titulo > b.titulo ){
          return 1;
        }
       if (a.titulo < b.titulo) {
          return -1;
       }
       return 0;
      })
    }else if (this.SortBy == 'ZATitulo') {
      this.productos.sort(function (a ,b){
        if(a.titulo < b.titulo ){
          return 1;
        }
       if (a.titulo > b.titulo) {
          return -1;
       }
       return 0;
      })
    }
  }

}
