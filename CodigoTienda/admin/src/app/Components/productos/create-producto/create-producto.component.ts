import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { adminGuard } from 'src/app/guards/admin.guard';
import { AdminService } from 'src/app/services/admin.service';
import { ProductoService } from 'src/app/services/producto.service';

declare let iziToast: any;
declare var JQuery: any;
declare var $: any;

@Component({
  selector: 'app-create-producto',
  templateUrl: './create-producto.component.html',
  styleUrls: ['./create-producto.component.css'],
})
export class CreateProductoComponent {
  public producto: any = {
    categoria: '',
  };
  public prefile: File | undefined;
  public imgSelect: any | ArrayBuffer = '/assets/img/01.jpg';
  public config: any = {};
  public token:any;
  public load_btn:boolean = false;
  public configuracion : any = {};

  constructor(
    public _producto_services : ProductoService,
    public _AdminService : AdminService,
    public _Router : Router
  ) {

    this.config = {
      heigth: 500,
    };
    this.token = this._AdminService.getToken();
    this._AdminService.obtener_config_publico().subscribe({
      next: (response)=>{
       // console.log(response);
        this.configuracion = response.data;
      }
    })
  }

  ngOnInit() {}

  registro(registroForm: any) {
    if (registroForm.valid) {
      if (this.prefile == undefined) {
        iziToast.show({
          title: 'ERROR',
          titleColor: '#FF0000',
          class: 'text-danger',
          position: 'topRight',
          message: 'No se ha agregado una imagen',
        });
      }else{
        this.load_btn = true;     
        this._producto_services.registro_producto_admin(this.producto,this.prefile,this.token).subscribe(
          response=>{
            iziToast.show({
              title: 'SUCCESS',
              titleColor: '#1DC74C',
              class: 'text-success',
              position: 'topRight',
              message: 'El producto se ha registrado correctamente',
            });
            
            this.load_btn = false;
            this._Router.navigate(['/panel/productos']);
          },
          error=>{
            console.log(error);
            
          }
        )
      }

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
