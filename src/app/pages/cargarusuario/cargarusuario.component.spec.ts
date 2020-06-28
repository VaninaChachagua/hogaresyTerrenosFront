import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CargarusuarioComponent } from './cargarusuario.component';

describe('CargarusuarioComponent', () => {
  let component: CargarusuarioComponent;
  let fixture: ComponentFixture<CargarusuarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CargarusuarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CargarusuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
