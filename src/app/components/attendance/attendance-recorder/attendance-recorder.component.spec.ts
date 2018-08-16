import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendanceRecorderComponent } from './attendance-recorder.component';

describe('AttendanceRecorderComponent', () => {
  let component: AttendanceRecorderComponent;
  let fixture: ComponentFixture<AttendanceRecorderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttendanceRecorderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttendanceRecorderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
