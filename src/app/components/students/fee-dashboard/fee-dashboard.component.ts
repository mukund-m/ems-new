import { Component, OnInit } from '@angular/core';
import { RestService } from 'app/components/shared';
import { Router } from '@angular/router';
import {MatDialog, MatDialogConfig} from "@angular/material";
import { PendingPaymentsComponent } from 'app/components/students/fee-dashboard-items/pending-payments/pending-payments.component';


@Component({
  selector: 'app-fee-dashboard',
  templateUrl: './fee-dashboard.component.html',
  styleUrls: ['./fee-dashboard.component.scss']
})
export class FeeDashboardComponent implements OnInit {
  summary: any;
  view: any[] = [1000, 150];
  loading: boolean = false;
  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C']
  };
  single = [
    
  ]
  rows = [{'month':'Jan', 'total':2000},
  {'month':'Feb', 'total':4000},
  {'month':'Mar', 'total':2500}];
  loadingIndicator: boolean = false;
  reorderable: boolean = true;

  studentFeeColumns = [
    { prop: 'name', summaryFunc: () => null },
    { name: 'phone', summaryFunc: () => null },
    { name: 'paid', summaryFunc: () => null }

  ];

  studentFeeRows = [{'name':'Upesh M', 'phone':'234234', 'paid': 1200},
  {'name':'Upesh M', 'phone':'234234', 'paid': 1200},
  {'name':'Upesh M', 'phone':'234234', 'paid': 1200}];
  
  columns = [
    { prop: 'month', summaryFunc: () => null },
    { name: 'total', summaryFunc: () => null }
  ];
  constructor(
    private restService: RestService,
  private router: Router,
  private dialog: MatDialog) { }

  ngOnInit() {
    this.loading = true;
    this.restService.getData('feeSummary', (data) =>{
      console.log(data);
      
      this.loading = false;
      this.summary = data;
      this.single = [{
        'name':'Total students' ,
        'value': this.summary.totalStudents
      },
      {
        'name': 'Total Fee' ,
        'value':this.summary.totalFee
      },

      {
        'name':'Total Fee Paid' ,
        'value':this.summary.totalFeePaid
      },

      {
        'name':'Fee info available' ,
        'value':this.summary.feeAvailableFor
      },

      {
        'name':'No Fee Info Available' ,
        'value':this.summary.noFeeInfoAvailable
      },
      {
        'name':'Pending payments' ,
        'value':3
      }
    ]
    })
  }

  onSelect(data) {
    if(data.name == 'Total students') {
      this.router.navigate(['students'])
    }
    if(data.name == 'Pending payments') {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.autoFocus = true;
      dialogConfig.data = {
        type:'pending-payment' 
    };
      let dialogRef = this.dialog.open(PendingPaymentsComponent, dialogConfig);
      
    }
    if(data.name == 'No Fee Info Available') {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.autoFocus = true;
      dialogConfig.data = {
        'type':'no-fee-info'
      };
      let dialogRef = this.dialog.open(PendingPaymentsComponent, dialogConfig);
    }

    if(data.name == 'Fee info available') {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.autoFocus = true;
      dialogConfig.data = {
        'type':'fee-info'
      };
      let dialogRef = this.dialog.open(PendingPaymentsComponent, dialogConfig);
    }

  }

}
