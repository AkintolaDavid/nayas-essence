// Home page: featured products, Instagram strip, scent finder quiz.
const FEATURED = ["nyla", "mango-ice", "yara", "smoky"];
$("#featured").innerHTML = FEATURED.map((id, i) => cardHTML(byId(id), i)).join("");

$("#igGrid").innerHTML = ["nyla","kaly","coco-blanc","ellwood","mango-ice","yara-trio"]
  .map(f => `<a href="${IG}" target="_blank" rel="noopener"><img src="assets/img/${f}.jpg" alt="" loading="lazy"></a>`).join("");

const QUIZ = [
  { q:"When do you want to wear it most?", o:[["Every day","Office, errands, school",{fresh:1,floral:1}],["Date night","Make an entrance",{woody:1,sweet:1}],["Weekends","Soft and cosy",{sweet:2}],["Special events","Leave a trail",{woody:2}]] },
  { q:"Pick a vibe you're drawn to.", o:[["Fresh & juicy","Fruit, citrus, sunshine",{fresh:2}],["Sweet & creamy","Vanilla, coconut",{sweet:2}],["Soft & pretty","Flowers, powder, musk",{floral:2}],["Deep & smoky","Woods, oud, spice",{woody:2}]] },
  { q:"How strong should it be?", o:[["Skin-close","Only you notice",{floral:1,fresh:1}],["Noticeable","Compliments, not complaints",{sweet:1,fresh:1}],["Powerful","Fills the room",{woody:1,sweet:1}],["Oil, not spray","Long-lasting perfume oil",{oil:3}]] },
];
let step = 0, score = {};
function renderQuiz(){
  const z = $("#quiz");
  if (step < QUIZ.length){
    const s = QUIZ[step];
    z.innerHTML = `<div class="q-bar"><i style="width:${(step/QUIZ.length)*100}%"></i></div>
      <div class="q-step">Question ${step+1} of ${QUIZ.length}</div>
      <div class="q-title">${s.q}</div>
      <div class="q-opts">${s.o.map((o,i)=>`<button class="q-opt" data-o="${i}">${o[0]}<small>${o[1]}</small></button>`).join("")}</div>`;
    z.querySelectorAll("[data-o]").forEach(b => b.onclick = () => {
      Object.entries(s.o[+b.dataset.o][2]).forEach(([k,v]) => score[k] = (score[k]||0) + v);
      step++; renderQuiz();
    });
  } else {
    const ranked = PRODUCTS.map(p => ({p, s: p.moods.reduce((a,m)=>a+(score[m]||0),0) + (p.type==="oil" ? (score.oil||0) : 0)}))
      .sort((a,b)=>b.s-a.s).slice(0,2).map(x=>x.p);
    z.innerHTML = `<div class="q-bar"><i style="width:100%"></i></div>
      <div class="q-step">Your matches</div>
      <div class="q-title">We think you'll love these.</div>
      <div class="q-res">${ranked.map(p=>`<a class="r" href="${productUrl(p.id)}"><img src="${img(p.img)}" alt=""><div><b>${p.name}</b><small>${naira(p.price)}</small></div></a>`).join("")}</div>
      <button class="link-btn" id="qAgain">Start again</button>`;
    $("#qAgain").onclick = () => { step = 0; score = {}; renderQuiz(); };
  }
}
renderQuiz();
