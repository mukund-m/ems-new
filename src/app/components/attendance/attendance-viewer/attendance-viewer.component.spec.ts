import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendanceViewerComponent } from './attendance-viewer.component';

describe('AttendanceViewerComponent', () => {
  let component: AttendanceViewerComponent;
  let fixture: ComponentFixture<AttendanceViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttendanceViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttendanceViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
