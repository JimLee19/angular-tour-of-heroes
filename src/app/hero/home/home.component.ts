import { Component, OnInit } from '@angular/core';
import { TabDecorator } from '../../decorator/tab-component.decorator';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
@TabDecorator({ name: '工作台' })
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
