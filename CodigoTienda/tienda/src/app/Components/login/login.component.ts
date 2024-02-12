import { Component, OnInit,Inject } from '@angular/core';
import { Router } from '@angular/router';
import { ClienteService } from '../../services/cliente.service';
import { CommonModule, DOCUMENT } from '@angular/common';

  declare var iziToast: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  public user: any = {};
  public usuario : any = {};
  public token : any;

  constructor (
    private _ClienteService : ClienteService,
    private _router : Router,
    @Inject(DOCUMENT) private document: Document

  ) {
    const localStorage = this.document.defaultView?.localStorage;

    if(!localStorage){
      throw new Error('Error localStorage')
    }    
    this.token = localStorage.getItem('token');

    if (this.token) {
      this._router.navigate(['/'])
    } else {
      
    }

  };


  ngOnInit(){};

  login(form:any){
    if (form.valid) {
      console.log(this.user);
      let data = {
        email: this.user.email,
        password: this.user.password,
      };

      this._ClienteService.login_cliente(data).subscribe({
        next: (response) => {
           if (response.data == undefined) {
             iziToast.show({
               title: 'ERROR',
               titleColor: '#FF0000',
               class: 'text-danger',
               position: 'topRight',
               message: response.message,
             });
           } else{
            
             this.usuario = response.data;
 
             localStorage.setItem( 'token',response.token );
             localStorage.setItem( '_id',response.data._id );
             
             this._router.navigate(['/']);
 
           }
           console.log(response);
         },
        error: (error) => {
           console.log(error);
         }
        } );


      
    } else {
      iziToast.show({
        title: 'ERROR',
        titleColor: '#FF0000',
        color:'#FFF',
        class: 'text-danger',
        position: 'topRight',
        message: 'Los datos no coinciden',
      });
    }

  }

}
