import { Component, OnInit,Input, EventEmitter, Output } from '@angular/core';
import { RestService } from '../../shared/services/rest.service';
import { Student, AlertService, Course } from '../../shared';
import { Subject } from 'rxjs/Subject';
import { Router } from '@angular/router';
import { Branch } from 'app/components/shared/models/branch';

@Component({
  selector: 'course-picker',
  templateUrl: './course-picker.component.html',
  styleUrls: ['./course-picker.component.scss']
})
export class CoursePickerComponent implements OnInit {
  branches: Course[] = [];
  @Input() 
  selectedValue: string;

  @Output() select:EventEmitter<any> = new EventEmitter();
  constructor(private restService: RestService) { }

  ngOnInit() {
    this.restService.getData('courses', (data) => {
      this.branches = data.items;
      console.log(data);
    })
  }

  optionSelected(evt) {
    console.log(evt);
    this.select.emit(evt.value);
  }
sel
}
