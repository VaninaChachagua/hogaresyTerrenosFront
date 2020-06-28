import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LogInComponent } from './pages/log-in/log-in.component';
import { CargarusuarioComponent } from './pages/cargarusuario/cargarusuario.component';
import { CargarinmuebleComponent } from './pages/cargarinmueble/cargarinmueble.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LogInComponent },
  { path: 'cargarUsuario', component: CargarusuarioComponent },
  { path: 'cargarInmueble', component: CargarinmuebleComponent },
  { path: '', pathMatch: 'full', redirectTo: 'home'},
  { path: '**', pathMatch: 'full', redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
