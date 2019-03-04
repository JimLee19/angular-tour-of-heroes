import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero/hero';
import { HeroService } from '../services/hero.service';
import { TabDecorator } from '../decorator/tab-component.decorator';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
@TabDecorator({ name:'dashboard'})
export class DashboardComponent implements OnInit {
  heroes: Hero[] = [];

  constructor(private heroService: HeroService) { }

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes.slice(1, 5));
  }

}
