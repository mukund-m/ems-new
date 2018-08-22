import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffAttendanceRecorderComponent } from './staff-attendance-recorder.component';

describe('StaffAttendanceRecorderComponent', () => {
  let component: StaffAttendanceRecorderComponent;
  let fixture: ComponentFixture<StaffAttendanceRecorderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffAttendanceRecorderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffAttendanceRecorderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
