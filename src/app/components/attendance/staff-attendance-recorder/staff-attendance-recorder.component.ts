import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { RestService, AlertService } from '../../shared';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AmazingTimePickerService } from '../../../../../node_modules/amazing-time-picker';
import * as moment from 'moment';
@Component({
  selector: 'app-staff-attendance-recorder',
  templateUrl: './staff-attendance-recorder.component.html',
  styleUrls: ['./staff-attendance-recorder.component.scss']
})
export class StaffAttendanceRecorderComponent implements OnInit {

  loading: boolean = false;
  viewOnlyAbs = false;
  form: FormGroup;
  
  students: any;
  constructor(private restService: RestService,
    private atp: AmazingTimePickerService,
  private alertService: AlertService) { }

  ngOnInit() {
    this.form = new FormGroup({
      // tslint:disable-next-line
      branch: new FormControl('', [Validators.required]),
      date : new FormControl('', Validators.required)
      
    });
  }

  search() {
    this.loading = true;
    let branch = this.form.get('branch').value;
    let date = this.form.get('date').value;
    let dt = date.getFullYear()+'-'+date.getMonth()+'-'+date.getDate();
    this.restService.getData('staff_attendance/students/'+branch+'/'+dt, (data) => {
      for(let item of data.items) {
        if(!item.data.inTime) {
          item.data.inTime = '09:00'
        }
        if(!item.data.outTime) {
          item.data.outTime = '17:00'
        }
        
          var start = moment.utc(item.data.inTime, "HH:mm");
          var end = moment.utc(item.data.outTime, "HH:mm");
          var d = moment.duration(end.diff(start));
          var s = moment.utc(+d).format('H:mm');
          item.data.duration = s;
        
      }
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
        staffId: std.id,
        present: std.data.present,
        remark: std.data.remark,
        inTime: std.data.inTime,
        outTime: std.data.outTime,
      });
    }
    let branch = this.form.get('branch').value;
    let date = this.form.get('date').value;
    let wrapper = {
      date:date.getFullYear()+'-'+date.getMonth()+'-'+date.getDate(),
      branchId: branch,
      attendaces: attendaces,
      remark: 'dsfsdf'
    }
    this.restService.postData('staff_attendance', wrapper, ()=>{
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

  timeInChanged(data) {
    const amazingTimePicker = this.atp.open();
    amazingTimePicker.afterClose().subscribe(time => {
      data.inTime = time;
      if(data.outTime) {
        var start = moment.utc(data.inTime, "HH:mm");
        var end = moment.utc(data.outTime, "HH:mm");
        var d = moment.duration(end.diff(start));
        var s = moment.utc(+d).format('H:mm');
        data.duration = s;
      }
    });
  }
  timeOutChanged(data) {
    const amazingTimePicker = this.atp.open();
    amazingTimePicker.afterClose().subscribe(time => {
      data.outTime = time;
      if(data.inTime) {
        var start = moment.utc(data.inTime, "HH:mm");
        var end = moment.utc(data.outTime, "HH:mm");
        var d = moment.duration(end.diff(start));
        var s = moment.utc(+d).format('H:mm');
        data.duration = s;
      }
    });
  }
}
