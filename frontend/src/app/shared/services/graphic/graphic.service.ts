import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GraphicService {

  private dataChartCategorySubject = new BehaviorSubject<any[]>([]);
  private dataChartDetailsCategorySubject = new BehaviorSubject<any[]>([]);
  dataChartCategory$ = this.dataChartCategorySubject.asObservable();
  dataChartDetailsCategory$ = this.dataChartDetailsCategorySubject.asObservable();


  updateDataChartCategory(data: any[]) {
    this.dataChartCategorySubject.next(data);
  }
  updateDataChartDetailsCategory(data: any[]) {
    this.dataChartDetailsCategorySubject.next(data);
  }
}
