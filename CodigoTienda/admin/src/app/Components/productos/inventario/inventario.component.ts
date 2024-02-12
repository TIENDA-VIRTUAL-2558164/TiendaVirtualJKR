import { Component,OnInit, ViewChild } from '@angular/core';
import { MatPaginator, } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AdminService } from 'src/app/services/admin.service';
import { MatDialog } from '@angular/material/dialog';
import { ProductoService } from 'src/app/services/producto.service';
import { GLOBAL } from 'src/app/services/global';
import { ActivatedRoute, Route, Router } from '@angular/router';

import { Workbook } from 'exceljs';
import * as fs from 'file-saver'; 

declare let iziToast : any;



@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.css']
})
export class InventarioComponent {
  public filtrotitulo = '';
  public token:any;
  public _idUser : any;
  public modalVisible:{ [key: string]: boolean} = {};
  public loading: boolean = true;
  public url:any;
  public producto: any = {};
  public id:any;
  public inv: Array<any> = [];
  public ArrayInventario: Array<any> = [];
  public ExcelInventario: Array<any> = [];

  public FormInventario : any = {};
  


  displayedColumns: string[] = ['admin','cantidad','proveedor','opciones'];
  inventario = new MatTableDataSource<PeriodicElement>();
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private _productoService: ProductoService,
    private _AdminService : AdminService,
    public dialog: MatDialog,
    public _producto_services : ProductoService,
    public _Router : Router,
    public _route : ActivatedRoute

    ) {

      this.token = this._AdminService.getToken();
      this.url = GLOBAL.url;
      this._idUser = localStorage.getItem('_id');
    
    }

  ngOnInit():void {
    this._route.params.subscribe(
      params=>{
        this.id = params['id'];

        this._producto_services.obtener_producto(this.id,this.token).subscribe(
          response=>{
            if (response.data == undefined) {

              this.producto = undefined;
              this.loading = false;

            } else {
              this.producto = response.data;
              this._productoService.listar_inventario(this.producto._id,this.token).subscribe(
                response=>{
                  this.ArrayInventario = response.data;
                  this.inv = response.data;
                  this.inventario = new MatTableDataSource<PeriodicElement>(response.data);
                    this.loading = false; 

                    this.ArrayInventario.forEach((e)=>{
                      this.ExcelInventario.push({
                        admin : e.admin.nombres + ' '+ e.admin.apellidos,
                        cantidad : e.cantidad,
                        proveedor : e.proveedor,
                      })
                    })
    
                },
                error=>{

                }
              )

            }
          },
          error=>{

          }
        )
      }
    )
  }
  openModal(clientid:any) {

    this.modalVisible[clientid] = true;
  }

  closeModal(clientid:any) {
    this.modalVisible[clientid] = false;
  }

  eliminarInventario(id:any){
    this._productoService.eliminar_inventario(id,this.token).subscribe(
      response=>{
        iziToast.show({
          title: 'SUCCESS',
          titleColor: '#1DC74C',
          class: 'text-success',
          position: 'topRight',
          message: 'El inventario se ha Eliminado correctamente',
        });

        this.modalVisible[id] = false;
        this.ngOnInit();
      },
      error=>{
        iziToast.show({
          title: 'SUCCESS',
          titleColor: '##FF0000',
          class: 'text-success',
          position: 'topRight',
          message: 'El Inventario no se ha podido Eliminar.',
        });
      }
    )
  }

  registroInventario(forminventario:any){
    if (forminventario.valid) {
      let data = {
        producto: this.producto._id,
        cantidad: this.FormInventario.cantidad,
        admin: this._idUser,
        proveedor: this.FormInventario.proveedor,

      }

      this._productoService.registrar_inventario(data,this.token).subscribe(
        response=>{
          iziToast.show({
            title: 'SUCCESS',
            titleColor: '#1DC74C',
            class: 'text-success',
            position: 'topRight',
            message: 'El inventario se ha registrado correctamente',
          });
          this.ngOnInit();
        },
        err=>{

        }
      )
      
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

  DownloadExcel(){
    let workbook = new Workbook();
    let workSheet = workbook.addWorksheet("Resporte de productos");

    workSheet.addRow(undefined);
    for (let xl of this.ExcelInventario){
      let x2 = Object.keys(xl);

      let temp = [];
       for(let y of x2){
        temp.push(xl[y])
       }
       workSheet.addRow(temp)
    }
    let fname = 'REP01- ';

    workSheet.columns = [
    { header: 'Trabajador', key: 'col1', width: 30 },
    { header: 'Cantidad', key: 'col2', width: 15 },
    { header: 'Proveedor', key: 'col3', width: 25 },

    ]as any;

    workbook.xlsx.writeBuffer().then((data)=>{
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob,fname+'-'+new Date().valueOf()+'.xlsx');
    });

  }



}

export interface PeriodicElement {
  admin: string;
  cantidad: number;
  proveedor: string;
  opciones: string;

}
