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
  // Nombre barrio
  labels = [];

  constructor( private consultasService: ConsultasService ) { }

  ngOnInit() {
    this.consultasService.getInmuebles().subscribe(data => {
    this.inmuebles = data.inmueble;
    // identificador
    // precio
    console.log(data);
    this.barriosListado();
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
    if (buscando.length > 0) {

      this.inmueblesFiltrados = this.inmueblesFiltrados.filter(c => {
        return Object.values(c).find((a: string) => {
          return a ? a.toString().toLowerCase().includes(buscando.toLowerCase()) : null;
        });
      });
    }
  }
  barriosListado() {
    const barrios = {};
    this.inmuebles.forEach( inm => {
      if ( inm.barrio in barrios) {
        barrios[inm.barrio] += inm.visitas;
      } else {
        barrios[inm.barrio] = inm.visitas;
      }
    });
    Object.keys(barrios).forEach(unbarrio => {
      this.labels.push(unbarrio);
    });
    console.log(this.labels);
  }

}
