import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardTitle, IonCardHeader, IonCardContent, IonButton } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, ExploreContainerComponent,IonCard,IonCardTitle,IonCardHeader,IonCardContent,IonButton]
})
export class Tab2Page {

  constructor() {}
  
  emitirSenha(tipo: string) {
    const numeroAleatorio = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    const dataAtual = new Date();
    const dataFormatada = `${dataAtual.getFullYear().toString().slice(-2)}${(dataAtual.getMonth() + 1).toString().padStart(2, '0')}${dataAtual.getDate().toString().padStart(2, '0')}`;
    const senha = `${dataFormatada}-${tipo}${numeroAleatorio}`;
  
    console.log(`Senha ${senha} emitida!`);
  }
  

}
