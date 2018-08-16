import { Component, OnInit } from '@angular/core';
import { RestService } from 'app/components/shared';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {

  colorScheme = {
    domain: ['orange', 'purple', 'green', '#AAAAAA']
  };
  view: any[] = [500, 350];
  xAxisLabel = 'Branch';
  yAxisLabel = 'Students';
  single = [
    {
      "name": "ICS Ottappalam",
      "value": 124
    },
    {
      "name": "ICS Palakkad",
      "value": 36
    },
    {
      "name": "ICS ABC",
      "value": 199
    }
    
  ];


  rows = [{'activity':'Student ABC is added', 'time':'12 Jun 2018 12:00', 'user':'prasad'},
  {'activity':'Student ABC is added', 'time':'12 Jun 2018 12:00', 'user':'prasad'},
  {'activity':'Student ABC is added', 'time':'12 Jun 2018 12:00', 'user':'prasad'}];
  loadingIndicator: boolean = false;
  reorderable: boolean = true;

  columns = [
    { prop: 'activity', summaryFunc: () => null },
    { name: 'time', summaryFunc: () => null },
    { name: 'user', summaryFunc: () => null }
  ];
  
  
  constructor(private restService: RestService) { }

  ngOnInit() {
    
  }

}
