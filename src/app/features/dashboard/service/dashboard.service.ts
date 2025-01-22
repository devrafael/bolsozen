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


  getEntradas(): Observable<any>{
    return this.httpGet(`${this.endpoint}`);
  }

  buscarAnosCadastrados(): Observable<any>{
    return this.httpGet('ano')
  }







}
