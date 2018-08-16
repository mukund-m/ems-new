import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {

  constructor() { }
  loading: boolean = false;

  ngOnInit() {
  }

  tableColumns = [
    {title: 'Notification', name: 'message', filtering: {filterString: '', placeholder: 'Filter by name'}},
    {title: 'Send On', name: 'registerNumber'},
    {title: 'branch', name: 'phone'},
    {title: 'course', name: 'branch'},
    
  ];

  tableData = [
    ];
  

}
 