import { HttpClient } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class HttpBaseService {

  private urlBase = environment.url;
  private readonly httpClient !: HttpClient;

  constructor(protected readonly injector: Injector) { 
    if(injector == null || injector == undefined){
      throw new Error('Injector nao pode ser nulo')
    }
    this.httpClient = injector.get(HttpClient)
  }


  protected httpGet(endpoint: string): Observable<any>{
    return this.httpClient.get(`${this.urlBase}${endpoint}`);
  }
  protected httpPost(endpoint: string, data: any ): Observable<any>{
    return this.httpClient.post(`${this.urlBase}${endpoint}`, data);
  }

  protected httpPut(endpoint: string, data: any ): Observable<any>{ 
    return this.httpClient.put(`${this.urlBase}${endpoint}`, data);
  }

  protected httpDelete(endpoint: string): Observable<any>{
    return this.httpClient.delete(`${this.urlBase}${endpoint}`);
  }



  }