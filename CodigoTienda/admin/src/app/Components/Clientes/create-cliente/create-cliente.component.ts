import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { ClienteService } from 'src/app/services/cliente.service';


declare let iziToast: any;

@Component({
  selector: 'app-create-cliente',
  templateUrl: './create-cliente.component.html',
  styleUrls: ['./create-cliente.component.css']
})
export class CreateClienteComponent {

  public cliente : any = {
    genero : ''
  };
  public token:any;
  public load_btn:boolean = false;
  constructor (
    private _clienteService: ClienteService,
    private _AdminService : AdminService,
    private _Router : Router
  ){
    this.token = this._AdminService.getToken();

  }

  ngOnInit(){

  }

  registro(registroForm: any){
    if (registroForm.valid) {
      this.load_btn = true;
      this._clienteService.registro_cliente_admin(this.cliente,this.token).subscribe({
        next: (response) => {
          iziToast.show({
            title: 'SUCCESS',
            titleColor: '#1DC74C',
            class: 'text-success',
            position: 'topRight',
            message: 'El cliente se ha registrado correctamente',
          });

          this.cliente = {
            genero: '',
            nombres: '',
            apellidos: '',
            email: '',
            telefono: '',
            f_nacimiento: '',
            dni: '',
          };
  
          this.load_btn = false;
          this._Router.navigate(['/panel/clientes']);
        },
        error: (error) => {
          iziToast.show({
            title: 'ERROR',
            titleColor: '#FF0000',
            class: 'text-danger',
            position: 'topRight',
            message: error.message,
          });
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
