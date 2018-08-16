import { Component, OnInit, Input } from '@angular/core';
import { RestService, Student, AlertService } from '../../shared';

@Component({
  selector: 'student-mark-recorder',
  templateUrl: './student-mark-recorder.component.html',
  styleUrls: ['./student-mark-recorder.component.scss']
})
export class StudentMarkRecorderComponent implements OnInit {

  students;
  loading: boolean;
  @Input()
  examId: string;

  @Input()
  branch: string;

  @Input()
  course: string;

  constructor(private restService: RestService,
              private alertService: AlertService) { }

  ngOnInit() {
    this.loading = true;
    this.restService.getData('students/'+this.branch+'/'+ this.course+'/'+ this.examId, (data) => {
      this.students = data.items;
      let tData = [];
      for(let temp of data.items) {
        temp.data.delete = '<button class="btn">Delete</button>'
        temp.data.edit = '<button class="btn">Edit</button>'
        temp.data.id = temp.id;
        tData.push(temp.data);
      }
      console.log(tData);
    })
  }

  addMark() {
    let list = [];
    for(let student of this.students) {
      list.push({id: student.id, mark: student.data.mark, correctAnswers: 0, incorrectAnswers: 0 });
    }
    this.restService.postData('addMarks/'+ this.examId,list, (data)=>{
      console.log(data);
      this.alertService.showToaster('Marks updated successfully');
    })
  }
}
