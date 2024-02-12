
import { Component,OnInit, ViewChild } from '@angular/core';
import { MatPaginator, } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AdminService } from 'src/app/services/admin.service';
import { MatDialog } from '@angular/material/dialog';
import { ProductoService } from 'src/app/services/producto.service';
import { GLOBAL } from 'src/app/services/global';
import { CuponService } from 'src/app/services/cupon.service';

declare let iziToast : any;

@Component({
  selector: 'app-index-cupon',
  templateUrl: './index-cupon.component.html',
  styleUrls: ['./index-cupon.component.css']
})
export class IndexCuponComponent {
  public filtroCupon = '';
  public token:any;
  public index: number = 1;
  public modalVisible:{ [key: string]: boolean} = {};
  public loading: boolean = true;
  public url:any;

  displayedColumns: string[] = ['numero','codigo','tipo', 'valor', 'limite','opciones'];
  cupones = new MatTableDataSource<PeriodicElement>();
    
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    public dialog: MatDialog,
    public _CuponService : CuponService

    ) {

      this.token = localStorage.getItem('token');
      this.url = GLOBAL.url;
    }

    ngOnInit():void{
      this._CuponService.listar_cupon(null,this.token).subscribe({
        next: (response)=>{

          //console.log(response.data);
          
          this.cupones = response.data;
          this.cupones = new MatTableDataSource<PeriodicElement>(
            response.data
          );
          this.cupones.paginator = this.paginator;
          this.index = 1;

          this.cupones.data.forEach((row)=>{
            row.index = this.index;
            this.index++;
          });
          setTimeout(() => {
            this.loading = false;
          },1000);

        },
        error: (err)=>{
          console.log(err);
          
        }
      })
    }

    openModal(clientid:any) {

      this.modalVisible[clientid] = true;
    }
  
    closeModal(clientid:any) {
      this.modalVisible[clientid] = false;
    }

    eliminarCupon(id:any){
    // Lógica para eliminar el cliente
    this._CuponService.eliminar_cupon(id,this.token).subscribe({
      next: (response)=>{
        iziToast.show({
          title: 'SUCCESS',
          titleColor: '#1DC74C',
          class: 'text-success',
          position: 'topRight',
          message: 'El Cupon se ha Eliminado correctamente',
        });

        this.modalVisible[id] = false;
        this.ngOnInit();

      },
      error: (error)=>{

      }
  })

   
    }
    
    filtro(){
      if (this.filtroCupon) {
        this.loading = true;
        this._CuponService.listar_cupon(this.filtroCupon,this.token).subscribe({
          next: (response) => {
            this.cupones = response.data;
            this.loading = false;
          },
         error: (error) => {
            console.log(error);
          }
      });
        
      } else {
        this.ngOnInit();
      }
    }
    
}

export interface PeriodicElement {
  index: number;
  codigo: string;
  tipo: string;
  valor: number;
  limite: string;

}