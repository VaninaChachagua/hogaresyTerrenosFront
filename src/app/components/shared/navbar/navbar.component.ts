import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: []
})
export class NavbarComponent implements OnInit {
  role: any;

  constructor(private loginService: LoginService) {
    this.obtenerRole();
  }

  ngOnInit() {
  }

  obtenerRole() {
    this.loginService.obtenerRole().subscribe(data => {
      if (data.ok) {
        this.role = data.role;
      } else {
        this.role = null;
      }
    });
  }

}