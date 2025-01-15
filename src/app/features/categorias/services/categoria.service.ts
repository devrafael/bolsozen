import { Injectable, Injector } from '@angular/core';
import { HttpBaseService } from '../../../shared/base/http-base.service';
import { Observable } from 'rxjs';
import { Categoria } from '../models/categoria.model';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService extends HttpBaseService{

  private endpoint = 'categorias'
  constructor(protected override readonly injector: Injector) { 
      super(injector)
    }

    getCategorias(): Observable<any>{
      return this.httpGet(this.endpoint);
    }

    getCategoriaPorId(id: number): Observable<any>{
      return this.httpGet( `${this.endpoint}/${id}`)
    }

    editarCategoria(payload: Categoria): Observable<any>{
      return this.httpPut(`${this.endpoint}/${payload.id}`, payload)
    }

    excluirCategoria(id: number): Observable<any>{
      return this.httpDelete(`${this.endpoint}/${id}`)
    }

    criarCategoria(payload: Categoria): Observable<any>{
      return this.httpPost(`${this.endpoint}`, payload)
    }
}
