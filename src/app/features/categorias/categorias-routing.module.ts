import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './components/list/list.component';
import { FormularioComponent } from './components/formulario/formulario.component';

const routes: Routes = [
  { path: '', redirectTo:'list', pathMatch: 'full'},
  {path:'list', component: ListComponent},
  {path:'editar/:id', component: FormularioComponent, data: { renderMode: 'server'}},
  {path: 'nova-categoria', component: FormularioComponent}
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriasRoutingModule { }
