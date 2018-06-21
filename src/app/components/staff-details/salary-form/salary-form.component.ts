import {ActivatedRoute} from '@angular/router';
import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators  } from '@angular/forms';
import { patternValidator } from 'app/validators/email.validator';
import { Installment, Course } from 'app/components/shared';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import { RestService, AlertService, Fee } from 'app/components/shared';
import { Salary } from 'app/components/shared/models/salary';

@Component({
  selector: 'app-salary-form',
  templateUrl: './salary-form.component.html',
  styleUrls: ['./salary-form.component.scss']
})
export class SalaryFormComponent implements OnInit {

  form: FormGroup
  course: Salary;
  courseId: string;
  updateMode: boolean = false;
  viewMode: boolean = false;
  staffId: string;
  constructor(
    private dialogRef: MatDialogRef<SalaryFormComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    private route:ActivatedRoute,
    private restService: RestService,
    private alertService: AlertService) {
      if(data) {
        this.staffId = data.id;
        
      }
     }

  ngOnInit() {
    this.courseId=  this.route.snapshot.params['id'];
    this.viewMode=  this.route.snapshot.params['view'];
    
    // if(this.courseId) {
    //   this.updateMode = true
    //   this.restService.getData('branches/'+this.courseId, (data) => {
        
    //     this.course = data.item;
    //     this.form.get('amount').setValue(this.course.amount);
    //     this.form.get('accountNumber').setValue(this.course.accountNumber);
    //     this.form.get('invoiceNumber').setValue(this.course.invoiceNumber);
    //     this.form.get('month').setValue(this.course.month);
    //     this.form.get('payedDate').setValue(this.course.payedDate);
    //     this.form.get('referenceNumber').setValue(this.course.referenceNumber);
    //     this.form.get('year').setValue(this.course.year);

        
    //   })
    // }
    this.createForm();
  } 

  save() {
    var installment = this.form.value;
    if(this.courseId) {
      this.restService.postData('staffs/'+this.staffId+'/salaries/'+this.courseId,installment, (data)=>{
        this.alertService.showToaster('Salary details updated successfully');
      })
    }
     else {
      this.restService.postData('staffs/'+this.staffId+'/salaries',installment, (data)=>{
        this.alertService.showToaster('Salary details saved successfully');
        this.dialogRef.close();
      })
     }
  }

  private createForm() {
    this.form = new FormGroup({
      // tslint:disable-next-line
      amount: new FormControl('', Validators.required ),
      accountNumber: new FormControl(''),
      invoiceNumber: new FormControl(''),
      month : new FormControl('', Validators.required),
      payedDate : new FormControl('', Validators.required),
      referenceNumber: new FormControl(''),
      year : new FormControl('', Validators.required)
    });
  }

  close() {
    this.dialogRef.close();
}
}
