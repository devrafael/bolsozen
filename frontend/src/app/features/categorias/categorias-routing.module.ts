import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './components/list-categories/list-categories.component';
import { FormularioComponent } from './components/forms-categories/forms-categories.component';

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
