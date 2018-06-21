import { Component, OnInit } from '@angular/core';
import { RestService } from 'app/components/shared';

@Component({
  selector: 'app-fee-dashboard',
  templateUrl: './fee-dashboard.component.html',
  styleUrls: ['./fee-dashboard.component.scss']
})
export class FeeDashboardComponent implements OnInit {
  summary: any;
  loading: boolean = false;
  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C']
  };
  single = [
    
  ]
  constructor(
    private restService: RestService) { }

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
      }
    ]
    })
  }

}
