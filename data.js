// ===== PRODUCTS =====
// TODO: confirm real prices, sizes and notes with Naya before launch.
const WA = "2349021814016";
const IG = "https://www.instagram.com/nayas_essence/";
const MOODS = { sweet:"Sweet & Cosy", fresh:"Bright & Fruity", woody:"Bold & Woody", floral:"Soft & Floral" };
const TYPES = { perfume:"Perfumes", oil:"Perfume Oils" };
const PRODUCTS = [
  { id:"nyla", name:"Nyla", brand:"Arabian Collection", type:"perfume", moods:["sweet","floral"], price:28000, size:"100ml EDP", img:"nyla.jpg", tag:"Bestseller", for:"Women", lasting:"8–10 hrs",
    desc:"Warm, golden and quietly seductive. A soft amber-floral that lingers beautifully on skin.", notes:["Saffron, pear","Rose, jasmine","Amber, vanilla, musk"] },
  { id:"smoky", name:"Smoky", brand:"Maison Alhambra", type:"perfume", moods:["woody"], price:22000, size:"100ml EDP", img:"smoky.jpg", for:"Unisex", lasting:"8–10 hrs",
    desc:"Smouldering and confident. Smoky woods wrapped in a warm, spicy glow — made for evenings.", notes:["Spices, bergamot","Tobacco, incense","Woods, vanilla"] },
  { id:"mango-ice", name:"Mango Ice", brand:"Gulf Orchid", type:"perfume", moods:["fresh","sweet"], price:25000, size:"100ml EDP", img:"mango-ice.jpg", tag:"New", for:"Unisex", lasting:"6–8 hrs",
    desc:"Juicy ripe mango over a cool, creamy base. Sunny, playful and impossible not to compliment.", notes:["Mango, citrus","Tropical fruits","Musk, creamy woods"] },
  { id:"coco-blanc", name:"Coco Blanc", brand:"Gulf Orchid", type:"perfume", moods:["sweet"], price:24000, size:"100ml EDP", img:"coco-blanc.jpg", for:"Women", lasting:"6–8 hrs",
    desc:"Creamy coconut and soft vanilla — like a beach holiday in a bottle. Cosy, clean and addictive.", notes:["Coconut milk","White flowers","Vanilla, musk"] },
  { id:"al-faris", name:"Al Faris", brand:"Arabian Collection", type:"perfume", moods:["woody","fresh"], price:26000, size:"100ml EDP", img:"al-faris.jpg", for:"Men", lasting:"8–10 hrs",
    desc:"Bold and noble, like its horseman name. Fresh spice opening that settles into rich woods.", notes:["Citrus, spice","Lavender, florals","Oud, amber"] },
  { id:"yara", name:"Yara Collection", brand:"Lattafa", type:"perfume", moods:["floral","sweet"], price:30000, size:"100ml EDP", img:"yara-trio.jpg", tag:"Fan favourite", for:"Women", lasting:"6–8 hrs",
    desc:"The viral trio — Yara, Yara Moi and Yara Tous. Soft, creamy and girly with a sweet tropical twist.", notes:["Orchid, tangerine","Heliotrope, gourmand","Vanilla, musk"] },
  { id:"ellwood", name:"Ellwood", brand:"Rayhaan", type:"perfume", moods:["woody","fresh"], price:23000, size:"100ml EDP", img:"ellwood.jpg", for:"Men", lasting:"6–8 hrs",
    desc:"Clean, polished and effortlessly masculine. An everyday woody scent that works from desk to dinner.", notes:["Bergamot, pepper","Vetiver, cedar","Ambergris, musk"] },
  { id:"kaly", name:"Kaly Collection", brand:"Arabian Collection", type:"perfume", moods:["floral","fresh"], price:20000, size:"EDP", img:"kaly.jpg", for:"Women", lasting:"5–7 hrs",
    desc:"Pretty, modern florals in three moods — fresh lemon, soft rose and a sweet pink blend.", notes:["Lemon, berries","Rose, peony","Musk, sugar"] },
  { id:"golden-oil", name:"Golden Perfume Oil", brand:"Naya's Essence", type:"oil", moods:["sweet","woody"], price:8000, size:"Concentrated oil", img:"oil.jpg", for:"Unisex", lasting:"10–12 hrs",
    desc:"Rich, alcohol-free perfume oil that sits close to the skin and lasts all day. A little goes a long way.", notes:["Amber","Soft florals","Oud, vanilla"] },
];
