import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AsapScheduler } from 'rxjs/internal/scheduler/AsapScheduler';
import { AdminService } from 'src/app/services/admin.service';
import { CuponService } from 'src/app/services/cupon.service';

declare let iziToast: any;

@Component({
  selector: 'app-create-cupon',
  templateUrl: './create-cupon.component.html',
  styleUrls: ['./create-cupon.component.css']
})
export class CreateCuponComponent {

  public load_btn:boolean = false;
  public cupon : any = {
    tipo: ''
  };
  public Token : any;

  constructor(
    private _CuponService : CuponService,
    private _Router : Router
   
  ){
    this.Token = localStorage.getItem('token');
  }

  ngOninit(){

  }

  registro( form:any  ){
     if(form.valid){
        //console.log(this.cupon);
        this.load_btn = true;
         this._CuponService.registro_cupon_admin(this.cupon,this.Token).subscribe({
          next: (response)=>{
            iziToast.show({
              title: 'SUCCESS',
              titleColor: '#1DC74C',
              class: 'text-success',
              position: 'topRight',
              message: 'El cupon se ha registrado correctamente',
            });

            this.load_btn = false;
            this._Router.navigate(['/panel/cupones']);

          },
          error: (err)=>{

          }
         })          
     }else{
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
