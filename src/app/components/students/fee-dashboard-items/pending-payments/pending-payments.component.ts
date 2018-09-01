import { Component, OnInit, Inject } from '@angular/core';
import { RestService } from '../../../shared/services/rest.service';
import { Student, AlertService } from '../../../shared';
import { Subject } from 'rxjs/Subject';
import { Router } from '@angular/router';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";


@Component({
  selector: 'pending-payments',
  templateUrl: './pending-payments.component.html',
  styleUrls: ['./pending-payments.component.scss']
})
export class PendingPaymentsComponent implements OnInit {

  type: string;
  constructor(private restService: RestService,
    private router: Router,
    private alertService: AlertService,
    private dialogRef: MatDialogRef<PendingPaymentsComponent>,
    @Inject(MAT_DIALOG_DATA) data) {
      this.type = data.type;
     }
  students: Student[]
  loading: boolean = false;

  tableColumns = [
    {title: 'Name', name: 'name', filtering: {filterString: '', placeholder: 'Filter by name'}},
    {title: 'Register Number', name: 'registerNumber', filtering: {filterString: '', placeholder: 'Filter by name'}},
    {title: 'Phone', name: 'phone'},
    {title: 'Branch', name: 'branch', filtering: {filterString: '', placeholder: 'Filter by name'}},
    {title: 'Course', name: 'course', filtering: {filterString: '', placeholder: 'Filter by name'}},
  ];

  tableData = [
    ];
  ngOnInit() {
    this.loadData();
  }


  openStudent(student) {
    this.router.navigate(['student-view', { id: student.id }]);
  }


  loadData() {
    this.loading = true;
    this.restService.getData('students', (data) => {
      this.students = data.items;
      let tData = [];
      for(let temp of data.items) {
        temp.data.delete = '<button class="btn">Delete</button>'
        temp.data.edit = '<button class="btn">Edit</button>'
        temp.data.id = temp.id;
        tData.push(temp.data);
      }
      this.tableData = tData;
      this.loading = false;
      console.log(data);
    })
  }
  close() {
    this.dialogRef.close();
}

}
