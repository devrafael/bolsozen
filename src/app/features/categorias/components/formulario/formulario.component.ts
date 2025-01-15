import { Component, OnInit } from '@angular/core';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriaService } from '../../services/categoria.service';
import { Categoria } from '../../models/categoria.model';

@Component({
  selector: 'app-formulario',
  imports: [
    MatFormField,
    MatLabel,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './formulario.component.html',
  styleUrl: './formulario.component.scss'
})
export class FormularioComponent implements OnInit{

  categorias: Categoria[] = [];
  categoria!: Categoria;
  id: string = '';
  formCategoria!: FormGroup
  rota: string = ''
  isNovaCategoria: boolean = false
  qntCat = 0;
  tituloFormulario = ''

constructor(private categoriaService: CategoriaService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder
  ){}

  ngOnInit(): void {
    this.rota = this.activatedRoute.snapshot.url[0].path;
    this.criarFormulario();
    this.buscarCategorias()
    
    
    if(this.rota === 'editar'){
      this.tituloFormulario = 'Editar categoria';
      this.id = this.activatedRoute.snapshot.url[1].path;
      this.buscarCategoriaPeloId();     
    }else{
      this.tituloFormulario = 'Cadastro de categoria'
      this.isNovaCategoria = true;
    }
  }

  Salvar(){
    console.log('chamando metodo Salvar')
    console.log(this.qntCat + 1)

    
    if(this.formCategoria.touched && this.formCategoria.dirty){
      
      const payload: Categoria = {
        id: (1 + this.qntCat).toString(),
        nome: this.formCategoria.controls['nome'].value,
        descricao: this.formCategoria.controls['descricao'].value

      }
      console.log(payload.id)
      
      if(this.isNovaCategoria){
        this.criarCategoria(payload)
      }else{
        payload.id = this.categoria.id;
        this.editarCategoria(payload)
      }

    }
  }

  buscarCategorias() {
    this.categoriaService.getCategorias()
    .subscribe((cat: Categoria[]) => {
      this.categorias = cat;
      this.qntCat = this.categorias.length
    
    });
  }

  buscarCategoriaPeloId(){
    this.categoriaService.getCategoriaPorId(parseInt(this.id))
      .subscribe((cat: Categoria) => {

        this.categoria = cat;
        this.formCategoria.controls['nome'].setValue(this.categoria.nome)
        this.formCategoria.controls['descricao'].setValue(this.categoria.descricao)
      })
  }


  Voltar(){
    this.router.navigate(['categorias', 'list']);
  }

  editarCategoria(payload: Categoria){
    this.categoriaService.editarCategoria(payload)
    .subscribe(res =>{
      this.router.navigate(['categorias', 'list']);
    });

  }

  criarCategoria(payload: Categoria){
    this.categoriaService.criarCategoria(payload)
    .subscribe(res =>{
      this.router.navigate(['categorias', 'list']);
    });

  }

  criarFormulario(){

    this.formCategoria = this.formBuilder.group(
      {
     
        nome: ['', Validators.required],
        descricao: ['', Validators.required]
      }
    )
  }


}
