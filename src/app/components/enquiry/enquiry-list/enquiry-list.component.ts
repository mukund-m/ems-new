import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { RestService } from '../../shared/services/rest.service';
import { Student, AlertService, Course } from '../../shared';
import { Subject } from 'rxjs/Subject';
import { Exam } from '../../shared/models/exam';
@Component({
  selector: 'app-enquiry-list',
  templateUrl: './enquiry-list.component.html',
  styleUrls: ['./enquiry-list.component.scss']
})
export class EnquiryListComponent implements OnInit {

  constructor(private restService: RestService,
    private router: Router,
    private alertService: AlertService) { }
  courses: Exam[];
    loading: boolean = false;

  tableColumns = [
    {title: 'Branch', name: 'branch', filtering: {filterString: '', placeholder: 'Filter by branch'}},
    {title: 'Category', name: 'category', filtering: {filterString: '', placeholder: 'Filter by Category'}},
    {title: 'Phone', className: 'cell-width', name: 'phoneNumber'},
    {title: 'Email', className: 'cell-width', name: 'email'},
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
    this.router.navigate(['enquiry-form', { id: student.id, view: true }]);
  }

  edit(course) {
    this.router.navigate(['enquiry-form', { id: course.id }])
  }

  loadData() {
    this.loading = true;
    this.restService.getData('enquiries', (data) => {
      this.courses = data.items;
      this.loading = false;
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
      this.restService.delete('enquiries/' + person.id, (data) => {
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

  new() {
    this.router.navigate(['enquiry-form']);
  }
}
