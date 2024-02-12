import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { ClienteService } from 'src/app/services/cliente.service';

declare var iziToast: any;

@Component({
  selector: 'app-edit-cliente',
  templateUrl: './edit-cliente.component.html',
  styleUrls: ['./edit-cliente.component.css']
})
export class EditClienteComponent {

  public cliente : any = {
    genero : ''
  };

  public token:any;
  public id:any;
  public load_btn:boolean = false;
  public load_data:boolean = true;

  constructor (
    private _clienteService: ClienteService,
    private _AdminService : AdminService,
    private _Router : Router,
    private _route : ActivatedRoute
  ){
    this.token = this._AdminService.getToken();

  }

  ngOnInit(){
    this._route.params.subscribe(
      params=>{
        this.id = params['id'];
        this._clienteService.obtener_cliente(this.id,this.token).subscribe({
          next: (response)=>{
            if (response.data == undefined) {
              this.cliente = undefined;
              this.load_data = false;
            } else {
              this.cliente = response.data;
              setTimeout(() => {
                this.load_data = false;
                
              }, 1000);
            }
            
          },
          error: (error)=>{

          }
        })
      }
    )
  }

  editar(editForm: any){
    if (editForm.valid) {
      this.load_btn = true;
      this._clienteService.editar_cliente(this.id,this.cliente,this.token).subscribe({
       next: (response)=>{
          iziToast.show({
            title: 'SUCCESS',
            titleColor: '#1DC74C',
            class: 'text-success',
            position: 'topRight',
            message: 'El cliente se ha editado correctamente',
          });

          this.load_btn = false;
          this._Router.navigate(['/panel/clientes']);
          
        },
       error: (error) =>{
          console.log(error);
          
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
