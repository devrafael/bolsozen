import { Injectable, Injector,  } from '@angular/core';
import { HttpBaseService } from '../../../../shared/services/http-base/http-base.service';
import { Observable } from 'rxjs';
import { TypeRegistry } from '../../model/typeRegistry.model';

@Injectable({
  providedIn: 'root'
})
export class TypeRegistriesService extends HttpBaseService{

 private endpoint = 'types';

  constructor(protected override readonly injector: Injector) { 
    super(injector)
  }

  getAllTypes(): Observable<TypeRegistry[]>{
    return this.httpGet(`${this.endpoint}`);
  }
}
