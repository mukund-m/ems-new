import { Component, OnInit } from '@angular/core';
import { RestService } from '../../shared/services/rest.service';
import { Student, AlertService } from '../../shared';
import { Subject } from 'rxjs/Subject';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {

  constructor(private restService: RestService,
    private router: Router,
    private alertService: AlertService) { }
  students: Student[]
  dtTrigger: Subject<any> = new Subject();
  dtOptions: DataTables.Settings = {};
  loading: boolean = false;
  ngOnInit() {
    this.loadData();
  }

  addStudent() {
    this.router.navigate(['student-form']);
  }

  openStudent(student) {
    this.router.navigate(['student-view', { id: student.id }]);
  }

  edit(person) {
    this.router.navigate(['student-form', { id: person.id }])
  }

  loadData() {
    this.loading = true;
    this.restService.getData('students', (data) => {
      this.students = data.items;
      this.loading = false;
      this.dtTrigger.next();
      console.log(data);
    })
  }

  delete(person) {
    if (confirm('Are you sure you want to delete ' + person.data.name + '?')) {
      this.loading = true;
      this.restService.delete('students/' + person.id, (data) => {
        this.loading = false;
        if (data.deleted) {
          this.alertService.showToaster('Deleted sucessfully');
          this.loadData();
        } else {
          this.alertService.showToaster('Could not delete');
        }
      })
    }

  }

}
