import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { RestService, AlertService } from '../../shared';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-attendance-recorder',
  templateUrl: './attendance-recorder.component.html',
  styleUrls: ['./attendance-recorder.component.scss']
})
export class AttendanceRecorderComponent implements OnInit {

  loading: boolean = false;
  viewOnlyAbs = false;
  form: FormGroup;
  
  students: any;
  constructor(private restService: RestService,
  private alertService: AlertService) { }

  ngOnInit() {
    this.form = new FormGroup({
      // tslint:disable-next-line
      branch: new FormControl('', [Validators.required]),
      course: new FormControl('', Validators.required),
      date : new FormControl('', Validators.required)
      
    });
  }

  search() {
    this.loading = true;
    let branch = this.form.get('branch').value;
    let date = this.form.get('date').value;
    let course = this.form.get('course').value;
    let dt = date.getFullYear()+'-'+date.getMonth()+'-'+date.getDate();
    this.restService.getData('attendance/students/'+branch+'/'+ course+'/'+dt, (data) => {
      this.students = data.items;
      this.loading = false;
    })
  }
  branchSelected(value) {
    this.form.get('branch').setValue(value);
  }

  addAttendance() {
    let attendaces = [];
    for(let std of this.students) {
      attendaces.push({
        studentId: std.id,
        present: std.data.present,
        remark: std.data.remark
      });
    }
    let branch = this.form.get('branch').value;
    let date = this.form.get('date').value;
    let course = this.form.get('course').value;
    let wrapper = {
      date:date.getFullYear()+'-'+date.getMonth()+'-'+date.getDate(),
      courseId: course,
      branchId: branch,
      attendaces: attendaces,
      remark: 'dsfsdf'
    }
    this.restService.postData('attendance', wrapper, ()=>{
      this.alertService.showToaster('Saved Successfully')
    })
  }
  courseSelected(value) {
    this.form.get('course').setValue(value);
  }

  selectAll() {
    for(let std of this.students) {
      std.data.present = true;
    }
  }

  viewAbs() {
    this.viewOnlyAbs = !this.viewOnlyAbs;
  }
}
