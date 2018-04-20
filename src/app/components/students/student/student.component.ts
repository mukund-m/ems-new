import { Component, OnInit } from '@angular/core';
import { RestService } from '../../shared/services/rest.service';
import { Student } from '../../shared';
import { Subject } from 'rxjs/Subject';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {

  constructor(private restService: RestService,
  private router: Router) { }
  students: Student[]
  dtTrigger: Subject<any> = new Subject();
  dtOptions: DataTables.Settings = {};
  ngOnInit() {
    console.log(this.restService);
    console.log(this.restService.getData);
    this.restService.getData('students', (data) => {
      this.students = data.items;
      this.dtTrigger.next();
      console.log(data);
    })
  }

  addStudent() {
    this.router.navigate(['student-form']);
  }

}
