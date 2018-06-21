import { Component, OnInit } from '@angular/core';
import { RestService } from '../../shared/services/rest.service';
import { Student, AlertService, Course } from '../../shared';
import { Subject } from 'rxjs/Subject';
import { Router } from '@angular/router';

@Component({
  selector: 'app-staff-list',
  templateUrl: './staff-list.component.html',
  styleUrls: ['./staff-list.component.scss']
})
export class StaffListComponent implements OnInit {

  constructor(private restService: RestService,
    private router: Router,
    private alertService: AlertService) { }
  courses: Course[];
  dtTrigger: Subject<any> = new Subject();
  dtOptions: DataTables.Settings = {};
  loading: boolean = false;
  ngOnInit() {
    this.loadData();
  }

  addCourse() {
    this.router.navigate(['staff-form']);
  }

  openCourse(student) {
    this.router.navigate(['staff-form', { id: student.id, view: true }]);
  }

  edit(course) {
    this.router.navigate(['staff-form', { id: course.id }])
  }

  loadData() {
    this.loading = true;
    this.restService.getData('staffs', (data) => {
      this.courses = data.items;
      this.loading = false;
      this.dtTrigger.next();
      console.log(data);
    })
  }

  delete(person) {
    if (confirm('Are you sure you want to delete ' + person.data.name + '?')) {
      this.loading = true;
      this.restService.delete('staffs/' + person.id, (data) => {
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
 