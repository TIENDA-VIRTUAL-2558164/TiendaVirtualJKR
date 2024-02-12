import { Injectable } from '@angular/core';
import { GLOBAL } from './global';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  getPeriodicElements() {
    throw new Error('Method not implemented.');
  }

  public url;
  constructor(
    private _http : HttpClient,
  ) {
    this.url = GLOBAL.url; 
   }

   listar_clientes_filtro_admin(tipo:any,filtro:any,token:any): Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.get(this.url+`listar_clientes_filtro_admin/${tipo}/${filtro}`,{headers:headers});
   }

   registro_cliente_admin(data:any,token:string): Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.post(this.url+`registro_cliente_admin`,data,{headers:headers});
   }
   
   obtener_cliente(id:any,token:any): Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.get(this.url+`obtener_cliente/${id}`,{headers:headers});
   }

   editar_cliente(data:any,id:any,token:any): Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.put(this.url+`editar_cliente/${id}`,data,{headers:headers});
   }
   
   eliminar_cliente(id:any,token:any): Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.delete(this.url+`eliminar_cliente/${id}`,{headers:headers});
   }

}
