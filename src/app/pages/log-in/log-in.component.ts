import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styles: []
})
export class LogInComponent implements OnInit {

  constructor( private loginService: LoginService, private router: Router) { }

  ngOnInit() {
  }
  login() {
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const pass = (document.getElementById('password') as HTMLInputElement).value;
    this.loginService.loginAuthentication(email, pass).subscribe(data => { 
      console.log(data);
      if (data.ok) {
        this.router.navigate(['home']);
      } else {
        console.error('No se ha podido cargar la petición');
      }
     });

  }

}
