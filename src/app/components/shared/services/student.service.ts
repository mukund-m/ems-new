import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore, AngularFirestoreDocument } from '../../../../../node_modules/angularfire2/firestore';
import { Student, Installment, Fee } from '../models';
import { Observable } from '../../../../../node_modules/rxjs';

@Injectable()
export class StudentService {

  collectionRef: AngularFirestoreCollection<Student> = null;
  students: Observable<Student[]>;

  constructor(public afs: AngularFirestore) {
    this.afs.firestore.settings({ timestampsInSnapshots: true });
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

   getStudent(fskey: string): Observable<Student> {
    const document: AngularFirestoreDocument<Student> = this.afs.doc('students/'+fskey);

    const document$: Observable<Student> = document.valueChanges()
    return document$;
   }

   getParent(stdFsKey: string): Observable<any> {
    let path = 'students/'+stdFsKey+'/parents';
    return this.afs.collection(path).snapshotChanges().map(changes => {
      return changes.map( a=> {
        const data = a.payload.doc.data();
        data.FSKey = a.payload.doc.id;
        return data;
      })
    })
   }

   getFees(stdFsKey: string): Observable<Fee[]> {
    let path = 'students/'+stdFsKey+'/fees';
    return this.afs.collection(path).snapshotChanges().map(changes => {
      return changes.map( a=> {
        const data = a.payload.doc.data() as Fee;
        data.FSKey = a.payload.doc.id;
        return data;
      })
    })
   }
 
   getInstallments(stdFsKey: string, instFSKey): Observable<Installment[]> {
    let path = 'students/'+stdFsKey+'/fees/'+instFSKey+'/installements';
    return this.afs.collection(path).snapshotChanges().map(changes => {
      return changes.map( a=> {
        const data = a.payload.doc.data() as Installment;
        data.FSKey = a.payload.doc.id;
        return data;
      })
    })
   }

   
}
