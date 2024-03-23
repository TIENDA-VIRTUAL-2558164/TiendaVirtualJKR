import { Component } from '@angular/core';
import { ClienteService } from '../../../services/cliente.service';

declare var iziToast : any;
declare var $ : any;


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent {

  public cliente: any =  {};
  public id : any;
  public token : any;


  constructor (
    private _ClienteService : ClienteService
  ){
    this.id = localStorage.getItem('_id');
    this.token = localStorage.getItem('token')
    if (this.id) {

      this._ClienteService.obtener_usuario_cliente(this.id,this.token).subscribe({
        next: (reponse)=>{
         // console.log(reponse.data);
          
          this.cliente = reponse.data;
          
        }, 
        error: (err)=>{

        }
      })
    } 

  };

  ngOnInit(){};

  actualizar(actualizarForm: any){
    if (actualizarForm.valid) {
        
      this.cliente.password = $('#input_password').val();

      this._ClienteService.editar_perfil(this.id,this.token,this.cliente).subscribe({
        next:(response)=>{
         // console.log(response);
          
         iziToast.show({
          title: 'SUCCESS',
          titleColor: '#1DC74C',
          class: 'text-success',
          position: 'topRight',
          message: 'El cliente se ha Actualizado correctamente',
        });

        },
        error: (err)=>{

        }
      })
        
    } else {
      iziToast.show({
        title: 'ERROR',
        titleColor: '#FF0000',
        color:'#FFF',
        class: 'text-danger',
        position: 'topRight',
        message: 'Datos del formulario invalidos',
      });
    }
  }

}
