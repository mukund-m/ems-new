import { Component, OnInit } from '@angular/core';
import { RestService } from '../../shared/services/rest.service';
import { Student, AlertService } from '../../shared';
import { Subject } from 'rxjs/Subject';
import { Router } from '@angular/router';
import { ExportService } from '../../shared/services/export.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {

  constructor(private restService: RestService,
    private router: Router,
    private exportService: ExportService,
    private alertService: AlertService) { }
  students: Student[]
  dtTrigger: Subject<any> = new Subject();
  dtOptions: DataTables.Settings = {};
  loading: boolean = false;

  tableColumns = [
    {title: 'Name', name: 'name', filtering: {filterString: '', placeholder: 'Filter by name'}},
    {title: 'Register Number', name: 'registerNumber', filtering: {filterString: '', placeholder: 'Filter by regNo.'}},
    {title: 'Phone', name: 'phone'},
    {title: 'Branch', name: 'branch', filtering: {filterString: '', placeholder: 'Filter by name'}},
    {title: 'Course', name: 'course', filtering: {filterString: '', placeholder: 'Filter by name'}},
    {title: 'delete', className: 'cell-width', name: 'delete'},
    {title: 'edit', className: 'cell-width', name: 'edit'}
  ];

  tableData = [
    ];
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
      let tData = [];
      for(let temp of data.items) {
        temp.data.delete = '<button class="btn">Delete</button>'
        temp.data.edit = '<button class="btn">Edit</button>'
        temp.data.id = temp.id;
        tData.push(temp.data);
      }
      this.tableData = tData;
      this.loading = false;
      this.dtTrigger.next();
      console.log(data);
    })
  }

  delete(person) {
    if (confirm('Are you sure you want to delete ' + person.name + '?')) {
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

  download() {
    let data:any = [{name:'NAME', phone: 'PHONE', email:'EMAIL'}];
    for(let std of this.students) {
      let std1:any = std;
      data.push({name: std1.data.name, phone: std1.data.phone, email: std1.data.email});
    }
    this.exportService.export(data, 'students');
  }

}
