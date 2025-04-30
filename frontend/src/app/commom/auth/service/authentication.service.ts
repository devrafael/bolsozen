import { Injectable, Injector } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { HttpBaseService } from '../../../shared/services/http-base/http-base.service';
import { Login } from '../models/login.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService extends HttpBaseService{

  private subjectUsuario: BehaviorSubject<any> = new BehaviorSubject(null);
  private subjectLogin: BehaviorSubject<any> = new BehaviorSubject(false);

  constructor(protected override readonly injector: Injector) { 
    super(injector)
  }

  // login(login: Login): Observable<any>{
  //   return this.httpPost('authentication', login).pipe(
  //     map((resposta: any) => {
  //       sessionStorage.setItem('token', resposta.token);
  //       this.subjectUsuario.next(resposta.user);
  //       this.subjectLogin.next(true)
  //       return resposta.user

  //     })
  //   )
  // }

  login(): any{
    sessionStorage.setItem('token', "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVtYWlsQGVtYWlsLmNvbSIsInBhc3N3b3JkIjoiMTIzNCJ9.FbveubzyXtsaiizsPwORXwQgoxyS-wiFgfVcc8TD6eo");
  }

  

  usuarioEstaLogado(){
    if(typeof window !== 'undefined' && sessionStorage){
      const token = sessionStorage.getItem('token')
      if (token){
        this.subjectLogin.next(true)
      }else {
              this.subjectLogin.next(false);
            }
    }
    return this.subjectLogin.asObservable()
  }

  getUsuario(){
    	this.subjectUsuario.asObservable()
  }

  Sair(){
    sessionStorage.removeItem('token')
    this.subjectUsuario.next(null);
    this.subjectLogin.next(false);
  }


}
