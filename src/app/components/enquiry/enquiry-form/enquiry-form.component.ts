import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators  } from '@angular/forms';
import { patternValidator } from 'app/validators/email.validator';
import { Installment, Course } from 'app/components/shared';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import { RestService, AlertService, Fee } from 'app/components/shared';
import { Staff } from 'app/components/shared/models/staff';
import { Branch } from 'app/components/shared/models/branch';
import { Exam } from '../../shared/models/exam';
import {ActivatedRoute} from '@angular/router';
@Component({
  selector: 'app-enquiry-form',
  templateUrl: './enquiry-form.component.html',
  styleUrls: ['./enquiry-form.component.scss']
})
export class EnquiryFormComponent implements OnInit {

  enq = {};
  form: FormGroup
  course;
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

  ngOnInit() {;
    this.courseId=  this.route.snapshot.params['id'];
    this.viewMode=  this.route.snapshot.params['view'];
    
    if(this.courseId) {
      this.updateMode = true
      this.restService.getData('enquiries/'+this.courseId, (data) => {
        
        this.course = data.item;
        this.dataReceived = true;
        console.log(this.course);
        this.form.get('branch').setValue(this.course.branch);
        this.form.get('phoneNumber').setValue(this.course.phoneNumber);
        this.form.get('email').setValue(this.course.email);
        this.form.get('category').setValue(this.course.category);
        this.form.get('question').setValue(this.course.question);
        this.form.get('answer').setValue(this.course.answer);
        this.form.get('followUpDate').setValue(this.course.followUpDate);
        
      })
    }
    this.createForm();
  } 

  save() {
    var installment = this.form.value;
    installment.modifiedDate = new Date();
    
    if(this.courseId) {
      this.restService.postData('enquiries/'+this.courseId,installment, (data)=>{
        this.alertService.showToaster('Enquiry updated successfully');
      })
    }
     else {
      installment.createdDate = new Date();
      this.restService.postData('enquiries',installment, (data)=>{
        console.log(data);
        this.alertService.showToaster('Enquiry saved successfully');
      })
     }
  }

  private createForm() {
    this.form = new FormGroup({
      // tslint:disable-next-line
      branch: new FormControl('', [Validators.required]),
      phoneNumber: new FormControl('', Validators.required),
      category: new FormControl('', Validators.required),
      followUpDate: new FormControl(''),
      email: new FormControl('', [Validators.required, patternValidator(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]),
      question : new FormControl('', Validators.required),
      answer : new FormControl('', Validators.required)
    });
  }

  branchSelected(value) {
    this.form.get('branch').setValue(value);
  }


}
