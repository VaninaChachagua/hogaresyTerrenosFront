import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EnvironmentConfigService {
  private ip = new BehaviorSubject('');
  currentIP = this.ip.asObservable();

  constructor() { }
  getIP() {
    //para desa
    // this.ip.next('http://localhost:3000');

    //para prod
    this.ip.next(window.location.origin);
  }
}
