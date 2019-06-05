import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.less']
})
export class MenuComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    const items = [
      {
        label: '菜单',
        icon: 'pi pi-pw pi-file',
        items: [
          {
            label: 'Dashboard', icon: 'pi pi-fw pi-plus',
            routerLink: './dashboard',    //添加路由
            command: (event) => {       //添加回调函数，即点击‘content’的时候会触发该函数
              console.log('0', event)
            }
          },
          { label: 'Heroes', icon: 'pi pi-fw pi-external-link', routerLink: './heroes', },
          { separator: true },
          { label: 'add', icon: 'pi pi-fw pi-times', routerLink: './add', }
        ]
      }
    ];
  }

}
