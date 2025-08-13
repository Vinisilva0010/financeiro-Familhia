'use client';

import React, { useState, useMemo } from 'react';
import { Transacao, LABELS_PESSOA, LABELS_TIPO } from '@/types/financial';
import { 
  History, 
  Trash2, 
  ArrowUpCircle, 
  ArrowDownCircle, 
  Calendar,
  Filter,
  Search,
  Eye,
  EyeOff
} from 'lucide-react';

interface TabelaHistoricoProps {
  transacoes: Transacao[];
  onRemoverTransacao: (transacaoId: string) => void;
}

type FiltroTipo = 'todos' | 'entrada' | 'saida';
type FiltroPessoa = 'todos' | 'mae' | 'irmao';

export default function TabelaHistorico({ transacoes, onRemoverTransacao }: TabelaHistoricoProps) {
  const [filtroTipo, setFiltroTipo] = useState<FiltroTipo>('todos');
  const [filtroPessoa, setFiltroPessoa] = useState<FiltroPessoa>('todos');
  const [termoBusca, setTermoBusca] = useState('');
  const [mostrarFiltros, setMostrarFiltros] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  const formatarMoeda = (valor: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(valor);
  };

  const formatarData = (data: string) => {
    return new Date(data).toLocaleDateString('pt-BR');
  };

  // Filtrar e ordenar transações
  const transacoesFiltradas = useMemo(() => {
    const resultado = transacoes.filter(transacao => {
      // Filtro por tipo
      if (filtroTipo !== 'todos' && transacao.tipo !== filtroTipo) {
        return false;
      }
      
      // Filtro por pessoa
      if (filtroPessoa !== 'todos' && transacao.pessoa !== filtroPessoa) {
        return false;
      }
      
      // Busca por descrição
      if (termoBusca && !transacao.descricao.toLowerCase().includes(termoBusca.toLowerCase())) {
        return false;
      }
      
      return true;
    });

    // Ordenar por data mais recente
    return resultado.sort((a, b) => {
      return new Date(b.data).getTime() - new Date(a.data).getTime();
    });
  }, [transacoes, filtroTipo, filtroPessoa, termoBusca]);

  const handleRemover = (id: string) => {
    if (confirmDelete === id) {
      onRemoverTransacao(id);
      setConfirmDelete(null);
    } else {
      setConfirmDelete(id);
      // Auto-reset após 3 segundos
      setTimeout(() => setConfirmDelete(null), 3000);
    }
  };

  const limparFiltros = () => {
    setFiltroTipo('todos');
    setFiltroPessoa('todos');
    setTermoBusca('');
  };

  if (transacoes.length === 0) {
    return (
      <div className="card text-center py-12">
        <History className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Nenhuma transação registrada
        </h3>
        <p className="text-gray-500">
          Adicione sua primeira transação usando o formulário acima.
        </p>
      </div>
    );
  }

  return (
    <div className="card">
      {/* Cabeçalho */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <History className="w-6 h-6 text-primary-600" />
          <h2 className="text-xl font-semibold text-gray-900">
            Histórico de Transações
          </h2>
          <span className="bg-gray-100 text-gray-600 text-sm px-2 py-1 rounded-full">
            {transacoesFiltradas.length}
          </span>
        </div>
        
        <button
          onClick={() => setMostrarFiltros(!mostrarFiltros)}
          className="flex items-center space-x-2 text-primary-600 hover:text-primary-700 transition-colors"
        >
          <Filter className="w-5 h-5" />
          <span className="hidden sm:inline">Filtros</span>
          {mostrarFiltros ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
        </button>
      </div>

      {/* Filtros */}
      {mostrarFiltros && (
        <div className="bg-gray-50 rounded-lg p-4 mb-6 space-y-4">
          {/* Busca */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Buscar por descrição
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={termoBusca}
                onChange={(e) => setTermoBusca(e.target.value)}
                placeholder="Digite para buscar..."
                className="pl-10 input-field"
              />
            </div>
          </div>

          {/* Filtros em linha */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Filtro Tipo */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tipo
              </label>
              <select
                value={filtroTipo}
                onChange={(e) => setFiltroTipo(e.target.value as FiltroTipo)}
                className="input-field"
              >
                <option value="todos">Todos</option>
                <option value="entrada">Entrada</option>
                <option value="saida">Saída</option>
              </select>
            </div>

            {/* Filtro Pessoa */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Pessoa
              </label>
              <select
                value={filtroPessoa}
                onChange={(e) => setFiltroPessoa(e.target.value as FiltroPessoa)}
                className="input-field"
              >
                <option value="todos">Todos</option>
                <option value="mae">Mãe</option>
                <option value="irmao">Irmão</option>
              </select>
            </div>
          </div>

          {/* Botão limpar filtros */}
          <div className="flex justify-end">
            <button
              onClick={limparFiltros}
              className="text-sm text-gray-600 hover:text-gray-800 transition-colors"
            >
              Limpar filtros
            </button>
          </div>
        </div>
      )}

      {/* Tabela - Desktop */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 font-medium text-gray-700">Data</th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">Tipo</th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">Valor</th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">Pessoa</th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">Descrição</th>
              <th className="text-center py-3 px-4 font-medium text-gray-700">Ações</th>
            </tr>
          </thead>
          <tbody>
            {transacoesFiltradas.map((transacao) => (
              <tr key={transacao.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                <td className="py-3 px-4">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span className="text-sm">{formatarData(transacao.data)}</span>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center space-x-2">
                    {transacao.tipo === 'entrada' ? (
                      <ArrowUpCircle className="w-5 h-5 text-green-600" />
                    ) : (
                      <ArrowDownCircle className="w-5 h-5 text-red-600" />
                    )}
                    <span className={`text-sm font-medium ${
                      transacao.tipo === 'entrada' ? 'text-green-700' : 'text-red-700'
                    }`}>
                      {LABELS_TIPO[transacao.tipo]}
                    </span>
                  </div>
                </td>
                <td className={`py-3 px-4 font-semibold ${
                  transacao.tipo === 'entrada' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {formatarMoeda(transacao.valor)}
                </td>
                <td className="py-3 px-4">
                  <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs font-medium">
                    {LABELS_PESSOA[transacao.pessoa]}
                  </span>
                </td>
                <td className="py-3 px-4 max-w-xs">
                  <p className="text-sm text-gray-900 truncate" title={transacao.descricao}>
                    {transacao.descricao}
                  </p>
                </td>
                <td className="py-3 px-4 text-center">
                  <button
                    onClick={() => handleRemover(transacao.id)}
                    className={`p-2 rounded-lg transition-colors ${
                      confirmDelete === transacao.id
                        ? 'bg-red-100 text-red-700 hover:bg-red-200'
                        : 'text-gray-400 hover:text-red-600 hover:bg-red-50'
                    }`}
                    title={confirmDelete === transacao.id ? 'Confirmar exclusão' : 'Excluir transação'}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Cards - Mobile */}
      <div className="md:hidden space-y-4">
        {transacoesFiltradas.map((transacao) => (
          <div key={transacao.id} className="border border-gray-200 rounded-lg p-4 bg-white">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                {transacao.tipo === 'entrada' ? (
                  <ArrowUpCircle className="w-5 h-5 text-green-600" />
                ) : (
                  <ArrowDownCircle className="w-5 h-5 text-red-600" />
                )}
                <span className={`font-medium ${
                  transacao.tipo === 'entrada' ? 'text-green-700' : 'text-red-700'
                }`}>
                  {LABELS_TIPO[transacao.tipo]}
                </span>
              </div>
              <span className={`font-bold text-lg ${
                transacao.tipo === 'entrada' ? 'text-green-600' : 'text-red-600'
              }`}>
                {formatarMoeda(transacao.valor)}
              </span>
            </div>
            
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Data:</span>
                <span>{formatarData(transacao.data)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Pessoa:</span>
                <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs font-medium">
                  {LABELS_PESSOA[transacao.pessoa]}
                </span>
              </div>
              <div>
                <span className="text-gray-500">Descrição:</span>
                <p className="mt-1 text-gray-900">{transacao.descricao}</p>
              </div>
            </div>
            
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => handleRemover(transacao.id)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                  confirmDelete === transacao.id
                    ? 'bg-red-100 text-red-700 hover:bg-red-200'
                    : 'text-gray-400 hover:text-red-600 hover:bg-red-50'
                }`}
              >
                <Trash2 className="w-4 h-4" />
                <span className="text-sm">
                  {confirmDelete === transacao.id ? 'Confirmar' : 'Excluir'}
                </span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Mensagem quando não há resultados filtrados */}
      {transacoesFiltradas.length === 0 && transacoes.length > 0 && (
        <div className="text-center py-8">
          <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Nenhuma transação encontrada
          </h3>
          <p className="text-gray-500 mb-4">
            Tente ajustar os filtros ou o termo de busca.
          </p>
          <button
            onClick={limparFiltros}
            className="btn-secondary"
          >
            Limpar filtros
          </button>
        </div>
      )}
    </div>
  );
}
