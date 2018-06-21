import {ActivatedRoute} from '@angular/router';
import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators  } from '@angular/forms';
import { patternValidator } from 'app/validators/email.validator';
import { Installment, Course } from 'app/components/shared';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import { RestService, AlertService, Fee } from 'app/components/shared';
import { Staff } from 'app/components/shared/models/staff';
import { Branch } from 'app/components/shared/models/branch';

@Component({
  selector: 'app-branch-form',
  templateUrl: './branch-form.component.html',
  styleUrls: ['./branch-form.component.scss']
})
export class BranchFormComponent implements OnInit {

  form: FormGroup
  course: Branch;
  courseId: string;
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
      this.restService.getData('branches/'+this.courseId, (data) => {
        
        this.course = data.item;
        this.form.get('branchName').setValue(this.course.branchName);
        this.form.get('branchCode').setValue(this.course.branchCode);
        this.form.get('district').setValue(this.course.district);
        this.form.get('emailAddress').setValue(this.course.emailAddress);
        this.form.get('place').setValue(this.course.place);
        this.form.get('address').setValue(this.course.address);
        this.form.get('postCode').setValue(this.course.postCode);

        
      })
    }
    this.createForm();
  } 

  save() {
    var installment = this.form.value;
    if(this.courseId) {
      this.restService.postData('branches/'+this.courseId,installment, (data)=>{
        this.alertService.showToaster('Branches updated successfully');
      })
    }
     else {
      this.restService.postData('branches',installment, (data)=>{
        this.alertService.showToaster('Branches saved successfully');
      })
     }
  }

  private createForm() {
    this.form = new FormGroup({
      // tslint:disable-next-line
      emailAddress: new FormControl('', [Validators.required, patternValidator(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]),
      branchName: new FormControl('', Validators.required),
      branchCode: new FormControl('', Validators.required),
      place : new FormControl('', Validators.required),
      district : new FormControl('', Validators.required),
      postCode: new FormControl(''),
      address : new FormControl('', Validators.required)
    });
  }
}
