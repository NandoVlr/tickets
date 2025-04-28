import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonHeader, IonToolbar, IonTitle, IonContent, IonCardTitle, IonCardHeader, IonList, IonCardContent, IonItem, IonLabel,IonCard } from '@ionic/angular/standalone';

import { SenhaService } from '../services/senha.service';
@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
  standalone: true,
  imports: [CommonModule, IonHeader, IonToolbar, IonTitle, IonContent,IonCardTitle,IonCardHeader,IonList,IonCardContent,IonItem,IonList,IonLabel,IonCard],
})
export class Tab4Page  {

  totalEmitidas: any;
  totalChamadas: any;
  mediaTempoEstimado: any;
  mediaTempoEstimadoSG: any;
  mediaTempoEstimadoSE: any;
  mediaTempoEstimadoSP: any;
  relatorioDetalhado: any[] = [];
  relatorioDiario: any[] = [];
  relatorioMensal: any[] = [];

  constructor(public senhaService: SenhaService) {}

  ionViewWillEnter() {
    this.totalEmitidas = this.senhaService.getTotalSenhasEmitidas();
    this.totalChamadas = this.senhaService.getTotalSenhasChamadas();
    this.mediaTempoEstimado = this.senhaService.getMediaTempoEstimado();
    this.mediaTempoEstimadoSG = this.senhaService.getMediaTempoEstimadoSG();
    this.mediaTempoEstimadoSE = this.senhaService.getMediaTempoEstimadoSE();
    this.mediaTempoEstimadoSP = this.senhaService.getMediaTempoEstimadoSP();
    this.relatorioDetalhado = this.senhaService.getSenhasDetalhadas();
    this.relatorioDiario = this.senhaService.getRelatorioDiario();
    this.relatorioMensal = this.senhaService.getRelatorioMensal();
  }
}
