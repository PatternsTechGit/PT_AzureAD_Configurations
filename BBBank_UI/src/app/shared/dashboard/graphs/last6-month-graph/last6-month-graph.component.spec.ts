import { ComponentFixture, TestBed } from '@angular/core/testing';

import Last6MonthGraphComponent from './last6-month-graph.component';

describe('Last6MonthGraphComponent', () => {
  let component: Last6MonthGraphComponent;
  let fixture: ComponentFixture<Last6MonthGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Last6MonthGraphComponent],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Last6MonthGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
