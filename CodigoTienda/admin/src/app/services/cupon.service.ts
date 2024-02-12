import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GLOBAL } from './global';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CuponService {

  getPeriodicElements() {
    throw new Error('Method not implemented.');
  }
  public url:any;

  constructor(
    private _http : HttpClient
  ) {
    this.url = GLOBAL.url;
   }

   registro_cupon_admin(data:any,token:string): Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.post(this.url+`registro_cupon`,data,{headers:headers});
   }

   listar_cupon(filtro:any, token:string): Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.get(this.url+`listar_cupon/${filtro}`,{headers:headers});
   }

   obtener_cupon(id:any, token:string): Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.get(this.url+`obtener_cupon/${id}`,{headers:headers});
   }
   editar_cupon(data:any,id:any,token:any): Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.put(this.url+`editar_cupon/${id}`,data,{headers:headers});
   }
   eliminar_cupon(id:any,token:any): Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.delete(this.url+`eliminar_cupon/${id}`,{headers:headers});
   }

}
