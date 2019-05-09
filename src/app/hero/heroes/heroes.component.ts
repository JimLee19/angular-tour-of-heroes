import { Component, OnInit, ViewChild } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../../services/hero.service';
import { LazyLoadEvent, SelectItem } from 'primeng/components/common/api'
import { TableComponent } from '../../layout/table/table.component';
import { TableConfig } from '../../layout/table/table-config';
@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.less']
})
export class HeroesComponent implements OnInit {

  datasource: Hero[];
  selectedHero: Hero[];
  heroes: Hero[];
  cols: any[];
  totalRecords: number;
  loading: boolean;
  tableConfig:TableConfig=new TableConfig();
  @ViewChild('dataTable') dt: TableComponent;
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
    this.tableConfig.cols=this.cols;
    console.log(this.tableConfig);
    this.loading = true;
  }
  loadDataLazy(event: LazyLoadEvent) {
    this.loading = true;
    setTimeout(() => {
      if (this.datasource) {
       this.tableConfig.models= this.heroes = this.datasource.slice(event.first, (event.first + event.rows));
       this.tableConfig.totals = this.datasource.length;
       // this.dt.values=this.heroes;
        this.loading = false;
        console.log(this.tableConfig);
      }
    }, 1000);
  }
  powers: SelectItem[] = [{ label: 'Really Smart', value: 'Really Smart' }, { label: 'Super Flexible', value: 'Super Flexible' }, { label: 'Super Hot', value: 'Super Hot' }, { label: 'Weather Changer', value: 'Weather Changer' }];

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
}
