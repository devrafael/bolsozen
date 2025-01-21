import { Injectable, Injector } from '@angular/core';
import { HttpBaseService } from '../../../shared/base/http-base.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService extends HttpBaseService{

  private endpoint = 'entradas'

  constructor(protected override readonly injector: Injector) {
    super(injector);
  }

  getEntradas(payload?: any): Observable<any>{
    const params = payload? `?mes=${payload.mes}&ano=${payload.ano}` :  ''
    return this.httpGet(`${this.endpoint}${params}`);
  }

  getAno(ano: number): Observable<any>{

    return this.httpGet(`${this.endpoint}?ano=${ano}`)
  }







}
