import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore, AngularFirestoreDocument } from '../../../../../node_modules/angularfire2/firestore';
import { Observable } from 'rxjs';
import { Fee, Installment } from '../models';

@Injectable()
export class FeeService {

  constructor(public afs: AngularFirestore) { }

  getFees(stdFsKey: string): Observable<Fee[]> {
    let path = 'students/'+stdFsKey+'/fees';
    return this.afs.collection(path).snapshotChanges().map(changes => {
      return changes.map( a=> {
        const fee = a.payload.doc.data() as Fee;
        fee.FSKey = a.payload.doc.id;
        return fee;
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
