import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListEntradasComponent } from './list-entradas.component';

describe('ListEntradasComponent', () => {
  let component: ListEntradasComponent;
  let fixture: ComponentFixture<ListEntradasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListEntradasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListEntradasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
