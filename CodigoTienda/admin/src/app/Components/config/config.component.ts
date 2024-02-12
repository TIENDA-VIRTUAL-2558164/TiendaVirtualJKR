import { Component, OnInit , ViewEncapsulation } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { GLOBAL } from 'src/app/services/global';
import { v4 as uuidv4 } from 'uuid';


declare var iziToast : any;
declare var JQuery: any;
declare var $: any;

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css'],

})
export class ConfigComponent {
  public imgSelect: string | ArrayBuffer | null = null;
  public nombreArchivo: string | null = null;

  public Token: any;
  public config: any = {};

  public titulo_cat: any = '';
  public icono_cat: any = '';
  public file: File | undefined;
  public id = '65636fcf2703f53318a18ab1';
  public prefile: File | undefined;
  public url : any;


  constructor(
    private _AdminService: AdminService
    )
     {
      this.url = GLOBAL.url;
       this.Token = localStorage.getItem('token');
       this._AdminService.obtener_config(this.Token).subscribe({
         next: (response) => {
           //console.log(response);
           this.config = response.data;
           this.imgSelect = this.url+"obtener_img/"+this.config.logo;
         },
         error: (err) => {},
       });
     }

  ngOnInit() {}

  AgregarCategoria() {
    if (this.titulo_cat && this.icono_cat) {

      //console.log(uuidv4());

      this.config.categorias.push({
        razonsocial: this.titulo_cat,
        icono: this.icono_cat,
        _id: uuidv4(),
      });

      this.titulo_cat = '';
      this.icono_cat = '';
    } else {
      iziToast.show({
        title: 'ERROR',
        titleColor: '#FF0000',
        class: 'text-danger',
        position: 'topRight',
        message: 'Los campos de titulo e icono estan vacios o no son validos',
      });
    }
  }

  Actualizar(configForm: any) {
    if (configForm.valid) {
      let data = {
        razonsocial: configForm.value.razonsocial,
        serie: configForm.value.serie,
        correlativo: configForm.value.correlativo,
        categorias: this.config.categorias,
        logo: this.prefile,
      };
      console.log(data);

      this._AdminService
        .Actualizar_config(this.id, data, this.Token)
        .subscribe({
          next: (response) => {
            iziToast.show({
              title: 'SUCCESS',
              titleColor: '#1DC74C',
              class: 'text-success',
              position: 'topRight',
              message: 'se ha actualizado correctamente',
            });
          },
          error: (err) => {},
        });
    } else {
      iziToast.show({
        title: 'ERROR',
        titleColor: '#FF0000',
        class: 'text-danger',
        position: 'topRight',
        message: 'Los campos estan vacios o no son validos',
      });
    }
  }

  fileChangeEvent(event: any) {
    var file: any;
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
        $('.cs-file-drop-icon').addClass('cs-file-drop-preview img-thumbail rounded');
        $('.cs-file-drop-icon').removeClass('cs-file-drop-icon cxi-upload');
        reader.readAsDataURL(file);

        this.prefile = file;

      } else {

        iziToast.show({
          title: 'ERROR',
          titleColor: '#FF0000',
          class: 'text-danger',
          position: 'topRight',
          message: 'El formato de la imagen no es valido',
        });

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

      this.imgSelect = '/assets/img/01.jpg';
      this.prefile = undefined;

    }

  }

  ngDoCheck(){
    $('.cs-file-drop-preview').html("<img src="+this.imgSelect +">")
  }

  eliminar_categoria(idCategoria:any){
    this.config.categorias.splice(idCategoria,1);
  }
}
