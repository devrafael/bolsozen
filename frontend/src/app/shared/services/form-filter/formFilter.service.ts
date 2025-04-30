import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormFilterService {

  private registriesBehavior = new BehaviorSubject<any>({});
  dataReceived$ = this.registriesBehavior.asObservable();

  EmitData(payload: any){
    this.registriesBehavior.next(payload)
  }

 
}
