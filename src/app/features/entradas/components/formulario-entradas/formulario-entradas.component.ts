import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { Categoria } from '../../../categorias/models/categoria.model';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriaService } from '../../../categorias/services/categoria.service';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { EntradasService } from '../../services/entradas.service';
import { Entrada } from '../../model/entrada.model';
import dayjs from 'dayjs'; 
import { Ano } from '../../model/ano.model';


@Component({
  selector: 'app-formulario-entradas',
  imports: [
    MatFormFieldModule,
    CommonModule,
    MatIconModule,
    MatSelectModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    FormsModule
],
  templateUrl: './formulario-entradas.component.html',
  styleUrl: './formulario-entradas.component.scss',
  
})
export class FormularioEntradasComponent implements OnInit {
  statusDePagamento = [
    { value: true, descricao: 'Pago' },
    { value: false, descricao: 'Pendente' },
  ];

  tipos: any[] = ['receita', 'despesa'];

  categorias: Categoria[] = [];
  entradas: Entrada[] = [];
  anos : any[] = [];
  formEntradas!: FormGroup;
  isNovaEntrada: boolean = false
  rota: string = ''
  id: string = '';
  entrada!: Entrada;
  qntEnt = 0;
  tituloFormulario = ''
  
  constructor(
    private readonly categoriaService: CategoriaService,
    private readonly entradasService: EntradasService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
  ) {
  }
  
  

  ngOnInit(): void {
    this.rota = this.activatedRoute.snapshot.url[0].path;
    this.buscarCategorias();
    this.criarFormulario();
    this.buscarAnos();
    
    this.buscarEntradas();
    if(this.rota === 'editar'){
      this.tituloFormulario = 'Editar entrada';
      this.id = this.activatedRoute.snapshot.url[1].path;
      this.buscarEntradaPorId();     
    }else{
      this.tituloFormulario = 'Cadastro de entrada';
      this.isNovaEntrada = true;
    }
  }

  Salvar() { 

    if(this.formEntradas.touched && this.formEntradas.dirty){

      const dataFormatada = dayjs(this.formEntradas.controls['data'].value).format('DD/MM/YYYY');
      const partesData = dataFormatada.split('/');  
 
      const payload: Entrada = {

        id: (1 + this.qntEnt).toString(),
        nome: this.formEntradas.controls['nome'].value,
        valor: this.formEntradas.controls['valor'].value,
        categoriaId: this.formEntradas.controls['categoriaId'].value,
        pago: this.formEntradas.controls['pago'].value,
        tipo: this.formEntradas.controls['tipo'].value,
        data: dataFormatada,
        mes: parseInt(partesData[1]),
        ano: parseInt(partesData[2])
        
      }
      if(this.isNovaEntrada){
        this.criarEntrada(payload)
        this.criarAno(payload.ano)
      }else{
        payload.id = this.entrada.id;
        this.editarEntrada(payload)
      }

    }
  }

  criarAno(ano: number) {
      const existeAno = this.anos.some(a => a.ano === ano);
      if (!existeAno) {
        const novoAno: Ano = {
          id: this.anos.length + 1,
          ano: ano
        };
        this.entradasService.criarAno(novoAno).subscribe()
      }
   
  }
  criarEntrada(payload: Entrada){
    this.entradasService.criarEntrada(payload)
    .subscribe(() =>{
      this.router.navigate(['entradas', 'list']);
    })

  }

  buscarAnos(){
    this.entradasService.buscarAnosCadastrados()
    .subscribe((a: any[]) => {
      this.anos = a;
    })
    
  }

  buscarCategorias() {
    this.categoriaService.getCategorias()
    .subscribe((cat: Categoria[]) => {
      this.categorias = cat;
    })
  }

  buscarEntradas() {
    this.entradasService.getEntradas()
    .subscribe((ent: Entrada[]) => {
      this.entradas = ent;
      this.qntEnt = this.entradas.length
      
    })
  }

  buscarEntradaPorId(){
    this.entradasService.getEntradaPorId(parseInt(this.id))
      .subscribe((ent: Entrada) => {
        this.entrada = ent;
      
        const data = this.entrada.data.split('/');

        this.formEntradas.controls['nome'].setValue(this.entrada.nome)
        this.formEntradas.controls['valor'].setValue(this.entrada.valor),
        this.formEntradas.controls['categoriaId'].setValue(String(this.entrada.categoriaId)),
        this.formEntradas.controls['pago'].setValue(this.entrada.pago),
        this.formEntradas.controls['tipo'].setValue(this.entrada.tipo),
        this.formEntradas.controls['data'].setValue(new Date(+data[2], +data[1]-1, +data[0]))
      })
  }

  criarFormulario() {
    this.formEntradas = this.formBuilder.group({
      nome: ['', Validators.required],
      valor: ['', Validators.required],
      categoriaId: ['', Validators.required],
      pago: [true, Validators.required],
      tipo: ['despesa', Validators.required],
      data: [new Date(), Validators.required],
    });
  }

  Voltar() {
    this.router.navigate(['entradas', 'list']);
  }

  

  

  editarEntrada(payload: Entrada){
    this.entradasService.editarEntrada(payload)
    .subscribe(() =>{
      this.router.navigate(['entradas', 'list']);
    })

  }
}
function provideNgxMask(): import("@angular/core").Provider {
  throw new Error('Function not implemented.');
}

