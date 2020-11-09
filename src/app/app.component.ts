import { Component } from '@angular/core';
import { EnvironmentConfigService } from './services/environment-config.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'HogaresYTerrenos';
  window = window;
  constructor( private environmentConfigService: EnvironmentConfigService) {
    this.environmentConfigService.getIP();
  }
}
