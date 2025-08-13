# 🚀 Guia Rápido - Controle Financeiro Familiar PWA

## ⏱️ 5 Minutos para Começar

### 1. Instalar e Rodar (2 min)
```bash
# Baixe o projeto
# Abra terminal na pasta do projeto

npm install
npm run dev

# Acesse: http://localhost:3000
```

### 2. Primeiro Uso (1 min)
1. **Adicione uma transação**:
   - Data: hoje
   - Tipo: Entrada
   - Valor: 1000
   - Pessoa: Mãe
   - Descrição: "Salário"

2. **Veja o resultado**:
   - Cartão da Mãe mostra +R$ 1.000
   - Gráfico aparece automaticamente
   - Histórico mostra a transação

### 3. Instalar como App (1 min)
- **Desktop**: Clique no ícone de instalação na barra de endereços
- **Mobile**: Menu > "Adicionar à tela inicial"

### 4. Testar Offline (1 min)
- Desligue wifi/internet
- App continua funcionando
- Dados permanecem salvos

## 📦 Deploy no Vercel (5 min)

### Opção A: GitHub + Vercel
```bash
# 1. Crie repo no GitHub
git init
git add .
git commit -m "Initial commit"
git remote add origin <seu-repo>
git push -u origin main

# 2. Vá em vercel.com
# 3. Import project do GitHub
# 4. Deploy automático!
```

### Opção B: Vercel CLI
```bash
npm i -g vercel
vercel login
vercel
vercel --prod
```

## 🎯 Principais Funcionalidades

### ➕ Adicionar Transação
- Use o formulário no topo
- Toggle entre Entrada/Saída
- Radio buttons para pessoa
- Validação automática

### 📊 Ver Gráficos
- Botões no topo do gráfico alteram tipo
- Barras: comparação mensal
- Linha: evolução das entradas
- Pizza: distribuição total

### 🔍 Filtrar Histórico
- Clique em "Filtros" na tabela
- Busque por descrição
- Filtre por tipo ou pessoa
- Ordenação automática por data

### 💾 Gerenciar Dados
- **Exportar**: Baixa JSON com backup
- **Limpar**: Remove todos os dados (cuidado!)
- **Recarregar**: Atualiza da localStorage

## 🛠️ Personalização Rápida

### Alterar Cores
Edite `tailwind.config.js`:
```js
colors: {
  primary: {
    500: '#sua-cor',
    600: '#sua-cor-escura',
  }
}
```

### Adicionar Pessoa
1. **types/financial.ts**:
```ts
export type Pessoa = 'mae' | 'irmao' | 'pai'; // + nova pessoa

export const LABELS_PESSOA: Record<Pessoa, string> = {
  mae: 'Mãe',
  irmao: 'Irmão',
  pai: 'Pai' // + novo label
};
```

2. **Atualizar componentes que usam radio buttons**

### Trocar Ícones PWA
1. Abra `public/create-icons.html` no navegador
2. Baixe os ícones gerados
3. Substitua `public/icon-192x192.png` e `public/icon-512x512.png`

## 🚨 Troubleshooting

### ❌ Erro "Module not found"
```bash
rm -rf node_modules package-lock.json
npm install
```

### ❌ PWA não instala
- Verifique HTTPS (ou use localhost)
- Confirme que ícones existem em `/public/`
- Teste em aba anônima

### ❌ Dados sumiram
- Dados ficam no localStorage do navegador
- Limpar dados do navegador = perda total
- Use "Exportar JSON" para backup

### ❌ Build falha
```bash
npm run build
# Veja erros no terminal
# Geralmente TypeScript ou import missing
```

## 📋 Checklist Produção

- [ ] `npm run build` funciona
- [ ] PWA instala localmente
- [ ] Funciona offline
- [ ] Ícones carregam corretamente
- [ ] Deploy no Vercel
- [ ] URL produção testada
- [ ] PWA instala em produção

## 💡 Dicas Pro

1. **Backup Regular**: Use "Exportar JSON" mensalmente
2. **Mobile First**: App otimizado para celular
3. **Offline**: Funciona sem internet após primeira visita
4. **Performance**: Usa localStorage (super rápido)
5. **Privacidade**: Zero dados enviados para servidores

## 🎉 Pronto!

Seu app de controle financeiro familiar está funcionando! 

- 📱 **Mobile**: Interface otimizada para toque
- 🔒 **Privado**: Dados só no seu dispositivo  
- ⚡ **Rápido**: Carregamento instantâneo
- 📊 **Visual**: Gráficos claros e informativos
- 💾 **Confiável**: Backup fácil e restauração

**Próximos passos**: Adicione algumas transações reais e explore os gráficos!
