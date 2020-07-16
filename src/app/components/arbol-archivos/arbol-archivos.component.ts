import { Component, OnInit, Input } from '@angular/core';
import { InmueblesService } from '../../services/inmuebles.service';

@Component({
  selector: 'app-arbol-archivos',
  templateUrl: './arbol-archivos.component.html',
  styleUrls: ['./arbol-archivos.component.css']
})
export class ArbolArchivosComponent implements OnInit {

  @Input() id: string;
  inmueble: any;
  archivosKeys: any;

  constructor(private inmueblesService: InmueblesService) {
    this.loadInmueble();
  }

  ngOnInit() {
    setTimeout(() => {
      this.loadTreeEvents();
    }, 1);
  }

  loadTreeEvents() {
    const toggler = document.getElementsByClassName('caret');
    let i;
    for (i = 0; i < toggler.length; i++) {
      toggler[i].addEventListener('click', function() {
        this.parentElement.querySelector('.nested').classList.toggle('active');
        this.classList.toggle('caret-down');
      });
    }
  }

  loadInmueble() {
    this.inmueblesService.getInmueble(this.id).subscribe(data => {
      if (data.ok) {
        // this.inmueble = data.inmueble;
        this.inmueble = {
          archivos: {
            Agua: ['archivo1.pdf', 'archivo2.pdf'],
            Alquileres: ['archivo1.pdf', 'archivo2.pdf'],
            Comprobantes: ['archivo1.pdf', 'archivo2.pdf'],
            Contratos: ['archivo1.pdf', 'archivo2.pdf'],
            Deudas: ['archivo1.pdf', 'archivo2.pdf'],
            Escrituras: ['archivo1.pdf', 'archivo2.pdf'],
            Expensas: ['archivo1.pdf', 'archivo2.pdf'],
            Gas: ['archivo1.pdf', 'archivo2.pdf'],
            'Inmobiliario Municipal': ['archivo1.pdf', 'archivo2.pdf'],
            'Libre de Deuda': ['archivo1.pdf', 'archivo2.pdf'],
            Luz: ['archivo1.pdf', 'archivo2.pdf'],
            Planos: ['archivo1.pdf', 'archivo2.pdf'],
            'Rentas Provincial': ['archivo1.pdf', 'archivo2.pdf'],
          }
        };
        this.archivosKeys = Object.keys(this.inmueble.archivos).sort();
      }
    });
  }

}
