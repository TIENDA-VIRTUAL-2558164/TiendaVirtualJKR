
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { GLOBAL } from 'src/app/services/global';
import { ProductoService } from 'src/app/services/producto.service';

declare let iziToast: any;
declare var JQuery: any;
declare var $: any;

@Component({
  selector: 'app-edit-producto',
  templateUrl: './edit-producto.component.html',
  styleUrls: ['./edit-producto.component.css']
})
export class EditProductoComponent {
  public producto: any = {
    categoria: '',
  };
  public prefile: File | undefined;
  public imgSelect: any | ArrayBuffer = '';
  public config: any = {};
  public token:any;
  public load_btn:boolean = false;
  public id:any;
  public load_data:boolean = true;
  public url:any;
  public configuracion : any = {};

  constructor(
    public _producto_services : ProductoService,
    public _AdminService : AdminService,
    public _Router : Router,
    public _route : ActivatedRoute
  ) {

    this.config = {
      heigth: 500,
    };
    this.token = this._AdminService.getToken();
    this.url = GLOBAL.url;
    this._AdminService.obtener_config_publico().subscribe({
      next: (response)=>{
       // console.log(response);
        this.configuracion = response.data;
      }
    })
  }

  ngOnInit() {
    this._route.params.subscribe(
      params=>{
        this.id = params['id'];
        this._producto_services.obtener_producto(this.id,this.token).subscribe(
          response=>{
            if (response.data == undefined) {
              this.producto = undefined;
              this.load_data = false;
            } else {
              this.producto = response.data;
              this.imgSelect = this.url+'obtener_portada/'+this.producto.portada;
              setTimeout(() => {
                this.load_data = false;
                
              }, 1000);
            }
          },
          error=>{

          }
        )
      }
    )
  }

  editar(registroForm: any) {
    if (registroForm.valid) {
        this.load_btn = true;     
        var data: any = {};

        if (this.prefile != undefined) {
          data.portada = this.prefile;

        } 

      data.titulo = this.producto.titulo;
      data.stock = this.producto.stock;
      data.precio = this.producto.precio;
      data.descripcion = this.producto.descripcion;
      data.contenido = this.producto.contenido;
      data.categoria = this.producto.categoria;

        this._producto_services.editar_producto(data,this.id,this.token).subscribe(
          response=>{
            iziToast.show({
              title: 'SUCCESS',
              titleColor: '#1DC74C',
              class: 'text-success',
              position: 'topRight',
              message: 'El producto se ha Editado correctamente',
            });
            
            this.load_btn = false;
            this._Router.navigate(['/panel/productos']);
          },
          error=>{
            console.log(error);
            
          })

    } else {

      iziToast.show({
        title: 'ERROR',
        titleColor: '#FF0000',
        class: 'text-danger',
        position: 'topRight',
        message: 'Los datos ingresados no son  validos',
      });

    }
  }

  fileChangeEvent(event: any): void {
    let file: any;
    if (event.target.files && event.target.files[0]) {

      file = <File>event.target.files[0];

    } else {
      iziToast.show({
        title: 'ERROR',
        titleColor: '#FF0000',
        class: 'text-danger',
        position: 'topRight',
        message: 'No se ha seleccionado una imagen o no es valida.',
      });

      $('#imput-portada').text('Seleccionar imagen');
      this.imgSelect = '/assets/img/01.jpg';
      this.prefile = undefined;

    }


    if (file.size <= 4000000) {
      if (
        file.type == 'image/png' ||
        file.type == 'image/jpg' ||
        file.type == 'image/jpeg' ||
        file.type == 'image/gif' ||
        file.type == 'image/webp'
      ) {
        const reader = new FileReader();
        reader.onload = (e) => (this.imgSelect = reader.result);
        reader.readAsDataURL(file);

        $('#imput-portada').text(file.name);

        this.prefile = file;

      } else {

        iziToast.show({
          title: 'ERROR',
          titleColor: '#FF0000',
          class: 'text-danger',
          position: 'topRight',
          message: 'El formato de la imagen no es valido',
        });

        $('#imput-portada').text('Seleccionar imagen');
        this.imgSelect = '/assets/img/01.jpg';
        this.prefile = undefined;

      }
    } else {

      iziToast.show({
        title: 'ERROR',
        titleColor: '#FF0000',
        class: 'text-danger',
        position: 'topRight',
        message: 'La imagen supera el tamaño de 4mb',
      });

      $('#imput-portada').text('Seleccionar imagen');
      this.imgSelect = '/assets/img/01.jpg';
      this.prefile = undefined;

    }

  }
}
