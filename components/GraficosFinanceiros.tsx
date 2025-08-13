'use client';

import React, { useMemo, useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { Transacao } from '@/types/financial';
import { BarChart3, TrendingUp, PieChart as PieChartIcon, Calendar } from 'lucide-react';

interface GraficosFinanceirosProps {
  transacoes: Transacao[];
}

type TipoGrafico = 'barras' | 'linha' | 'pizza';

export default function GraficosFinanceiros({ transacoes }: GraficosFinanceirosProps) {
  const [tipoGrafico, setTipoGrafico] = useState<TipoGrafico>('barras');

  // Processar dados para gráficos
  const dadosProcessados = useMemo(() => {
    if (transacoes.length === 0) return [];

    // Agrupar por mês
    const dadosPorMes = new Map<string, {
      mes: string;
      mesFormatado: string;
      maeEntradas: number;
      maeSaidas: number;
      irmaoEntradas: number;
      irmaoSaidas: number;
    }>();

    transacoes.forEach(transacao => {
      const mesAno = transacao.data.substring(0, 7); // YYYY-MM
      const [ano, mes] = mesAno.split('-');
      const mesFormatado = `${mes}/${ano}`;

      if (!dadosPorMes.has(mesAno)) {
        dadosPorMes.set(mesAno, {
          mes: mesAno,
          mesFormatado,
          maeEntradas: 0,
          maeSaidas: 0,
          irmaoEntradas: 0,
          irmaoSaidas: 0,
        });
      }

      const dadosMes = dadosPorMes.get(mesAno)!;
      
      if (transacao.pessoa === 'mae') {
        if (transacao.tipo === 'entrada') {
          dadosMes.maeEntradas += transacao.valor;
        } else {
          dadosMes.maeSaidas += transacao.valor;
        }
      } else {
        if (transacao.tipo === 'entrada') {
          dadosMes.irmaoEntradas += transacao.valor;
        } else {
          dadosMes.irmaoSaidas += transacao.valor;
        }
      }
    });

    return Array.from(dadosPorMes.values())
      .sort((a, b) => a.mes.localeCompare(b.mes));
  }, [transacoes]);

  // Dados para gráfico de pizza
  const dadosPizza = useMemo(() => {
    const totalMae = transacoes
      .filter(t => t.pessoa === 'mae')
      .reduce((acc, t) => acc + (t.tipo === 'entrada' ? t.valor : -t.valor), 0);
    
    const totalIrmao = transacoes
      .filter(t => t.pessoa === 'irmao')
      .reduce((acc, t) => acc + (t.tipo === 'entrada' ? t.valor : -t.valor), 0);

    return [
      { name: 'Mãe', value: Math.abs(totalMae), fill: '#3B82F6' },
      { name: 'Irmão', value: Math.abs(totalIrmao), fill: '#EF4444' },
    ].filter(item => item.value > 0);
  }, [transacoes]);

  const formatarMoeda = (valor: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(valor);
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-semibold text-gray-900 mb-2">{`Mês: ${label}`}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }} className="text-sm">
              {`${entry.dataKey}: ${formatarMoeda(entry.value)}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  if (transacoes.length === 0) {
    return (
      <div className="card text-center py-12">
        <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Gráficos Financeiros
        </h3>
        <p className="text-gray-500">
          Adicione transações para visualizar os gráficos.
        </p>
      </div>
    );
  }

  return (
    <div className="card">
      {/* Cabeçalho */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <BarChart3 className="w-6 h-6 text-primary-600" />
          <h2 className="text-xl font-semibold text-gray-900">
            Gráficos Financeiros
          </h2>
        </div>
        
        {/* Seletor de tipo de gráfico */}
        <div className="flex bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setTipoGrafico('barras')}
            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              tipoGrafico === 'barras'
                ? 'bg-white text-primary-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <BarChart3 className="w-4 h-4 mx-auto" />
          </button>
          <button
            onClick={() => setTipoGrafico('linha')}
            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              tipoGrafico === 'linha'
                ? 'bg-white text-primary-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <TrendingUp className="w-4 h-4 mx-auto" />
          </button>
          <button
            onClick={() => setTipoGrafico('pizza')}
            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              tipoGrafico === 'pizza'
                ? 'bg-white text-primary-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <PieChartIcon className="w-4 h-4 mx-auto" />
          </button>
        </div>
      </div>

      {/* Gráfico de Barras */}
      {tipoGrafico === 'barras' && (
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
              <Calendar className="w-5 h-5" />
              <span>Entradas e Saídas por Mês</span>
            </h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dadosProcessados} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis 
                    dataKey="mesFormatado" 
                    tick={{ fontSize: 12 }}
                    stroke="#666"
                  />
                  <YAxis 
                    tick={{ fontSize: 12 }}
                    stroke="#666"
                    tickFormatter={(value) => `R$ ${value.toLocaleString()}`}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Bar 
                    dataKey="maeEntradas" 
                    name="Mãe - Entradas" 
                    fill="#10B981" 
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar 
                    dataKey="maeSaidas" 
                    name="Mãe - Saídas" 
                    fill="#EF4444" 
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar 
                    dataKey="irmaoEntradas" 
                    name="Irmão - Entradas" 
                    fill="#3B82F6" 
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar 
                    dataKey="irmaoSaidas" 
                    name="Irmão - Saídas" 
                    fill="#F59E0B" 
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {/* Gráfico de Linha */}
      {tipoGrafico === 'linha' && (
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
              <TrendingUp className="w-5 h-5" />
              <span>Evolução do Saldo por Mês</span>
            </h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={dadosProcessados} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis 
                    dataKey="mesFormatado" 
                    tick={{ fontSize: 12 }}
                    stroke="#666"
                  />
                  <YAxis 
                    tick={{ fontSize: 12 }}
                    stroke="#666"
                    tickFormatter={(value) => `R$ ${value.toLocaleString()}`}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="maeEntradas" 
                    stroke="#10B981" 
                    strokeWidth={3}
                    name="Mãe - Entradas"
                    dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="irmaoEntradas" 
                    stroke="#3B82F6" 
                    strokeWidth={3}
                    name="Irmão - Entradas"
                    dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {/* Gráfico de Pizza */}
      {tipoGrafico === 'pizza' && (
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
              <PieChartIcon className="w-5 h-5" />
              <span>Distribuição do Saldo Total</span>
            </h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={dadosPizza}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(1)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {dadosPizza.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => formatarMoeda(Number(value))} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {/* Resumo dos dados */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {dadosProcessados.slice(-1).map((ultimoMes) => (
          <React.Fragment key={ultimoMes.mes}>
            <div className="bg-green-50 rounded-lg p-4 border border-green-200">
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm font-medium text-green-800">Mãe - Entradas</span>
              </div>
              <p className="text-lg font-bold text-green-600">
                {formatarMoeda(ultimoMes.maeEntradas)}
              </p>
              <p className="text-xs text-green-600">{ultimoMes.mesFormatado}</p>
            </div>

            <div className="bg-red-50 rounded-lg p-4 border border-red-200">
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span className="text-sm font-medium text-red-800">Mãe - Saídas</span>
              </div>
              <p className="text-lg font-bold text-red-600">
                {formatarMoeda(ultimoMes.maeSaidas)}
              </p>
              <p className="text-xs text-red-600">{ultimoMes.mesFormatado}</p>
            </div>

            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-sm font-medium text-blue-800">Irmão - Entradas</span>
              </div>
              <p className="text-lg font-bold text-blue-600">
                {formatarMoeda(ultimoMes.irmaoEntradas)}
              </p>
              <p className="text-xs text-blue-600">{ultimoMes.mesFormatado}</p>
            </div>

            <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <span className="text-sm font-medium text-yellow-800">Irmão - Saídas</span>
              </div>
              <p className="text-lg font-bold text-yellow-600">
                {formatarMoeda(ultimoMes.irmaoSaidas)}
              </p>
              <p className="text-xs text-yellow-600">{ultimoMes.mesFormatado}</p>
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
