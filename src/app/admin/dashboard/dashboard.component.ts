import { ContactusService } from './../../services/contactus.service';
import { Component, inject } from '@angular/core';
import { faClipboardList, faFileImage, faEnvelope, faMessage } from '@fortawesome/free-solid-svg-icons';
import { ExcelExportService } from '../../services/excel-export.service';
import { tap } from 'rxjs';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  faClipboardList = faClipboardList;
  faFileImage = faFileImage;
  faEnvelope = faEnvelope;
  faMessage = faMessage;

  excelService = inject(ExcelExportService);
  contactusService = inject(ContactusService);

  exportForms() {
    this.contactusService.loadData()
    .pipe(
      tap(x => console.log(x))
    )
    .subscribe(x => this.excelService.exportAsExcelFile(x,`forms-list`));
  }
}
