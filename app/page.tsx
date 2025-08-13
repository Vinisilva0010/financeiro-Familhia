'use client';

import React, { Suspense } from 'react';
import { useFinancialData } from '@/hooks/useFinancialData';
import FormularioTransacao from '@/components/FormularioTransacao';
import { CartoesSaldo } from '@/components/CartaoSaldo';
import TabelaHistorico from '@/components/TabelaHistorico';
import GraficosFinanceiros from '@/components/GraficosFinanceiros';
import PWAInstallPrompt from '@/components/PWAInstallPrompt';
import { RefreshCw, Download, Trash2, AlertCircle } from 'lucide-react';

// Componente de Loading
function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="flex items-center space-x-3">
        <RefreshCw className="w-6 h-6 text-primary-600 animate-spin" />
        <span className="text-gray-600 font-medium">Carregando dados...</span>
      </div>
    </div>
  );
}

// Componente de Error Boundary (para uso futuro)
// function ErrorFallback({ error, resetError }: { error: Error; resetError: () => void }) {
//   return (
//     <div className="card text-center py-12">
//       <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
//       <h2 className="text-xl font-semibold text-gray-900 mb-2">
//         Ops! Algo deu errado
//       </h2>
//       <p className="text-gray-600 mb-4">
//         Ocorreu um erro ao carregar os dados financeiros.
//       </p>
//       <details className="text-left mb-4">
//         <summary className="cursor-pointer text-sm text-gray-500 hover:text-gray-700">
//           Detalhes técnicos
//         </summary>
//         <pre className="mt-2 text-xs text-red-600 bg-red-50 p-2 rounded overflow-auto">
//           {error.message}
//         </pre>
//       </details>
//       <button onClick={resetError} className="btn-primary">
//         <RefreshCw className="w-4 h-4 mr-2" />
//         Tentar Novamente
//       </button>
//     </div>
//   );
// }

// Componente principal da página
export default function HomePage() {
  const {
    dados,
    loading,
    adicionarTransacao,
    removerTransacao,
    limparDados,
    recarregarDados,
  } = useFinancialData();

  // Função para exportar dados
  const exportarDados = () => {
    try {
      const dadosExport = {
        transacoes: dados.transacoes,
        saldos: dados.saldos,
        exportadoEm: new Date().toISOString(),
        versao: '1.0.0'
      };

      const dataStr = JSON.stringify(dadosExport, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = `controle-financeiro-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Erro ao exportar dados:', error);
      alert('Erro ao exportar dados. Tente novamente.');
    }
  };

  // Função para limpar todos os dados com confirmação
  const handleLimparDados = () => {
    const confirmacao = confirm(
      'ATENÇÃO: Esta ação irá apagar TODOS os dados financeiros e não pode ser desfeita. ' +
      'Tem certeza que deseja continuar?'
    );
    
    if (confirmacao) {
      const segundaConfirmacao = confirm(
        'Esta é sua última chance! Todos os dados serão perdidos permanentemente. ' +
        'Clique em OK apenas se tiver certeza absoluta.'
      );
      
      if (segundaConfirmacao) {
        limparDados();
        alert('Todos os dados foram apagados com sucesso.');
      }
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6 space-y-8">
      {/* Prompt de instalação PWA */}
      <PWAInstallPrompt />
      
      {/* Formulário de Nova Transação */}
      <section>
        <FormularioTransacao onAdicionarTransacao={adicionarTransacao} />
      </section>

      {/* Cartões de Saldo */}
      <section>
        <Suspense fallback={<LoadingSpinner />}>
          <CartoesSaldo saldos={dados.saldos} />
        </Suspense>
      </section>

      {/* Gráficos Financeiros */}
      <section>
        <Suspense fallback={<LoadingSpinner />}>
          <GraficosFinanceiros transacoes={dados.transacoes} />
        </Suspense>
      </section>

      {/* Tabela de Histórico */}
      <section>
        <Suspense fallback={<LoadingSpinner />}>
          <TabelaHistorico
            transacoes={dados.transacoes}
            onRemoverTransacao={removerTransacao}
          />
        </Suspense>
      </section>

      {/* Controles de Dados */}
      <section className="card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">
            Gerenciar Dados
          </h2>
          <span className="text-sm text-gray-500">
            {dados.transacoes.length} transações registradas
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Recarregar Dados */}
          <button
            onClick={recarregarDados}
            className="flex items-center justify-center space-x-2 btn-secondary"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Recarregar</span>
          </button>

          {/* Exportar Dados */}
          <button
            onClick={exportarDados}
            disabled={dados.transacoes.length === 0}
            className={`flex items-center justify-center space-x-2 btn-secondary ${
              dados.transacoes.length === 0 ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            <Download className="w-4 h-4" />
            <span>Exportar JSON</span>
          </button>

          {/* Limpar Dados */}
          <button
            onClick={handleLimparDados}
            disabled={dados.transacoes.length === 0}
            className={`flex items-center justify-center space-x-2 bg-red-100 hover:bg-red-200 text-red-700 font-medium py-3 px-6 rounded-lg transition-colors duration-200 touch-target ${
              dados.transacoes.length === 0 ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            <Trash2 className="w-4 h-4" />
            <span>Limpar Tudo</span>
          </button>
        </div>

        {/* Informações sobre armazenamento */}
        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-start space-x-3">
            <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
            <div className="text-sm text-blue-800">
              <p className="font-medium mb-1">ℹ️ Sobre os seus dados:</p>
              <ul className="space-y-1 text-blue-700">
                <li>• Todos os dados são salvos localmente no seu dispositivo</li>
                <li>• Nenhuma informação é enviada para servidores externos</li>
                <li>• Os dados permanecem disponíveis mesmo sem internet</li>
                <li>• Faça backup regular exportando os dados</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Estatísticas Rápidas */}
      {dados.transacoes.length > 0 && (
        <section className="card bg-gradient-to-r from-gray-50 to-gray-100">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            📊 Estatísticas Rápidas
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-primary-600">
                {dados.transacoes.length}
              </p>
              <p className="text-sm text-gray-600">Transações</p>
            </div>
            
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">
                {dados.transacoes.filter(t => t.tipo === 'entrada').length}
              </p>
              <p className="text-sm text-gray-600">Entradas</p>
            </div>
            
            <div className="text-center">
              <p className="text-2xl font-bold text-red-600">
                {dados.transacoes.filter(t => t.tipo === 'saida').length}
              </p>
              <p className="text-sm text-gray-600">Saídas</p>
            </div>
            
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-600">
                {new Set(dados.transacoes.map(t => t.data.substring(0, 7))).size}
              </p>
              <p className="text-sm text-gray-600">Meses</p>
            </div>
          </div>
        </section>
      )}

      {/* Dicas de Uso (apenas quando não há transações) */}
      {dados.transacoes.length === 0 && (
        <section className="card bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200">
          <h2 className="text-lg font-semibold text-blue-900 mb-4 flex items-center space-x-2">
            <span>💡</span>
            <span>Dicas para começar</span>
          </h2>
          
          <div className="space-y-3 text-blue-800">
            <div className="flex items-start space-x-3">
              <span className="text-blue-600 font-bold">1.</span>
              <p>Comece adicionando uma transação usando o formulário acima</p>
            </div>
            <div className="flex items-start space-x-3">
              <span className="text-blue-600 font-bold">2.</span>
              <p>Use "Entrada" para dinheiro que entra (salário, venda, etc.)</p>
            </div>
            <div className="flex items-start space-x-3">
              <span className="text-blue-600 font-bold">3.</span>
              <p>Use "Saída" para gastos (compras, contas, etc.)</p>
            </div>
            <div className="flex items-start space-x-3">
              <span className="text-blue-600 font-bold">4.</span>
              <p>Os saldos e gráficos são atualizados automaticamente</p>
            </div>
            <div className="flex items-start space-x-3">
              <span className="text-blue-600 font-bold">5.</span>
              <p>Instale o app na tela inicial para acesso rápido</p>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
