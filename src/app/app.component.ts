import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToolbarComponent } from "./commom/components/toolbar/toolbar.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ToolbarComponent],
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
