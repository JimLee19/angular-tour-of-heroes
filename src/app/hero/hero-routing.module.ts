import { Routes, RouterModule } from '@angular/router';
import { HeroComponent } from './hero.component';
import { NgModule } from '@angular/core';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { HeroesComponent } from './heroes/heroes.component';
import { HeroFormComponent } from './hero-form/hero-form.component';

const routes: Routes = [
  {
    path: '', component: HeroComponent,
    children: [
      { path: '', redirectTo: 'dashboard' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'detail/:id', component: HeroDetailComponent, data: { title: 'detail' } },
      { path: 'heroes', component: HeroesComponent },
      { path: 'add', component: HeroFormComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HeroRoutingModule { }