import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import ptBr from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';

registerLocaleData(ptBr);



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'pt-BR' }],
    
})
export class AppModule { }
