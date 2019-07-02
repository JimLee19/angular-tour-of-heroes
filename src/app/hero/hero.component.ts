import { Component, OnInit, ViewChild } from '@angular/core';
import { TabConfig } from '../layout/tab/tab-config';
import { HomeComponent } from './home/home.component';
import { TabViewService } from '../services/tab-view.service';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent implements OnInit {

  constructor(
    private tabViewService: TabViewService) {
  }

  ngOnInit() {
  }
}
