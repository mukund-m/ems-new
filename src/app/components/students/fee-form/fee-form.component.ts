import { Component, OnInit , Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import { RestService, AlertService, Fee } from 'app/components/shared';
import { NgForm } from '@angular/forms';
import {  FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-fee-form',
  templateUrl: './fee-form.component.html',
  styleUrls: ['./fee-form.component.scss']
})
export class FeeFormComponent implements OnInit {

  studentId: string;
  form: FormGroup;
  fee: Fee;
  constructor(private dialogRef: MatDialogRef<FeeFormComponent>,
              @Inject(MAT_DIALOG_DATA) data,
              private restService: RestService,
              private alertService: AlertService) { 
                console.log(data);
                if(data) {
                  this.studentId = data.id;
                }   
              }

  ngOnInit() {
  }

  save(form: NgForm) {
    var fee = form.value;
    this.restService.postData('students/'+this.studentId+'/fee',fee, (data)=>{
      this.dialogRef.close();
      this.alertService.showToaster('Fee saved successfully');
    })
  }

  close() {
      this.dialogRef.close();
  }
}
