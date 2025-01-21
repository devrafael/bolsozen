import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthGuard } from './commom/auth.guard';
import { authInterceptor } from './commom/auth.interceptor';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors } from '@angular/common/http';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers:[
    AuthGuard,
    provideHttpClient(withInterceptors([authInterceptor]))
  ]
})
export class AppModule { }
