import { Component,OnInit, ViewChild } from '@angular/core';
import { MatPaginator, } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AdminService } from 'src/app/services/admin.service';
import { ClienteService } from 'src/app/services/cliente.service';
import { MatDialog } from '@angular/material/dialog';

declare let iziToast : any;

@Component({

  selector: 'app-index-cliente',
  templateUrl: './index-cliente.component.html',
  styleUrls: ['./index-cliente.component.css'],


})


export class IndexClienteComponent implements OnInit {

  public filtroNombres = '';
  public filtroApellidos = '';
  public filtroCorreo = '';
  public token:any;
  public index: number = 1
  public modalVisible:{ [key: string]: boolean} = {};
  public loading: boolean = true;


  displayedColumns: string[] = ['numero','nombres', 'apellidos', 'email','opciones'];
  clientes = new MatTableDataSource<PeriodicElement>();
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  




  constructor(
    private _clienteService: ClienteService,
    private _AdminService : AdminService,
    public dialog: MatDialog
    ) {

      this.token = this._AdminService.getToken();
    
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

  init_data() {
    this._clienteService.listar_clientes_filtro_admin(null, null, this.token).subscribe({
       next: (response) => {
          this.clientes = response.data;
          this.clientes = new MatTableDataSource<PeriodicElement>(
            response.data
          );
          this.clientes.paginator = this.paginator;
                // Enumera las filas
                this.index = 1; // Restablece el contador
                this.clientes.data.forEach((row) => {
                  row.index = this.index;
                  this.index++;
                });
                setTimeout(() => {
                  this.loading = false;
                  
                }, 1000);
        },
       error: (error) => {
          console.error(error);
        }
  });
  }


  filtro(tipo: any) {


    if (tipo == 'nombres') {

      if (this.filtroNombres) {
        this.loading = true;
        this._clienteService.listar_clientes_filtro_admin(tipo, this.filtroNombres,this.token).subscribe({
          next:(response) => {
            this.clientes = response.data;
            this.loading = false;
          },
         error: (error) => {
            console.log(error);
          }
      });
        
      } else {
        this.init_data();
      }

    } else if (tipo == 'apellidos') {

      if (this.filtroApellidos) {
        this.loading = true;
        this._clienteService.listar_clientes_filtro_admin(tipo, this.filtroApellidos,this.token).subscribe({
         next: (response) => {
            this.clientes = response.data;
            this.loading = false;
          },
         error: (error) => {
            console.log(error);
          }
      });
        
      } else {
        this.init_data();
      }


    } else if (tipo == 'correo') {

      if (this.filtroCorreo) {
        this.loading = true;
        this._clienteService.listar_clientes_filtro_admin(tipo, this.filtroCorreo,this.token).subscribe({
         next: (response) => {
            
            this.clientes = response.data;
            this.loading = false;
          },
          error: (error) => {
            console.log(error);
          }
         } );
        
      } else {
        this.init_data();
      }
    }


  }

  
  eliminarCliente(clientid:any) {
    // Lógica para eliminar el cliente
    this._clienteService.eliminar_cliente(clientid,this.token).subscribe({
      next: (response)=>{
        iziToast.show({
          title: 'SUCCESS',
          titleColor: '#1DC74C',
          class: 'text-success',
          position: 'topRight',
          message: 'El cliente se ha Eliminado correctamente',
        });

        this.modalVisible[clientid] = false;
        this.init_data();

      },
      error: (error)=>{

      }
  })

   
  }

}

export interface PeriodicElement {
  nombres: string;
  apellidos: string;
  email: string;
  index: number;
}
