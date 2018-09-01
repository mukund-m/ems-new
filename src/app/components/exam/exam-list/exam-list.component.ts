import { Component, OnInit } from '@angular/core';
import { RestService } from '../../shared/services/rest.service';
import { Student, AlertService, Course } from '../../shared';
import { Subject } from 'rxjs/Subject';
import { Router } from '@angular/router';
import { Exam } from '../../shared/models/exam';

@Component({
  selector: 'app-exam-list',
  templateUrl: './exam-list.component.html',
  styleUrls: ['./exam-list.component.scss']
})
export class ExamListComponent implements OnInit {

  constructor(private restService: RestService,
    private router: Router,
    private alertService: AlertService) { }
  courses: Exam[];
  dtTrigger: Subject<any> = new Subject();
  
  loading: boolean = false;

  tableColumns = [
    {title: 'Branch', name: 'branch', filtering: {filterString: '', placeholder: 'Filter by branch'}},
    {title: 'Course', name: 'course', filtering: {filterString: '', placeholder: 'Filter by course'}},
    {title: 'Name', className: 'cell-width', name: 'name'},
    {title: 'Exam Date', className: 'cell-width', name: 'examDate'},
    {title: 'edit', className: 'cell-width', name: 'edit'}
  ];

  tableData = [
    ];

  ngOnInit() {
    this.loadData();
  }

  addCourse() {
    this.router.navigate(['exam-details']);
  }

  openCourse(student) {
    this.router.navigate(['exam-details', { id: student.id, view: true }]);
  }

  edit(course) {
    this.router.navigate(['exam-details', { id: course.id }])
  }

  loadData() {
    this.loading = true;
    this.restService.getData('exams', (data) => {
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
    })
  }

  delete(person) {
    if (confirm('Are you sure you want to delete ' + person.name + '?')) {
      this.loading = true;
      this.restService.delete('branches/' + person.id, (data) => {
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
