import { inject, Injectable, Injector } from '@angular/core';
import { HttpBaseService } from '../../../shared/base/http-base.service';
import { Observable } from 'rxjs';
import { Entrada } from '../model/entrada.model';
import { Ano } from '../model/ano.model';

@Injectable({
  providedIn: 'root'
})
export class EntradasService extends HttpBaseService{

  private endpoint = 'entradas';

  constructor(protected override readonly injector: Injector) { 
    super(injector)
  }

  getEntradas(): Observable<any>{
    return this.httpGet(`${this.endpoint}`);
  }

  getEntradaPorId(id: number): Observable<any>{
    return this.httpGet(`${this.endpoint}/${id}`);
  }

  excluirEntrada(id: number){
    return this.httpDelete(`${this.endpoint}/${id}`)
  }

  criarEntrada(payload: Entrada): Observable<any>{
    return this.httpPost(`${this.endpoint}`, payload);
  }

  editarEntrada(payload: Entrada): Observable<any>{
    return this.httpPut(`${this.endpoint}/${payload.id}`, payload);
  }

  criarAno(ano: Ano): Observable<any> {
    return this.httpPost('ano', ano);
  }

  buscarAnosCadastrados(): Observable<any>{
    return this.httpGet('ano')
  }


}
