// Script para gerar ícones SVG simples para o PWA
const fs = require('fs');
const path = require('path');

// Criar o SVG base do ícone
const createIcon = (size) => `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0ea5e9;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#0284c7;stop-opacity:1" />
    </linearGradient>
  </defs>
  
  <!-- Background -->
  <rect width="${size}" height="${size}" rx="${size * 0.2}" fill="url(#bg)"/>
  
  <!-- Dollar sign icon -->
  <g transform="translate(${size * 0.25}, ${size * 0.2})">
    <path d="M${size * 0.25} ${size * 0.1}v${size * 0.5}M${size * 0.25} ${size * 0.1}c${size * 0.08} 0 ${size * 0.15} ${size * 0.03} ${size * 0.15} ${size * 0.08}s-${size * 0.07} ${size * 0.08}-${size * 0.15} ${size * 0.08}H${size * 0.15}c-${size * 0.08} 0-${size * 0.15} ${size * 0.03}-${size * 0.15} ${size * 0.08}s${size * 0.07} ${size * 0.08} ${size * 0.15} ${size * 0.08}h${size * 0.1}m0 ${size * 0.2}H${size * 0.15}c-${size * 0.08} 0-${size * 0.15}-${size * 0.03}-${size * 0.15}-${size * 0.08}s${size * 0.07}-${size * 0.08} ${size * 0.15}-${size * 0.08}h${size * 0.2}c${size * 0.08} 0 ${size * 0.15}-${size * 0.03} ${size * 0.15}-${size * 0.08}s-${size * 0.07}-${size * 0.08}-${size * 0.15}-${size * 0.08}" 
          stroke="white" 
          stroke-width="${size * 0.03}" 
          fill="none" 
          stroke-linecap="round" 
          stroke-linejoin="round"/>
  </g>
  
  <!-- Family icon -->
  <g transform="translate(${size * 0.15}, ${size * 0.65})">
    <!-- Person 1 -->
    <circle cx="${size * 0.08}" cy="${size * 0.04}" r="${size * 0.025}" fill="white"/>
    <rect x="${size * 0.065}" y="${size * 0.07}" width="${size * 0.03}" height="${size * 0.08}" rx="${size * 0.005}" fill="white"/>
    
    <!-- Person 2 -->
    <circle cx="${size * 0.2}" cy="${size * 0.04}" r="${size * 0.025}" fill="white"/>
    <rect x="${size * 0.185}" y="${size * 0.07}" width="${size * 0.03}" height="${size * 0.08}" rx="${size * 0.005}" fill="white"/>
    
    <!-- Heart between them -->
    <path d="M${size * 0.13} ${size * 0.09}c0-${size * 0.01} ${size * 0.01}-${size * 0.02} ${size * 0.015}-${size * 0.02}s${size * 0.015} ${size * 0.01} ${size * 0.015} ${size * 0.02}c0-${size * 0.01} ${size * 0.01}-${size * 0.02} ${size * 0.015}-${size * 0.02}s${size * 0.015} ${size * 0.01} ${size * 0.015} ${size * 0.02}l-${size * 0.03} ${size * 0.03}z" 
          fill="white" opacity="0.8"/>
  </g>
</svg>`;

// Função para converter SVG para PNG usando canvas (simulado)
const createPNG = (size) => {
  const svg = createIcon(size);
  const filename = `icon-${size}x${size}.png`;
  
  // Como não temos canvas no Node.js, vamos criar um SVG que pode ser convertido
  // O desenvolvedor pode usar um conversor online ou ferramenta como Inkscape
  console.log(`Para converter o ícone ${size}x${size}, use o SVG abaixo em um conversor online:`);
  console.log(svg);
  console.log(`\\n--- Salve como: ${filename} ---\\n`);
  
  return svg;
};

// Criar os ícones necessários
const publicDir = path.join(__dirname, '..', 'public');

// Criar SVGs temporários que podem ser convertidos para PNG
const icon192 = createIcon(192);
const icon512 = createIcon(512);

// Salvar SVGs temporários
fs.writeFileSync(path.join(publicDir, 'icon-192x192.svg'), icon192);
fs.writeFileSync(path.join(publicDir, 'icon-512x512.svg'), icon512);

console.log('Ícones SVG criados em /public/');
console.log('Para converter para PNG, use uma ferramenta online como:');
console.log('- https://convertio.co/svg-png/');
console.log('- https://cloudconvert.com/svg-to-png');
console.log('\\nOu use Inkscape/GIMP para converter os arquivos SVG para PNG mantendo as dimensões.');

// Criar versões PNG básicas usando um método alternativo
// Para desenvolvimento, vamos criar um placeholder simples
const createSimplePNG = (size) => {
  // Criar um arquivo de dados base64 simples (1x1 pixel azul)
  const canvas = `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==`;
  return canvas;
};

console.log('\\n⚠️  ATENÇÃO: Para produção, substitua os arquivos SVG por PNG reais de 192x192 e 512x512 pixels.');
console.log('Os arquivos SVG foram criados como referência para a conversão.');
