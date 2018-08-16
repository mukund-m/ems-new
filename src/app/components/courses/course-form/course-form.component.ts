import {ActivatedRoute} from '@angular/router';
import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators  } from '@angular/forms';
import { patternValidator } from 'app/validators/email.validator';
import { Installment, Course } from 'app/components/shared';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import { RestService, AlertService, Fee } from 'app/components/shared';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss']
})
export class CourseFormComponent implements OnInit {

  form: FormGroup
  course: Course;
  active: boolean;
  courseId: string;
  updateMode: boolean = false;
  constructor(
    private route:ActivatedRoute,
    private restService: RestService,
    private alertService: AlertService) {
      
     }

  ngOnInit() {
    this.courseId=  this.route.snapshot.params['id'];
    if(this.courseId) {
      this.updateMode = true
      this.restService.getData('courses/'+this.courseId, (data) => {
        this.course = data.item;
        this.active = data.active;
        this.form.get('courseCode').setValue(this.course.courseCode);
        this.form.get('description').setValue(this.course.description);
        this.form.get('feeAmount').setValue(this.course.feeAmount);
        this.form.get('name').setValue(this.course.name);
        this.form.get('branch').setValue(this.course.branch);
        this.form.get('durationMonths').setValue(this.course.durationMonths);
        this.form.get('durationDays').setValue(this.course.durationDays);
        this.form.get('active').setValue(this.course.active);
      })
    }
    this.createForm();
  } 

  save() {
    var installment = this.form.value;
    if(this.courseId) {
      this.restService.postData('course/'+this.courseId,installment, (data)=>{
        this.alertService.showToaster('Course updated successfully');
      })
    }
     else {
      this.restService.postData('course',installment, (data)=>{
        this.alertService.showToaster('Course saved successfully');
      })
     }
  }

  private createForm() {
    this.form = new FormGroup({
      // tslint:disable-next-line
      //email: new FormControl('', [Validators.required, patternValidator(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]),
      //password: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      courseCode : new FormControl('', Validators.required),
      durationMonths: new FormControl('', Validators.required),
      durationDays: new FormControl('', Validators.required),
      feeAmount : new FormControl('', Validators.required),
      branch: new FormControl('', Validators.required),
      description: new FormControl(''),
      active: new FormControl(''),
    });
  }
  
  branchSelected(value) {
    this.form.get('branch').setValue(value);
  }


}
