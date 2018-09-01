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
  loading: boolean = false;

  tableColumns = [
    {title: 'Name', name: 'name', filtering: {filterString: '', placeholder: 'Filter by name'}},
    {title: 'Phone number', name: 'contactNumber'},
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
 