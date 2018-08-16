import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'fee-monthly-trend',
  templateUrl: './fee-monthly-trend.component.html',
  styleUrls: ['./fee-monthly-trend.component.scss']
})
export class FeeMonthlyTrendComponent implements OnInit {

  single: any[];
  multi: any[] = [
  {
    name: 'ICS Ottappalam',
    series: [
      {
        name: 'Jan',
        value: 1300
      },
      {
        name: 'Feb',
        value: 2800      },
      {
        name: 'Mar',
        value: 2000
      }
    ]
  },
  {
    name: 'ICS Palakkad',
    series: [
      {
        name: 'Jan',
        value: 50
      },
      {
        name: 'Feb',
        value: 100      },
      {
        name: 'Mar',
        value: 220
      }
    ]
  }
];

  view: any[] = [500, 300];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Month';
  showYAxisLabel = true;
  yAxisLabel = 'Fee Collection';
  timeline = true;

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  // line, area
  autoScale = true;

  constructor() { }

  ngOnInit() {
  }

}
