import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { CuponService } from 'src/app/services/cupon.service';



declare let iziToast: any;
declare var JQuery: any;
declare var $: any;

@Component({
  selector: 'app-edit-cupon',
  templateUrl: './edit-cupon.component.html',
  styleUrls: ['./edit-cupon.component.css']
})
export class EditCuponComponent {

  public token:any;
  public load_btn:boolean = false;
  public load_data:boolean = true;
  public id:any;
  public cupon : any = {
    tipo:''
  };

  constructor(
    private _CuponServie : CuponService,
    private _route : ActivatedRoute,
    private _Router : Router
  ){
    this.token = localStorage.getItem('token');

  }

  ngOnInit(){
    this._route.params.subscribe({
     next: (params)=>{
        this.id = params['id'];
        this._CuponServie.obtener_cupon(this.id,this.token).subscribe({
          next: (response)=>{
            if (response.data == undefined) {
              this.cupon = undefined;
              this.load_data = false;
            } else {
              this.cupon = response.data;
              setTimeout(() => {
                this.load_data = false;
              }, 1000);
              
            }
          },
          error: (err)=>{

          }
        });
      }
  })
  }

  Editar(form:any){
    if (form.valid) {
      
      this.load_btn = true;
      let data : any = {};

      data.codigo = this.cupon.codigo;
      data.tipo = this.cupon.tipo;
      data.valor = this.cupon.valor;
      data.limite = this.cupon.limite;

      this._CuponServie.editar_cupon(data,this.id,this.token).subscribe({
        next: (response)=>{
          iziToast.show({
            title: 'SUCCESS',
            titleColor: '#1DC74C',
            class: 'text-success',
            position: 'topRight',
            message: 'El producto se ha Editado correctamente',
          });

          this.load_btn = false
          this._Router.navigate(['/panel/cupones']);
        },
        error: (err)=>{

        }
      });



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

}
