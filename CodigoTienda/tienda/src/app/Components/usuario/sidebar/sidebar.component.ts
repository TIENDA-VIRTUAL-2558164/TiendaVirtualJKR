import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ClienteService } from '../../../services/cliente.service';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  public user: any = undefined;
  public token : any;
  public id : any;
  public user_lc : any = undefined; 

  constructor (    
    private _ClienteService : ClienteService,
    private _router : Router

  ) {
    this.token = localStorage.getItem('token');
    this.id = localStorage.getItem('_id');




     

    this._ClienteService.obtener_usuario_cliente(this.id,this.token).subscribe({
      next: (response)=>{
        this.user = response.data;
        localStorage.setItem('user_data',JSON.stringify(this.user));
        if (localStorage.getItem('user_data')) {
          const local : any = localStorage.getItem('user_data');
          this.user_lc = JSON.parse(local) ;
          console.log(this.user_lc);
        } else {
          this.user_lc = undefined;
        }


      },
      error: (err)=>{
        console.log(err);
        this.user = undefined;
      }
    });
  };

  ngOnInit(){};

}
