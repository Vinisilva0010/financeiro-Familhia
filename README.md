# 💰 Controle Financeiro Familiar PWA

Um aplicativo web progressivo (PWA) para controle financeiro familiar, desenvolvido com Next.js, TypeScript e TailwindCSS. Funciona offline e pode ser instalado como um app nativo.

## ✨ Funcionalidades

### 📊 Gestão Financeira
- **Formulário intuitivo** para cadastro de transações
- **Tipos de transação**: Entrada e Saída
- **Controle por pessoa**: Mãe e Irmão
- **Saldos automáticos** calculados em tempo real
- **Histórico completo** com filtros avançados

### 📈 Visualizações
- **Gráficos interativos** (barras, linha, pizza) usando Recharts
- **Análise por mês** separado por pessoa
- **Cartões de saldo** com resumo visual
- **Estatísticas rápidas** do uso

### 🔄 Funcionalidades PWA
- **Trabalha offline** completamente
- **Instalável** na tela inicial do dispositivo
- **Service Worker** para cache inteligente
- **Responsivo** otimizado para mobile
- **Armazenamento local** (localStorage)

### 🛠️ Recursos Técnicos
- **Export/Import** de dados em JSON
- **Filtros e busca** no histórico
- **Interface limpa** e acessível
- **Validação de dados** robusta
- **Feedback visual** em todas as ações

## 🚀 Como Rodar Localmente

### Pré-requisitos
- Node.js 18+ 
- npm ou yarn

### Passo a Passo

1. **Clone ou baixe o projeto**
   ```bash
   # Se for um repositório Git
   git clone <repository-url>
   cd controlefinancasfamilhia
   
   # Ou baixe e extraia o ZIP
   ```

2. **Instale as dependências**
   ```bash
   npm install
   # ou
   yarn install
   ```

3. **Execute em modo desenvolvimento**
   ```bash
   npm run dev
   # ou
   yarn dev
   ```

4. **Abra no navegador**
   - Acesse: http://localhost:3000
   - O app será carregado automaticamente

### 🧪 Testando o PWA

1. **No Chrome/Edge (Desktop)**
   - Abra http://localhost:3000
   - Clique no ícone de instalação na barra de endereços
   - Ou vá em Menu > Instalar "Controle Financeiro Familiar"

2. **No Mobile (Android/iOS)**
   - Abra o site no navegador móvel
   - Android: Menu > "Adicionar à tela inicial"
   - iOS: Botão compartilhar > "Adicionar à Tela de Início"

3. **Teste Offline**
   - Instale o app
   - Desligue a internet/wifi
   - O app deve continuar funcionando normalmente

## 📱 Deploy no Vercel

### Opção 1: Deploy Automático

1. **Conecte ao GitHub**
   - Crie um repositório no GitHub
   - Faça upload dos arquivos do projeto
   - Acesse [vercel.com](https://vercel.com)
   - Conecte sua conta do GitHub

2. **Import Project**
   - Clique em "New Project"
   - Selecione o repositório
   - Configure:
     - Framework Preset: **Next.js**
     - Root Directory: `./` (padrão)
     - Build Command: `npm run build`
     - Output Directory: `.next` (automático)

3. **Deploy**
   - Clique em "Deploy"
   - Aguarde a conclusão (2-3 minutos)
   - Seu app estará disponível na URL fornecida

### Opção 2: Deploy via CLI

1. **Instale Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Faça login**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel
   ```

4. **Deploy de produção**
   ```bash
   vercel --prod
   ```

### ⚙️ Configurações de Deploy

O projeto já está configurado com:
- `next.config.js` com next-pwa
- `manifest.json` otimizado
- Service workers automáticos
- Cache strategies configuradas

### 🔧 Variáveis de Ambiente

Não são necessárias variáveis de ambiente, pois o app:
- Funciona 100% no frontend
- Usa apenas localStorage
- Não conecta com APIs externas

## 📁 Estrutura do Projeto

```
controlefinancasfamilhia/
├── app/                          # App Router (Next.js 14)
│   ├── globals.css              # Estilos globais + TailwindCSS
│   ├── layout.tsx               # Layout principal + PWA config
│   └── page.tsx                 # Página principal
├── components/                   # Componentes React
│   ├── CartaoSaldo.tsx          # Cartões de saldo individual/geral
│   ├── FormularioTransacao.tsx  # Formulário de nova transação
│   ├── GraficosFinanceiros.tsx  # Gráficos com Recharts
│   ├── PWAInstallPrompt.tsx     # Prompt de instalação PWA
│   └── TabelaHistorico.tsx      # Tabela com filtros
├── hooks/                        # Custom Hooks
│   └── useFinancialData.ts      # Hook principal de dados
├── types/                        # Tipos TypeScript
│   └── financial.ts             # Tipos de transações e dados
├── public/                       # Arquivos estáticos
│   ├── manifest.json            # Manifesto PWA
│   ├── icon-192x192.png         # Ícone PWA 192px
│   ├── icon-512x512.png         # Ícone PWA 512px
│   └── create-icons.html        # Gerador de ícones
├── scripts/                      # Scripts utilitários
│   ├── create-placeholder-icons.js
│   └── generate-icons.js
├── next.config.js               # Configuração Next.js + PWA
├── tailwind.config.js           # Configuração TailwindCSS
├── tsconfig.json                # Configuração TypeScript
└── package.json                 # Dependências e scripts
```

## 🎨 Personalização

### Ícones PWA
Para customizar os ícones:

1. **Use o gerador incluído**
   - Abra `public/create-icons.html` no navegador
   - Baixe os ícones gerados
   - Substitua `icon-192x192.png` e `icon-512x512.png`

2. **Ou use ferramentas externas**
   - [Favicon Generator](https://realfavicongenerator.net/)
   - [PWA Icon Generator](https://tools.crawlink.com/tools/pwa-icon-generator/)

### Cores e Tema
Edite `tailwind.config.js`:
```js
theme: {
  extend: {
    colors: {
      primary: {
        // Suas cores personalizadas
        500: '#sua-cor',
        600: '#sua-cor-escura',
      }
    }
  }
}
```

### Pessoas
Para adicionar mais pessoas, edite:
- `types/financial.ts` (tipo `Pessoa`)
- `LABELS_PESSOA` com os nomes
- Componentes que usam as pessoas

## 🛡️ Segurança e Privacidade

- **100% Local**: Nenhum dado sai do dispositivo
- **Sem Cookies**: Não usamos cookies de tracking
- **Sem Analytics**: Privacidade total do usuário
- **Código Aberto**: Todo código pode ser auditado

## 🔍 Resolução de Problemas

### App não instala
- Verifique se está em HTTPS (ou localhost)
- Confirme que `manifest.json` está acessível
- Icons devem existir em `/public/`

### Dados perdidos
- Dados ficam no localStorage do navegador
- Limpar dados do navegador apaga tudo
- Use "Exportar JSON" para backup

### PWA não funciona offline
- Verifique se service worker está ativo
- Aguarde primeira visita para cachear
- Teste em aba anônima

### Erros de build
```bash
# Limpe cache e reinstale
rm -rf .next node_modules package-lock.json
npm install
npm run build
```

## 📋 Checklist de Deploy

- [ ] Ícones PWA criados (192x192 e 512x512)
- [ ] `manifest.json` configurado
- [ ] Build local funcionando (`npm run build`)
- [ ] PWA testado em mobile
- [ ] Funcionalidade offline verificada
- [ ] Deploy no Vercel realizado
- [ ] URL de produção testada
- [ ] Instalação PWA testada em produção

## 🤝 Contribuindo

Para contribuir com melhorias:

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/nova-funcionalidade`)
3. Commit suas mudanças (`git commit -am 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

## 📄 Licença

Este projeto é open source e está disponível sob a licença MIT.

## 🙋‍♂️ Suporte

Para dúvidas ou problemas:
- Abra uma issue no GitHub
- Verifique a documentação acima
- Teste localmente primeiro

---

**🎉 Divirta-se controlando suas finanças familiares!**
