import { Component, inject } from '@angular/core';
import {
  faClipboardList,
  faEnvelope,
  faFileImage,
  faMessage,
} from '@fortawesome/free-solid-svg-icons';
import { ExcelExportService } from '../../services/excel-export.service';
import { ContactusService } from './../../services/contactus.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  faClipboardList = faClipboardList;
  faFileImage = faFileImage;
  faEnvelope = faEnvelope;
  faMessage = faMessage;

  excelService = inject(ExcelExportService);
  contactusService = inject(ContactusService);

  exportForms() {
    this.contactusService.loadExportData().subscribe((persons) => {
      this.excelService.exportAsExcelFile(persons.flat(), `forms-list`);
    });
  }
}
