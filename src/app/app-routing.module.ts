import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LogInComponent } from './pages/log-in/log-in.component';
import { CargarusuarioComponent } from './pages/cargarusuario/cargarusuario.component';
import { CargarinmuebleComponent } from './pages/cargarinmueble/cargarinmueble.component';
import { GraficosComponent } from './pages/graficos/graficos.component';
import { InmuebleComponent } from './pages/inmueble/inmueble.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { InformacionAdicionalComponent } from './pages/informacion-adicional/informacion-adicional.component';
import { CargarArchivosComponent } from './pages/cargar-archivos/cargar-archivos.component';
import { EditarInmuebleComponent } from './pages/editar-inmueble/editar-inmueble.component';
import { EditarUsuarioComponent } from './pages/editar-usuario/editar-usuario.component';
import { EditarTodosusrComponent } from './pages/editar-todosusr/editar-todosusr.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LogInComponent },
  { path: 'cargarUsuario', component: CargarusuarioComponent },
  { path: 'cargarInmueble', component: CargarinmuebleComponent },
  { path: 'detalleInmueble/:id', component: InmuebleComponent },
  { path: 'informacion-adicional', component: InformacionAdicionalComponent },
  { path: 'mostrarGraficos', component: GraficosComponent },
  { path: 'cargarArchivos/:id', component: CargarArchivosComponent },
  { path: 'editarInmueble/:id', component: EditarInmuebleComponent },
  { path: 'editarUsuario/:id', component: EditarUsuarioComponent },
  { path: 'editarTodos', component: EditarTodosusrComponent },
  { path: 'error', component: NotFoundComponent },
  { path: '', pathMatch: 'full', redirectTo: 'home'},
  { path: '**', pathMatch: 'full', redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
