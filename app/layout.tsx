import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Controle Financeiro Familiar',
  description: 'Aplicativo PWA para controle financeiro familiar offline',
  generator: 'Next.js',
  manifest: '/manifest.json',
  keywords: ['controle financeiro', 'família', 'PWA', 'offline'],
  authors: [{ name: 'Controle Financeiro App' }],
  icons: {
    icon: '/icon-192x192.png',
    shortcut: '/icon-192x192.png',
    apple: '/icon-192x192.png',
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Financeiro Familiar',
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: 'website',
    siteName: 'Controle Financeiro Familiar',
    title: 'Controle Financeiro Familiar',
    description: 'Gerencie as finanças da sua família de forma simples e offline',
  },
  twitter: {
    card: 'summary',
    title: 'Controle Financeiro Familiar',
    description: 'Gerencie as finanças da sua família de forma simples e offline',
  },
};

export const viewport: Viewport = {
  themeColor: '#0ea5e9',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="icon" href="/icon-192x192.png" />
        <link rel="apple-touch-icon" href="/icon-192x192.png" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      </head>
      <body className={`${inter.className} bg-gray-50 min-h-screen`}>
        <div className="min-h-screen flex flex-col">
          {/* Header */}
          <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
            <div className="max-w-4xl mx-auto px-4 py-4">
              <div className="flex items-center justify-center">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                    <svg 
                      className="w-5 h-5 text-white" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" 
                      />
                    </svg>
                  </div>
                  <h1 className="text-xl font-semibold text-gray-900">
                    Controle Financeiro Familiar
                  </h1>
                </div>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-6">
            {children}
          </main>

          {/* Footer */}
          <footer className="bg-white border-t border-gray-200 py-4">
            <div className="max-w-4xl mx-auto px-4 text-center">
              <p className="text-sm text-gray-500">
                © 2025 Controle Financeiro Familiar - desenvedor: Vinicius da silva pontual
              </p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
