import { HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = sessionStorage.getItem('token'); // Recupera o token do sessionStorage

  const clonedRequest = req.clone({
    setHeaders: {
      Authorization: token ? `Bearer ${token}` : ''
    }
  });

  return next(clonedRequest);
};


  