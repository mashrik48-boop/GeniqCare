const PLACEHOLDER_SVG = 'data:image/svg+xml;utf8,' + encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" fill="#eef2ef"/><path d="M35 30h30v10a15 15 0 0 1 8 13v27H27V53a15 15 0 0 1 8-13z" fill="none" stroke="#9fb3a8" stroke-width="3"/></svg>'
);

const CATEGORY_RULES = [
  ['Vitamins', /vitamin|b\d|folate|niacin|biotin/i],
  ['Minerals', /zinc|magnesium|potassium|selenium|chromium|copper|iron/i],
  ['Herbal', /ashwagandha|ginseng|ginkgo|turmeric|reishi|maca|rhodiola|milk thistle|saw palmetto|holy basil|garlic|ginger|astragalus|boswellia|moringa|spirulina|cranberry|chlorella|olive leaf|grape seed|hawthorn|andrographis|bergamot|pine bark|walnut|mushroom|turkey tail|lion|panax|siberian/i],
  ['Amino Acids', /amino|glutamine|taurine|arginine|glycine|carnitine|theanine|gaba|nac|bcaa|beta.?alanine/i],
  ['Fitness & Protein', /protein|creatine|whey|bcaa/i],
  ['Collagen & Beauty', /collagen|silica|msm/i],
  ['Multivitamins', /multivitamin|complex/i],
];

function categorize(name) {
  for (const [cat, re] of CATEGORY_RULES) if (re.test(name)) return cat;
  return 'Wellness';
}

let PRODUCTS = [];
let cart = JSON.parse(localStorage.getItem('bg_cart') || '{}');
let activeCategory = 'All';
let searchTerm = '';

function saveCart() {
  localStorage.setItem('bg_cart', JSON.stringify(cart));
  renderCartBadge();
}

function renderCartBadge() {
  const count = Object.values(cart).reduce((a, b) => a + b.qty, 0);
  const badge = document.getElementById('cartBadge');
  badge.textContent = count;
  badge.style.display = count > 0 ? 'flex' : 'none';
}

function money(n) {
  return '$' + n.toFixed(2);
}

function renderChips() {
  const cats = ['All', ...new Set(PRODUCTS.map(p => p.category))];
  const row = document.getElementById('chipRow');
  row.innerHTML = cats.map(c =>
    `<button class="chip ${c === activeCategory ? 'active' : ''}" data-cat="${c}">${c}</button>`
  ).join('');
  row.querySelectorAll('.chip').forEach(btn => {
    btn.addEventListener('click', () => {
      activeCategory = btn.dataset.cat;
      renderChips();
      renderGrid();
    });
  });
}

function renderGrid() {
  const grid = document.getElementById('grid');
  const empty = document.getElementById('emptyState');
  const term = searchTerm.trim().toLowerCase();
  const list = PRODUCTS.filter(p => {
    const catOk = activeCategory === 'All' || p.category === activeCategory;
    const termOk = !term || p.name.toLowerCase().includes(term);
    return catOk && termOk;
  });
  empty.style.display = list.length ? 'none' : 'block';
  grid.innerHTML = list.map(p => {
    const qty = cart[p.sku] ? cart[p.sku].qty : 0;
    return `
    <div class="card">
      <div class="imgwrap">
        <img src="${p.image || PLACEHOLDER_SVG}" alt="${p.name}" loading="lazy" onerror="this.src='${PLACEHOLDER_SVG}'"/>
      </div>
      <div class="body">
        <div class="name">${p.name}</div>
        <div class="price">${money(p.price)}</div>
        <div class="row">
          ${qty === 0
            ? `<button class="addbtn" data-sku="${p.sku}">Add to Cart</button>`
            : `<div class="qty">
                 <button data-dec="${p.sku}">–</button>
                 <span>${qty}</span>
                 <button data-inc="${p.sku}">+</button>
               </div>`
          }
        </div>
      </div>
    </div>`;
  }).join('');

  grid.querySelectorAll('[data-sku]').forEach(b => b.addEventListener('click', () => addToCart(b.dataset.sku)));
  grid.querySelectorAll('[data-inc]').forEach(b => b.addEventListener('click', () => addToCart(b.dataset.inc)));
  grid.querySelectorAll('[data-dec]').forEach(b => b.addEventListener('click', () => decFromCart(b.dataset.dec)));
}

function addToCart(sku) {
  const p = PRODUCTS.find(x => x.sku === sku);
  if (!p) return;
  if (!cart[sku]) cart[sku] = { name: p.name, price: p.price, image: p.image, qty: 0 };
  cart[sku].qty += 1;
  saveCart();
  renderGrid();
  renderCartSheet();
}

function decFromCart(sku) {
  if (!cart[sku]) return;
  cart[sku].qty -= 1;
  if (cart[sku].qty <= 0) delete cart[sku];
  saveCart();
  renderGrid();
  renderCartSheet();
}

function renderCartSheet() {
  const wrap = document.getElementById('cartItems');
  const entries = Object.entries(cart);
  if (!entries.length) {
    wrap.innerHTML = '<p style="color:#5b6b62;padding:20px 0;text-align:center">Your cart is empty.</p>';
  } else {
    wrap.innerHTML = entries.map(([sku, item]) => `
      <div class="cart-row">
        <div class="thumb"><img src="${item.image || PLACEHOLDER_SVG}" onerror="this.src='${PLACEHOLDER_SVG}'"/></div>
        <div class="info">
          <div class="n">${item.name}</div>
          <div class="p">${money(item.price)} × ${item.qty}</div>
        </div>
        <div class="qty">
          <button data-dec="${sku}">–</button>
          <span>${item.qty}</span>
          <button data-inc="${sku}">+</button>
        </div>
      </div>
    `).join('');
    wrap.querySelectorAll('[data-inc]').forEach(b => b.addEventListener('click', () => addToCart(b.dataset.inc)));
    wrap.querySelectorAll('[data-dec]').forEach(b => b.addEventListener('click', () => decFromCart(b.dataset.dec)));
  }
  const total = entries.reduce((sum, [, i]) => sum + i.price * i.qty, 0);
  document.getElementById('cartTotal').textContent = money(total);
}

function openSheet() {
  document.getElementById('sheetBg').classList.add('open');
  document.getElementById('cartSheet').classList.add('open');
  renderCartSheet();
}
function closeSheet() {
  document.getElementById('sheetBg').classList.remove('open');
  document.getElementById('cartSheet').classList.remove('open');
}

document.getElementById('cartBtn').addEventListener('click', openSheet);
document.getElementById('closeSheet').addEventListener('click', closeSheet);
document.getElementById('sheetBg').addEventListener('click', closeSheet);
document.getElementById('searchInput').addEventListener('input', e => {
  searchTerm = e.target.value;
  renderGrid();
});
document.getElementById('checkoutBtn').addEventListener('click', () => {
  window.open('https://www.biogenique.com/en-us', '_blank', 'noopener');
});

// PWA install prompt
let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  document.getElementById('installBanner').classList.add('show');
});
document.getElementById('installBtn').addEventListener('click', async () => {
  document.getElementById('installBanner').classList.remove('show');
  if (deferredPrompt) {
    deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    deferredPrompt = null;
  }
});
document.getElementById('installClose').addEventListener('click', () => {
  document.getElementById('installBanner').classList.remove('show');
});

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js').catch(() => {});
  });
}

fetch('products.json')
  .then(r => r.json())
  .then(data => {
    PRODUCTS = data
      .filter(p => p.name && p.price)
      .map(p => ({ ...p, category: categorize(p.name) }))
      .sort((a, b) => a.name.localeCompare(b.name));
    renderChips();
    renderGrid();
    renderCartBadge();
  });
