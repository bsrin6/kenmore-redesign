# Kenmore shopping redesign: two connected prototypes

## Open it on a Mac

1. Unzip `kenmore-prototypes.zip`. You'll get a folder called `kenmore-prototypes`.
2. Double-click **`index.html`** in that folder. It opens in your default browser (Safari or Chrome) and lets you choose V1 or V2.
   - You can also open `v1/index.html` or `v2/index.html` directly.
3. Stay online. Product photos, the Kenmore logo and the Montserrat font load from Kenmore's servers and Google Fonts. Without a connection, the pages still work but show labelled image placeholders.

No install, build step or server is needed. Each page is a small local app with hash routing (for example `v2/index.html#/c/laundry`), so browser Back and Forward, refresh and bookmarks all work. If your browser blocks local files, run `python3 -m http.server` inside the folder and visit `http://localhost:8000`.

## Page map (both versions)

| Route | Page |
|---|---|
| `#/` | Homepage: hero, shop by category, featured products from 5 categories, home-living stories, Where to Buy, customer care, footer |
| `#/c/refrigerators` | Refrigerators: French Door, Side-by-Side, Bottom Freezer, Top Freezer, Mini Fridges |
| `#/c/ranges` | Ranges (Cooking): Electric, Gas |
| `#/c/dishwashers` | Dishwashers: UltraWash® System, UltraWash® Plus |
| `#/c/laundry` | Washers & Dryers: Front Load Washers, Top Load Washers, Electric Dryers, Gas Dryers |
| `#/c/floorcare` | Vacuums & Floor Care: Upright, Canister, Stick & Cordless, Carpet Cleaners |
| `#/p/<model>` | Product detail pages. Full pages: 46-75525, 46-61335, 46-75635, 22-96853, 22-95163, 22-75293, 22-14625, 26-41202, 26-81202, BC4030. The other 55 products open a shorter page built from their listing data, with a link to the live page. |
| `#/search?q=` | Search results by product name or model number, with a no-results state |
| `#/compare` | V2 only: full compare page. V1 compares in a dialog instead. |

Categories without a prototype page (Microwaves, Cookware, Small Kitchen Appliances, Room Air Conditioners, Air Purifiers, Water Softeners, Indoor Fans & Heaters, Heating & Cooling PDF, and parts pages) open their real Kenmore or partner pages in a new tab. They're marked with the destination domain and an external-link icon.

## Filters per category (only verified data)

- **Refrigerators:** type, capacity band, finish, counter-depth, ice maker, ENERGY STAR®
- **Ranges:** fuel, cooktop (induction, smoothtop, gas burners), oven capacity band, True Convection, Air Fry, Self-Clean, Steam Clean, front or rear controls
- **Dishwashers:** wash system, SmartWash®, TurboDry™, third rack, finish
- **Washers & Dryers:** type, capacity band, steam, Accela Wash®, sensor drying, compact, finish
- **Floor Care:** type, corded or cordless, bagged or bagless, HEPA (only where the page says HEPA), pet-focused, Hair Eliminator®

Sorting options are Featured, Capacity (high to low and low to high, appliances only), Name and Model number. Filter and sort state is kept in the URL.

Compare takes up to 3 products from one category, using the same verified attributes. "Not stated" means the source page doesn't mention the attribute, not that the product lacks it.

## How the versions differ

| | V1 · The Considered Home | V2 · Made for Real Life |
|---|---|---|
| Palette & type | Carbon #0C0C0B, heritage #D1CCBF, sharp corners, Montserrat 300 in sentence case | Graphite #101113, Kenmore blue #007CBA / #0A6FA6, 10px radii and pills, Montserrat 800 uppercase |
| Header & menu | Two-pane mega menu: groups on the left, links and an image on the right; search opens in an overlay | Every menu group visible at once with product-image heads; search suggestions drop down as you type |
| Homepage | Editorial hero collage with restrained parallax, a large and small category grid, 5 featured products, magazine-style stories | Hero with a category switcher showing a real product, model-lookup and ZIP boxes, sticky section pills, category tiles, 8-product grid, story tiles |
| Category page | Intro with a lifestyle image, image tiles for subcategories, sticky sidebar filters, 3-column grid, compare in a dialog | Subcategory chips, sticky horizontal filter bar with pop-over menus, 4- or 5-column grid, compare bar leading to a compare page |
| Product page | Vertical thumbnail gallery with a sticky summary, large overview text, numbered features, spec sections that expand and collapse | Full-width gallery with a filmstrip, big key-spec tiles with a count-up, feature tiles, spec tables, sticky buy bar |
| Motion idea | Staged fade-ins, parallax on the hero collage, divider lines that draw in | Headlines slide up line by line, products switch in the hero, grids animate between categories, spec numbers count up |

Both versions: the page loads in a short, staged sequence, sections reveal once as they scroll into view, filters respond immediately, and `prefers-reduced-motion` turns motion off. If the app script fails, a fallback timer removes the animation class so content isn't left hidden.

## Folder contents

```
index.html            version chooser
v1/index.html  v1/styles.css  v1/app.js
v2/index.html  v2/styles.css  v2/app.js
shared/data.js        product catalog + category and menu config (shared by both versions)
shared/core.js        routing, filtering, sorting, search, compare, motion helpers
assets/img/           lifestyle and story photos you supplied
brand-spec.md         design tokens and asset list per version
SOURCES.md            every product with its source URL
```

## Needs approval before production

- **Lifestyle photos you supplied** (kitchen, laundry, dishwasher, and the stock photo of a woman cooking): confirm rights. The stock photo is labelled "licence pending".
- **Higher-resolution hero and category imagery:** the supplied files are 800–1,100px wide.
- **Prototype copy:** headlines ("A calmer way to shop for home", "Made for real life."), the short product descriptions, feature summaries and category introductions. The descriptions are condensed from Kenmore's own page text.
- **Accent colours:** the darker blue #0A6FA6 (used so white text passes contrast) and the heritage tones.
- **Live connections:** the store-locator integration behind the ZIP box (it currently shows a prototype response), the Heating & Cooling brochure link, and a decision on whether floor-care prices should appear once the kenmorefloorcare.com listing and product pages agree.
- **Specifications:** full spec tables and dimensions. Kenmore's spec sections didn't come through when the pages were read, so the specs shown come from Kenmore's product-page text and PDFs.
