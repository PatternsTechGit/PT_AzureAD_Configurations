import { ComponentFixture, TestBed } from '@angular/core/testing';

import Last12MonthGraphComponent from './last12-month-graph.component';

describe('Last12MonthGraphComponent', () => {
  let component: Last12MonthGraphComponent;
  let fixture: ComponentFixture<Last12MonthGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Last12MonthGraphComponent],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Last12MonthGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
