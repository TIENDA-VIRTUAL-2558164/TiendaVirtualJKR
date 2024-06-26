import { Injectable } from '@angular/core';
import { Inject } from '@angular/core';
import { GLOBAL } from './global';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { DOCUMENT } from '@angular/common';


@Injectable({
  providedIn: 'root'
})
export class ClienteService {

 
  
  public url;
  constructor(
    private _http : HttpClient, 
    @Inject(DOCUMENT) private document: Document
  ) {
    this.url = GLOBAL.url; 
   }


   public isAuthenticated():boolean{

    const localStorage = this.document.defaultView?.localStorage

    if(!localStorage){
      throw new Error('Error localStorage')
    }    

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
    
    return true;
    
   }

   login_cliente(data: any): Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.post(this.url+'login_cliente',data,{headers:headers});
   }
   
   obtener_usuario_cliente(id:any,token:any): Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.get(this.url+`obtener_usuario_cliente/${id}`,{headers:headers});
   }

   editar_perfil(id:any,token:any, data:any): Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.put(this.url+`editar_perfil_cliente/${id}`,data,{headers:headers});
   }

   obtener_config_publico(): Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.get(this.url+'obtener_config_publico',{headers:headers});
   }

   listar_productos_tienda(filtro:any): Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json'});
    return this._http.get(this.url+`listar_productos_tienda/${filtro}`,{headers:headers});
   }

   AgregarCarrito(data:any,token:any): Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json', 'Authorization': token});
    return this._http.post(this.url+`agregarCarrito`,data,{headers:headers});
   }
   
   ObtenerCarrito(id:any, token:any): Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json', 'Authorization': token});
    return this._http.get(this.url+`obtenerCarrito/${id}`,{headers:headers});
   }

   EliminarCarrito(id:any, token:any): Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json', 'Authorization': token});
    return this._http.delete(this.url+`eliminarCarrito/${id}`,{headers:headers});
   }

   RegitrarDireccion(data:any,token:any): Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json', 'Authorization': token});
    return this._http.post(this.url+`registrarDireccion`,data,{headers:headers});
   }

   DatosDivipola(): Observable<any> {
    const Count = 1121; // Número exacto de datos que deseas obtener

    // Construye los parámetros de la consulta para obtener la cantidad deseada de datos
    const params = new HttpParams()
      .set('$limit', String(Count));
    return this._http.get('https://www.datos.gov.co/resource/gdxc-w37w.json', { params });
  }

  ObtenerDireccion(id:any,token:any): Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json', 'Authorization': token});
    return this._http.get(this.url+`ObtenerDireccion/${id}`,{headers:headers});
   }

   ActDireccionPrincipal(id:any,idCliente:any,token:any): Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json', 'Authorization': token});
    return this._http.put(this.url+`ActDireccionPrincipal/${id}/${idCliente}`,{data:true},{headers:headers});
   }

   RegitrarVenta(data:any,token:any): Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json', 'Authorization': token});
    return this._http.post(this.url+`registroCompra`,data,{headers:headers});
   }


}


