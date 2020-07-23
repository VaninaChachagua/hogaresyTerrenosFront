import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  anio: number ;
  constructor( private router: Router) {
   }

  ngOnInit() {
    this.anio = new Date().getFullYear();
  }
  about() {
    this.router.navigate([`/about`]);
  }

}
