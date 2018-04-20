import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RestService, AlertService, Student } from '../../shared';
@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.scss']
})
export class StudentFormComponent implements OnInit {

  constructor(private restService: RestService,
  private alertservice: AlertService) { }
  error: string;
  studentId: string;
  studentData: Student;
  ngOnInit() {
  }

  addStudent(form: NgForm) {
    const name = form.value.name;
    this.restService.postData('createStudent', form.value, (data)=> {
      console.log(data);
      if(data.error) {
        this.error = data.error.message;
      } else{
        this.error = undefined;
        this.studentId = data.id;
        this.studentData = data.user;
        this.alertservice.showToaster("Student created successfully");
      }
    })
  }

}
