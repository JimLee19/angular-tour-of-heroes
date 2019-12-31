import { Component, OnInit, Input } from '@angular/core';
import { Hero } from '../hero';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { TabDecorator } from '../../_decorators/tab-component.decorator';
import { HeroService } from '../../services/hero.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
@TabDecorator({ name: 'detail', path: 'detail/:id' })
export class HeroDetailComponent implements OnInit {
  hero: Hero;
  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location) { }

  ngOnInit() {
    this.getHero();
  }
  getHero(): void {
    // const id = +this.route.snapshot.paramMap.get('id');
    console.log(this.route.paramMap);
    console.log(this.route.snapshot.queryParams['id']);
    const id = +this.route.firstChild.snapshot.paramMap.get('id');
    this.heroService.getHero(id)
      .subscribe(hero => this.hero = hero);
  }
  save(): void {
    this.heroService.updateHero(this.hero)
      .subscribe(() => this.goBack());
  }
  goBack() {
    this.location.back();
  }
}
