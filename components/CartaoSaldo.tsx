'use client';

import React from 'react';
import { SaldoPessoa, LABELS_PESSOA } from '@/types/financial';
import { TrendingUp, TrendingDown, Wallet } from 'lucide-react';

interface CartaoSaldoProps {
  saldo: SaldoPessoa;
  className?: string;
}

export default function CartaoSaldo({ saldo, className = '' }: CartaoSaldoProps) {
  const formatarMoeda = (valor: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(valor);
  };

  const getSaldoColor = (valor: number) => {
    if (valor > 0) return 'text-green-600';
    if (valor < 0) return 'text-red-600';
    return 'text-gray-600';
  };

  const getSaldoBgColor = (valor: number) => {
    if (valor > 0) return 'bg-green-50 border-green-200';
    if (valor < 0) return 'bg-red-50 border-red-200';
    return 'bg-gray-50 border-gray-200';
  };

  const getPersonIcon = (pessoa: string) => {
    return pessoa === 'mae' ? '👩' : '👨';
  };

  return (
    <div className={`card hover:shadow-md transition-shadow duration-200 ${className}`}>
      {/* Header do Cartão */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
            <span className="text-xl">{getPersonIcon(saldo.pessoa)}</span>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              {LABELS_PESSOA[saldo.pessoa]}
            </h3>
            <p className="text-sm text-gray-500">Saldo Atual</p>
          </div>
        </div>
        <Wallet className="w-6 h-6 text-gray-400" />
      </div>

      {/* Saldo Principal */}
      <div className={`rounded-lg p-4 mb-4 border-2 ${getSaldoBgColor(saldo.saldo)}`}>
        <div className="text-center">
          <p className="text-sm font-medium text-gray-600 mb-1">Saldo Total</p>
          <p className={`text-2xl font-bold ${getSaldoColor(saldo.saldo)}`}>
            {formatarMoeda(saldo.saldo)}
          </p>
        </div>
      </div>

      {/* Detalhes de Entradas e Saídas */}
      <div className="space-y-3">
        {/* Entradas */}
        <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
          <div className="flex items-center space-x-2">
            <TrendingUp className="w-5 h-5 text-green-600" />
            <span className="font-medium text-green-800">Entradas</span>
          </div>
          <span className="font-semibold text-green-700">
            {formatarMoeda(saldo.totalEntradas)}
          </span>
        </div>

        {/* Saídas */}
        <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-200">
          <div className="flex items-center space-x-2">
            <TrendingDown className="w-5 h-5 text-red-600" />
            <span className="font-medium text-red-800">Saídas</span>
          </div>
          <span className="font-semibold text-red-700">
            {formatarMoeda(saldo.totalSaidas)}
          </span>
        </div>
      </div>

      {/* Status Badge */}
      <div className="mt-4 flex justify-center">
        <span
          className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
            saldo.saldo > 0
              ? 'bg-green-100 text-green-800'
              : saldo.saldo < 0
              ? 'bg-red-100 text-red-800'
              : 'bg-gray-100 text-gray-800'
          }`}
        >
          {saldo.saldo > 0 ? '💰 Positivo' : saldo.saldo < 0 ? '⚠️ Negativo' : '⚖️ Zerado'}
        </span>
      </div>
    </div>
  );
}

// Componente para exibir os dois cartões lado a lado
interface CartoesSaldoProps {
  saldos: {
    mae: SaldoPessoa;
    irmao: SaldoPessoa;
  };
}

export function CartoesSaldo({ saldos }: CartoesSaldoProps) {
  const saldoTotal = saldos.mae.saldo + saldos.irmao.saldo;
  const totalEntradas = saldos.mae.totalEntradas + saldos.irmao.totalEntradas;
  const totalSaidas = saldos.mae.totalSaidas + saldos.irmao.totalSaidas;

  const formatarMoeda = (valor: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(valor);
  };

  return (
    <div className="space-y-6">
      {/* Resumo Geral */}
      <div className="card bg-gradient-to-r from-primary-500 to-primary-600 text-white">
        <div className="text-center">
          <h3 className="text-lg font-semibold mb-2">Resumo Familiar</h3>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <p className="text-sm opacity-90 mb-1">Saldo Total</p>
              <p className="text-xl font-bold">{formatarMoeda(saldoTotal)}</p>
            </div>
            <div>
              <p className="text-sm opacity-90 mb-1">Total Entradas</p>
              <p className="text-lg font-semibold">{formatarMoeda(totalEntradas)}</p>
            </div>
            <div>
              <p className="text-sm opacity-90 mb-1">Total Saídas</p>
              <p className="text-lg font-semibold">{formatarMoeda(totalSaidas)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Cartões Individuais */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <CartaoSaldo saldo={saldos.mae} className="slide-up" />
        <CartaoSaldo saldo={saldos.irmao} className="slide-up" />
      </div>
    </div>
  );
}
