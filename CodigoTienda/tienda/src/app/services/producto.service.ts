import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http'; 
import { Observable } from 'rxjs';
import { GLOBAL } from './global';


@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  public url;

  constructor(
    private _http : HttpClient
  ) { 
    this.url = GLOBAL.url;
  }

  InfoProductos(slug:any): Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json'});
    return this._http.get(this.url+`info_productos_tienda/${slug}`,{headers:headers});
   };

   ProductosRecomendados(categoria:any): Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json' });
    return this._http.get(this.url+`listar_productos_recomendados/${categoria}`,{headers:headers});
   }

   getEnvios():Observable<any>{
    return this._http.get('./assets/envios.json');
   }

   ProductosNuevos(): Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json' });
    return this._http.get(this.url+`listar_productos_nuevos`,{headers:headers});
   }
}
