import { Component, OnInit } from "@angular/core";
import { MatFormField, MatLabel } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { CategoriaService } from "../../services/categoria.service";
import { Categoria } from "../../models/categoria.model";

@Component({
  selector: "app-formulario",
  imports: [
    MatFormField,
    MatLabel,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: "./forms-categories.component.html",
  styleUrl: "./forms-categories.component.scss",
})
export class FormularioComponent implements OnInit {
  categories: Categoria[] = [];
  category!: Categoria;
  id: string = "";
  formCategory!: FormGroup;
  path: string = "";
  isNewCategory: boolean = false;
  titleForms = "";

  constructor(
    private categoryService: CategoriaService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.path = this.activatedRoute.snapshot.url[0].path;
    this.builderFormCategory();
    this.getCategories();

    if (this.path === "editar") {
      this.titleForms = "Editar categoria";
      this.id = this.activatedRoute.snapshot.url[1].path;
      this.getCategoryById();
    } else {
      this.titleForms = "Cadastro de categoria";
      this.isNewCategory = true;
    }
  }

  Salvar() {
    if (this.formCategory.touched && this.formCategory.dirty) {
      const payload: Categoria = {
        categoryId: 0,
        categoryName: this.formCategory.controls["nome"].value,
        description: this.formCategory.controls["descricao"].value,
      };
      if (this.isNewCategory) {
        this.createCategory(payload);
      } else {
        payload.categoryId = this.category.categoryId;
        this.editCategory(payload);
      }
    }
  }

  getCategories() {
    this.categoryService.getCategorias().subscribe((cat: Categoria[]) => {
      this.categories = cat;
    });
  }

  getCategoryById() {
    this.categoryService
      .getCategoriaPorId(parseInt(this.id))
      .subscribe((cat: Categoria) => {
        this.category = cat;
        this.formCategory.controls["nome"].setValue(this.category.categoryName);
        this.formCategory.controls["descricao"].setValue(
          this.category.description
        );
      });
  }

  Back() {
    this.router.navigate(["categorias", "list"]);
  }

  editCategory(payload: Categoria) {
    this.categoryService.editarCategoria(payload).subscribe((res) => {
      this.router.navigate(["categorias", "list"]);
    });
  }

  createCategory(payload: Categoria) {
    this.categoryService.criarCategoria(payload).subscribe((res) => {
      this.router.navigate(["categorias", "list"]);
    });
  }

  builderFormCategory() {
    this.formCategory = this.formBuilder.group({
      nome: ["", Validators.required],
      descricao: ["", Validators.required],
    });
  }
}
