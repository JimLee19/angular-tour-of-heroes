import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
@Component({
  selector: 'app-hero-form',
  templateUrl: './hero-form.component.html',
  styleUrls: ['./hero-form.component.css']
})
export class HeroFormComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  powers:any[] = [{label:'Really Smart',value:'Really Smart'},{label:'Super Flexible',value:'Super Flexible'} ,{label:'Super Hot',value:'Super Hot'} ,{label:'Weather Changer',value:'Weather Changer'} ];

  model = new Hero(18, 'Dr IQ', this.powers[0].value, 'Chuck Overstreet');

  submitted = false;

  onSubmit() { this.submitted = true; }
  newHero() {
    this.model = new Hero(42, '', '');
  }
  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.model); }

}
