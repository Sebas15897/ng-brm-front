import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthPublicGuard } from '../../core/guards/auth-public-guard/auth-public.guard';

const routes: Routes = [
  {
    path: 'login',
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./login/login.module').then((m) => m.LoginModule),
      },
    ],
    canActivate: [AuthPublicGuard],
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PublicRoutingModule {}
