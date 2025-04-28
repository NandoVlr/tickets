import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardTitle, IonCardHeader, IonCardContent, IonButton } from '@ionic/angular/standalone';
import { SenhaService } from '../services/senha.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonCard,IonCardTitle,IonCardHeader,IonCardContent,IonButton]
})
export class Tab2Page {
  constructor(private senhaService: SenhaService) {}

  emitirSenha(tipo: string) {
    this.senhaService.emitirSenha(tipo);
  } 

}
