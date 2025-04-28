import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonCardHeader, IonCardTitle, IonCardContent, IonButton, IonCard, IonSelectOption, IonSelect } from '@ionic/angular/standalone';
import { SenhaService } from '../services/senha.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  imports: [FormsModule,IonHeader, IonToolbar, IonTitle, IonContent, IonCardHeader,IonCardTitle,IonCardContent,IonButton,IonCard,IonSelectOption,IonSelect],
})
export class Tab1Page {
  constructor(private senhaService: SenhaService) {}
  guicheSelecionado: string = '';

  
    chamarSenha(guiche: string) {
      this.senhaService.chamarSenha(guiche);
    }
    
  
}
