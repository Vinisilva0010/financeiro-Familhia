// Tipos para o sistema de controle financeiro familiar

export type TipoTransacao = 'entrada' | 'saida';

export type Pessoa = 'mae' | 'irmao';

export interface Transacao {
  id: string;
  data: string; // formato ISO (YYYY-MM-DD)
  tipo: TipoTransacao;
  valor: number;
  pessoa: Pessoa;
  descricao: string;
  createdAt: string; // timestamp ISO
}

export interface SaldoPessoa {
  pessoa: Pessoa;
  saldo: number;
  totalEntradas: number;
  totalSaidas: number;
}

export interface DadosFinanceiros {
  transacoes: Transacao[];
  saldos: {
    mae: SaldoPessoa;
    irmao: SaldoPessoa;
  };
}

export interface DadosGrafico {
  mes: string;
  entradas: number;
  saidas: number;
  pessoa: Pessoa;
}

// Tipos para localStorage
export interface LocalStorageData {
  transacoes: Transacao[];
  versao: string;
}

// Labels para exibição
export const LABELS_PESSOA: Record<Pessoa, string> = {
  mae: 'Mãe',
  irmao: 'Irmão'
};

export const LABELS_TIPO: Record<TipoTransacao, string> = {
  entrada: 'Entrada',
  saida: 'Saída'
};

// Constantes
export const LOCAL_STORAGE_KEY = 'controle-financeiro-familiar';
export const APP_VERSION = '1.0.0';
