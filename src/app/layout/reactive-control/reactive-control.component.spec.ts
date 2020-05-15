import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactiveControlComponent } from './reactive-control.component';

describe('ReactiveControlComponent', () => {
  let component: ReactiveControlComponent;
  let fixture: ComponentFixture<ReactiveControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReactiveControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReactiveControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
