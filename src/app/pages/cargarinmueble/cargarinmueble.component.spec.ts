import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CargarinmuebleComponent } from './cargarinmueble.component';

describe('CargarinmuebleComponent', () => {
  let component: CargarinmuebleComponent;
  let fixture: ComponentFixture<CargarinmuebleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CargarinmuebleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CargarinmuebleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
