import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListEntradasComponent } from './components/list-entradas/list-entradas.component';
import { FormularioEntradasComponent } from './components/formulario-entradas/formulario-entradas.component';

const routes: Routes = [
    { path: '', redirectTo:'list', pathMatch: 'full'},
    {path:'list', component: ListEntradasComponent},
    {path: 'editar/:id', component: FormularioEntradasComponent},
    {path: 'nova-entrada', component: FormularioEntradasComponent}


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EntradasRoutingModule { }
