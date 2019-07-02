import { HeroesComponent } from './heroes/heroes.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroSearchComponent } from './hero-search/hero-search.component';
import { HeroFormComponent } from './hero-form/hero-form.component';
import { HeroComponent } from './hero.component';
import { HomeComponent } from './home/home.component';
import { Route } from '@angular/router';
import { LayoutComponents } from '../layout/tab/tab-routing.module';

export const TabHeroComponents = [
    { path: 'home', component: HomeComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'detail/:id', component: HeroDetailComponent, data: { title: 'detail' } },
    { path: 'heroes', component: HeroesComponent },
    { path: 'add', component: HeroFormComponent }
];
export const HeroEntryComponents = [
    ...LayoutComponents,
    HomeComponent,
    DashboardComponent,
    HeroDetailComponent,
    HeroesComponent,
    HeroFormComponent,
    HeroComponent,
    HeroSearchComponent,
];
