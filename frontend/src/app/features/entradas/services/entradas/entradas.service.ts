import { Injectable, Injector } from '@angular/core';
import { HttpBaseService } from '../../../../shared/services/http-base/http-base.service';
import { Observable } from 'rxjs';
import { Entrada } from '../../../../shared/model/entrada.model';

@Injectable({
  providedIn: 'root'
})
export class EntradasService extends HttpBaseService{

  private endpoint = 'registries';

  constructor(protected override readonly injector: Injector) { 
    super(injector)
  }

  getEntradas(): Observable<any>{
    return this.httpGet(`${this.endpoint}`);
  }

  getRegistriesPerMonthAndYear(payload?: any): Observable<Entrada[]>{
    const params = `search?mes=${payload.month}&ano=${payload.year}` 
    return this.httpGet(`${this.endpoint}/${params}`);
  }
  getRegistries(payload?: any): Observable<Entrada[]>{
    const params = `search?mes=${payload.month}&ano=${payload.year}&status=${payload.status}&category_id=${payload.category_id}` 
    return this.httpGet(`${this.endpoint}/${params}`);
  }

  getEntradaPorId(id: string): Observable<any>{
    return this.httpGet(`${this.endpoint}/${id}`);
  }

  excluirEntrada(id: string){
    return this.httpDelete(`${this.endpoint}/${id}`)
  }

  criarEntrada(payload: Entrada): Observable<any>{
    return this.httpPost(`${this.endpoint}`, payload);
  }

  editarEntrada(payload: Entrada): Observable<any>{
    return this.httpPut(`${this.endpoint}/${payload.idRegistry}`, payload);
  }

  buscarAnosCadastrados(): Observable<any>{
    return this.httpGet('ano')
  }

  



}
