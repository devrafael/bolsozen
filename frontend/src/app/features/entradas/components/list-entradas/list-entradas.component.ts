import { Component, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { EntradasService } from "../../services/entradas/entradas.service";
import { Entrada } from "../../../../shared/model/entrada.model";
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { MatPaginator, MatPaginatorModule } from "@angular/material/paginator";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { CommonModule } from "@angular/common";
import { StatusPipe } from "../../pipes/status.pipe";
import dayjs from "dayjs";
import { FormFilterService } from "../../../../shared/services/form-filter/formFilter.service";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CategoriaService } from "../../../categorias/services/categoria.service";
import { Categoria } from "../../../categorias/models/categoria.model";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from "@angular/material/select";
import { CapitalizePipe } from "../../../filter/pipes/capitalize/capitalize.pipe";

@Component({
  selector: "app-list-entradas",
  imports: [
    MatPaginator,
    MatPaginatorModule,
    MatFormFieldModule,
    MatSelectModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    StatusPipe,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CapitalizePipe
  ],
  templateUrl: "./list-entradas.component.html",
  styleUrl: "./list-entradas.component.scss",
})
export class ListEntradasComponent {
  displayedColumns: string[] = [
    "nome",
    "pago",
    "data",
    "valorTotal",
    "valorParcela",
    "parcelaAtual",
    "tipo",
    "categoria",
    "editar",
    "deletar",
  ];
  dataSource = new MatTableDataSource<Entrada>();
  entradas: Entrada[] = [];
  monthAndYear = {
    mes: '',
    ano: ''
  }
  cat = "FODASE"
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor(
    private entradasService: EntradasService,
    private router: Router,
    private formFilterService: FormFilterService,
  ) {}

  ngOnInit(): void {
    this.listRegistries();

  }

  ngDoCheck(): void {
    
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    
  }

  listRegistries() {
    this.formFilterService.dataReceived$.subscribe(data=>{
      this.dataSource.data = data;
    })
  }

  updateRegistry(entradas: Entrada) {
    this.router.navigate(["entradas", "editar", entradas.idRegistry]);
  }

  deleteRegistry(id: string) {
    this.entradasService.excluirEntrada(id).subscribe(() => {
      this.listRegistries();
    });
  }

  novaEntrada() {
    this.router.navigate(["entradas", "nova-entrada"]);
  }

  formatCurrency(valor: number): string {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(valor);
  }
}
