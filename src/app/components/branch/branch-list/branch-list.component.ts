import { Component, OnInit } from '@angular/core';
import { RestService } from '../../shared/services/rest.service';
import { Student, AlertService, Course } from '../../shared';
import { Subject } from 'rxjs/Subject';
import { Router } from '@angular/router';
@Component({
  selector: 'app-branch-list',
  templateUrl: './branch-list.component.html',
  styleUrls: ['./branch-list.component.scss']
})
export class BranchListComponent implements OnInit {

  
  constructor(private restService: RestService,
    private router: Router,
    private alertService: AlertService) { }
  courses: Course[];
  dtTrigger: Subject<any> = new Subject();
  dtOptions: DataTables.Settings = {};
  loading: boolean = false;

  tableColumns = [
    {title: 'Name', name: 'branchName', filtering: {filterString: '', placeholder: 'Filter by name'}},
    {title: 'Phone number', name: 'branchCode'},
    {title: 'delete', className: 'cell-width', name: 'delete'},
    {title: 'edit', className: 'cell-width', name: 'edit'}
  ];

  tableData = [
    ];

  ngOnInit() {
    this.loadData();
  }

  addCourse() {
    this.router.navigate(['branch-form']);
  }

  openCourse(student) {
    this.router.navigate(['branch-form', { id: student.id, view: true }]);
  }

  edit(course) {
    this.router.navigate(['branch-form', { id: course.id }])
  }

  loadData() {
    this.loading = true;
    this.restService.getData('branches', (data) => {
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
