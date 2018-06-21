import { Component, OnInit } from '@angular/core';
import { RestService } from '../../shared/services/rest.service';
import { Student, AlertService, Course } from '../../shared';
import { Subject } from 'rxjs/Subject';
import { Router } from '@angular/router';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss']
})
export class CourseListComponent implements OnInit {

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
    this.router.navigate(['course-form']);
  }

  openCourse(student) {
    this.router.navigate(['student-view', { id: student.id }]);
  }

  edit(course) {
    this.router.navigate(['course-form', { id: course.id }])
  }

  loadData() {
    this.loading = true;
    this.restService.getData('courses', (data) => {
      this.courses = data.items;
      this.loading = false;
      this.dtTrigger.next();
      console.log(data);
    })
  }

  delete(person) {
    if (confirm('Are you sure you want to delete ' + person.data.name + '?')) {
      this.loading = true;
      this.restService.delete('courses/' + person.id, (data) => {
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
