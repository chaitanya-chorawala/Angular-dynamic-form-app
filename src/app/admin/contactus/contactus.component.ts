import { Component, OnDestroy, OnInit } from '@angular/core';
import { ContactusService } from '../../services/contactus.service';
import { Observable, Subscription } from 'rxjs';
import { IContactusResult } from '../../model/contactus';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrl: './contactus.component.css',
})
export class ContactusComponent implements OnInit, OnDestroy {
  contacts$!: Observable<IContactusResult[]>;
  subs: Subscription = new Subscription();
  constructor(private contactusService: ContactusService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.contacts$ = this.contactusService.loadData();
  }

  onDelete(id: string) {
    if (confirm('Are you sure to delete?')) {
      this.subs.add(this.contactusService.deleteMessage(id).subscribe({
        next: (val) => this.toastr.success('Form submitted!', 'Success'),
        error: (err) => this.toastr.error(err, 'Error'),
      }));
    }
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
