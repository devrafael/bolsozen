import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToolbarComponent } from "./commom/components/toolbar/toolbar.component";
import { FormComponent } from "./features/filter/components/form/form.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ToolbarComponent, FormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  menu : any[] = [
    {descricao: 'Dashboard', rota: 'dashboard'},
    {descricao: 'Categorias', rota: 'categorias'},
    {descricao: 'Entradas', rota: 'entradas'}

  ]
}
