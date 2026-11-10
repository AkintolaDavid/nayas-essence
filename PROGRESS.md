# Naya's Essence website — progress

Static site. Pages: index.html (home), shop.html (collection, filters in URL), product.html?id=<id>.
Shared: data.js (PRODUCTS — edit here), common.js (header/footer/bag/search/subscribe injected on every page), styles.css.
Page scripts: home.js, shop.js, product.js. Run: `python3 -m http.server 5173` → http://localhost:5173
Brand: deep green #123b2c + beige #f3ece0, gold accent #c4a26a. Fonts: Cormorant Garamond + Jost.
Images pulled from IG @nayas_essence (low-res ~480px) → assets/img. raw/ = originals.

## Done (2026-11-10)
- Home: hero, brand marquee, shop-by-mood, shop grid (filters/sort), product popup, search,
  bag (saved in browser) with WhatsApp checkout (wa.me/2349021814016), scent-finder quiz, story, IG strip, footer.

## To confirm with Naya
- Real prices, sizes, notes (all in PRODUCTS at top of app.js are placeholders)
- Brand of Nyla / Al Faris / Kaly, name of the perfume oil
- High-res photos + logo file (current logo is 150px)
- Newsletter form doesn't send anywhere yet
- Domain + hosting (Netlify/Vercel is free and easy)

## v2 (2026-11-10)
- Added collection page, product pages, floating 'Join the list' subscribe button (bottom-left) + popup.
- Subscribe forms don't send anywhere yet — hook to Mailchimp/Google Sheet.
- Products can take `images: [..]` for a gallery once Naya sends more photos.

## Hosting
- Live: https://akintoladavid.github.io/nayas-essence/ (GitHub Pages, repo AkintolaDavid/nayas-essence, branch main)
- To update: commit + `git push` — Pages rebuilds in ~1 min.
