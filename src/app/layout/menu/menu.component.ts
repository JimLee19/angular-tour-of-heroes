import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.less']
})
export class MenuComponent implements OnInit {
  isCollapsed = false;
  menus: any[];
  constructor() { }

  ngOnInit() {
    this.menus = [{
      level: 1,
      title: '菜单栏',
      icon: 'bars',
      open: true,
      selected: false,
      disabled: false,
      children: [
        {
          level: 2,
          title: 'Dashboard',
          selected: false,
          disabled: false,
          routeLink: './dashboard'
        },
        {
          level: 2,
          title: 'Heroes',
          selected: false,
          disabled: false,
          routeLink: './heroes'
        }
      ]
    }
    ];
  }

}
