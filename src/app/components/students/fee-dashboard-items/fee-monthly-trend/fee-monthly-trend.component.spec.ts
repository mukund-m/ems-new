import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeeMonthlyTrendComponent } from './fee-monthly-trend.component';

describe('FeeMonthlyTrendComponent', () => {
  let component: FeeMonthlyTrendComponent;
  let fixture: ComponentFixture<FeeMonthlyTrendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeeMonthlyTrendComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeeMonthlyTrendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
