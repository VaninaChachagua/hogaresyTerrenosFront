import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InmueblesService } from '../../services/inmuebles.service';

@Component({
  selector: 'app-editar-inmueble',
  templateUrl: './editar-inmueble.component.html',
  styleUrls: ['./editar-inmueble.component.css']
})
export class EditarInmuebleComponent implements OnInit {
  id: any;
  inmueble: any;
  constructor(private route: ActivatedRoute, private inmueblesService: InmueblesService) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.inmueblesService.getInmueble(this.id).subscribe(data => {
      if (data.ok) {
        this.inmueble = data.inmueble;
      }
    });
  }

}
