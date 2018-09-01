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
import { StudentService } from '../../shared/services/student.service';


@Component({
  selector: 'app-student-view',
  templateUrl: './student-view.component.html',
  styleUrls: ['./student-view.component.scss']
})
export class StudentViewComponent implements OnInit {

  studentId : string;
  student: Student;
  attendance : any;
  viewOnlyAbs = false;
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
              private studentService: StudentService,
              private restService: RestService,
              private dialog: MatDialog) { }

  ngOnInit() {
    this.populateData()
  }

  private populateData() {
    this.loading = true;
    this.studentId = this.route.snapshot.params['id'];
    this.studentService.getParent(this.studentId).subscribe ((parents) => {
      if(parents.length > 0) {
        this.parent = parents[0];
        this.parentId = parents[0].FSKey;
      }
    })

    this.studentService.getFees(this.studentId).subscribe ((fees) => {
      if(fees.length>0) {
        this.fee = fees[0];
        this.feeId = fees[0].FSKey;
        this.studentService.getInstallments(this.studentId, this.feeId).subscribe( (insts) => {
          this.installments = insts;
          this.dataSource = new MatTableDataSource(this.installments);
          this.loading = false;
          
          let total = this.fee.totalAmount;
          let payedAmnt = 0;
          if(this.fee.dueAmount) {
            total = total + this.fee.dueAmount;
          }
          if(this.fee.advanceAmount) {
            payedAmnt = payedAmnt + this.fee.advanceAmount;
          }
          for(let inst of insts) {
            payedAmnt = payedAmnt + inst.amount;
          }
          this.fee.payedAmount = payedAmnt;
          this.fee.balance = total - payedAmnt;

        })
      }
    })
    this.studentService.getStudent(this.studentId).subscribe( (std) => {
      this.student = std;

      this.restService.getData('students/'+this.studentId+'/attendance', (atnd) => {
        this.attendance = atnd;
        this.attendance.percentage = ((this.attendance.total -this.attendance.abs) / this.attendance.total)*100;
      });
    })
   
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

  print(): void {
    let printContents, popupWin;
    printContents = document.getElementById('fee-details').innerHTML;
    popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWin.document.open();
    popupWin.document.write(`
      <html>
        <head>
          <title>Print tab</title>
          <style>
          //........Customized style.......
          </style>
        </head>
    <body onload="window.print();window.close()">${printContents}</body>
      </html>`
    );
    popupWin.document.close();
}
viewAbs() {
  this.viewOnlyAbs = !this.viewOnlyAbs;
}
}
