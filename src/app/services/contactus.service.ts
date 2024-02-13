import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { IContactus, IContactusResult } from '../model/contactus';
import { Observable, catchError, from, map } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ContactusService {

  constructor(private afs: AngularFirestore
    , private toastr: ToastrService) { }

  doContactUs(data: IContactus) {
    from(this.afs.collection('contactus').add(data))
    .pipe(
      catchError((err) => 'Something went wrong!')
    )
    .subscribe({
      next: (val) => this.toastr.success('Message submitted!', 'Success'),
      error: (err) => this.toastr.error(err, 'Error')
    })
  }

  loadData(): Observable<IContactusResult[]> {
    return this.afs.collection('contactus')
      .snapshotChanges()
      .pipe(
        map(action => {
          return action.map(x => {
            return {
              id: x.payload.doc.id,
              data: x.payload.doc.data()
            } as IContactusResult
          })
        })
      )
  }

  deleteMessage(id: string) {
    from(this.afs.doc(`contactus/${id}`).delete())
    .pipe(
      catchError((err) => 'Something went wrong!')
    )
    .subscribe({
      next: (val) => this.toastr.success('Message delete successfully!'),
      error: (err) => this.toastr.error(err, 'Error')
    })
  }
}
