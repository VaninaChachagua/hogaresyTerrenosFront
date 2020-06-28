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
  }
  filtro(tipo, valor){
    const arrInmuebles = this.inmueblesFiltrados || this.inmuebles;
    this.inmueblesFiltrados = arrInmuebles.filter(a => a[tipo].toLowerCase() === valor.toLowerCase());
    console.log(this.inmueblesFiltrados);
  }
  limpiar() {
    this.inmueblesFiltrados = undefined;
  }
  // $('#searchBar').keyup(e => {
  //   this.searchBarText = e.target.value;
  //   if (this.searchBarText.length === 0) {
  //     $('#controlMinChars').css('color', '#6c757d');
  //     this.componentsFiltered = [];
  //     this.linesToWrite = [];
  //     this.flagToWrite = 0;
  //     this.addLines();
  //   } else {
  //     if (this.searchBarText.length > 2) {
  //       $('#controlMinChars').css('color', '#6c757d');
  //       const arr = this.componentsMini.filter(c =>
  //         Object.values(c).find((a: string) => a ? a.toLowerCase().includes(this.searchBarText.toLowerCase()) : null));
  //       this.linesToWrite = [];
  //       this.flagToWrite = 0;
  //       this.componentsFiltered = arr;
  //       this.addLines();
  //     } else {
  //       this.searchBarText = '';
  //       $('#controlMinChars').css('color', 'red');
  //     }
  //   }
  //   this.scrollTop();
  // });

}
