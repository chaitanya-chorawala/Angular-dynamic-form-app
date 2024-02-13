import { Component } from '@angular/core';
import { faClipboardList, faFileImage, faEnvelope, faMessage } from '@fortawesome/free-solid-svg-icons';
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

}
