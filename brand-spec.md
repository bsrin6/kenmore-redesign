# Brand spec (prototype)

## Assets

- **Logo:** Kenmore wordmark SVG (black), loaded from `https://kenmore-interim-image-store.s3.us-east-2.amazonaws.com/Kenmore_Wordmark_Logo_Black_RGB.svg` (the file kenmore.com uses) and inverted with CSS on dark backgrounds. If it can't load, a text wordmark appears instead.
- **Product imagery:** loaded from Kenmore's own hosts, listed per product in `shared/data.js` and `SOURCES.md`.
- **Lifestyle imagery (supplied by the client):** `assets/img/lifestyle-kitchen.jpg`, `lifestyle-laundry.jpg`, `lifestyle-dishwasher.jpg`, `story-dinner.jpg` (stock photo, licence pending).
- **Type:** Montserrat (Google Fonts), taken from the Urban Suite concepts.
- **Colour sources:** the Urban Suite concepts (carbon #000, charcoal #60605B, platinum #AFAAA3, heritage #D1CCBF, navy #00205B, blue #007CBA).

## V1 · The Considered Home

- **Design read:** premium editorial shopping for homeowners. Visual variance 6, motion 4, density 4, asset dependence 8, brand fidelity 8.
- **Colour:** bg #0C0C0B · surfaces #141412 / #1B1A18 / #24221F · product plate #E9E5DC · text #EDEAE3 / #B9B4AA / #948F86 · heritage #D1CCBF (primary buttons) · link and focus #5DB8E8
- **Type:** Montserrat 300 display at 2.4–4.6rem, sentence case with italic emphasis · 600 tracked eyebrows at .74rem · 16px body
- **Space:** 8px base · sections 80–144px · gutter clamp(16px, 4vw, 56px)
- **Radius:** 0 · no drop shadows except on overlays · 1px hairlines at 14% heritage
- **Motion:** fade plus a 16px rise, .8s cubic-bezier(.2,.65,.2,1), 90ms stagger · hero collage parallax at up to ±5% of scroll (off with reduced motion) · rules draw in with scaleX

## V2 · Made for Real Life

- **Design read:** confident, task-first shopping. Visual variance 5, motion 6, density 7, asset dependence 8, brand fidelity 8.
- **Colour:** bg #101113 · surfaces #181A1D / #202327 / #2A2E33 · product plate #F2F3F4 · text #F3F4F5 / #B6BAC0 / #8E949B · Kenmore blue #007CBA, with #0A6FA6 for filled buttons carrying white text · highlight #5DB8E8
- **Type:** Montserrat 800 uppercase display at 2.5–5.6rem, tracking −.02em · 700 UI labels · 16px body
- **Space:** 8px base · modules with 12–18px gaps · sections 56–104px
- **Radius:** 10px modules · 999px pills and buttons · depth from stepped surfaces
- **Motion:** headlines slide up from a mask (.8s), products switch in the hero (150ms out, 400ms in), grids fade out over 120ms then stagger in at 40ms per card, spec numbers count up over 700ms on reveal
