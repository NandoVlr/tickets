import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SenhaService {
  senhasSP: any[] = [];
  senhasSE: any[] = [];
  senhasSG: any[] = [];
  ultimasSenhas: any[] = [];

  private prioridades = ['SP', 'SE', 'SG'];
  private indicePrioridade = 0;

  private sequenciaSP = 0;
  private sequenciaSE = 0;
  private sequenciaSG = 0;

  
  
  emitirSenha(tipo: string) {
    const dataAtual = new Date();
    const dataFormatada = `${dataAtual.getFullYear().toString().slice(-2)}${(dataAtual.getMonth() + 1).toString().padStart(2, '0')}${dataAtual.getDate().toString().padStart(2, '0')}`;
  
    let sequencia = '';
    let tempoEstimado = 0;
  
    // Calcula o tempo médio de atendimento conforme o tipo de senha
    if (tipo === 'SP') {
      this.sequenciaSP++;
      sequencia = this.sequenciaSP.toString().padStart(3, '0');
      tempoEstimado = 15 + Math.floor(Math.random() * 11) - 5; // Tempo médio de SP com variação
    } else if (tipo === 'SE') {
      this.sequenciaSE++;
      sequencia = this.sequenciaSE.toString().padStart(3, '0');
      tempoEstimado = 1 + Math.floor(Math.random() * 5); // Tempo médio de SE com variação
    } else if (tipo === 'SG') {
      this.sequenciaSG++;
      sequencia = this.sequenciaSG.toString().padStart(3, '0');
      tempoEstimado = 5 + Math.floor(Math.random() * 7) - 3; // Tempo médio de SG com variação
    }
  
    const senha = {
      numero: `${dataFormatada}-${tipo}${sequencia}`,
      tipo: tipo,
      guiche: '', // vazio por enquanto
      hora: `${dataAtual.getHours().toString().padStart(2, '0')}:${dataAtual.getMinutes().toString().padStart(2, '0')}`,
      tempoEstimado: tempoEstimado,
      dataHoraEmissao: dataAtual, // salva data e hora da emissão
      dataHoraChamado: null        // só preenche quando for chamado
    };
  
    if (tipo === 'SP') this.senhasSP.push(senha);
    else if (tipo === 'SE') this.senhasSE.push(senha);
    else if (tipo === 'SG') this.senhasSG.push(senha);
  
    alert(`Senha ${senha.numero} criada!`);
  }
  
    private calcularTM(tipoSenha: string): number {
    let tempoMedio: number;
    
    if (tipoSenha === 'SP') {
      // Senha Prioritária (SP): 15 minutos, com variação de + ou - 5 minutos
      tempoMedio = 15;
      const variacao = Math.floor(Math.random() * 11) - 5; // Variação de -5 a +5 minutos
      return tempoMedio + variacao;
    } else if (tipoSenha === 'SG') {
      // Senha Geral (SG): 5 minutos, com variação de + ou - 3 minutos
      tempoMedio = 5;
      const variacao = Math.floor(Math.random() * 7) - 3; // Variação de -3 a +3 minutos
      return tempoMedio + variacao;
    } else if (tipoSenha === 'SE') {
      // Senha para Retirada de Exames (SE): 1 minuto, mas pode variar até 5 minutos em 5% dos casos
      if (Math.random() < 0.95) {
        // 95% dos casos: tempo de atendimento será 1 minuto
        return 1;
      } else {
        // 5% dos casos: tempo de atendimento pode ser entre 1 e 5 minutos
        return Math.floor(Math.random() * 5) + 1;
      }
    }
    return 0; // Se o tipo de senha não for reconhecido, retorna 0
  }

  chamarSenha(guiche: string) {
    let tentativas = 0;
    let senhaChamanda = null;
  
    while (tentativas < 3 && !senhaChamanda) {
      const tipoAtual = this.prioridades[this.indicePrioridade];
  
      if (tipoAtual === 'SP' && this.senhasSP.length > 0) {
        senhaChamanda = this.senhasSP.shift();
      } else if (tipoAtual === 'SE' && this.senhasSE.length > 0) {
        senhaChamanda = this.senhasSE.shift();
      } else if (tipoAtual === 'SG' && this.senhasSG.length > 0) {
        senhaChamanda = this.senhasSG.shift();
      }
  
      this.indicePrioridade = (this.indicePrioridade + 1) % 3;
      tentativas++;
    }
  
    if (senhaChamanda) {
      senhaChamanda.guiche = guiche; // Atribui o guichê à senha chamada
      senhaChamanda.dataHoraChamado = new Date(); 
      alert(`A senha ${senhaChamanda.numero} foi chamada!`); // Exibe o tempo de atendimento no console
      this.ultimasSenhas.unshift(senhaChamanda);
      if (this.ultimasSenhas.length > 6) {
        this.ultimasSenhas.pop();
      }
    } else {
      alert('Nenhuma senha disponível para chamar.');
    }
  }

  getTotalSenhasEmitidas() {
    return {
      SP: this.sequenciaSP,
      SE: this.sequenciaSE,
      SG: this.sequenciaSG
    };
  }
  getTotalSenhasChamadas() {
    let chamadasSP = 0;
    let chamadasSE = 0;
    let chamadasSG = 0;
  
    this.ultimasSenhas.forEach(senha => {
      if (senha.numero.includes('SP')) chamadasSP++;
      else if (senha.numero.includes('SE')) chamadasSE++;
      else if (senha.numero.includes('SG')) chamadasSG++;
    });
  
    return {
      SP: chamadasSP,
      SE: chamadasSE,
      SG: chamadasSG
    };
  }
  getMediaTempoEstimado() {
    if (this.ultimasSenhas.length === 0) return 0;
  
    const totalTempo = this.ultimasSenhas.reduce((sum, senha) => sum + (senha.tempoEstimado || 0), 0);
    return (totalTempo / this.ultimasSenhas.length).toFixed(2);
  }
  getMediaTempoEstimadoSP() {
    const senhasSP = this.senhasSP.concat(this.ultimasSenhas.filter(senha => senha.tipo === 'SP'));
    
    if (senhasSP.length === 0) return 0;
    
    const totalTempoSP = senhasSP.reduce((sum, senha) => sum + (senha.tempoEstimado || 0), 0);
    return (totalTempoSP / senhasSP.length).toFixed(2);
  }
  
  // Média de tempo estimado para o tipo SE
  getMediaTempoEstimadoSE() {
    const senhasSE = this.senhasSE.concat(this.ultimasSenhas.filter(senha => senha.tipo === 'SE'));
    
    if (senhasSE.length === 0) return 0;
    
    const totalTempoSE = senhasSE.reduce((sum, senha) => sum + (senha.tempoEstimado || 0), 0);
    return (totalTempoSE / senhasSE.length).toFixed(2);
  }
  
  // Média de tempo estimado para o tipo SG
  getMediaTempoEstimadoSG() {
    const senhasSG = this.senhasSG.concat(this.ultimasSenhas.filter(senha => senha.tipo === 'SG'));
    
    if (senhasSG.length === 0) return 0;
    
    const totalTempoSG = senhasSG.reduce((sum, senha) => sum + (senha.tempoEstimado || 0), 0);
    return (totalTempoSG / senhasSG.length).toFixed(2);
  }
  getSenhasDetalhadas() {
    const todasSenhas = [...this.senhasSP, ...this.senhasSE, ...this.senhasSG, ...this.ultimasSenhas];
    return todasSenhas.map(senha => ({
      numero: senha.numero,
      tipo: senha.tipo,
      dataHoraEmissao: senha.dataHoraEmissao ? new Date(senha.dataHoraEmissao).toLocaleString() : '',
      dataHoraChamado: senha.dataHoraChamado ? new Date(senha.dataHoraChamado).toLocaleString() : '',
      guiche: senha.guiche || ''
    }));
  }
  getRelatorioDiario() {
    const hoje = new Date();
    const dataHoje = hoje.toISOString().slice(0, 10); // formato 'YYYY-MM-DD'

    const todasSenhas = [...this.senhasSP, ...this.senhasSE, ...this.senhasSG, ...this.ultimasSenhas];

    return todasSenhas.filter(senha => {
      const dataEmissao = new Date(senha.dataHoraEmissao).toISOString().slice(0, 10);
      return dataEmissao === dataHoje;
    });
  }
  getRelatorioMensal() {
    const hoje = new Date();
    const anoMesHoje = hoje.toISOString().slice(0, 7); // formato 'YYYY-MM'

    const todasSenhas = [...this.senhasSP, ...this.senhasSE, ...this.senhasSG, ...this.ultimasSenhas];

    return todasSenhas.filter(senha => {
      const anoMesEmissao = new Date(senha.dataHoraEmissao).toISOString().slice(0, 7);
      return anoMesEmissao === anoMesHoje;
    });
  }
}
