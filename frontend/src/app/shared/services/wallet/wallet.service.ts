import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Entrada } from '../../model/entrada.model';

@Injectable({
  providedIn: 'root'
})
export class WalletService {
  private saldoSource = new BehaviorSubject<number>(0);
  private despesaSource = new BehaviorSubject<number>(0);
  private receitaSource = new BehaviorSubject<number>(0);

  saldoAtual$ = this.saldoSource.asObservable();
  despesaAtual$ = this.despesaSource.asObservable();
  receitaAtual$ = this.receitaSource.asObservable();

  updateValues(saldo: number, despesa: number, receita: number) {
    this.saldoSource.next(saldo);
    this.despesaSource.next(despesa);
    this.receitaSource.next(receita);
  }






}
