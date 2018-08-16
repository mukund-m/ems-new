import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDashboardTopCardsComponent } from './admin-dashboard-top-cards.component';

describe('AdminDashboardTopCardsComponent', () => {
  let component: AdminDashboardTopCardsComponent;
  let fixture: ComponentFixture<AdminDashboardTopCardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminDashboardTopCardsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminDashboardTopCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
