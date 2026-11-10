// Shared layout + behaviour for every page (header, footer, bag, search, subscribe).
const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];
const naira = n => "₦" + n.toLocaleString("en-NG");
const byId = id => PRODUCTS.find(p => p.id === id);
const img = f => "assets/img/" + f;
const productUrl = id => `product.html?id=${id}`;
const esc = s => String(s).replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const X_ICON = `<svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6 6 18"/></svg>`;

// ---------- layout ----------
const PAGE = document.body.dataset.page || "";
$("#site-header").outerHTML = `
<div class="topbar">Authentic perfumes &amp; perfume oils &nbsp;·&nbsp; Order easily on WhatsApp</div>
<header class="nav" id="nav">
  <div class="wrap nav-in">
    <button class="icon-btn menu-btn" aria-label="Open menu" data-open="menu"><svg viewBox="0 0 24 24"><path d="M3 7h18M3 12h18M3 17h18"/></svg></button>
    <a href="index.html" class="brand" aria-label="Naya's Essence home">
      <svg class="mono" viewBox="0 0 40 52" aria-hidden="true"><rect x="16" y="1" width="8" height="5" rx="1"/><path d="M14 9h12M20 6v3"/><circle cx="20" cy="31" r="17"/><path d="M12 42V20l16 22V20"/></svg>
      <span class="word"><b>NAYA'S</b><small>ESSENCE</small></span>
    </a>
    <nav class="links">
      <a href="shop.html" class="${PAGE==="shop"?"active":""}">Shop</a>
      <a href="index.html#finder">Scent Finder</a>
      <a href="index.html#story">Our Story</a>
      <a href="#contact">Contact</a>
    </nav>
    <div class="nav-actions">
      <button class="icon-btn" aria-label="Search" data-open="search"><svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg></button>
      <button class="icon-btn bag-btn" aria-label="Open bag" data-open="cart"><svg viewBox="0 0 24 24"><path d="M5 8h14l-1 13H6L5 8Z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/></svg><span class="count" id="cartCount">0</span></button>
    </div>
  </div>
</header>`;

$("#site-footer").outerHTML = `
<footer class="footer" id="contact">
  <div class="wrap foot-in">
    <div class="foot-brand">
      <img src="assets/img/logo.jpg" alt="Naya's Essence logo" width="96" height="96">
      <p>Scents that align with your essence.</p>
    </div>
    <div>
      <h4>Shop</h4>
      <a href="shop.html">All fragrances</a>
      <a href="shop.html?type=perfume">Perfumes</a>
      <a href="shop.html?type=oil">Perfume Oils</a>
      <a href="index.html#finder">Scent Finder</a>
    </div>
    <div>
      <h4>Talk to us</h4>
      <a href="https://wa.me/${WA}" target="_blank" rel="noopener">WhatsApp: +234 902 181 4016</a>
      <a href="${IG}" target="_blank" rel="noopener">Instagram: @nayas_essence</a>
    </div>
    <div class="news">
      <h4>Get first dibs on restocks</h4>
      <form class="sub-form"><input type="email" placeholder="Your email" aria-label="Email" required><button class="btn sm">Join</button></form>
      <small class="sub-msg"></small>
    </div>
  </div>
  <div class="wrap legal">© ${new Date().getFullYear()} Naya's Essence. All rights reserved.</div>
</footer>

<button class="sub-float" data-open="subscribe" aria-label="Subscribe for updates">
  <svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg><span>Join the list</span>
</button>
<a class="wa-float" href="https://wa.me/${WA}" target="_blank" rel="noopener" aria-label="Chat on WhatsApp">
  <svg viewBox="0 0 24 24"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.5-.3Z"/></svg>
</a>

<div class="scrim" id="scrim"></div>

<aside class="drawer" id="cart" aria-label="Shopping bag">
  <div class="drawer-head"><h3>Your bag</h3><button class="icon-btn" data-close aria-label="Close">${X_ICON}</button></div>
  <div class="cart-items" id="cartItems"></div>
  <div class="cart-foot">
    <div class="subtotal"><span>Subtotal</span><b id="subtotal">₦0</b></div>
    <p class="note">Delivery fee confirmed on WhatsApp based on your location.</p>
    <label class="field"><span>Your name</span><input id="custName" placeholder="e.g. Amaka"></label>
    <label class="field"><span>Delivery area</span><input id="custArea" placeholder="e.g. Lekki, Lagos"></label>
    <button class="btn full" id="checkout">Checkout on WhatsApp</button>
  </div>
</aside>

<aside class="drawer left" id="menu" aria-label="Menu">
  <div class="drawer-head"><h3>Menu</h3><button class="icon-btn" data-close aria-label="Close">${X_ICON}</button></div>
  <nav class="mobile-links">
    <a href="shop.html">Shop all</a><a href="shop.html?type=perfume">Perfumes</a><a href="shop.html?type=oil">Perfume Oils</a>
    <a href="index.html#finder">Scent Finder</a><a href="index.html#story">Our Story</a><a href="#contact">Contact</a>
  </nav>
</aside>

<div class="modal" id="search" role="dialog" aria-label="Search">
  <div class="search-box">
    <input id="searchInput" placeholder="Search scents, brands, notes…" autocomplete="off">
    <button class="icon-btn" data-close aria-label="Close">${X_ICON}</button>
  </div>
  <div class="search-results" id="searchResults"></div>
</div>

<div class="modal" id="subscribe" role="dialog" aria-label="Subscribe">
  <div class="sub-card">
    <button class="icon-btn pd-close" data-close aria-label="Close">${X_ICON}</button>
    <div class="sub-img"><img src="assets/img/coco-blanc.jpg" alt=""></div>
    <div class="sub-body">
      <p class="eyebrow">The Essence List</p>
      <h3>Be first to know.</h3>
      <p>New arrivals, restocks and subscriber-only offers — straight to your inbox. No spam, ever.</p>
      <form class="sub-form"><input type="email" placeholder="Your email address" aria-label="Email" required><button class="btn full">Subscribe</button></form>
      <small class="sub-msg"></small>
    </div>
  </div>
</div>

<div class="toast" id="toast"></div>`;

// ---------- product card (used on home + shop + product pages) ----------
function cardHTML(p, i = 0){
  return `
  <article class="card" style="animation-delay:${i*60}ms">
    <div class="card-img">
      <a href="${productUrl(p.id)}" tabindex="-1"><img src="${img(p.img)}" alt="${p.name} by ${p.brand}" loading="lazy"></a>
      ${p.tag ? `<span class="tag">${p.tag}</span>` : ""}
      <button class="quick" data-add="${p.id}">Add to bag</button>
    </div>
    <a class="card-body" href="${productUrl(p.id)}">
      <div class="card-brand">${p.brand}</div>
      <div class="card-name">${p.name}</div>
      <div class="card-notes">${p.notes.join(" · ")}</div>
      <div class="price">${naira(p.price)}</div>
    </a>
  </article>`;
}
document.addEventListener("click", e => {
  const add = e.target.closest("[data-add]");
  if (add){ e.preventDefault(); addToCart(add.dataset.add); }
});

// ---------- overlays ----------
let openEl = null;
function open(id){
  close();
  openEl = document.getElementById(id);
  openEl.classList.add("on"); $("#scrim").classList.add("on");
  document.body.style.overflow = "hidden";
  if (id === "search") setTimeout(()=>$("#searchInput").focus(), 50);
}
function close(){
  if (!openEl) return;
  openEl.classList.remove("on"); $("#scrim").classList.remove("on");
  document.body.style.overflow = ""; openEl = null;
}
document.addEventListener("click", e => {
  const o = e.target.closest("[data-open]"); if (o){ open(o.dataset.open); return; }
  if (e.target.closest("[data-close]") || e.target === $("#scrim") || e.target.classList.contains("modal")) close();
});
document.addEventListener("keydown", e => { if (e.key === "Escape") close(); });
$$(".mobile-links a").forEach(a => a.addEventListener("click", close));

// ---------- cart ----------
let cart = {};
try { cart = JSON.parse(localStorage.getItem("ne-cart")) || {}; } catch {}
const saveCart = () => { try { localStorage.setItem("ne-cart", JSON.stringify(cart)); } catch {} };
function addToCart(id, q = 1){
  cart[id] = (cart[id] || 0) + q; saveCart(); renderCart();
  toast(`${byId(id).name} added to your bag`);
  const c = $("#cartCount"); c.classList.add("bump"); setTimeout(()=>c.classList.remove("bump"), 300);
}
function cartIds(){ return Object.keys(cart).filter(byId); }
function cartTotal(){ return cartIds().reduce((s,id)=>s + byId(id).price * cart[id], 0); }
function renderCart(){
  const ids = cartIds();
  $("#cartCount").textContent = ids.reduce((s,id)=>s+cart[id],0);
  $("#subtotal").textContent = naira(cartTotal());
  $("#checkout").disabled = !ids.length;
  $("#checkout").style.opacity = ids.length ? 1 : .5;
  $("#cartItems").innerHTML = ids.length ? ids.map(id => { const p = byId(id); return `
    <div class="ci">
      <a href="${productUrl(id)}"><img src="${img(p.img)}" alt=""></a>
      <div><b>${p.name}</b><small>${p.brand} · ${naira(p.price)}</small><br>
        <div class="qty"><button data-cq="${id}" data-d="-1" aria-label="Less">−</button><span>${cart[id]}</span><button data-cq="${id}" data-d="1" aria-label="More">+</button></div></div>
      <button class="rm" data-rm="${id}">Remove</button>
    </div>`; }).join("")
    : `<div class="cart-empty"><p>Your bag is empty</p>Find a scent that feels like you.<br><br><a href="shop.html" class="btn sm">Start shopping</a></div>`;
}
$("#cartItems").addEventListener("click", e => {
  const b = e.target.closest("[data-cq]"), r = e.target.closest("[data-rm]");
  if (b){ cart[b.dataset.cq] += +b.dataset.d; if (cart[b.dataset.cq] < 1) delete cart[b.dataset.cq]; }
  if (r) delete cart[r.dataset.rm];
  if (b || r){ saveCart(); renderCart(); }
});
function orderText(items){
  const lines = items.map(([id,q]) => `• ${byId(id).name} (${byId(id).brand}) x${q} — ${naira(byId(id).price*q)}`);
  const total = items.reduce((s,[id,q])=>s + byId(id).price*q, 0);
  const name = $("#custName").value.trim(), area = $("#custArea").value.trim();
  return `Hi Naya's Essence! I'd like to order:\n\n${lines.join("\n")}\n\nSubtotal: ${naira(total)}` +
    (name ? `\nName: ${name}` : "") + (area ? `\nDelivery to: ${area}` : "");
}
const waLink = text => `https://wa.me/${WA}?text=${encodeURIComponent(text)}`;
$("#checkout").addEventListener("click", () => {
  const ids = cartIds(); if (!ids.length) return;
  window.open(waLink(orderText(ids.map(id => [id, cart[id]]))), "_blank");
});

// ---------- search ----------
$("#searchInput").addEventListener("input", e => {
  const q = e.target.value.toLowerCase().trim();
  const res = q ? PRODUCTS.filter(p => [p.name,p.brand,p.desc,...p.notes,...p.moods].join(" ").toLowerCase().includes(q)) : [];
  $("#searchResults").innerHTML = res.map(p => `<a class="sr" href="${productUrl(p.id)}"><img src="${img(p.img)}" alt=""><span><b>${p.name}</b><small>${p.brand} · ${naira(p.price)}</small></span></a>`).join("")
    || (q ? `<div class="sr"><span>No matches for “${esc(q)}”</span></div>` : "");
});
$("#searchInput").addEventListener("keydown", e => {
  if (e.key === "Enter" && e.target.value.trim()) location.href = `shop.html?q=${encodeURIComponent(e.target.value.trim())}`;
});

// ---------- subscribe (TODO: connect to Mailchimp / Google Sheet) ----------
$$(".sub-form").forEach(f => f.addEventListener("submit", e => {
  e.preventDefault();
  f.parentElement.querySelector(".sub-msg").textContent = "You're on the list ✦ Welcome to the Essence family.";
  f.reset();
  try { localStorage.setItem("ne-subscribed", "1"); } catch {}
  setTimeout(close, 1800);
}));

// ---------- misc ----------
let tt;
function toast(t){ const el = $("#toast"); el.textContent = t; el.classList.add("on"); clearTimeout(tt); tt = setTimeout(()=>el.classList.remove("on"), 2200); }
addEventListener("scroll", () => $("#nav").classList.toggle("scrolled", scrollY > 10), { passive:true });
const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting){ e.target.classList.add("in"); io.unobserve(e.target); } }), { threshold:.12 });
function observeReveals(){ $$(".reveal:not(.in)").forEach(el => io.observe(el)); }
observeReveals();
renderCart();
