import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '../../../../../node_modules/angularfire2/firestore';
import { Student } from '../models';
import { Observable } from '../../../../../node_modules/rxjs';

@Injectable()
export class StudentService {

  collectionRef: AngularFirestoreCollection<Student> = null;
  students: Observable<Student[]>;

  constructor(public afs: AngularFirestore) {
    this.collectionRef = this.afs.collection('students');
    this.students = this.collectionRef.snapshotChanges().map(changes => {
      return changes.map( a=> {
        const data = a.payload.doc.data() as Student;
        data.FSKey = a.payload.doc.id;
        return data;
      })
    })
   }

   getStudents(): Observable<Student[]> {
     return this.students;
   }

}
