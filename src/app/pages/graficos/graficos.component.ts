import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InmueblesService } from '../../services/inmuebles.service';
import { ConsultasService } from '../../services/consultas.service';
import {Chart} from 'chart.js';
import { isNull } from 'util';

@Component({
  selector: 'app-graficos',
  templateUrl: './graficos.component.html',
  styleUrls: ['./graficos.component.css']
})
export class GraficosComponent implements OnInit {

  inmuebles: any = [];
  barrios: any;
  casitas: any;
  chart: any = {};
  constructor(private activatedRoute: ActivatedRoute,
              // tslint:disable-next-line: variable-name
              private consultasService: ConsultasService) { }

  ngOnInit() {
    this.consultasService.getInmuebles().subscribe(async data => {
      this.inmuebles = data.inmueble;
      // identificador
      // precio
      console.log(data);
      // this.graficarPolarArea();
      });
  }
  buscarBarriosMasVistos() {
    const barrios = {};
    this.inmuebles.forEach( inm => {
      if ( inm.barrio in barrios) {
        barrios[inm.barrio] += inm.visitas;
      } else {
        barrios[inm.barrio] = inm.visitas;
      }
    });
    // Nombre barrio
    const labels = [];
    // cantidad de barrios
    const data = [];
    Object.keys(barrios).forEach(unbarrio => {
      labels.push(unbarrio);
      data.push(barrios[unbarrio]);
    });
    this.graficarPolarArea(labels, data);
  }

  buscarInmueblesMasVistos() {
      let casitas = [];
      const cant = 10;
      Object.keys(this.inmuebles).forEach(e => {
          casitas.push({ identificador: this.inmuebles[e].identificador, cantidad: this.inmuebles[e].visitas });
      });
      console.log(casitas);
      casitas.sort((a, b) => (a.cantidad > b.cantidad) ? -1 : ((b.cantidad > a.cantidad) ? 1 : 0));
      casitas = casitas.slice(0, cant);
      // this.inmuebles.forEach( inm => {
      //   if ( inm._id in casitas) {
      //     casitas[inm._id] += inm.visitas;
      //   } else {
      //     casitas[inm._id] = inm.visitas;
      //   }
      // });
      // console.log(casitas);
      // Nombre barrio
      const labels = [];
      // cantidad de barrios
      const data = [];
      casitas.forEach(unacasa => {
        labels.push(unacasa.identificador);
        data.push(unacasa.cantidad);
      });
      // console.log(casitas.reduce((max, game) => max.votes > game.votes ? max : game));
      this.graficarPolarArea(labels, data);
  }

  graficarPolarArea(labels, data) {
    this.borrarCanva();
    this.chart =  new Chart(document.getElementById('chart'), {
      data: { labels, datasets: [{data, backgroundColor: [
        'rgba(204, 0, 0, 0.2)',
        'rgba(204, 102, 0, 0.2)',
        'rgba(204, 204, 0, 0.2)',
        'rgba(102, 204, 0, 0.2)',
        'rgba(0, 204, 0, 0.2)',
        'rgba(0, 204, 102, 0.2)',
        'rgba(0, 204, 204, 0.2)',
        'rgba(0, 102, 204, 0.2)',
        'rgba(0, 0, 204, 0.2)',
        'rgba(102, 0, 204, 0.2)',
        'rgba(204, 0, 204, 0.2)',
        'rgba(204, 0, 102, 0.2)',
        'rgba(204, 0, 0, 0.2)',
        'rgba(204, 102, 0, 0.2)',
        'rgba(204, 204, 0, 0.2)',
        'rgba(102, 204, 0, 0.2)',
        'rgba(0, 204, 0, 0.2)',
        'rgba(0, 204, 102, 0.2)',
        'rgba(0, 204, 204, 0.2)',
        'rgba(0, 102, 204, 0.2)',
        'rgba(0, 0, 204, 0.2)',
        'rgba(102, 0, 204, 0.2)',
        'rgba(204, 0, 204, 0.2)',
        'rgba(204, 0, 102, 0.2)',
      ],
      borderColor: [
        'rgba(204, 0, 0, 1)',
        'rgba(204, 102, 0, 1)',
        'rgba(204, 204, 0, 1)',
        'rgba(102, 204, 0, 1)',
        'rgba(0, 204, 0, 1)',
        'rgba(0, 204, 102, 1)',
        'rgba(0, 204, 204, 1)',
        'rgba(0, 102, 204, 1)',
        'rgba(0, 0, 204, 1)',
        'rgba(102, 0, 204, 1)',
        'rgba(204, 0, 204, 1)',
        'rgba(204, 0, 102, 1)',
        'rgba(204, 0, 0, 1)',
        'rgba(204, 102, 0, 1)',
        'rgba(204, 204, 0, 1)',
        'rgba(102, 204, 0, 1)',
        'rgba(0, 204, 0, 1)',
        'rgba(0, 204, 102, 1)',
        'rgba(0, 204, 204, 1)',
        'rgba(0, 102, 204, 1)',
        'rgba(0, 0, 204, 1)',
        'rgba(102, 0, 204, 1)',
        'rgba(204, 0, 204, 1)',
        'rgba(204, 0, 102, 1)',
      ],
      borderWidth: 1}]},
      type: 'polarArea',
      options: {
        responsive: true,
        legend: {
          position: 'right',
        },
        title: {
          display: true,
          text: 'Chart.js Polar Area Chart'
        },
        scale: {
          ticks: {
            beginAtZero: true
          },
          reverse: false
        },
        animation: {
          animateRotate: false,
          animateScale: true
        }
    }
  });
  }

  borrarCanva() {
    const chartPadre = document.getElementById('chartPadre');
    const canvas = document.createElement('canvas');
    canvas.setAttribute('id', 'chart');
    chartPadre.innerHTML = '';
    chartPadre.appendChild(canvas);
  }

}
