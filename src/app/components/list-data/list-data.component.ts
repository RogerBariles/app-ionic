import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Listdata } from 'src/app/models/listData.model';
import { ListDataService } from 'src/app/services/listData.service';

@Component({
  selector: 'app-list-data',
  templateUrl: './list-data.component.html',
  styleUrls: ['./list-data.component.scss'],
})
export class ListDataComponent implements OnInit {

  load: boolean;
  inpuId: string;
  inpuPrecio: string;

  adminEmail: string;
  contacto = "contacto@tuten.cl";

  rows = [];
  rowsOrigin = [];
  columns = [
    { prop: 'bookingId' },
    { name: 'Cliente' },
    { name: 'fechaDeCreacion' },
    { name: 'Direccion' },
    { name: 'Precio' },
  ];

  constructor(
    private activatedRoute: ActivatedRoute,
    private listDataService: ListDataService,
    private router: Router
  ) {

    this.validDataUrl();
    this.load = false;
  }

  ngOnInit() {
    this.getData();
  }


  //-----------------------------------------
  // VALIDAMOS QUE EN LA URL TENGA ALGUN DATO,
  // PARA REDIRIGIRLO AL LOGIN
  //------------------------------------------
  validDataUrl(): void {

    if (this.activatedRoute.snapshot.params.adminemail) {
      this.adminEmail = this.activatedRoute.snapshot.params.adminemail
    } else {
      this.router.navigate(['/']);
    }
  };

  //-----------------------
  // TRAEMOS LISTA DE DATOS
  //-----------------------
  getData(): void {
    // LE PASAMOS LOS DOS EMAILS NECESARIO
    this.listDataService.getListData(this.contacto, this.adminEmail).subscribe(
      (response: any[]) => {


        response.forEach(anData => {
          let rowAux = {
            bookingId: '',
            cliente: '',
            fechaDeCreacion: '',
            direccion: '',
            precio: '',
          }

          rowAux.bookingId = anData.bookingId;
          rowAux.cliente = anData.tutenUserClient.firstName + " " + anData.tutenUserClient.lastName;
          rowAux.fechaDeCreacion = new Date(anData.bookingTime).toLocaleString();
          rowAux.direccion = anData.tutenUserProfessional.streetAddress;
          rowAux.precio = anData.bookingPrice;

          // GUARDAMOS EN DOS ARREGLOS DIFERENTES PARA PODER LUEGO HACER FILTRO
          // rows -> PARA MOSTRAR EN LA TABLA
          this.rows.push(rowAux);
          // rowsOrigin -> PARA FILTRAR DATOS CON RESPECTO A ESTE
          this.rowsOrigin.push(rowAux);
        });
        this.rows;
        this.load = true;

      }, error => {

      }
    )
  };

  //----------------------------------
  // FILTRAMOS CAMPOS CORRESPONDIENTES
  //----------------------------------
  changeId(value) {
    this.rows = this.rowsOrigin.filter(x => {
      let id = x.bookingId.toString();

      if (id.search(value) != -1) {
        return x;
      } else {
        return null;
      }
    })
  };

  changePrecio(value) {
    this.rows = this.rowsOrigin.filter(x => {
      let id = x.precio.toString();

      if (id.search(value) != -1) {
        return x;
      } else {
        return null;
      }
    })
  };
  //----------------------------------
  //----------------------------------

}
