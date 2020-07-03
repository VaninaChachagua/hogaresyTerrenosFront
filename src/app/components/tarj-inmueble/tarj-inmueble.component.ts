
import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tarj-inmueble',
  templateUrl: './tarj-inmueble.component.html',
  styleUrls: ['./tarj-inmueble.component.css']
})
export class TarjInmuebleComponent implements OnInit {
  // Mostrar los datos en cada tarjeta
  @Input() inmueble: any = {};
  // Redireccionar al detalle
  @Input() index: number;
  @Output() inmuebleSeleccionado: EventEmitter<number>;
  constructor( private router: Router) {
    this.inmuebleSeleccionado = new EventEmitter();
  }
  ngOnInit() {
  }
  verInmueble(id: string) {
    console.log(id);
    this.router.navigate(['/detalleInmueble/' + id]);
  }
}
