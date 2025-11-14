async function fetchProdutos() {
  const resp = await fetch('data/produtos.json?cachebust=' + Date.now());
  return await resp.json();
}

function getParam(name) {
  const url = new URL(window.location.href);
  return url.searchParams.get(name);
}

function makeCard(p) {
  return `
    <div class="card bg-white rounded-lg shadow p-4 text-center">
      <img src="${p.imagem}" alt="${p.nome}" class="w-full h-48 object-cover rounded">
      <div class="flex justify-between items-center mt-2">
        <h3 class="text-lg font-semibold text-left">${p.nome}</h3>
        ${p.categoria ? `<span class="badge">${p.categoria}</span>` : ''}
      </div>
      ${p.avaliacao ? `<div class="mt-1 text-sm text-gray-600">⭐ ${p.avaliacao} / 5</div>` : ''}
      <p class="text-xl text-orange-600 font-bold mt-1">${p.preco}</p>
      <a href="${p.link}" rel="nofollow sponsored" target="_blank"
         class="bg-orange-500 text-white px-4 py-2 rounded mt-3 inline-block hover:bg-orange-600">
         Ver na loja
      </a>
    </div>`;
}

async function renderListaProdutos(targetId, filtroCategoria = null) {
  const container = document.getElementById(targetId);
  container.innerHTML = '<div class="text-gray-500">Carregando…</div>';
  try {
    const produtos = await fetchProdutos();
    const itens = filtroCategoria
      ? produtos.filter(p => (p.categoria || '').toLowerCase() === filtroCategoria.toLowerCase())
      : produtos;

    if (!itens.length) {
      container.innerHTML = '<div class="text-gray-500">Nenhum produto encontrado.</div>';
      return;
    }

    const html = itens.map(makeCard).join('');
    container.innerHTML = html;
  } catch (e) {
    container.innerHTML = '<div class="text-red-600">Falha ao carregar produtos.</div>';
    console.error(e);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const lista = document.getElementById('lista-produtos');
  if (lista) {
    const categoria = getParam('categoria');
    renderListaProdutos('lista-produtos', categoria);
  }
});