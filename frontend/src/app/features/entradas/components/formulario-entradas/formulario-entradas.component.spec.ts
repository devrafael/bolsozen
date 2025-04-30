import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioEntradasComponent } from './formulario-entradas.component';

describe('FormularioEntradasComponent', () => {
  let component: FormularioEntradasComponent;
  let fixture: ComponentFixture<FormularioEntradasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularioEntradasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormularioEntradasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
