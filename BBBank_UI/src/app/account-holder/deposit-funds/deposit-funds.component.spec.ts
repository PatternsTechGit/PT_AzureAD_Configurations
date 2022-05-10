import { ComponentFixture, TestBed } from '@angular/core/testing';

import DepositFundsComponent from './deposit-funds.component';

describe('DepositFundsComponent', () => {
  let component: DepositFundsComponent;
  let fixture: ComponentFixture<DepositFundsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DepositFundsComponent],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DepositFundsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
