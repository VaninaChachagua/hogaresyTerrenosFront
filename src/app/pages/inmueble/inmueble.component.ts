
import { Component, OnInit } from '@angular/core';
// Para tomar los valores de los parámetros
import { ActivatedRoute} from '@angular/router';
import { InmueblesService } from '../../services/inmuebles.service';


@Component({
    selector: 'app-inmueble',
    templateUrl: './inmueble.component.html',
    styleUrls: ['./inmueble.component.css']
})
export class InmuebleComponent implements OnInit {

  inmueble: any = {};

  constructor( private activatedRoute: ActivatedRoute,
               // tslint:disable-next-line: variable-name
               private _inmueblesService: InmueblesService) {
  }

  ngOnInit() {
    // Me suscribo al observable
    this.activatedRoute.params.subscribe( params => {

      this._inmueblesService.putVisitas(params[`id`]).subscribe();
      // tslint:disable-next-line: no-string-literal
      this._inmueblesService.getInmueble(params['id']).subscribe(data => {
         this.inmueble = data.inmueble;
         console.log(this.inmueble);
        });
    });
  }
  mail() {
    const para = this.inmueble.usuario.email;
    const subject = `Consulta por: ${this.inmueble.identificador} ${window.location.href}`;
    const bodyMail = (document.getElementById('bodyMail') as HTMLInputElement).value ;
    // tslint:disable-next-line: max-line-length
    const mailArmador = `https://mail.google.com/mail/u/0/?view=cm&fs=1&to=${para}&su=${subject}&body=${bodyMail}`;
    window.open(mailArmador, '_blank');
  }


}
