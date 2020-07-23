import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InmueblesService } from '../../services/inmuebles.service';
// Modelo de clase imagen
class ImageSnippet {
  constructor(public src: string, public file: File) {}
}

@Component({
  selector: 'app-editar-inmueble',
  templateUrl: './editar-inmueble.component.html',
  styleUrls: ['./editar-inmueble.component.css']
})
export class EditarInmuebleComponent implements OnInit {
  id: any;
  inmueble: any;
  image: any;
  selectedFile: ImageSnippet;
  archivosKeys: any;

  constructor(private route: ActivatedRoute, private inmueblesService: InmueblesService) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.inmueblesService.getInmueble(this.id).subscribe(data => {
      if (data.ok) {
        this.inmueble = data.inmueble;
        console.log(this.inmueble);
        this.archivosKeys = Object.keys(this.inmueble.archivos);
        setTimeout(() => {
          this.loadTreeEvents();
        }, 1);
        }
    });
  }
  actualizarInmueble() {
    const identificador = (document.getElementById('identificador') as HTMLInputElement).value;
    const precio = (document.getElementById('precio') as HTMLInputElement).value;
    const moneda = (document.getElementById('moneda') as HTMLInputElement).value;
    const direccion = (document.getElementById('direccion') as HTMLInputElement).value;
    const barrio = (document.getElementById('barrio') as HTMLInputElement).value;
    const descripcion = (document.getElementById('descripcion') as HTMLInputElement).value;
    const cantHab = (document.getElementById('cantHab') as HTMLInputElement).value;
    const tipoInmueble = (document.getElementById('tipoInmueble') as HTMLInputElement).value;
    const tipoVenta = (document.getElementById('tipoVenta') as HTMLInputElement).value;
    const usuario = '5eb9d75c1d3f7c3efc86bfd7';

    // tslint:disable-next-line: max-line-length
    this.inmueblesService.putInmueble(this.id, identificador, precio, moneda, direccion, barrio, descripcion, cantHab, tipoInmueble, tipoVenta, usuario).subscribe(data => {
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
  this.inmueblesService.uploadImage(this.image, id).subscribe(
    (res) => {
      if (res.ok) {
        console.log('Se cargó con imagen');
      } else {
        console.log('Problema para cargar la imagen');
      }
    });
  }

  borrar(type, id, e) {
    // e.target.parentElement.parentElement.remove();
    // window.confirm('¿Está seguro que desea eliminar este elemento?');
    if (confirm('¿Está seguro que desea eliminar este elemento?')) {
      // Save it!
      this.inmueblesService.borrarArchivos(this.id, type, id).subscribe(data => {
        console.log(data);
        if (data.ok) {
          console.log('Thing was saved to the database.');
          let t = e.target;
          while (t.tagName !== 'LI' && t.id !== 'imagecontainer') {
            t = t.parentElement;
          }
          t.remove();
        }
      });
    } else {
      // Do nothing!
      console.log('Thing was not saved to the database.');
    }
  }

  loadTreeEvents() {
    const toggler = document.getElementsByClassName('caret');
    let i;
    for (i = 0; i < toggler.length; i++) {
      toggler[i].addEventListener('click', function() {
        this.parentElement.querySelector('.nested').classList.toggle('active');
        this.classList.toggle('caret-down');
      });
    }
  }
}
