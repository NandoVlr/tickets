import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonCardTitle, IonCardHeader, IonCardContent, IonText, IonCard } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { SenhaService } from '../services/senha.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  imports: [CommonModule, IonHeader, IonToolbar, IonTitle, IonContent,IonCardTitle,IonCardHeader,IonCardContent,IonText,IonCard],
})
export class Tab3Page {
 

  constructor(public senhaService: SenhaService) {}

get ultimasSenhas() {
  return this.senhaService.ultimasSenhas;
}
}
