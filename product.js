// Product page: rendered from ?id=<product id>
const p = byId(new URLSearchParams(location.search).get("id"));
const main = $("#productMain");

if (!p){
  document.title = "Not found — Naya's Essence";
  main.innerHTML = `<section class="section center notfound"><div class="wrap">
    <p class="eyebrow">Hmm</p><h1>We couldn't find that scent.</h1>
    <p>It may have sold out or moved.</p><a href="shop.html" class="btn">Browse all fragrances</a></div></section>`;
} else {
  document.title = `${p.name} by ${p.brand} — Naya's Essence`;
  document.querySelector('meta[name=description]').content = `${p.name} by ${p.brand}, ${p.size}. ${p.desc}`;
  const images = p.images || [p.img];
  const related = PRODUCTS.filter(x => x.id !== p.id)
    .map(x => ({ x, s: x.moods.filter(m => p.moods.includes(m)).length + (x.brand === p.brand ? .5 : 0) }))
    .sort((a,b) => b.s - a.s).slice(0, 4).map(r => r.x);
  const moodLinks = p.moods.map(m => `<a href="shop.html?mood=${m}" class="pill sm">${MOODS[m]}</a>`).join("");

  main.innerHTML = `
  <div class="wrap"><nav class="crumbs pd-crumbs" aria-label="Breadcrumb">
    <a href="index.html">Home</a><span>/</span><a href="shop.html">Shop</a><span>/</span>
    <a href="shop.html?type=${p.type}">${TYPES[p.type]}</a><span>/</span><span>${p.name}</span></nav></div>

  <section class="wrap prod">
    <div class="gallery">
      <div class="g-main" id="gMain"><img src="${img(images[0])}" alt="${p.name} by ${p.brand}" id="gImg">
        ${p.tag ? `<span class="tag">${p.tag}</span>` : ""}</div>
      ${images.length > 1 ? `<div class="g-thumbs">${images.map((f,i)=>`<button class="${i?"":"on"}" data-img="${f}"><img src="${img(f)}" alt=""></button>`).join("")}</div>` : ""}
    </div>

    <div class="prod-info">
      <div class="card-brand">${p.brand}</div>
      <h1>${p.name}</h1>
      <div class="prod-price">${naira(p.price)} <small>${p.size}</small></div>
      <p class="prod-desc">${p.desc}</p>

      <div class="facts">
        <div><small>Made for</small><b>${p.for}</b></div>
        <div><small>Lasts</small><b>${p.lasting}</b></div>
        <div><small>Type</small><b>${p.type === "oil" ? "Perfume oil" : "Eau de parfum"}</b></div>
      </div>

      <div class="pyramid">
        <h4>Scent notes</h4>
        <div class="tier"><span class="lvl">Top</span><span>${p.notes[0]}</span></div>
        <div class="tier"><span class="lvl">Heart</span><span>${p.notes[1]}</span></div>
        <div class="tier"><span class="lvl">Base</span><span>${p.notes[2]}</span></div>
      </div>
      <div class="mood-links">${moodLinks}</div>

      <div class="buy" id="buy">
        <div class="qty big"><button data-q="-1" aria-label="Less">−</button><span id="q">1</span><button data-q="1" aria-label="More">+</button></div>
        <button class="btn" id="addBtn">Add to bag — <span id="lineTotal">${naira(p.price)}</span></button>
      </div>
      <a class="btn ghost full wa-btn" id="buyNow" target="_blank" rel="noopener">
        <svg viewBox="0 0 24 24"><path d="M4 20l1.3-3.8A8 8 0 1 1 8 19z"/></svg>Order now on WhatsApp</a>

      <ul class="trust">
        <li><svg viewBox="0 0 24 24"><path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6l-8-3Z"/><path d="m9 12 2 2 4-4"/></svg>100% authentic, sealed</li>
        <li><svg viewBox="0 0 24 24"><path d="M3 7h12v10H3zM15 10h4l2 3v4h-6"/><circle cx="7" cy="18" r="1.6"/><circle cx="18" cy="18" r="1.6"/></svg>Delivery across Nigeria</li>
      </ul>

      <div class="acc">
        <details open><summary>About this scent</summary><p>${p.desc} Opens with ${p.notes[0].toLowerCase()}, softens into ${p.notes[1].toLowerCase()}, and dries down to ${p.notes[2].toLowerCase()}.</p></details>
        <details><summary>How to wear it</summary><p>${p.type === "oil"
          ? "Dab a little on pulse points — wrists, neck, behind the ears. Warm skin helps it bloom. Layer under a spray for extra staying power."
          : "Spray 3–5 times on pulse points and clothes from about 15cm away. Don't rub your wrists — it breaks down the top notes. Moisturised skin holds scent longer."}</p></details>
        <details><summary>Delivery &amp; payment</summary><p>Orders are confirmed on WhatsApp. We'll share the delivery fee for your location and payment details, then dispatch once payment is confirmed.</p></details>
      </div>
    </div>
  </section>

  <section class="section related">
    <div class="wrap">
      <div class="head row"><div><p class="eyebrow">You may also like</p><h2>If you love ${p.name}…</h2></div>
        <a href="shop.html" class="btn ghost">Shop all</a></div>
      <div class="grid">${related.map(cardHTML).join("")}</div>
    </div>
  </section>

  <div class="sticky-buy" id="stickyBuy">
    <img src="${img(p.img)}" alt=""><div><b>${p.name}</b><small>${naira(p.price)}</small></div>
    <button class="btn sm" id="stickyAdd">Add to bag</button>
  </div>`;

  let q = 1;
  const refresh = () => {
    $("#q").textContent = q;
    $("#lineTotal").textContent = naira(p.price * q);
    $("#buyNow").href = waLink(orderText([[p.id, q]]));
  };
  $$("[data-q]").forEach(b => b.onclick = () => { q = Math.max(1, q + +b.dataset.q); refresh(); });
  $("#addBtn").onclick = () => addToCart(p.id, q);
  $("#stickyAdd").onclick = () => addToCart(p.id, q);
  $("#buyNow").addEventListener("click", refresh);
  refresh();

  $$(".g-thumbs button").forEach(b => b.onclick = () => {
    $("#gImg").src = img(b.dataset.img); $$(".g-thumbs button").forEach(x => x.classList.toggle("on", x === b));
  });
  // hover zoom
  const gm = $("#gMain");
  gm.addEventListener("mousemove", e => {
    const r = gm.getBoundingClientRect();
    $("#gImg").style.transformOrigin = `${(e.clientX-r.left)/r.width*100}% ${(e.clientY-r.top)/r.height*100}%`;
  });
  // sticky bar appears when main buy button scrolls away
  new IntersectionObserver(([e]) => $("#stickyBuy").classList.toggle("on", !e.isIntersecting && e.boundingClientRect.top < 0)).observe($("#buy"));
}
