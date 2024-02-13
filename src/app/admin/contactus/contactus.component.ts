import { Component, OnInit } from '@angular/core';
import { ContactusService } from '../../services/contactus.service';
import { Observable } from 'rxjs';
import { IContactusResult } from '../../model/contactus';

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrl: './contactus.component.css'
})
export class ContactusComponent implements OnInit {

  contacts$!: Observable<IContactusResult[]>;
  constructor(private contactusService: ContactusService){}

  ngOnInit(): void {
    this.contacts$ = this.contactusService.loadData();
  }

  onDelete(id: string) {
    this.contactusService.deleteMessage(id);
  }
}
