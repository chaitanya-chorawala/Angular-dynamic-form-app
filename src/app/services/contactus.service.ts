import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { IContactus, IContactusResult, IMainPerson } from '../model/contactus';
import { Observable, catchError, from, map } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class ContactusService {
  constructor(private afs: AngularFirestore, private toastr: ToastrService) {}

  add(data: IMainPerson){
    from(this.afs.collection('contactus').add(data))
      .pipe(catchError((err) => 'Something went wrong!'))
      .subscribe({
        next: (val) => this.toastr.success('Form submitted!', 'Success'),
        error: (err) => this.toastr.error(err, 'Error'),
      });
  }

  update(data: IMainPerson, id: string) {
    from(this.afs.doc(`contactus/${id}`).update(data))
    .pipe(catchError((err) => 'Something went wrong!'))
    .subscribe({
      next: (val) => this.toastr.success('Form submitted!', 'Success'),
      error: (err) => this.toastr.error(err, 'Error'),
    });
  }

  doContactUs(data: IMainPerson, id?: string | null | undefined) {
    if(id) {
      this.update(data, id);
    } else {
      this.add(data);
    }
  }

  loadData(): Observable<IContactusResult[]> {
    return this.afs
      .collection('contactus')
      .snapshotChanges()
      .pipe(
        map((action) => {
          return action.map((x) => {
            return {
              id: x.payload.doc.id,
              data: x.payload.doc.data(),
            } as IContactusResult;
          });
        })
      );
  }

  /** Get post by id */
  loadById(id: string): Observable<IMainPerson> {
    return this.afs
      .doc(`contactus/${id}`)
      .valueChanges()
      .pipe(
        map((val) => {
          const data: any = val;
          return data as IMainPerson;
        })
      );
  }

  deleteMessage(id: string) {
    from(this.afs.doc(`contactus/${id}`).delete())
      .pipe(catchError((err) => 'Something went wrong!'))
      .subscribe({
        next: (val) => this.toastr.success('Form delete successfully!'),
        error: (err) => this.toastr.error(err, 'Error'),
      });
  }
}
