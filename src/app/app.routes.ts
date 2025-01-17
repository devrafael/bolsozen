import { Routes } from '@angular/router';
import { AuthGuard } from './commom/auth.guard';

export const routes: Routes = [
  {path: '', redirectTo: 'authentication', pathMatch: 'full'},
  {path: 'dashboard', loadChildren: () => import('./features/dashboard/dashboard.module').then(module=> module.DashboardModule), canActivate: [AuthGuard]},
  {path: 'categorias', loadChildren: () => import('./features/categorias/categorias.module').then(module=> module.CategoriasModule), canActivate: [AuthGuard]},
  {path: 'entradas', loadChildren: () => import('./features/entradas/entradas.module').then(module=> module.EntradasModule), canActivate: [AuthGuard]},
  {path: 'authentication', loadChildren: () => import('./commom/auth/auth.module').then(module=> module.AuthModule)},


];
