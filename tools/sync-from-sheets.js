/**
 * Sync de produtos a partir de uma planilha Google Sheets (publicada como CSV).
 * Uso:
 *   1) No Google Sheets: Arquivo > Compartilhar > Publicar na Web > CSV da aba.
 *   2) Copie a URL CSV e defina como SHEETS_CSV_URL (env ou argumento).
 *   3) node tools/sync-from-sheets.js "https://docs.google.com/spreadsheets/d/XYZ/pub?output=csv"
 *
 * Colunas esperadas: nome,preco,imagem,link,categoria,avaliacao
 */
const fs = require('fs');
const https = require('https');

const url = process.argv[2] || process.env.SHEETS_CSV_URL;
if (!url) {
  console.error('Informe a URL CSV do Google Sheets como argumento ou env SHEETS_CSV_URL.');
  process.exit(1);
}

https.get(url, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const linhas = data.split(/\r?\n/).filter(Boolean);
    const header = linhas.shift().split(',');
    const produtos = linhas.map(l => {
      const cols = l.split(',');
      const item = {};
      header.forEach((h, i) => item[h.trim()] = (cols[i] || '').trim());
      // Conversão simples de avaliacao para número, se existir
      if (item.avaliacao) item.avaliacao = parseFloat(item.avaliacao.replace(',', '.')) || undefined;
      return item;
    });
    fs.writeFileSync(__dirname + '/../data/produtos.json', JSON.stringify(produtos, null, 2), 'utf-8');
    console.log(`Gerado data/produtos.json com ${produtos.length} itens.`);
  });
}).on('error', (err) => {
  console.error('Erro ao baixar CSV:', err.message);
  process.exit(1);
});