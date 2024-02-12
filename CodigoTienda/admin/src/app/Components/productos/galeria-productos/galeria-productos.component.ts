
import { Component,OnInit, ViewChild } from '@angular/core';
import { ProductoService } from 'src/app/services/producto.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { GLOBAL } from 'src/app/services/global';
import { v4 as uuidv4 } from 'uuid';
import { MatDialog } from '@angular/material/dialog';

declare var iziToast : any;
declare var $ :any;

@Component({
  selector: 'app-galeria-productos',
  templateUrl: './galeria-productos.component.html',
  styleUrls: ['./galeria-productos.component.css']
})
export class GaleriaProductosComponent {

  public producto : any = {};
  public token:any;
  public inv: Array<any> = [];
  public id:any;
  public prefile : File | undefined;
  public loadBtn = false;
  public url :any ;
  public modalVisible:{ [key: string]: boolean} = {};


  constructor(
    private _productoService: ProductoService,
    public _Router : Router,
    public _route : ActivatedRoute,
    public dialog: MatDialog
    ) {
      this.url = GLOBAL.url;
      this.token = localStorage.getItem('token');
      this._route.params.subscribe((params) => {
        this.id = params['id'];

        this.initData();
      });

    
    }

    initData(){
      this._productoService.obtener_producto(this.id, this.token).subscribe({
        next: (response) => {
          if (response.data == undefined) {

            this.producto = undefined;

          } else {

            this.producto = response.data;

          }
          //console.log(this.producto);
          
        },
        error: (error) => {},
      });
    }

  ngOnInit():void {
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
    }


    if (file.size <= 4000000) {
      if (
        file.type == 'image/png' ||
        file.type == 'image/jpg' ||
        file.type == 'image/jpeg' ||
        file.type == 'image/gif' ||
        file.type == 'image/webp'
      ) {

        this.prefile = file;

      } else {

        iziToast.show({
          title: 'ERROR',
          titleColor: '#FF0000',
          class: 'text-danger',
          position: 'topRight',
          message: 'El formato de la imagen no es valido',
        });
        $('#inputImg').val('');
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
      $('#inputImg').val('');
      this.prefile = undefined;

    }

    console.log(this.prefile);
    

  }

  SubirImagen(){
    if (this.prefile != undefined) {
      
      let data = {
        imagen: this.prefile,
        _id: uuidv4()
      }

      console.log(data);

      this._productoService.Agregar_galeria(data,this.id,this.token).subscribe({
        next: (response) =>{
          console.log(response);
          this.initData();
          $('#inputImg').val('');
        },
        error: (error) => {

        }
      })
      

    } else {
      iziToast.show({
        title: 'ERROR',
        titleColor: '#FF0000',
        class: 'text-danger',
        position: 'topRight',
        message: 'No ha seleccionado una imagen.',
      });
    }
  }


  eliminarImagen(productoId:any){
    console.log(productoId);
    
    this._productoService.Eliminar_img_galeria_admin({_id:productoId},this.id, this.token ).subscribe(
      response=>{
        iziToast.show({
          title: 'SUCCESS',
          titleColor: '#1DC74C',
          class: 'text-success',
          position: 'topRight',
          message: 'La imagen se ha Eliminado correctamente',
        });

        this.modalVisible[productoId] = false;
        this.initData();
      },
      error=>{
        iziToast.show({
          title: 'SUCCESS',
          titleColor: '##FF0000',
          class: 'text-success',
          position: 'topRight',
          message: 'La imagen no se ha podido Eliminar.',
        });
        console.log(error);
        
      }
    )

  }

  openModal(clientid:any) {

    this.modalVisible[clientid] = true;
  }

  closeModal(clientid:any) {
    this.modalVisible[clientid] = false;
  }
}
