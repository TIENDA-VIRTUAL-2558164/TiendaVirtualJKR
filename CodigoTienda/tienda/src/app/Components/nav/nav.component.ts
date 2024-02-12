import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClienteService } from '../../services/cliente.service';
import { Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';



@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {

  public user: any = undefined;
  public token : any;
  public id : any;
  public user_lc : any = undefined;
  public configuracion: any = {};




  constructor (
    private _ClienteService : ClienteService,
    private _router : Router,
    @Inject(DOCUMENT) private document: Document

  ) {

    const localStorage = this.document.defaultView?.localStorage

    if(typeof localStorage === 'undefined'){
      throw new Error('Error localStorage')
    }  

    this.token = localStorage.getItem('token');
    this.id = localStorage.getItem('_id');

    if (this.token) {
      this._ClienteService.obtener_usuario_cliente(this.id,this.token).subscribe({
        next: (response)=>{
          this.user = response.data;
          localStorage.setItem('user_data',JSON.stringify(this.user));

          if (localStorage.getItem('user_data')) {
            const local : any = localStorage.getItem('user_data');

            this.user_lc = JSON.parse(local) ;
            
          } else {
            this.user_lc = undefined;
          }
  
  
        },
        error: (err)=>{
          console.log(err);
          this.user = undefined;
        }
      });
      
    }
  
    this._ClienteService.obtener_config_publico().subscribe({
      next: (response)=>{
       // console.log(response);
        this.configuracion = response.data;
      //  console.log(this.configuracion);
        
      }
    });

  };


  ngOnInit(){};

  logout(){

    window.location.reload();
    localStorage.clear();
    this._router.navigate(['/']);

  }

}
