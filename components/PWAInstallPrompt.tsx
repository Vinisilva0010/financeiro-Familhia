'use client';

import React, { useState, useEffect } from 'react';
import { Download, X, Smartphone } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

export default function PWAInstallPrompt() {
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    // Detectar iOS
    const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    setIsIOS(iOS);

    // Detectar se já está instalado como PWA
    const standalone = window.matchMedia('(display-mode: standalone)').matches;
    setIsStandalone(standalone);

    // Listener para o evento beforeinstallprompt
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setInstallPrompt(e as BeforeInstallPromptEvent);
      
      // Verificar se o usuário já viu o prompt hoje
      const lastPromptDate = localStorage.getItem('pwa-install-prompt-date');
      const today = new Date().toDateString();
      
      if (lastPromptDate !== today) {
        setShowPrompt(true);
      }
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Para iOS, mostrar instruções se não estiver em standalone
    if (iOS && !standalone) {
      const lastIOSPromptDate = localStorage.getItem('pwa-ios-prompt-date');
      const today = new Date().toDateString();
      
      if (lastIOSPromptDate !== today) {
        setTimeout(() => setShowPrompt(true), 3000); // Mostrar após 3 segundos
      }
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstall = async () => {
    if (!installPrompt) return;

    installPrompt.prompt();
    const { outcome } = await installPrompt.userChoice;
    
    if (outcome === 'accepted') {
      console.log('PWA instalado com sucesso');
    }
    
    setInstallPrompt(null);
    setShowPrompt(false);
    
    // Salvar data para não mostrar novamente hoje
    localStorage.setItem('pwa-install-prompt-date', new Date().toDateString());
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    // Salvar data para não mostrar novamente hoje
    if (isIOS) {
      localStorage.setItem('pwa-ios-prompt-date', new Date().toDateString());
    } else {
      localStorage.setItem('pwa-install-prompt-date', new Date().toDateString());
    }
  };

  // Não mostrar se já está instalado
  if (isStandalone) return null;

  // Não mostrar se o prompt foi dismissado
  if (!showPrompt) return null;

  return (
    <div className="pwa-prompt">
      <div className="bg-white rounded-lg shadow-xl border border-gray-200 p-4 slide-up">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
              <Smartphone className="w-5 h-5 text-primary-600" />
            </div>
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              Instalar Aplicativo
            </h3>
            
            {isIOS ? (
              <div className="space-y-2">
                <p className="text-sm text-gray-600">
                  Para uma melhor experiência, adicione este app à sua tela inicial:
                </p>
                <ol className="text-sm text-gray-600 space-y-1 list-decimal list-inside">
                  <li>Toque no botão de compartilhar <span className="inline-block w-4 h-4 bg-blue-500 rounded text-white text-center text-xs leading-4">↗</span></li>
                  <li>Role para baixo e toque em "Adicionar à Tela de Início"</li>
                  <li>Toque em "Adicionar" no canto superior direito</li>
                </ol>
              </div>
            ) : (
              <p className="text-sm text-gray-600 mb-3">
                Instale o app para ter acesso rápido e funcionar offline.
              </p>
            )}
          </div>
          
          <button
            onClick={handleDismiss}
            className="flex-shrink-0 p-1 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        {!isIOS && installPrompt && (
          <div className="mt-4 flex space-x-3">
            <button
              onClick={handleInstall}
              className="flex-1 bg-primary-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors flex items-center justify-center space-x-2"
            >
              <Download className="w-4 h-4" />
              <span>Instalar</span>
            </button>
            <button
              onClick={handleDismiss}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              Agora não
            </button>
          </div>
        )}
        
        {isIOS && (
          <div className="mt-4 flex justify-end">
            <button
              onClick={handleDismiss}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors text-sm"
            >
              Entendi
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
