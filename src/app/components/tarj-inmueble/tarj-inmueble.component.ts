import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-tarj-inmueble',
  templateUrl: './tarj-inmueble.component.html',
  styleUrls: ['./tarj-inmueble.component.css']
})
export class TarjInmuebleComponent implements OnInit {
  @Input() inmueble: any ;
  constructor() { }

  ngOnInit() {
  }

}
