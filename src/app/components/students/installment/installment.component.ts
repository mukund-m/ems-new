import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators  } from '@angular/forms';
import { patternValidator } from 'app/validators/email.validator';
import { Installment } from 'app/components/shared';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import { RestService, AlertService, Fee } from 'app/components/shared';


@Component({
  selector: 'app-installment',
  templateUrl: './installment.component.html',
  styleUrls: ['./installment.component.scss']
})
export class InstallmentComponent implements OnInit {

  form: FormGroup
  installemnt: Installment;
  studentId: string;
  feeId: string;
  constructor(private dialogRef: MatDialogRef<InstallmentComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    private restService: RestService,
    private alertService: AlertService) {
      if(data) {
        this.studentId = data.id;
        this.feeId = data.feeId;

      }
     }

  ngOnInit() {
    this.createForm();
  } 

  save() {
    var installment = this.form.value;
    this.restService.postData('students/'+this.studentId+'/fee/'+this.feeId+'/installemnent',installment, (data)=>{
      this.dialogRef.close();
      this.alertService.showToaster('Installement saved successfully');
    })
  }

  private createForm() {
    this.form = new FormGroup({
      // tslint:disable-next-line
      //email: new FormControl('', [Validators.required, patternValidator(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]),
      //password: new FormControl('', Validators.required),
      amount: new FormControl('', Validators.required),
      paymentDate: new FormControl('', Validators.required),
      collectedBy : new FormControl('', Validators.required),
      recieptNumber: new FormControl(''),
    });
  }

  close() {
    this.dialogRef.close();
}

}
