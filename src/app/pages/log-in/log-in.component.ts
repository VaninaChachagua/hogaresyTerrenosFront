import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  // styles: []
  styleUrls: ['./log-in.css']
})
export class LogInComponent implements OnInit {
  localStorage: any;

  constructor( private loginService: LoginService, private router: Router) {
    this.localStorage = localStorage;
  }

  ngOnInit() {
  }

  login() {
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const pass = (document.getElementById('pass') as HTMLInputElement).value;
    this.loginService.loginAuthentication(email, pass).subscribe(data => {
      console.log(data);
      if (data.ok) {
        this.localStorage.setItem('tk', data.token);
        // this.router.navigate(['home']);
        // window.location.replace(`${ window.location.hostname }/home`);
        window.open(`/home`, '_self');
      } else {
        console.error('No se ha podido cargar la petición');
      }
    });
  }
  visualizar() {
    if ((document.getElementById('pass') as HTMLInputElement).type === 'password') {
      (document.getElementById('pass') as HTMLInputElement).setAttribute('type', 'text');
      (document.getElementById('icoeye') as HTMLInputElement).style.color = '#6dce5a';
    } else {
      (document.getElementById('pass') as HTMLInputElement).setAttribute('type', 'password');
      (document.getElementById('icoeye') as HTMLInputElement).style.color = 'white';
    }
  }
}
