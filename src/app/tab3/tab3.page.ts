import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonCardTitle, IonCardHeader, IonList, IonCardContent, IonItem, IonLabel, IonText, IonCard } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  imports: [CommonModule, IonHeader, IonToolbar, IonTitle, IonContent, ExploreContainerComponent,IonCardTitle,IonCardHeader,IonList,IonCardContent,IonItem,IonList,IonLabel,IonText,IonCard],
})
export class Tab3Page {
  ultimasSenhas = [
    { numero: '250424-SP001', guiche: 'Guichê 1', hora: '10:03' },
    { numero: '250424-SE002', guiche: 'Guichê 2', hora: '10:00' },
    { numero: '250424-SG003', guiche: 'Guichê 1', hora: '09:55' },
    { numero: '250424-SP004', guiche: 'Guichê 3', hora: '09:45' },
    { numero: '250424-SE005', guiche: 'Guichê 2', hora: '09:30' }
  ];
  constructor() {}
}
