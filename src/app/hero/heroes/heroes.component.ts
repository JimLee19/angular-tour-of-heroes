import { Component, OnInit, ViewChild } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../../services/hero.service';
@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.less']
})
export class HeroesComponent implements OnInit {

  datasource: Hero[]=[];
  selectedHero: Hero[];
  heroes: Hero[];
  cols: any[];
  totalRecords: number;
  bordered = false;
  loading = false;
  sizeChanger = false;
  pagination = true;
  header = true;
  title = true;
  footer = true;
  fixHeader = false;
  size = 'small';
  expandable = true;
  checkbox = true;
  allChecked = false;
  indeterminate = false;
  displayData: any[] = [];
  simple = false;
  noResult = false;
  position = 'bottom';
  constructor(private heroService: HeroService) {
  }

  ngOnInit() {
    this.getHeroes();
    this.cols = [
      { field: 'name', header: 'name', type: 'text' },
      { field: 'power', header: 'power', type: 'dropdown' },
      { field: 'alterEgo', header: 'alterEgo', type: 'text' },
      { field: 'birthday', header: 'birthday', type: 'date' },
    ];
  }

  getHeroes() {
    this.heroService.getHeroes().subscribe(heroes => {
      this.datasource = heroes;
      this.totalRecords = heroes.length;
      //  this.dt.totalRecords=this.totalRecords;
    });
  }
  onSelect(hero: Hero): void {
    // this.selectedHero = hero;
  }
  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroService.addHero({ name } as Hero)
      .subscribe(hero => {
        //  this.heroes.push(hero);
        this.heroes = [...this.heroes, hero];
      });
  }
  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero).subscribe();
  }
  currentPageDataChange(
    $event: Array<{
      name: string;
      age: number;
      address: string;
      checked: boolean;
      expand: boolean;
      description: string;
    }>
  ): void {
    this.displayData = $event;
    this.refreshStatus();
  }

  refreshStatus(): void {
    const validData = this.displayData.filter(value => !value.disabled);
    const allChecked = validData.length > 0 && validData.every(value => value.checked === true);
    const allUnChecked = validData.every(value => !value.checked);
    this.allChecked = allChecked;
    this.indeterminate = !allChecked && !allUnChecked;
  }

  checkAll(value: boolean): void {
    this.displayData.forEach(data => {
      if (!data.disabled) {
        data.checked = value;
      }
    });
    this.refreshStatus();
  }
}
