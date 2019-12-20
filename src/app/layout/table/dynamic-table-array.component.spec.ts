import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicTableArrayComponent } from './dynamic-table-array.component';

describe('DynamicTableArrayComponent', () => {
  let component: DynamicTableArrayComponent;
  let fixture: ComponentFixture<DynamicTableArrayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynamicTableArrayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicTableArrayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
