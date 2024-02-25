import { Component, OnDestroy, inject } from '@angular/core';
import {
  faClipboardList,
  faEnvelope,
  faFileImage,
  faMessage,
} from '@fortawesome/free-solid-svg-icons';
import { ExcelExportService } from '../../services/excel-export.service';
import { ContactusService } from './../../services/contactus.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnDestroy {

  faClipboardList = faClipboardList;
  faFileImage = faFileImage;
  faEnvelope = faEnvelope;
  faMessage = faMessage;

  subs: Subscription = new Subscription();

  excelService = inject(ExcelExportService);
  contactusService = inject(ContactusService);

  exportForms() {
    this.subs.add(
      this.contactusService.loadExportData().subscribe((persons) => {
      this.excelService.exportAsExcelFile(persons.flat(), `forms-list`);
    }));
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
