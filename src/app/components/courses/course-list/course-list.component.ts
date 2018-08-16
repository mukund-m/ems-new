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
  tableColumns = [
    {title: 'Name', name: 'name', filtering: {filterString: '', placeholder: 'Filter by name'}},
    {title: 'Course Code', name: 'courseCode'},
    {title: 'Fee', name: 'feeAmount'},
    {title: 'Branch', name: 'branch', filtering: {filterString: '', placeholder: 'Filter by name'}},
    {title: 'delete', className: 'cell-width', name: 'delete'},
    {title: 'edit', className: 'cell-width', name: 'edit'}
  ];

  tableData = [
    ];


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
      let tData = [];
      for(let temp of data.items) {
        temp.data.delete = '<button class="btn">Delete</button>'
        temp.data.edit = '<button class="btn">Edit</button>'
        temp.data.id = temp.id;
        tData.push(temp.data);
      }
      this.tableData = tData;
      console.log(data);
    })
  }

  delete(person) {
    if (confirm('Are you sure you want to delete ' + person.name + '?')) {
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
