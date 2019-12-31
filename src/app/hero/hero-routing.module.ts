import { Routes, RouterModule } from '@angular/router';
import { HeroComponent } from './hero.component';
import { NgModule } from '@angular/core';
import { TabHeroComponents, } from './entry_components';

// const tabHeroComponents = HeroEntryComponents.filter(x => TabDecorator.getTabMetadata(x) != null).map(x => {
//   const meta = TabDecorator.getTabMetadata(x);
//   return { path: meta.path, component: x };
// });
const routes: Routes = [
  {
    path: '', component: HeroComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      ...TabHeroComponents
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HeroRoutingModule { }
