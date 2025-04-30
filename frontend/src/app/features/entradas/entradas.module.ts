import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EntradasRoutingModule } from './entradas-routing.module';
import { MAT_DATE_LOCALE } from '@angular/material/core';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    EntradasRoutingModule,
 
  ],
  providers: [
    {
      provide: MAT_DATE_LOCALE, useValue: 'pt-BR',
      
    },
    
  ]
})
export class EntradasModule { }
