import { ComponentFixture, TestBed } from "@angular/core/testing";

import { DashboardComponent } from "./dashboard.component";

import { provideHttpClient } from "@angular/common/http";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { MockModule, MockProvider } from "ng-mocks";
import { DashboardService } from "../../service/dashboard.service";
import { of } from "rxjs";

describe("DashboardComponent", () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardComponent, NoopAnimationsModule],
      providers: [provideHttpClient()],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("Deve atualizar o saldo", () => {
    component.despesa = 1000;
    component.receita = 5000;

    component.getSaldo();

    expect(component.saldo).toEqual(4000);
  });

  it("Deve nao deve buscar as entradas para o dashboard sem os parametros mes e ano", () => {
    component.getEntradas();

    expect(component.entradas).toEqual([]);
  });
});
