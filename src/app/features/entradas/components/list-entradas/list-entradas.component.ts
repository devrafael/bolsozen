import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { EntradasService } from '../../services/entradas.service';
import { Entrada } from '../../model/entrada.model';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { StatusPipe } from '../../pipes/status.pipe';

@Component({
  selector: 'app-list-entradas',
  imports: [
        MatPaginator,
        MatPaginatorModule,
        MatTableModule,
        MatButtonModule,
        MatIconModule,
        CurrencyPipe,
        StatusPipe,
        CommonModule
  ],
  templateUrl: './list-entradas.component.html',
  styleUrl: './list-entradas.component.scss'
})
export class ListEntradasComponent {


  displayedColumns: string[] = ['nome', 'pago', 'data', 'valor', 'tipo', 'editar', 'deletar'];
  dataSource = new MatTableDataSource<Entrada>();
  entradas: Entrada[] = []


  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor(private entradasService: EntradasService,
    private router: Router
  ){}

  ngOnInit(): void {
    this.buscarEntradas()
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  buscarEntradas(){
    this.entradasService.getEntradas()
    .subscribe((ent: Entrada[]) =>{
      this.entradas = ent;
      this.entradas.forEach((e: Entrada)=> {
        e.valor = e.valor.toString().replace(',', '.');
      
      })
      this.dataSource.data = this.entradas
  })
  }

  buscarCategorias(){
    this.entradasService.getEntradas()
    .subscribe((ent: Entrada[]) =>{
      this.entradas = ent;
      this.dataSource.data = this.entradas
    })
  }


  editarEntrada(entradas: Entrada){
    this.router.navigate(['entradas', 'editar', entradas.id])
  }

  excluirEntrada(id: number){
    this.entradasService.excluirEntrada(id)
    .subscribe(() => {
      this.buscarEntradas();
    })
  }


  novaEntrada(){
    this.router.navigate(['entradas', 'nova-entrada'])
  }



}
