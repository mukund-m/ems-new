import {ActivatedRoute} from '@angular/router';
import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators  } from '@angular/forms';
import { patternValidator } from 'app/validators/email.validator';
import { Installment, Course } from 'app/components/shared';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import { RestService, AlertService, Fee } from 'app/components/shared';
import { Staff } from 'app/components/shared/models/staff';
import {MatDialog, MatDialogConfig} from "@angular/material";
import { SalaryFormComponent } from 'app/components/staff-details/salary-form/salary-form.component';
import {MatChipInputEvent} from '@angular/material';
import {ENTER, COMMA} from '@angular/cdk/keycodes';


@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.scss']
})
export class StaffComponent implements OnInit {

  form: FormGroup
  course: Staff;
  courseId: string;
  skills: string[];
  updateMode: boolean = false;
  viewMode: boolean = false;

  visible: boolean = true;
  selectable: boolean = true;
  removable: boolean = true;
  addOnBlur: boolean = true;

  // Enter, comma
  separatorKeysCodes = [ENTER, COMMA];


  constructor(
    private dialog: MatDialog,
    private route:ActivatedRoute,
    private restService: RestService,
    private alertService: AlertService) {
      this.skills= ['abc'];
     }

  ngOnInit() {
    this.courseId=  this.route.snapshot.params['id'];
    this.viewMode=  this.route.snapshot.params['view'];
    
    if(this.courseId) {
      this.updateMode = true
      this.restService.getData('staffs/'+this.courseId, (data) => {
        if(this.viewMode) {
          this.form.disable();
        }
        this.course = data.item;
        this.form.get('joiningDate').setValue(this.course.joiningDate);
        this.form.get('endDate').setValue(this.course.endDate);
        this.form.get('salary').setValue(this.course.salary);
        this.form.get('remarks').setValue(this.course.remarks);
        this.form.get('contactNumber').setValue(this.course.contactNumber);
        this.form.get('email').setValue(this.course.email);
        this.form.get('name').setValue(this.course.name);
        this.form.get('branch').setValue(this.course.branch);
        if(this.course.skills) {
          this.skills = this.course.skills;
        }
        
      })
    }
    this.createForm();
  } 

  save() {
    var installment = this.form.value;
    installment.skills = this.skills;
    if(this.courseId) {
      this.restService.postData('staffs/'+this.courseId,installment, (data)=>{
        this.alertService.showToaster('Staff updated successfully');
      })
    }
     else {
      this.restService.postData('staffs',installment, (data)=>{
        this.alertService.showToaster('Staff saved successfully');
      })
     }
  }

  private createForm() {
    this.form = new FormGroup({
      // tslint:disable-next-line
      //email: new FormControl('', [Validators.required, patternValidator(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]),
      //password: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      joiningDate: new FormControl('', Validators.required),
      salary : new FormControl('', Validators.required),
      endDate : new FormControl('', Validators.required),
      remarks: new FormControl(''),
      branch: new FormControl('', Validators.required),
      contactNumber : new FormControl('', Validators.required),
      email : new FormControl('', Validators.required)
    });
  }

  branchSelected(value) {
    this.form.get('branch').setValue(value);
  }

  addSalary() {
    if(!this.courseId) {
      alert("Please save the staff before adding salary")
    }
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
        id: this.courseId
    };
    let dialogRef = this.dialog.open(SalaryFormComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(() => {
      //this.populateData();
    });
  }

  add(event: MatChipInputEvent): void {
    let input = event.input;
    let value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.skills.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(fruit: any): void {
    let index = this.skills.indexOf(fruit);

    if (index >= 0) {
      this.skills.splice(index, 1);
    }
  }
}
