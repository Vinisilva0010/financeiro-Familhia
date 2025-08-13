const fs = require('fs');
const path = require('path');

// Criar ícones PNG básicos em base64 para desenvolvimento
// Estes são ícones simples de 1x1 pixel que são redimensionados pelos navegadores

// Ícone básico azul em PNG base64
const pngBase64 = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==';

// Converter base64 para Buffer
const pngBuffer = Buffer.from(pngBase64, 'base64');

// Caminhos dos arquivos
const publicDir = path.join(__dirname, '..', 'public');
const icon192Path = path.join(publicDir, 'icon-192x192.png');
const icon512Path = path.join(publicDir, 'icon-512x512.png');

// Escrever os arquivos
fs.writeFileSync(icon192Path, pngBuffer);
fs.writeFileSync(icon512Path, pngBuffer);

console.log('✅ Ícones PNG placeholder criados!');
console.log('📁 Arquivos criados:');
console.log(`   - ${icon192Path}`);
console.log(`   - ${icon512Path}`);
console.log('');
console.log('⚠️  NOTA: Estes são ícones placeholder básicos.');
console.log('   Para produção, substitua por ícones personalizados de alta qualidade.');
console.log('   Use o arquivo public/create-icons.html para gerar ícones melhores.');
