import { ActivatedRoute, ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from './auth/service/authentication.service';
import { Observable, tap } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private activatedRoute: ActivatedRoute){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean>{
    
      return this.authService.usuarioEstaLogado()
      .pipe(
        tap((estaLogado) =>{
          if(!estaLogado){
          this.router.navigateByUrl('/authentication/login');
          return false;
        }else {
          return true;
        }
        }
        
      )
      )
  }
}