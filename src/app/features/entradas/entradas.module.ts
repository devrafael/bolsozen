import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EntradasRoutingModule } from './entradas-routing.module';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import localePt from '@angular/common/locales/pt';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    EntradasRoutingModule,
    // NgxMaskDirective,
    // NgxMaskPipe,
    
  ],
  providers: [
    {
      provide: MAT_DATE_LOCALE, useValue: 'pt-BR'
    },
    
  ]
})
export class EntradasModule { }
