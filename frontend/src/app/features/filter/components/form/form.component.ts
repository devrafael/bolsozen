import { Component, Output } from "@angular/core";
import * as echarts from "echarts/core";
import { BarChart, PieChart } from "echarts/charts";
import {
  GridComponent,
  LegendComponent,
  TooltipComponent,
} from "echarts/components";
import { CanvasRenderer } from "echarts/renderers";
import { Categoria } from "../../../categorias/models/categoria.model";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatCardModule } from "@angular/material/card";
import { MatSelectModule } from "@angular/material/select";
import { CommonModule } from "@angular/common";
import { MatIconModule } from "@angular/material/icon";
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { MaterialModule } from "../../../../shared/material/material.module";
import { Month } from "../../../dashboard/model/month.model";
import { DashboardService } from "../../../dashboard/service/dashboard.service";
import { Entrada } from "../../../../shared/model/entrada.model";
import { WalletService } from "../../../../shared/services/wallet/wallet.service";
import { GraphicService } from "../../../../shared/services/graphic/graphic.service";
import { FormFilterService } from "../../../../shared/services/form-filter/formFilter.service";
import { EntradasService } from "../../../entradas/services/entradas/entradas.service";
import { BehaviorSubject, filter } from "rxjs";
import { CategoriaService } from "../../../categorias/services/categoria.service";
import { CapitalizePipe } from "../../pipes/capitalize/capitalize.pipe";
echarts.use([
  BarChart,
  GridComponent,
  CanvasRenderer,
  PieChart,
  TooltipComponent,
  LegendComponent,
]);

@Component({
  selector: "app-filter-form",
  imports: [
    MaterialModule,
    MatFormFieldModule,
    MatCardModule,
    MatSelectModule,
    CommonModule,
    MatIconModule,
    ReactiveFormsModule,
    FormsModule,
    CapitalizePipe,
  ],
  templateUrl: "./form.component.html",
  styleUrl: "./form.component.scss",
})
export class FormComponent {
  registries$ = new BehaviorSubject<Entrada[]>([]);
  RegistriesfiltredMonthAndYear$ = new BehaviorSubject<Entrada[]>([]);
  categories$ = new BehaviorSubject<Categoria[]>([]);

  balance = 0;
  expense = 0;
  income = 0;
  formDashboard!: FormGroup;
  meses: Month[] = [];
  anos: any[] = [
    { value: 2025, viewValue: 2025 },
    { value: 2026, viewValue: 2026 },
    { value: 2027, viewValue: 2027 },
    { value: 2028, viewValue: 2028 },
    { value: 2029, viewValue: 2029 },
    { value: 2030, viewValue: 2030 },
    { value: 2031, viewValue: 2031 },
    { value: 2032, viewValue: 2032 },
    { value: 2033, viewValue: 2033 },
    { value: 2034, viewValue: 2034 },
    { value: 2035, viewValue: 2035 },
    { value: 2036, viewValue: 2036 },
    { value: 2037, viewValue: 2037 },
    { value: 2038, viewValue: 2038 },
    { value: 2039, viewValue: 2039 },
    { value: 2040, viewValue: 2040 },
    { value: 2040, viewValue: 2041 },
  ];

  constructor(
    private dashboardService: DashboardService,
    private entradaServive: EntradasService,
    private formBuilder: FormBuilder,
    private walletService: WalletService,
    private graphicService: GraphicService,
    private formFilterService: FormFilterService,
    private categoryService: CategoriaService
  ) {}

  ngOnInit(): void {
    this.criarFormulario();
    this.buscarMeses();
    this.buscarCategorias();
  }

  getRegistries() {
    this.registries$;
    this.balance = 0;
    this.expense = 0;
    this.income = 0;

    const payload = {
      month: this.formDashboard.controls["mes"].value,
      year: this.formDashboard.controls["ano"].value,
      status: this.formDashboard.controls["status"].value,
      category_id: this.formDashboard.controls["categoryId"].value,
    };

    if (payload.month != "" && payload.year != "") {
      this.dataChartCategory(payload);
      this.getRegistriesFiltred(payload);
    } else {
      alert('Os campos "Mês" e "Ano" são obrigatórios!');
    }
  }

  dataChartCategory(payload: any) {
    this.entradaServive
      .getRegistriesPerMonthAndYear(payload)
      .subscribe((registries: Entrada[]) => {
        this.RegistriesfiltredMonthAndYear$.next(registries);
        this.calculateValues();
        this.graphicService.updateDataChartCategory(
          this.RegistriesfiltredMonthAndYear$.value
        );
      });
  }

  getRegistriesFiltred(payload: any) {
    const inputCategory = this.formDashboard.controls["categoryId"].value;

    this.entradaServive
      .getRegistries(payload)
      .subscribe((registries: Entrada[]) => {
        this.registries$.next(registries);
        this.dataListRegistres();

        if (inputCategory != "") {
          this.graphicService.updateDataChartDetailsCategory(
            this.registries$.value
          );
        }
      });
  }

  dataListRegistres() {
    this.registries$.subscribe((registries) => {
      this.formFilterService.EmitData(registries);
    });
  }

  calculateValues() {
    this.getReceitas();
    this.getDespesas();
    this.getSaldo();
    this.walletService.updateValues(this.balance, this.expense, this.income);
  }

  getReceitas() {
    this.RegistriesfiltredMonthAndYear$.value.forEach((entrada: Entrada) => {
      if (entrada.type.typeRegistryName === "RECEITA") {
        this.income += entrada.amount;
      }
    });
  }

  getDespesas() {
    this.RegistriesfiltredMonthAndYear$.value.forEach((entrada: Entrada) => {
      if (entrada.type.typeRegistryName === "DESPESA") {
        this.expense += entrada.amount;
      }
    });
  }

  getSaldo() {
    this.balance = this.income - this.expense;
  }

  criarFormulario() {
    this.formDashboard = this.formBuilder.group({
      mes: ["", Validators.required],
      ano: ["", Validators.required],
      status: [""],
      categoryId: [""],
    });
  }

  buscarMeses() {
    this.dashboardService.buscarMeses().subscribe((m) => {
      this.meses = m;
    });
  }

  buscarCategorias() {
    this.categoryService.getCategorias().subscribe((categories) => {
      this.categories$.next(categories);
    });
  }
}
