import { Component, OnInit } from '@angular/core';
import { RestService } from '../shared/services/rest.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {

  constructor(private restService: RestService) { }

  ngOnInit() {
    console.log(this.restService);
    console.log(this.restService.getData);
    this.restService.getData('students', (data) => {
      console.log(data);
    })
  }

}
