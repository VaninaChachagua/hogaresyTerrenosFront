import { Component, OnInit } from '@angular/core';
import { ConsultasService } from '../../services/consultas.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit {
  imagenesInmueble: any = [];
  inmuebles: any = [];
  constructor(private consultasService: ConsultasService) { }

  ngOnInit() {
    // this.navBar.obtenerRole();
    this.consultasService.getInmuebles().subscribe(async data => {
      this.inmuebles = data.inmueble;
      console.log(data);
      await this.buscarImagenes();
      });
  }
  async buscarImagenes() {
    // Función para buscar el listado de imagenes del inmuebles y enviarlas al front
    const cant = 3;
    Object.keys(this.inmuebles).forEach(e => {
        // tslint:disable-next-line: max-line-length
        this.imagenesInmueble.push({ identificador: this.inmuebles[e].identificador, img: this.inmuebles[e].img[0], cantidad: this.inmuebles[e].visitas });
    });
    this.imagenesInmueble.sort((a, b) => (a.cantidad > b.cantidad) ? -1 : ((b.cantidad > a.cantidad) ? 1 : 0));
    this.imagenesInmueble = this.imagenesInmueble.slice(0, cant);
    console.log( this.imagenesInmueble );
  }
}
