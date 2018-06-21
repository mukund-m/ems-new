import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RestService, AlertService, Student } from '../../shared';
import {MatDialog, MatDialogConfig} from "@angular/material";
import { ParentFormComponent } from 'app/components/students/parent-form/parent-form.component';
import {ActivatedRoute} from '@angular/router';
import { FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.scss']
})
export class StudentFormComponent implements OnInit {

  constructor(private restService: RestService,
              private alertservice: AlertService,
              private route:ActivatedRoute,
              private dialog: MatDialog) { }
  error: string;
  studentId: string;
  studentData: Student;
  loading: boolean = false;
  form: FormGroup;

  ngOnInit() {
    this.createForm()
    this.studentId = this.route.snapshot.params['id'];
    if(this.studentId) {
      this.loading = true;
      this.restService.getData('students/'+this.studentId, (data) => {
        this.studentData = data.item;
        this.form.get('name').setValue(this.studentData.name);
        this.form.get('password').disable();
        this.form.get('cpwd').disable();
        this.form.get('email').disable();
        this.form.get('password').setValue(this.studentData.password);
        this.form.get('cpwd').setValue(this.studentData.password);
        this.form.get('addressLine1').setValue(this.studentData.addressLine1);
        this.form.get('addressLine2').setValue(this.studentData.addressLine2);
        this.form.get('addressLine3').setValue(this.studentData.addressLine3);
        this.form.get('phone').setValue(this.studentData.phone);
        this.form.get('email').setValue(this.studentData.email);
        this.form.get('joinedOn').setValue(this.studentData.joinedOn);
        this.form.get('registerNumber').setValue(this.studentData.registerNumber);
        this.form.get('remarks').setValue(this.studentData.remarks);
        this.loading = false;
        console.log(this.studentData);
      })
    }
  }

  private createForm() {
    this.form = new FormGroup({
      // tslint:disable-next-line
      //email: new FormControl('', [Validators.required, patternValidator(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]),
      //password: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      cpwd : new FormControl('', Validators.required),
      addressLine1: new FormControl(''),
      addressLine2: new FormControl(''),
      addressLine3: new FormControl(''),
      remarks: new FormControl(''),
      branch: new FormControl('', Validators.required),
      course: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      joinedOn : new FormControl('', Validators.required),
      registerNumber: new FormControl('', Validators.required)
      
    });
  }

  save() {
    const name = this.form.value.name;
    this.loading = true;
    if(!this.studentId) {
      
      this.restService.postData('createStudent', this.form.value, (data)=> {
        console.log(data);
        this.loading = false;
        if(data.error) {
          this.error = data.error.message;
        } else{
          this.error = undefined;
          this.studentId = data.id;
          this.studentData = data.user;
          this.alertservice.showToaster("Student created successfully");
        }
      })
    } else {
      this.restService.postData('students/'+this.studentId, this.form.value, (data)=> {
        console.log(data);
        this.loading = false;
        if(data.error) {
          this.error = data.error.message;
        } else{
          this.error = undefined;
          this.studentId = data.id;
          this.studentData = data.data;
          this.alertservice.showToaster("Student updated successfully");
        }
      })
    }
    
  }

  addParent() {
    this.dialog.open(ParentFormComponent);
  }

  branchSelected(value) {
    this.form.get('branch').setValue(value);
  }

  courseSelected(value) {
    this.form.get('course').setValue(value);
  }
}
