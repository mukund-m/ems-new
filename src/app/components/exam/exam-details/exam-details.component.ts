import {ActivatedRoute} from '@angular/router';
import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators  } from '@angular/forms';
import { patternValidator } from 'app/validators/email.validator';
import { Installment, Course } from 'app/components/shared';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import { RestService, AlertService, Fee } from 'app/components/shared';
import { Staff } from 'app/components/shared/models/staff';
import { Branch } from 'app/components/shared/models/branch';
import { Exam } from '../../shared/models/exam';


@Component({
  selector: 'app-exam-details',
  templateUrl: './exam-details.component.html',
  styleUrls: ['./exam-details.component.scss']
})
export class ExamDetailsComponent implements OnInit {

  form: FormGroup
  course: Exam;
  dataReceived: boolean = false;
  courseId: string;
  examId: string;
  updateMode: boolean = false;
  viewMode: boolean = false;
  constructor(
    private route:ActivatedRoute,
    private restService: RestService,
    private alertService: AlertService) {
      
     }

  ngOnInit() {
    this.courseId=  this.route.snapshot.params['id'];
    this.viewMode=  this.route.snapshot.params['view'];
    
    if(this.courseId) {
      this.updateMode = true
      this.restService.getData('exams/'+this.courseId, (data) => {
        
        this.course = data.item;
        this.dataReceived = true;
        console.log(this.course);
        this.form.get('branch').setValue(this.course.branch);
        this.form.get('course').setValue(this.course.course);
        this.form.get('subject').setValue(this.course.subject);
        this.form.get('description').setValue(this.course.description);
        this.form.get('examDate').setValue(this.course.examDate);
        this.form.get('name').setValue(this.course.name);
        this.form.get('passMark').setValue(this.course.passMark);
        this.form.get('totalMarks').setValue(this.course.totalMarks);

        
      })
    }
    this.createForm();
  } 

  save() {
    var installment = this.form.value;
    if(this.courseId) {
      this.restService.postData('exams/'+this.courseId,installment, (data)=>{
        this.alertService.showToaster('Exam updated successfully');
      })
    }
     else {
      this.restService.postData('exams',installment, (data)=>{
        console.log(data);
        this.alertService.showToaster('Exam saved successfully');
      })
     }
  }

  private createForm() {
    this.form = new FormGroup({
      // tslint:disable-next-line
      branch: new FormControl('', [Validators.required]),
      course: new FormControl('', Validators.required),
      subject: new FormControl(''),
      name: new FormControl('', Validators.required),
      examDate : new FormControl('', Validators.required),
      totalMarks : new FormControl('', Validators.required),
      description: new FormControl(''),
      passMark : new FormControl('', Validators.required)
    });
  }

  branchSelected(value) {
    this.form.get('branch').setValue(value);
  }

  courseSelected(value) {
    this.form.get('course').setValue(value);
  }

}
