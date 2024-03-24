import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../../../services/cliente.service';

declare var $: any;
declare var iziToast : any;

interface Departamento {
  codigo: string;
  nombre: string;
}
interface Municipio {
  codigoMun: string;
  nombreMun: string;
}


@Component({
  selector: 'app-direcciones',
  templateUrl: './direcciones.component.html',
  styleUrl: './direcciones.component.css'
})
export class DireccionesComponent implements OnInit {

  public direction: any = {
    pais: '',
    departamento: '',
    municipio: '',
    principal: false
  };

  public token: string | null;
  public id : string | null;

  departamentos: Departamento[] = [];
  municipios: Municipio[] = [];

  constructor(
    private _ClienteService: ClienteService
  ) {
    this.token = localStorage.getItem('token');
    this.id = localStorage.getItem('_id')
  }

  ngOnInit() {
    this.obtenerDepartamentos()
  }

  AddDirections(form: any) {
    if (form) {
      const data = {
        cliente : this.id,
        destinatario: this.direction.destinatario,
        dni: this.direction.dni,
        direccion: this.direction.direccion,
        pais: this.direction.pais,
        departamento: this.direction.departamento,
        municipio: this.direction.municipio,
        localidadBarrio: this.direction.localidadBarrio,
        telefono: this.direction.telefono,
        DirPrincipal: this.direction.principal
      }
      //console.log(data);
      
     this._ClienteService.RegitrarDireccion(data,this.token).subscribe({
      next: (response)=>{
        //console.log(response);
        iziToast.show({
          title: 'SUCCESS',
          titleColor: '#1DC74C',
          class: 'text-success',
          position: 'topRight',
          message: 'La Direccion se ha agregado correctamente',
        });
      },
      error: (err)=>{
        console.log(err);
        
      }
     })
    }
  }

  obtenerDepartamentos() {
    this._ClienteService.DatosDivipola().subscribe({
      next: (response: any[]) => {
        //console.log(response);
        // Asegúrate de que response sea del tipo array
        const departamentosMap = new Map<string, Departamento>(); // Usaremos un Map para almacenar departamentos únicos
        // Iterar sobre la respuesta y agregar los departamentos al Map
        response.forEach((dpto: any) => {
          if (!departamentosMap.has(dpto.cod_depto)) {
            // Si el departamento no está en el Map, lo agregamos
            departamentosMap.set(dpto.cod_depto, {
              codigo: dpto.cod_depto,
              nombre: dpto.dpto
            });
          }
        });
        // Convertir los valores del Map a un arreglo y asignarlo a departamentos
        this.departamentos = Array.from(departamentosMap.values());
      }
    });
  }

  SelectPais() {
    if (this.direction.pais == 'Colombia') {
      $('#departamento').prop('disabled', false);
    }
  }

  selectDepartamento() {
    if (this.direction.departamento) {
      this._ClienteService.DatosDivipola().subscribe({
        next: (response) =>{
          const municipioMap = new Map<string, Municipio>();

          response.forEach( (mun:any) =>{
            if (this.direction.departamento == mun.cod_depto ) {
              if (!municipioMap.has(mun.cod_mpio)) {
                // Si el departamento no está en el Map, lo agregamos
                municipioMap.set(mun.cod_mpio, {
                  codigoMun: mun.cod_mpio,
                  nombreMun: mun.nom_mpio
                });
              }
            };
          });
          this.direction.municipio = '';
          this.municipios = Array.from(municipioMap.values())
          //console.log(this.municipios);
          //console.log(response);
          
        },
        error: (err)=>{
          console.log(err);
        }
      });

      $('#municipio').prop('disabled', false);
    }
  }

  selectMunicipio(){
    $('#localidadBarrio').prop('disabled',false)
  }

}
