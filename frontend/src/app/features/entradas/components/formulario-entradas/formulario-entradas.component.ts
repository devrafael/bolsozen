import { CommonModule, DecimalPipe } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatSelectModule } from "@angular/material/select";
import { MatNativeDateModule } from "@angular/material/core";
import { MatInputModule } from "@angular/material/input";
import { Categoria } from "../../../categorias/models/categoria.model";
import { ActivatedRoute, Router } from "@angular/router";
import { CategoriaService } from "../../../categorias/services/categoria.service";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { EntradasService } from "../../services/entradas/entradas.service";
import { Entrada } from "../../../../shared/model/entrada.model";
import { TypeRegistry } from "../../model/typeRegistry.model";
import { TypeRegistriesService } from "../../services/typesRegistries/type-registries.service";
import { NgxMaskDirective, provideNgxMask } from "ngx-mask";
import { CapitalizePipe } from "../../../filter/pipes/capitalize/capitalize.pipe";

@Component({
  selector: "app-formulario-entradas",
  imports: [
    MatFormFieldModule,
    CommonModule,
    MatIconModule,
    MatSelectModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    FormsModule,
    NgxMaskDirective,
    CapitalizePipe,
  ],
  templateUrl: "./formulario-entradas.component.html",
  styleUrl: "./formulario-entradas.component.scss",
  standalone: true,
  providers: [
    provideNgxMask({
      thousandSeparator: ".",
      decimalMarker: ",",
      dropSpecialCharacters: false,
    }),
  ],
})
export class FormularioEntradasComponent implements OnInit {
  statusDePagamento = [
    { value: true, descricao: "Pago" },
    { value: false, descricao: "Pendente" },
  ];

  typesRegistries: TypeRegistry[] = [];
  categorias: Categoria[] = [];
  entradas: Entrada[] = [];
  anos: any[] = [];
  formEntradas!: FormGroup;
  isNovaEntrada: boolean = false;
  rota: string = "";
  id: string = "";
  entrada!: Entrada;
  qntEnt = 0;
  tituloFormulario = "";

  constructor(
    private readonly categoriaService: CategoriaService,
    private readonly entradasService: EntradasService,
    private readonly typesRegistriesService: TypeRegistriesService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.rota = this.activatedRoute.snapshot.url[0].path;
    this.buscarCategorias();
    this.getTypesRegistries();
    this.criarFormulario();

    this.buscarEntradas();
    if (this.rota === "editar") {
      this.tituloFormulario = "Editar entrada";
      this.id = this.activatedRoute.snapshot.url[1].path;
      this.buscarEntradaPorId();
    } else {
      this.tituloFormulario = "Cadastro de entrada";
      this.isNovaEntrada = true;
    }
  }

  Salvar() {
    if (this.formEntradas.touched && this.formEntradas.dirty) {
      let amountString = String(this.formEntradas.controls["valor"].value);
      let amountNumber = amountString
        ? Number(amountString.replace(/[^0-9,-]/g, "").replace(",", "."))
        : 0;
      const payload: Entrada = {
        idRegistry: this.id,
        nameRegistry: this.formEntradas.controls["nome"].value,
        amount: amountNumber,
        quantityInstallments:
          this.formEntradas.controls["quantidadeParcelas"].value,
        category: this.formEntradas.controls["categoriaId"].value,
        status: this.formEntradas.controls["pago"].value,
        type: this.formEntradas.controls["tipo"].value,
        date: this.formEntradas.controls["data"].value,
      };

      if (this.isNovaEntrada) {
        this.criarEntrada(payload);
        console.log("IF DE isNovaEntrada", payload);
      } else {
        this.editarEntrada(payload);
      }
    }
  }

  buscarCategorias() {
    this.categoriaService.getCategorias().subscribe((cat: Categoria[]) => {
      this.categorias = cat;
    });
  }

  criarEntrada(payload: Entrada) {
    this.entradasService.criarEntrada(payload).subscribe(() => {
      this.router.navigate(["entradas", "list"]);
    });
  }

  buscarAnos() {
    this.entradasService.buscarAnosCadastrados().subscribe((a: any[]) => {
      this.anos = a;
    });
  }

  buscarEntradas() {
    this.entradasService.getEntradas().subscribe((ent) => {
      this.entradas = ent;
      this.qntEnt = this.entradas.length;
    });
  }

  buscarEntradaPorId() {
    this.entradasService.getEntradaPorId(this.id).subscribe((ent: Entrada) => {
      console.log("por id: ", ent)
      this.entrada = ent;
      const [ano, mes, dia] = this.entrada.date
        .split("T")[0]
        .split("-")
        .map(Number);
      this.formEntradas.controls["nome"].setValue(this.entrada.nameRegistry);
      this.formEntradas.controls["valor"].setValue(this.entrada.amount),
      this.formEntradas.controls["quantidadeParcelas"].setValue(this.entrada.quantityInstallments)
        this.formEntradas.controls["categoriaId"].setValue(
          this.entrada.category.categoryId
        ),
        this.formEntradas.controls["pago"].setValue(this.entrada.status),
        this.formEntradas.controls["tipo"].setValue(
          this.entrada.type.typeRegistryCode
        ),
        this.formEntradas.controls["data"].setValue(
          new Date(ano, mes - 1, dia)
        );
    });
  }

  criarFormulario() {
    this.formEntradas = this.formBuilder.group({
      nome: ["", Validators.required],
      valor: ["", Validators.required],
      quantidadeParcelas: [1, Validators.required],
      categoriaId: ["", Validators.required],
      pago: [true, Validators.required],
      tipo: ["despesa", Validators.required],
      data: [new Date(), Validators.required],
    });
  }

  Voltar() {
    this.router.navigate(["entradas", "list"]);
  }

  getTypesRegistries() {
    this.typesRegistriesService
      .getAllTypes()
      .subscribe((type: TypeRegistry[]) => {
        this.typesRegistries = type;
      });
  }

  editarEntrada(payload: Entrada) {
    this.entradasService.editarEntrada(payload).subscribe(() => {
      this.router.navigate(["entradas", "list"]);
    });
  }
}
