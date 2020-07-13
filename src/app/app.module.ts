import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { LogInComponent } from './pages/log-in/log-in.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http';
import { FooterComponent } from './components/shared/footer/footer.component';
import { TarjInmuebleComponent } from './components/tarj-inmueble/tarj-inmueble.component';
import { CarruselImagenesComponent } from './components/carrusel-imagenes/carrusel-imagenes.component';
import { FiltrosComponent } from './components/filtros/filtros.component';
import { CargarusuarioComponent } from './pages/cargarusuario/cargarusuario.component';
import { CargarinmuebleComponent } from './pages/cargarinmueble/cargarinmueble.component';
import { GraficosComponent } from './pages/graficos/graficos.component';
import { InmuebleComponent } from './pages/inmueble/inmueble.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LogInComponent,
    NavbarComponent,
    FooterComponent,
    TarjInmuebleComponent,
    CarruselImagenesComponent,
    FiltrosComponent,
    CargarusuarioComponent,
    CargarinmuebleComponent,
    GraficosComponent,
    InmuebleComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
