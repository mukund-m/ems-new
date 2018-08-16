import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentMarkRecorderComponent } from './student-mark-recorder.component';

describe('StudentMarkRecorderComponent', () => {
  let component: StudentMarkRecorderComponent;
  let fixture: ComponentFixture<StudentMarkRecorderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentMarkRecorderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentMarkRecorderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
