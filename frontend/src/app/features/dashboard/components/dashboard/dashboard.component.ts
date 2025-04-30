import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DoCheck,
  ElementRef,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation,
} from "@angular/core";
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
} from "@angular/forms";
import { MatIconModule } from "@angular/material/icon";
import { Entrada } from "../../../../shared/model/entrada.model";
import { Month } from "../../model/month.model";
import { NgxEchartsDirective, provideEchartsCore } from "ngx-echarts";
import * as echarts from "echarts/core";
import { BarChart, PieChart } from "echarts/charts";
import {
  GridComponent,
  LegendComponent,
  TooltipComponent,
} from "echarts/components";
import { CanvasRenderer } from "echarts/renderers";
import { EChartsOption } from "echarts/types/dist/shared";
import { WalletService } from "../../../../shared/services/wallet/wallet.service";
import { GraphicService } from "../../../../shared/services/graphic/graphic.service";
import { CapitalizePipe } from "../../../filter/pipes/capitalize/capitalize.pipe";
echarts.use([
  BarChart,
  GridComponent,
  CanvasRenderer,
  PieChart,
  TooltipComponent,
  LegendComponent,
]);

@Component({
  selector: "app-dashboard",
  imports: [
    MaterialModule,
    MatFormFieldModule,
    MatCardModule,
    MatSelectModule,
    CommonModule,
    NgxEchartsDirective,
    MatIconModule,
    ReactiveFormsModule,
    FormsModule,
    CapitalizePipe
  ],
  templateUrl: "./dashboard.component.html",
  styleUrl: "./dashboard.component.scss",
  encapsulation: ViewEncapsulation.None,
  providers: [provideEchartsCore({ echarts })],
})
export class DashboardComponent implements OnInit {
  meses: Month[] = [];
  anos: any[] = [
    { value: 2025, viewValue: 2025 },
    { value: 2026, viewValue: 2026 },
  ];
  entradas: Entrada[] = [];
  saldo = 0;
  despesa = 0;
  receita = 0;
  formDashboard!: FormGroup;
  graphicCategoriesOptions!: EChartsOption;
  graphicDetailsCategoriesOptions!: EChartsOption;
  dataChartDetailsCategory: Entrada[] = [];
  categorySelected = "";

  constructor(
    private walletService: WalletService,
    private graphicService: GraphicService
  ) {}

  ngOnInit(): void {
    this.walletService.saldoAtual$.subscribe((value) => (this.saldo = value));
    this.walletService.receitaAtual$.subscribe(
      (value) => (this.receita = value)
    );
    this.walletService.despesaAtual$.subscribe(
      (value) => (this.despesa = value)
    );
    this.graphicService.dataChartCategory$.subscribe((data) => {
      this.entradas = data;
      this.grahicCategories();
    });
    this.graphicService.dataChartDetailsCategory$.subscribe((data) => {
      this.dataChartDetailsCategory = data;
      this.graphicDetailsCategories();
    });
  }

  grahicCategories() {
    const amountPerCategory = this.entradas.reduce((acc, item) => {
      acc[item.category.categoryName] =
        (acc[item.category.categoryName] || 0) + item.amount;
      return acc;
    }, {} as Record<string, number>);

    let categories = Object.keys(amountPerCategory);
    let amounts = Object.values(amountPerCategory);

    this.graphicCategoriesOptions = {
      xAxis: {
        type: "category",
        name: "Categorias",
        nameLocation: "middle",
        nameTextStyle: {
          fontWeight: "bold",
          padding: [20, 0, 0, 0],
        },
        data: categories,
      },
      yAxis: {
        name: "Valor (Mil)",
        nameLocation: "end",
        nameTextStyle: {
          fontWeight: "bold",
        },
        axisLabel: {
          formatter: function (value: number | bigint) {
            return new Intl.NumberFormat("pt-BR").format(Number(value) / 1000);
          },
        },
      },
      series: [
        {
          name: "Valor (R$)",
          data: amounts,
          type: "bar",
          label: {
            show: true,
            position: "top",
            formatter: "R${c},00",
          },
        },
      ],
    };
  }

  graphicDetailsCategories() {
    const dataChartDetails: { value: number; name: string }[] = [];
    this.dataChartDetailsCategory.forEach((item) => {
      dataChartDetails.push({
        name: item.nameRegistry,
        value: item.amount,
      });
      this.categorySelected = item.category.categoryName;
    });

    this.graphicDetailsCategoriesOptions = {
      tooltip: {
        trigger: "item",
        
      },
      legend: {
        top: "5%",
        left: "center",
      },
      series: [
        {
          name: "Registro",
          type: "pie",
          radius: ["40%", "70%"],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: "#fff",
            borderWidth: 2,
          },
          label: {
            show: true,
            position: "outside",
            formatter: "{d}%" // Exibe apenas a porcentagem dentro do gráfico
          },
          labelLine: {
            show: true,
          },
          data: dataChartDetails,
        },
      ],
    };
  }

  detailsCategory(chartInstance: echarts.ECharts) {
    chartInstance.on("click", (params) => {
      if (params.componentType === "series") {
        alert(
          `Você clicou na categoria "${params.name}" com valor R$ ${params.value}`
        );
      }
    });
  }
}
