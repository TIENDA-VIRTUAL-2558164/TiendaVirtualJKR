import { Component,OnInit, ViewChild } from '@angular/core';
import { MatPaginator, } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ProductoService } from 'src/app/services/producto.service';
import { GLOBAL } from 'src/app/services/global';
import { Workbook } from 'exceljs';
import * as fs from 'file-saver'; 

declare let iziToast : any;

@Component({
  selector: 'app-index-producto',
  templateUrl: './index-producto.component.html',
  styleUrls: ['./index-producto.component.css']
})
export class IndexProductoComponent {

  public filtrotitulo = '';
  public token:any;
  public index: number = 1;
  public modalVisible:{ [key: string]: boolean} = {};
  public loading: boolean = true;
  public url:any;
  public ExcelProductos: Array<any> = [];
  public Productos: Array<any> = [];

  displayedColumns: string[] = ['numero','titulo','stock', 'precio', 'categoria','ventas','opciones'];
  productos = new MatTableDataSource<PeriodicElement>();
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private _productoService: ProductoService,
    public dialog: MatDialog,

    ) {

      this.token = localStorage.getItem('token');
      this.url = GLOBAL.url;
    
    }

  ngOnInit():void {
   this.init_data();
  }
  openModal(clientid:any) {

    this.modalVisible[clientid] = true;
  }

  closeModal(clientid:any) {
    this.modalVisible[clientid] = false;
  }

  init_data(){
    this._productoService.listar_productos(null, this.token).subscribe(
      (response) => {
        this.productos = response.data;
        this.Productos = response.data
        this.productos = new MatTableDataSource<PeriodicElement>(
          response.data
        );
        this.productos.paginator = this.paginator;
              // Enumera las filas
              this.index = 1; // Restablece el contador
              this.productos.data.forEach((row) => {
                row.index = this.index;
                this.index++;
              });
              setTimeout(() => {
                this.loading = false;
                
              }, 1000);

              this.Productos.forEach((e)=>{
                this.ExcelProductos.push({
                  titulo : e.titulo,
                  stock: e.stock,
                  precio: e.precio,
                  categoria: e.categoria,
                  nventas: e.nventas

                })
              })

             // console.log(this.ExcelProductos);
              
      },
      (error) => {
        
      }
    );
  }

  eliminarProducto(productoId:any){
    this._productoService.eliminar_producto(productoId, this.token ).subscribe(
      response=>{
        iziToast.show({
          title: 'SUCCESS',
          titleColor: '#1DC74C',
          class: 'text-success',
          position: 'topRight',
          message: 'El Producto se ha Eliminado correctamente',
        });

        this.modalVisible[productoId] = false;
        this.init_data();
      },
      error=>{
        iziToast.show({
          title: 'SUCCESS',
          titleColor: '##FF0000',
          class: 'text-success',
          position: 'topRight',
          message: 'El Producto no se ha podido Eliminar.',
        });
      }
    )

  }

  filtro(){
    if (this.filtrotitulo) {
      this.loading = true;
      this._productoService.listar_productos(this.filtrotitulo,this.token).subscribe(
        (response) => {
          this.productos = response.data;
          this.loading = false;
        },
        (error) => {
          console.log(error);
        }
      );
      
    } else {
      this.init_data();
    }
  }

  DownloadExcel(){
    let workbook = new Workbook();
    let workSheet = workbook.addWorksheet("Resporte de productos");

    workSheet.addRow(undefined);
    for (let xl of this.ExcelProductos){
      let x2 = Object.keys(xl);

      let temp = [];
       for(let y of x2){
        temp.push(xl[y])
       }
       workSheet.addRow(temp)
    }
    let fname = 'REP01- ';

    workSheet.columns = [
    { header: 'Producto', key: 'col1', width: 30 },
    { header: 'Stock', key: 'col2', width: 15 },
    { header: 'Precio', key: 'col3', width: 15 },
    { header: 'Categoria', key: 'col4', width: 25 },
    { header: 'N° de ventas', key: 'col5', width: 15 },
    ]as any;

    workbook.xlsx.writeBuffer().then((data)=>{
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob,fname+'-'+new Date().valueOf()+'.xlsx');
    });

  }

}

export interface PeriodicElement {
  index: number;
  titulo: string;
  stock: string;
  precio: number;
  categoria: string;
  ventas:string;
}