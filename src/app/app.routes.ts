import { Routes } from '@angular/router';

export const routes: Routes = [
  {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  {path: 'dashboard', loadChildren: () => import('./features/dashboard/dashboard.module').then(module=> module.DashboardModule)},
  {path: 'categorias', loadChildren: () => import('./features/categorias/categorias.module').then(module=> module.CategoriasModule)},
  {path: 'entradas', loadChildren: () => import('./features/entradas/entradas.module').then(module=> module.EntradasModule)},


];
