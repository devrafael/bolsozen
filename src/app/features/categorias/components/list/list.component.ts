import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { CategoriaService } from '../../services/categoria.service';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { Categoria } from '../../models/categoria.model';
import {MatButtonModule} from '@angular/material/button';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-list',
  imports: [
    MatPaginator,
    MatPaginatorModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    FormsModule
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent implements AfterViewInit, OnInit{



  displayedColumns: string[] = ['nome', 'descricao', 'editar', 'deletar'];
  dataSource = new MatTableDataSource<Categoria>();
  categorias: Categoria[] = []

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor(private categoriaService: CategoriaService,
    private router: Router
  ){
  
  }

  ngOnInit(): void {
    this.buscarCategorias();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  buscarCategorias(){
    this.categoriaService.getCategorias()
    .subscribe((cat: Categoria[]) =>{
      this.categorias = cat;
      this.dataSource.data = this.categorias
    })
  }


  editarCategoria(categoria: Categoria){
    this.router.navigate(['categorias', 'editar', categoria.id])
  }

  excluirCategoria(id: number){
    this.categoriaService.excluirCategoria(id)
    .subscribe(() => {
      this.buscarCategorias();
    })
  }


  novaCategoria(){
    this.router.navigate(['categorias', 'nova-categoria'])
  }



}
