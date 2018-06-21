import {Input, Component, OnInit } from '@angular/core';
import { RestService } from 'app/components/shared';
import { MatTableDataSource } from '@angular/Material';


@Component({
  selector: 'salary-list',
  templateUrl: './salary-list.component.html',
  styleUrls: ['./salary-list.component.scss']
})
export class SalaryListComponent implements OnInit {

  displayedColumns = ['position', 'name', 'weight', 'symbol'];
  dataSource;

  @Input()
  staffId: string;

  constructor(private restService: RestService) { }

  ngOnInit() {
    this.restService.getData('staffs/'+this.staffId+'/salaries', (data)=>{
      
      this.dataSource = new MatTableDataSource(data.items);
      
    })
  }

}
