'use client';

import React, { useState } from 'react';
import { TipoTransacao, Pessoa, LABELS_PESSOA, LABELS_TIPO } from '@/types/financial';
import { PlusCircle } from 'lucide-react';

interface FormularioTransacaoProps {
  onAdicionarTransacao: (novaTransacao: {
    data: string;
    tipo: TipoTransacao;
    valor: number;
    pessoa: Pessoa;
    descricao: string;
  }) => void;
}

export default function FormularioTransacao({ onAdicionarTransacao }: FormularioTransacaoProps) {
  const [formData, setFormData] = useState({
    data: new Date().toISOString().split('T')[0], // Data atual no formato YYYY-MM-DD
    tipo: 'entrada' as TipoTransacao,
    valor: '',
    pessoa: 'mae' as Pessoa,
    descricao: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isSubmitting) return;
    
    // Validação simples
    if (!formData.data || !formData.valor || !formData.descricao.trim()) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    const valor = parseFloat(formData.valor);
    if (isNaN(valor) || valor <= 0) {
      alert('Por favor, insira um valor válido maior que zero.');
      return;
    }

    setIsSubmitting(true);

    try {
      onAdicionarTransacao({
        data: formData.data,
        tipo: formData.tipo,
        valor,
        pessoa: formData.pessoa,
        descricao: formData.descricao.trim()
      });

      // Limpar formulário após sucesso
      setFormData({
        data: new Date().toISOString().split('T')[0],
        tipo: 'entrada',
        valor: '',
        pessoa: 'mae',
        descricao: ''
      });

      // Feedback visual de sucesso
      const button = document.getElementById('submit-button');
      if (button) {
        button.style.backgroundColor = '#10b981';
        button.textContent = 'Adicionado!';
        setTimeout(() => {
          button.style.backgroundColor = '';
          button.textContent = 'Adicionar Transação';
        }, 1500);
      }
    } catch (error) {
      console.error('Erro ao adicionar transação:', error);
      alert('Erro ao adicionar transação. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="card fade-in">
      <div className="flex items-center space-x-3 mb-6">
        <PlusCircle className="w-6 h-6 text-primary-600" />
        <h2 className="text-xl font-semibold text-gray-900">
          Nova Transação
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Data */}
        <div>
          <label htmlFor="data" className="block text-sm font-medium text-gray-700 mb-2">
            Data *
          </label>
          <input
            type="date"
            id="data"
            name="data"
            value={formData.data}
            onChange={handleInputChange}
            max={new Date().toISOString().split('T')[0]}
            className="input-field"
            required
          />
        </div>

        {/* Tipo de Transação - Toggle */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Tipo de Transação *
          </label>
          <div className="flex bg-gray-100 rounded-lg p-1">
            {(['entrada', 'saida'] as TipoTransacao[]).map((tipo) => (
              <button
                key={tipo}
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, tipo }))}
                className={`flex-1 py-3 px-4 rounded-md font-medium transition-all duration-200 touch-target ${
                  formData.tipo === tipo
                    ? tipo === 'entrada'
                      ? 'bg-green-600 text-white shadow-sm'
                      : 'bg-red-600 text-white shadow-sm'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                {LABELS_TIPO[tipo]}
              </button>
            ))}
          </div>
        </div>

        {/* Valor */}
        <div>
          <label htmlFor="valor" className="block text-sm font-medium text-gray-700 mb-2">
            Valor (R$) *
          </label>
          <input
            type="number"
            id="valor"
            name="valor"
            value={formData.valor}
            onChange={handleInputChange}
            placeholder="0,00"
            step="0.01"
            min="0"
            className="input-field"
            required
          />
        </div>

        {/* Pessoa - Radio Buttons */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Pessoa *
          </label>
          <div className="space-y-3">
            {(['mae', 'irmao'] as Pessoa[]).map((pessoa) => (
              <label
                key={pessoa}
                className="flex items-center space-x-3 cursor-pointer p-3 rounded-lg border border-gray-200 hover:border-primary-300 transition-colors touch-target"
              >
                <input
                  type="radio"
                  name="pessoa"
                  value={pessoa}
                  checked={formData.pessoa === pessoa}
                  onChange={handleInputChange}
                  className="w-5 h-5 text-primary-600 focus:ring-primary-500"
                />
                <span className="text-base font-medium text-gray-900">
                  {LABELS_PESSOA[pessoa]}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Descrição */}
        <div>
          <label htmlFor="descricao" className="block text-sm font-medium text-gray-700 mb-2">
            Descrição *
          </label>
          <textarea
            id="descricao"
            name="descricao"
            value={formData.descricao}
            onChange={handleInputChange}
            placeholder="Ex: Salário, mercado, conta de luz..."
            rows={3}
            className="input-field resize-none"
            required
          />
        </div>

        {/* Botão de Submit */}
        <button
          type="submit"
          id="submit-button"
          disabled={isSubmitting}
          className={`w-full btn-primary flex items-center justify-center space-x-2 ${
            isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {isSubmitting ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Adicionando...</span>
            </>
          ) : (
            <>
              <PlusCircle className="w-5 h-5" />
              <span>Adicionar Transação</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}
