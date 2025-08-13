import { useState, useEffect, useCallback } from 'react';
import { 
  Transacao, 
  DadosFinanceiros, 
  SaldoPessoa, 
  Pessoa, 
  LocalStorageData,
  LOCAL_STORAGE_KEY,
  APP_VERSION 
} from '@/types/financial';

// Hook personalizado para gerenciar dados financeiros
export function useFinancialData() {
  const [dados, setDados] = useState<DadosFinanceiros>({
    transacoes: [],
    saldos: {
      mae: { pessoa: 'mae', saldo: 0, totalEntradas: 0, totalSaidas: 0 },
      irmao: { pessoa: 'irmao', saldo: 0, totalEntradas: 0, totalSaidas: 0 }
    }
  });
  
  const [loading, setLoading] = useState(true);

  // Função para calcular saldos baseado nas transações
  const calcularSaldos = useCallback((transacoes: Transacao[]) => {
    const saldos = {
      mae: { pessoa: 'mae' as Pessoa, saldo: 0, totalEntradas: 0, totalSaidas: 0 },
      irmao: { pessoa: 'irmao' as Pessoa, saldo: 0, totalEntradas: 0, totalSaidas: 0 }
    };

    transacoes.forEach(transacao => {
      const { pessoa, tipo, valor } = transacao;
      
      if (tipo === 'entrada') {
        saldos[pessoa].totalEntradas += valor;
        saldos[pessoa].saldo += valor;
      } else {
        saldos[pessoa].totalSaidas += valor;
        saldos[pessoa].saldo -= valor;
      }
    });

    return saldos;
  }, []);

  // Carregar dados do localStorage
  const carregarDados = useCallback(() => {
    try {
      setLoading(true);
      const dadosSalvos = localStorage.getItem(LOCAL_STORAGE_KEY);
      
      if (dadosSalvos) {
        const parsedData: LocalStorageData = JSON.parse(dadosSalvos);
        const transacoes = parsedData.transacoes || [];
        const saldos = calcularSaldos(transacoes);
        
        setDados({ transacoes, saldos });
      }
    } catch (error) {
      console.error('Erro ao carregar dados do localStorage:', error);
    } finally {
      setLoading(false);
    }
  }, [calcularSaldos]);

  // Salvar dados no localStorage
  const salvarDados = useCallback((novasTransacoes: Transacao[]) => {
    try {
      const dadosParaSalvar: LocalStorageData = {
        transacoes: novasTransacoes,
        versao: APP_VERSION
      };
      
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(dadosParaSalvar));
      
      const novosSaldos = calcularSaldos(novasTransacoes);
      setDados({ transacoes: novasTransacoes, saldos: novosSaldos });
    } catch (error) {
      console.error('Erro ao salvar dados no localStorage:', error);
    }
  }, [calcularSaldos]);

  // Adicionar nova transação
  const adicionarTransacao = useCallback((novaTransacao: Omit<Transacao, 'id' | 'createdAt'>) => {
    const transacao: Transacao = {
      ...novaTransacao,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString()
    };

    const novasTransacoes = [transacao, ...dados.transacoes];
    salvarDados(novasTransacoes);
  }, [dados.transacoes, salvarDados]);

  // Remover transação
  const removerTransacao = useCallback((id: string) => {
    const novasTransacoes = dados.transacoes.filter(t => t.id !== id);
    salvarDados(novasTransacoes);
  }, [dados.transacoes, salvarDados]);

  // Limpar todos os dados
  const limparDados = useCallback(() => {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    setDados({
      transacoes: [],
      saldos: {
        mae: { pessoa: 'mae', saldo: 0, totalEntradas: 0, totalSaidas: 0 },
        irmao: { pessoa: 'irmao', saldo: 0, totalEntradas: 0, totalSaidas: 0 }
      }
    });
  }, []);

  // Obter dados para gráficos
  const obterDadosGraficos = useCallback(() => {
    const dadosPorMes = new Map<string, { mae: { entradas: number; saidas: number }, irmao: { entradas: number; saidas: number } }>();

    dados.transacoes.forEach(transacao => {
      const mesAno = transacao.data.substring(0, 7); // YYYY-MM
      
      if (!dadosPorMes.has(mesAno)) {
        dadosPorMes.set(mesAno, {
          mae: { entradas: 0, saidas: 0 },
          irmao: { entradas: 0, saidas: 0 }
        });
      }

      const dadosMes = dadosPorMes.get(mesAno)!;
      
      if (transacao.tipo === 'entrada') {
        dadosMes[transacao.pessoa].entradas += transacao.valor;
      } else {
        dadosMes[transacao.pessoa].saidas += transacao.valor;
      }
    });

    // Converter para array ordenado
    return Array.from(dadosPorMes.entries())
      .map(([mesAno, dados]) => ({
        mes: mesAno,
        ...dados
      }))
      .sort((a, b) => a.mes.localeCompare(b.mes));
  }, [dados.transacoes]);

  // Carregar dados na inicialização
  useEffect(() => {
    carregarDados();
  }, [carregarDados]);

  return {
    dados,
    loading,
    adicionarTransacao,
    removerTransacao,
    limparDados,
    obterDadosGraficos,
    recarregarDados: carregarDados
  };
}
