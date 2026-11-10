// Collection page: filters (synced to the URL), sort, grid.
const params = new URLSearchParams(location.search);
const state = {
  type: new Set(params.getAll("type")),
  mood: new Set(params.getAll("mood")),
  brand: new Set(params.getAll("brand")),
  for: new Set(params.getAll("for")),
  max: +params.get("max") || 30000,
  q: params.get("q") || "",
  sort: params.get("sort") || "featured",
};

const count = (key, val) => PRODUCTS.filter(p => key === "mood" ? p.moods.includes(val) : p[key] === val).length;
const BRANDS = [...new Set(PRODUCTS.map(p => p.brand))].sort();
const FORS = ["Women", "Men", "Unisex"];

function checkboxes(el, key, options){
  $(el).innerHTML = options.map(([val, label]) => `
    <label class="check"><input type="checkbox" data-k="${key}" value="${val}" ${state[key].has(val) ? "checked" : ""}>
      <span class="box"></span><span>${label}</span><em>${count(key, val)}</em></label>`).join("");
}
checkboxes("#fType", "type", Object.entries(TYPES));
checkboxes("#fMood", "mood", Object.entries(MOODS));
checkboxes("#fBrand", "brand", BRANDS.map(b => [b, b]));
checkboxes("#fFor", "for", FORS.map(f => [f, f]));
$("#fPrice").value = state.max;
$("#sort").value = state.sort;

$("#filters").addEventListener("change", e => {
  const k = e.target.dataset.k;
  if (k){ e.target.checked ? state[k].add(e.target.value) : state[k].delete(e.target.value); update(); }
});
$("#fPrice").addEventListener("input", e => { state.max = +e.target.value; update(); });
$("#sort").addEventListener("change", e => { state.sort = e.target.value; update(); });

function clearAll(){
  ["type","mood","brand","for"].forEach(k => state[k].clear());
  state.max = 30000; state.q = "";
  $$("#filters input[type=checkbox]").forEach(c => c.checked = false);
  $("#fPrice").value = 30000; update();
}
$("#clearAll").onclick = clearAll;
$("#emptyClear").onclick = clearAll;

$("#activePills").addEventListener("click", e => {
  const b = e.target.closest("[data-pk]"); if (!b) return;
  const { pk, pv } = b.dataset;
  if (pk === "q") state.q = "";
  else if (pk === "max"){ state.max = 30000; $("#fPrice").value = 30000; }
  else { state[pk].delete(pv); const c = $(`#filters input[data-k="${pk}"][value="${CSS.escape(pv)}"]`); if (c) c.checked = false; }
  update();
});

// mobile filter drawer
$("#openFilters").onclick = () => { $("#filters").classList.add("on"); $("#scrim").classList.add("on"); document.body.style.overflow = "hidden"; };
const closeFilters = () => { $("#filters").classList.remove("on"); $("#scrim").classList.remove("on"); document.body.style.overflow = ""; };
$("#closeFilters").onclick = closeFilters;
$("#showResults").onclick = closeFilters;
$("#scrim").addEventListener("click", closeFilters);

function filtered(){
  const q = state.q.toLowerCase();
  let list = PRODUCTS.filter(p =>
    (!state.type.size || state.type.has(p.type)) &&
    (!state.mood.size || p.moods.some(m => state.mood.has(m))) &&
    (!state.brand.size || state.brand.has(p.brand)) &&
    (!state.for.size || state.for.has(p.for)) &&
    p.price <= state.max &&
    (!q || [p.name,p.brand,p.desc,...p.notes].join(" ").toLowerCase().includes(q)));
  const s = state.sort;
  if (s === "low") list.sort((a,b)=>a.price-b.price);
  if (s === "high") list.sort((a,b)=>b.price-a.price);
  if (s === "az") list.sort((a,b)=>a.name.localeCompare(b.name));
  return list;
}

function update(){
  const list = filtered();
  $("#grid").innerHTML = list.map(cardHTML).join("");
  $("#empty").hidden = list.length > 0;
  $("#resultCount").textContent = `${list.length} ${list.length === 1 ? "fragrance" : "fragrances"}`;
  $("#fPriceVal").textContent = naira(state.max);
  $("#showResults").textContent = `Show ${list.length} results`;

  // pills
  const pills = [];
  ["type","mood","brand","for"].forEach(k => state[k].forEach(v => pills.push([k, v, k==="type" ? TYPES[v] : k==="mood" ? MOODS[v] : v])));
  if (state.max < 30000) pills.push(["max", "", `Under ${naira(state.max)}`]);
  if (state.q) pills.push(["q", "", `“${state.q}”`]);
  $("#activePills").innerHTML = pills.map(([k,v,l]) => `<button class="pill" data-pk="${k}" data-pv="${esc(v)}">${esc(l)}<span aria-hidden="true">×</span></button>`).join("");

  // heading: reflect a single category/mood
  let title = "All fragrances", sub = "Every bottle, hand-picked. Filter by mood, brand or who it's for.";
  if (state.type.size === 1 && pills.length === 1){ title = TYPES[[...state.type][0]]; sub = title === "Perfume Oils" ? "Rich, alcohol-free and long-lasting. A little goes a long way." : "Eau de parfums that last — from soft and sweet to bold and smoky."; }
  else if (state.mood.size === 1 && pills.length === 1){ title = MOODS[[...state.mood][0]]; sub = "Scents picked to match the mood."; }
  else if (state.q){ title = `Results for “${state.q}”`; sub = "Not what you wanted? Try another word or browse everything."; }
  $("#shopTitle").textContent = title; $("#shopSub").textContent = sub; $("#crumbNow").textContent = title === "All fragrances" ? "Shop" : title;
  document.title = `${title} — Naya's Essence`;

  // url
  const u = new URLSearchParams();
  ["type","mood","brand","for"].forEach(k => state[k].forEach(v => u.append(k, v)));
  if (state.max < 30000) u.set("max", state.max);
  if (state.q) u.set("q", state.q);
  if (state.sort !== "featured") u.set("sort", state.sort);
  history.replaceState(null, "", u.toString() ? `?${u}` : location.pathname);
}
update();
