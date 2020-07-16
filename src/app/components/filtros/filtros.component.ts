import { Component, OnInit } from '@angular/core';
import { ConsultasService } from '../../services/consultas.service';

@Component({
  selector: 'app-filtros',
  templateUrl: './filtros.component.html',
  styleUrls: ['./filtros.component.css']
})
export class FiltrosComponent implements OnInit {
  inmuebles: any;
  inmueblesFiltrados: any;
  buscandoSearch: any;
  inmueblesxFiltro: any;

  constructor( private consultasService: ConsultasService ) { }

  ngOnInit() {
    this.consultasService.getInmuebles().subscribe(data => {
    this.inmuebles = data.inmueble;
    // identificador
    // precio
    console.log(data);
    });
  }
  ordenar(orden, tipo) {
    const arrInmuebles = this.inmueblesFiltrados || this.inmuebles;
    arrInmuebles.sort((a, b) => (a[tipo] > b[tipo]) ? orden : ((b[tipo] > a[tipo]) ? -orden : 0));
    // console.log(arrInmuebles);
    arrInmuebles.forEach(element => {
      console.log(element.precio);
    });
    this.inmueblesxFiltro =  this.inmueblesFiltrados || this.inmuebles;
  }
  filtro(tipo, valor) {
    const arrInmuebles = this.inmueblesFiltrados || this.inmuebles;
    this.inmueblesFiltrados = arrInmuebles.filter(a => a[tipo].toLowerCase() === valor.toLowerCase());
    console.log(this.inmueblesFiltrados);
    this.inmueblesxFiltro =  this.inmueblesFiltrados || this.inmuebles;
  }
  limpiar() {
    this.inmueblesFiltrados = undefined;
    this.buscandoSearch = '';
  }

  search(event: any) {
    console.log(event);
    const buscando = event.target.value;
    // inmueblesFiltrados
    this.inmueblesFiltrados = this.inmueblesxFiltro || this.inmuebles;
    console.log(this.inmueblesFiltrados);
    if (buscando.length > 0) {

      this.inmueblesFiltrados = this.inmueblesFiltrados.filter(c => {
        console.log(Object.values(c));
        return Object.values(c).find((a: string) => {
          console.log(a);
          return a ? a.toString().toLowerCase().includes(buscando.toLowerCase()) : null;
        });
      });
    }
  }

}
