
import { Injectable } from '@angular/core';
import { GLOBAL } from './global';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  getPeriodicElements() {
    throw new Error('Method not implemented.');
  }
  public url:any;

  constructor(
    private _http : HttpClient,
  ) { 
    this.url = GLOBAL.url; 
  }
  registro_producto_admin(data:any,file:any,token:any): Observable<any>{
    let headers = new HttpHeaders({'Authorization':token});

    const fd = new FormData();
    fd.append('titulo',data.titulo);
    fd.append('stock',data.stock);
    fd.append('precio',data.precio);
    fd.append('descripcion',data.descripcion);
    fd.append('contenido',data.contenido);
    fd.append('categoria',data.categoria);
    fd.append('portada',file);
    return this._http.post(this.url+`registro_producto_admin`,fd,{headers:headers});
   }

   listar_productos(filtro:any,token:any): Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.get(this.url+`listar_productos/${filtro}`,{headers:headers});
   }

   obtener_producto(id:any,token:any): Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.get(this.url+`obtener_producto/${id}`,{headers:headers});
   }

   editar_producto(data:any,id:any,token:any): Observable<any>{
   if (data.portada) {
    let headers = new HttpHeaders({'Authorization':token});

    const fd = new FormData();
    fd.append('titulo',data.titulo);
    fd.append('stock',data.stock);
    fd.append('precio',data.precio);
    fd.append('descripcion',data.descripcion);
    fd.append('contenido',data.contenido);
    fd.append('categoria',data.categoria);
    fd.append('portada',data.portada);
    return this._http.put(this.url+`editar_producto/${id}`,fd,{headers:headers});
   
   } else {
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.put(this.url+`editar_producto/${id}`,data,{headers:headers});
   }
  }

  eliminar_producto(id:any,token:any): Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.delete(this.url+`eliminar_producto/${id}`,{headers:headers});
   }

   listar_inventario(id:any,token:any): Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.get(this.url+`listar_inventario/${id}`,{headers:headers});
   }

   eliminar_inventario(id:any,token:any): Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.delete(this.url+`eliminar_inventario/${id}`,{headers:headers});
   }

   registrar_inventario(data:any,token:any): Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.post(this.url+`registrar_inventario`,data,{headers:headers});
   }
   
   editar_variedad_admin(data:any,id:any,token:any): Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.put(this.url+`editar_variedad_admin/${id}`,data,{headers:headers});
   }

   Agregar_galeria(data:any,id:any,token:any): Observable<any>{
    let headers = new HttpHeaders({'Authorization':token});

    const fd = new FormData();
    fd.append('_id',data._id);
    fd.append('imagen',data.imagen);
    return this._http.put(this.url+`Agregar_galeria/${id}`,fd,{headers:headers});
   }

   Eliminar_img_galeria_admin(data:any,id:any,token:any): Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.put(this.url+`Eliminar_galeria_admin/${id}`,data,{headers:headers});
   }   

}
