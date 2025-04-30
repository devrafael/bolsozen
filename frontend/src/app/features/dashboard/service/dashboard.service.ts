import { Injectable, Injector } from '@angular/core';
import { HttpBaseService } from '../../../shared/services/http-base/http-base.service';
import { Observable } from 'rxjs';
import { Entrada } from '../../../shared/model/entrada.model';
import { Month } from '../model/month.model';

@Injectable({
  providedIn: 'root'
})
export class DashboardService extends HttpBaseService{

  private endpoint = 'registries'

  constructor(protected override readonly injector: Injector) {
    super(injector);
  }


  getEntradasFiltradas(payload: any): Observable<Entrada[]>{
    console.log("may: ", payload)

    const params = `search?mes=${payload.mes}&ano=${payload.ano}`
    return this.httpGet(`${this.endpoint}/${params}`);
  }

  buscarAnosCadastrados(): Observable<any>{
    return this.httpGet('ano')
  }

  buscarMeses(): Observable<Month[]>{
    return this.httpGet('months')
  }







}
