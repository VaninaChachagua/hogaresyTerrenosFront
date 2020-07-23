import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InmueblesService } from '../../services/inmuebles.service';

class ImageSnippet {
  constructor(public src: string, public file: File) {}
}

@Component({
  selector: 'app-cargar-archivos',
  templateUrl: './cargar-archivos.component.html',
  styleUrls: ['./cargar-archivos.component.css']
})
export class CargarArchivosComponent implements OnInit {

  id: string;
  inmueble: any;
  selectedFile: ImageSnippet;
  archivo: any;
  correctamente = false;
  incorrectamente = false;

  constructor(private route: ActivatedRoute, private inmueblesService: InmueblesService) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.inmueblesService.getInmueble(this.id).subscribe(data => {
      if (data.ok) {
        if (data.inmueble !== '') {
          this.inmueble = data.inmueble;
        }
      }
    });
  }

  cargarArchivos() {
    const tipoArchivo = (document.getElementById('tipoArchivo') as HTMLInputElement).value;
    if (!this.inmueble.archivos[tipoArchivo]) {
      this.inmueble.archivos[tipoArchivo] = [];
    } else {
      this.inmueble.archivos[tipoArchivo].push();
    }
  }

  uploadArchivo() {
    console.log(this.archivo);
    this.correctamente = false;
    this.incorrectamente = false;
    // this.inmueblesService.uploadArchivos(this.archivo, this.id).subscribe(
    const tipoArchivo = (document.getElementById('tipoArchivo') as HTMLInputElement).value;
    console.log(tipoArchivo);
    this.inmueblesService.uploadArchivos(this.archivo, tipoArchivo, this.id).subscribe(
      (res) => {
        if (res.ok) {
          console.log('Se cargó con archivo');
          this.correctamente = true;
        } else {
          console.log('Problema para cargar el archivo');
          this.incorrectamente = true;
        }
      });
  }

  async obtenerArchivo(imagen) {
    console.log( document.getElementById('archivo'));
    // console.log(imagen.target.files[0].name);
    console.log(imagen.files);
    const file: File = imagen.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', async (event: any) => {
      this.selectedFile = new ImageSnippet(event.target.result, file);
      console.log(this.selectedFile.file);
    });
    reader.readAsDataURL(file);
    console.log(file);
    this.archivo =  imagen.files;
    // console.log(this.selectedFile);
  }
}
