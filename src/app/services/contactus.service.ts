import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/compat/firestore';
import { ToastrService } from 'ngx-toastr';
import { Observable, catchError, from, map } from 'rxjs';
import {
  IContactusResult,
  IExportForms,
  IMainPerson
} from '../model/contactus';
import { formatDateToShortDate } from '../shared/utilities';

@Injectable({
  providedIn: 'root',
})
export class ContactusService {
  constructor(private afs: AngularFirestore) {}

  add(data: IMainPerson): Observable<string | DocumentReference<unknown>> {
    return from(this.afs.collection('contactus').add(data))
      .pipe(catchError((err) => 'Something went wrong!'));      
  }

  update(data: IMainPerson, id: string): Observable<string | void> {
    return from(this.afs.doc(`contactus/${id}`).update(data))
      .pipe(catchError((err) => 'Something went wrong!'));      
  }

  loadData(): Observable<IContactusResult[]> {
    return this.afs
      .collection('contactus', ref => ref.orderBy('createdAt', 'desc'))
      .snapshotChanges()
      .pipe(
        map((action) => {
          return action.map((x) => {
            return {
              id: x.payload.doc.id,
              data: x.payload.doc.data(),
              isCollapsed: false
            } as IContactusResult;
          });
        })
      );
  }

  loadExportData(): Observable<IExportForms[][]> {
    return this.afs
      .collection('contactus', ref => ref.orderBy('name'))
      .snapshotChanges()
      .pipe(
        map((action) => {
          return action.map((x, index) => {
            const res = x.payload.doc.data() as IMainPerson;
            const formId = x.payload.doc.id as string;
            const persons: IExportForms[] = [
              {
                rowNumber: (index + 1),
                id: formId,
                relationWithMainPerson: 'Main',
                name: res.name,
                gender: res.gender,
                isMarried: res.isMarried,
                mobileNo: res.mobileNo,
                occupation: res.occupation,
                occupationDetail: res.occupationDetail,
                address: res.address,
                area: res.area,
                dob: formatDateToShortDate(res.dob),
                age: res.age,
                lastModifiedAt: res.createdAtDateTime
              },
            ];

            const family = res.family.map((res) => {
              return {
                id: '',
                relationWithMainPerson: res.relationWithMainPerson,
                name: res.name,
                gender: res.gender,
                isMarried: res.isMarried,
                mobileNo: '',
                occupation: res.occupation,
                occupationDetail: res.occupationDetail,
                address: '',
                area: '',
                dob: formatDateToShortDate(res.dob),
                age: res.age,
                lastModifiedAt: ''
              } as IExportForms;
            });

            return [...persons, ...family]
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

  deleteMessage(id: string): Observable<string | void> {
    return from(this.afs.doc(`contactus/${id}`).delete())
      .pipe(catchError((err) => 'Something went wrong!'));
  }
}
