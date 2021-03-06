import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { InmueblesService } from '../../services/inmuebles.service';
import { EnvironmentConfigService } from '../../services/environment-config.service';

@Component({
  selector: 'app-arbol-archivos',
  templateUrl: './arbol-archivos.component.html',
  styleUrls: ['./arbol-archivos.component.css']
})
export class ArbolArchivosComponent implements OnChanges {

  @Input() idInm: string ;
  inmueble: any;
  archivosKeys: any;
  host: any;

  constructor(private inmueblesService: InmueblesService, private environmentConfigService: EnvironmentConfigService) {
    this.environmentConfigService.currentIP.subscribe(data => { this.host = data; });
  }

  // tslint:disable-next-line: use-life-cycle-interface
  ngOnChanges(): void {
    if (this.idInm) {
      this.loadInmueble();
    }
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
    console.log(this.idInm);
    this.inmueblesService.getInmueble(this.idInm).subscribe(data => {
      if (data.ok) {
        this.inmueble = data.inmueble;
        console.log(data);
        if (this.inmueble && this.inmueble.archivos) {
          this.archivosKeys = Object.keys(this.inmueble.archivos).sort();
          setTimeout(() => {
            this.loadTreeEvents();
          }, 1);
        } else {
          window.alert('No existen archivos para el inmueble seleccionado');
        }
      }
    });
  }

}
