import { ComponentFixture, TestBed } from '@angular/core/testing';

import BankManagerComponent from './bank-manager.component';

describe('BankManagerComponent', () => {
  let component: BankManagerComponent;
  let fixture: ComponentFixture<BankManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BankManagerComponent],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BankManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
