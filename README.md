# Venditudo — Site estático pronto para subir na Hostinger

Este pacote inclui:
- Landing page e catálogo dinâmico
- Páginas de categorias (tecnologia, casa, fitness)
- Formulário de newsletter (Mailchimp OU Brevo)
- Automação de produtos com Google Sheets (CSV publicado) via Node
- Placeholders para Google AdSense e Google Analytics 4 (GA4)

## 1) Como publicar na Hostinger
1. Compacte a pasta `venditudo` (ou use o arquivo .zip que gerei).
2. No painel Hostinger, **Gerenciador de Arquivos** → envie o conteúdo para `/public_html`.
3. Garanta que o arquivo `index.html` está no diretório raiz do site.
4. Ative **SSL/HTTPS** no painel (Let's Encrypt).

## 2) Newsletter
### Mailchimp
1. Crie uma lista (Audience) e um **Formulário de Inscrição**.
2. Copie a URL `action` do formulário embed e substitua no `index.html` (procure por `list-manage.com`).
3. Publique.
### Brevo (Sendinblue)
1. Crie um formulário no Brevo e copie o **script embed**.
2. Cole o script na seção **Newsletter** do `index.html` (substitua o aviso).

## 3) Produtos dinâmicos a partir do Google Sheets
### Opção simples — CSV público (sem autenticação)
1. No Sheets: Arquivo → Compartilhar → **Publicar na Web** → escolha a aba e formato **CSV**.
2. Copie a URL do CSV.
3. No servidor/local: rode o script para gerar `data/produtos.json`:
   ```bash
   # requer Node.js instalado
   cd tools
   node sync-from-sheets.js "https://docs.google.com/spreadsheets/d/SEU_ID/pub?output=csv"
   ```
4. Faça upload do arquivo `data/produtos.json` para o site.

> Colunas esperadas: `nome,preco,imagem,link,categoria,avaliacao`

### Opção avançada — Amazon PA-API (afiliados)
- Leia `tools/amazon-sync-example.js` e a documentação oficial.
- Você precisará de **Access Key**, **Secret Key** e **Partner Tag**.
- Gera um `produtos.json` semelhante.

## 4) Google Analytics 4 (GA4)
1. Crie uma propriedade no GA4 e obtenha o seu **Measurement ID** (ex: `G-XXXX`).
2. Edite `assets/js/analytics.js` e/ou defina `window.GA_MEASUREMENT_ID` no `<head>`:
   ```html
   <script>window.GA_MEASUREMENT_ID="G-SEU_ID";</script>
   ```

## 5) Google AdSense
1. Crie sua conta, solicite aprovação do site.
2. Substitua `ca-pub-XXXXXXXXXXXXXXXX` no arquivo `partials/adsense.html` pelo seu ID.
3. Copie a tag e cole no `<head>` das páginas onde deseja exibir anúncios.
4. Insira blocos de anúncio (auto ads ou blocos específicos).

## 6) Categorias
- As páginas em `/produtos/*.html` carregam o catálogo filtrado pela categoria.
- As categorias devem bater com o campo `categoria` no `data/produtos.json`.

## 7) Estrutura
```
venditudo/
  index.html
  produtos/
    tecnologia.html
    casa.html
    fitness.html
  data/
    produtos.json
  assets/
    css/style.css
    js/script.js
    js/analytics.js
    img/placeholder.svg
  partials/
    adsense.html
  tools/
    sync-from-sheets.js
    amazon-sync-example.js
  robots.txt
  sitemap.xml
  README.md
```

## 8) Dicas de SEO
- Edite o `<title>` e `<meta name="description">` das páginas com foco em palavras-chave.
- Publique 2–3 novos produtos/artigos por semana.
- Envie o `sitemap.xml` ao Google Search Console.

Boa construção e boas vendas! 🚀# venda
# venditudo.com
