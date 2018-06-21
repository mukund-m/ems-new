import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { RestService, Student, Fee, Installment } from 'app/components/shared';
import {MatDialog, MatDialogConfig} from "@angular/material";
import { ParentFormComponent } from 'app/components/students/parent-form/parent-form.component';
import { StudentFormComponent } from 'app/components/students/student-form/student-form.component';
import { FeeFormComponent } from 'app/components/students/fee-form/fee-form.component';
import { Router } from '@angular/router';
import { InstallmentComponent } from 'app/components/students/installment/installment.component';
import {MatTableDataSource} from '@angular/material';


@Component({
  selector: 'app-student-view',
  templateUrl: './student-view.component.html',
  styleUrls: ['./student-view.component.scss']
})
export class StudentViewComponent implements OnInit {

  studentId : string;
  student: Student;
  parent: Student;
  parentId: string;
  feeId: string;
  fee: Fee;
  installments: Installment[] = [];
  displayedColumns = ['position', 'name', 'weight', 'symbol'];
  dataSource;
  loading: boolean = false;

  constructor(private route:ActivatedRoute,
              private router: Router,
              private restService: RestService,
              private dialog: MatDialog) { }

  ngOnInit() {
    this.populateData()
  }

  private populateData() {
    this.loading = true;
    this.studentId = this.route.snapshot.params['id'];
    this.restService.getData('students/'+this.studentId, (data)=>{
      this.student = data.item;
      this.restService.getData('students/'+this.studentId+'/parent', (parent) => {
        if(parent.items && parent.items.length>0) {
          this.parent = parent.items[0].data;
          this.parentId = parent.items[0].id;
                    
        }
        
      });
      this.restService.getData('students/'+this.studentId+'/fee', (parent) => {
        this.loading = false;
        if(parent.items && parent.items.length>0) {
          this.fee = parent.items[0].data;
          this.feeId = parent.items[0].id;
          
          this.restService.getData('students/'+this.studentId+'/fee/'+this.feeId+'/installemnent', (data)=>{
            this.installments = data.items;
            this.dataSource = new MatTableDataSource(this.installments);
            this.loading = false;
          })
        }
        
      })
    });
  }
  addParent() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
        id: this.studentId
    };
    let dialogRef = this.dialog.open(ParentFormComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(() => {
      this.populateData();
    });
  }

  addFee() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
        id: this.studentId
    };
    let dialogRef = this.dialog.open(FeeFormComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(() => {
      this.populateData();
    });
  }

  editStudent() {
    this.router.navigate(['student-form',{id: this.studentId}])
  }

  addInstallement() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
        id: this.studentId,
        feeId: this.feeId
    };
    let dialogRef = this.dialog.open(InstallmentComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(() => {
      this.populateData();
    });
  }
}
