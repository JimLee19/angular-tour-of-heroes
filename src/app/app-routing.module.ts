import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { AuthGuard } from './_guards';

const routes: Routes = [
  { path: '', redirectTo: 'hero', pathMatch: 'full' },
  { path: 'hero', loadChildren: () => import('app/hero/hero.module').then(m => m.HeroModule), canActivate: [AuthGuard] },
  { path: 'account', loadChildren: () => import('app/account/account.module').then(m => m.AccountModule) },
  // otherwise redirect to home
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
