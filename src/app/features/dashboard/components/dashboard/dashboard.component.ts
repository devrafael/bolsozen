import { Component, OnInit } from "@angular/core";
import { MaterialModule } from "../../../../shared/material/material.module";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatCardModule } from "@angular/material/card";
import { MatSelectModule } from "@angular/material/select";
import { DashboardService } from "../../service/dashboard.service";
import { CommonModule } from "@angular/common";
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { MatIconModule } from "@angular/material/icon";
import { EntradasService } from "../../../entradas/services/entradas.service";
import { map } from "rxjs";
import { Entrada } from "../../../entradas/model/entrada.model";

@Component({
  selector: "app-dashboard",
  imports: [
    MaterialModule,
    MatFormFieldModule,
    MatCardModule,
    MatSelectModule,
    CommonModule,
    MatIconModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  templateUrl: "./dashboard.component.html",
  styleUrl: "./dashboard.component.scss",
})
export class DashboardComponent implements OnInit {
  meses = [
    { value: 0, viewValue: "Janeiro" },
    { value: 1, viewValue: "Fevereiro" },
    { value: 2, viewValue: "Março" },
    { value: 3, viewValue: "Abril" },
    { value: 4, viewValue: "Maio" },
    { value: 5, viewValue: "Junho" },
    { value: 6, viewValue: "Julho" },
    { value: 7, viewValue: "Agosto" },
    { value: 8, viewValue: "Setembro" },
    { value: 9, viewValue: "Outubro" },
    { value: 10, viewValue: "Novembro" },
    { value: 11, viewValue: "Dezembro" },
  ];
  anos: any[] = [];
  entradas: any[] = [];
  saldo = 0;
  despesa = 0;
  receita = 0;
  formDashboard!: FormGroup;

  constructor(
    private dashboardService: DashboardService,
    private formBuilder: FormBuilder  ) {}
    
  ngOnInit(): void {
    this.criarFormulario();
    this.buscarAnos();
  }

  getEntradas() {
    this.entradas = [];
    this.saldo = 0;
    this.despesa = 0;
    this.receita = 0;

    const payload = {
      mes: this.formDashboard.controls["mes"].value + 1,
      ano: this.formDashboard.controls["ano"].value,
    };


    this.dashboardService
      .getEntradas()
      .pipe( 
        map((entradas: Entrada[]) =>
            entradas.filter(
            (entrada: Entrada) =>
              (entrada.ano === payload.ano && entrada.mes === payload.mes) 
          )
        )
      )
      .subscribe((entradas) => {
        this.entradas = entradas
          this.getReceitas();
          this.getDespesas();
          this.getSaldo();
      });
  }

  getReceitas() {
    this.entradas.forEach((entrada: Entrada) => {
      if (entrada.tipo === "receita") {
        this.receita += parseFloat(entrada.valor.replace(",", "."));
      }
    });
  }

  getDespesas() {
    this.entradas.forEach((entrada: Entrada) => {
      if (entrada.tipo === "despesa") {
        this.despesa += parseFloat(entrada.valor.replace(",", "."));
      }
    });
  }

  getSaldo() {
    this.saldo = this.receita - this.despesa;
  }

  criarFormulario() {
    this.formDashboard = this.formBuilder.group({
      mes: ["", Validators.required],
      ano: ["", Validators.required],
    });
  }

  buscarAnos() {
    this.dashboardService.buscarAnosCadastrados().subscribe((a: any[]) => {
      this.anos = a;
    });
  }
}
