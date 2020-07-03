import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LogInComponent } from './pages/log-in/log-in.component';
import { CargarusuarioComponent } from './pages/cargarusuario/cargarusuario.component';
import { CargarinmuebleComponent } from './pages/cargarinmueble/cargarinmueble.component';
import { GraficosComponent } from './pages/graficos/graficos.component';
import { InmuebleComponent } from './pages/inmueble/inmueble.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LogInComponent },
  { path: 'cargarUsuario', component: CargarusuarioComponent },
  { path: 'cargarInmueble', component: CargarinmuebleComponent },
  { path: 'detalleInmueble/:id', component: InmuebleComponent },
  { path: 'mostrarGraficos', component: GraficosComponent },
  { path: '', pathMatch: 'full', redirectTo: 'home'},
  { path: '**', pathMatch: 'full', redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
