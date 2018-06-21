import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import { RestService, AlertService } from 'app/components/shared';
import { NgForm } from '@angular/forms';
import {  FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-parent-form',
  templateUrl: './parent-form.component.html',
  styleUrls: ['./parent-form.component.scss']
})
export class ParentFormComponent implements OnInit {

  parentId: string;
  studentId: string;
  parent: any = {};
  form: FormGroup;
  constructor(private dialogRef: MatDialogRef<ParentFormComponent>,
              @Inject(MAT_DIALOG_DATA) data,
              private restService: RestService,
              private alertService: AlertService) { 
                console.log(data);
                if(data) {
                  this.studentId = data.id;
                }
                  
              }

  ngOnInit() {
    this.restService.getData('students/'+this.studentId+'/parent', (parent) => {
      if(parent.items && parent.items.length>0) {
        this.parent = parent.items[0].data;
        this.parentId = parent.items[0].id;
      }
      
    })
  }


  save(form: NgForm) {
      var parent = form.value;
      this.restService.postData('students/'+this.studentId+'/parent',parent, (data)=>{
        this.dialogRef.close();
        this.alertService.showToaster('Parent saved successfully');
      })
  }

  close() {
      this.dialogRef.close();
  }
}
