import { Component, OnInit } from '@angular/core';
import { InmueblesService } from '../../services/inmuebles.service';

class ImageSnippet {
  constructor(public src: string, public file: File) {}
}

@Component({
  selector: 'app-cargarinmueble',
  templateUrl: './cargarinmueble.component.html',
  styleUrls: ['./cargarinmueble.component.css']
})
export class CargarinmuebleComponent implements OnInit {
  selectedFile: ImageSnippet;
  image: any;
  inmuebleCargado: any;
  constructor( private inmueblesService: InmueblesService) { }

  ngOnInit() {
  }
  crearInmueble() {
    const identificador = (document.getElementById('identificador') as HTMLInputElement).value;
    const precio = (document.getElementById('precio') as HTMLInputElement).value;
    const moneda = (document.getElementById('moneda') as HTMLInputElement).value;
    const direccion = (document.getElementById('direccion') as HTMLInputElement).value;
    const barrio = (document.getElementById('barrio') as HTMLInputElement).value;
    const descripcion = (document.getElementById('descripcion') as HTMLInputElement).value;
    const cantHab = (document.getElementById('cantHab') as HTMLInputElement).value;
    const tipoInmueble = (document.getElementById('tipoInmueble') as HTMLInputElement).value;
    const tipoVenta = (document.getElementById('tipoVenta') as HTMLInputElement).value;
    // VANI, Cambiar por el usuario que está ejecutando la carga
    const usuario = '5eb9d75c1d3f7c3efc86bfd7';

    // tslint:disable-next-line: max-line-length
    this.inmueblesService.postInmueble(identificador, precio, moneda, direccion, barrio, descripcion, cantHab, tipoInmueble, tipoVenta, usuario).subscribe(data => {
      if (data.ok) {
        window.alert('Tu inmueble ha sido cargado con exito');
        this.uploadImage(data.inmueble._id);
      } else {
        console.log(data);
        window.alert('Error, intente de nuevo');
      }
    });
  }
  async obtenerImagen(imagen) {
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
    this.image =  imagen.files;
    // console.log(this.selectedFile);
  }

  uploadImage(id) {
    console.log(this.image);
    this.inmueblesService.uploadImage(this.image, id).subscribe(
      (res) => {
        if (res.ok) {
          console.log('Se cargó con imagen');
        } else {
          console.log('Problema para cargar la imagen');
        }
      });
  }
}

