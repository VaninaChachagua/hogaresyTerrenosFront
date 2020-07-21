import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarTodosusrComponent } from './editar-todosusr.component';

describe('EditarTodosusrComponent', () => {
  let component: EditarTodosusrComponent;
  let fixture: ComponentFixture<EditarTodosusrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarTodosusrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarTodosusrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
