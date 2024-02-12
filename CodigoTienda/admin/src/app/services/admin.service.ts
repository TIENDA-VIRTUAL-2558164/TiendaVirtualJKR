import { Injectable } from '@angular/core';
import { GLOBAL } from './global';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable({
  providedIn: 'root'
})

export class AdminService {
public url;
  constructor(
    private _http : HttpClient,
  ) {
    this.url = GLOBAL.url; 
   }

   login_admin(data: any): Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.post(this.url+'login_admin',data,{headers:headers});
   }
   
   getToken(){
    return localStorage.getItem('token');
   }

   public isAuthenticated(allowRoles:string[]):boolean{

    const token  =  localStorage.getItem('token');


    
    if(!token){
      return false;
    }
    try {
      const helper = new JwtHelperService();
      var decodeToken = helper.decodeToken(token as string);

      if(helper.isTokenExpired(token)){
        localStorage.clear();
        return false;
      }

      if (!decodeToken) {
       // console.log('NO ES VALIDO');
       localStorage.clear();
        return false;
      }
    } catch (error) {
      localStorage.clear();
      return false;
    }
    
    return allowRoles.includes(decodeToken['role']);
    
   }

   obtener_config(token:string): Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.get(this.url+`obtener_config`,{headers:headers});
   }

   Actualizar_config(id:any, data:any ,token:string): Observable<any>{
    if (data.logo) {
      let headers = new HttpHeaders({'Authorization':token});
  
      const fd = new FormData();
      fd.append('razonsocial',data.razonsocial);
      fd.append('serie',data.serie);
      fd.append('correlativo',data.correlativo);
      fd.append('categorias',JSON.stringify(data.categorias));
      fd.append('logo',data.logo);
      return this._http.put(this.url+`actualizar_config/${id}`,fd,{headers:headers});
     
     } else {
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.put(this.url+`actualizar_config/${id}`,data, {headers:headers});
   }
  }
  obtener_config_publico(): Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.get(this.url+'obtener_config_publico',{headers:headers});
   }

}
