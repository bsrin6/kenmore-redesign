/* Kenmore prototype catalog.
   Every product, model number, image URL, feature and document link below was read from
   kenmore.com / kenmorefloorcare.com product and category pages on 24 Sep 2026.
   No prices are included: kenmore.com shows none, and kenmorefloorcare.com prices were
   inconsistent between listing and product pages, so they are not treated as verifiable. */
(function (G) {
  var S3 = 'https://kenmore-brand-prod.s3.us-east-2.amazonaws.com/';
  var CF = 'https://dlcyks31rxhu3.cloudfront.net/';
  var SH = 'https://c.shld.net/rpx/i/s/i/spin/';
  var BC = 'https://cdn11.bigcommerce.com/s-d5fqfj6uoe/images/stencil/1280x1280/products/';
  var KM = 'https://www.kenmore.com';
  var FC = 'https://kenmorefloorcare.com';
  var WTB = KM + '/where-to-buy/us';
  var WARRANTY = { label: 'Warranty information', url: KM + '/warranty-information/' };
  function cf(key) { return CF + key; }

  /* ---------- Category definitions (reusable template config) ---------- */
  var categories = {
    refrigerators: {
      id: 'refrigerators', name: 'Refrigerators', group: 'Refrigeration',
      crumbs: [['Refrigeration', null]],
      intro: 'Full-size French door, side-by-side, bottom- and top-freezer models, plus compact fridges for small spaces.',
      live: KM + '/products/refrigeration/refrigerators',
      hero: '../assets/img/lifestyle-kitchen.jpg',
      subs: [
        { id: 'french-door', name: 'French Door', img: S3 + 'CJmaqVosiTL9woC3injU1ubj', live: KM + '/products/refrigeration/refrigerators/french-door-refrigerators' },
        { id: 'side-by-side', name: 'Side-by-Side', img: SH + '10125306/prod_27973151812', live: KM + '/products/refrigeration/refrigerators/side-by-side-refrigerators' },
        { id: 'bottom-freezer', name: 'Bottom Freezer', img: SH + '10673315/prod_27973133212', live: KM + '/products/refrigeration/refrigerators/bottom-freezer-refrigerators' },
        { id: 'top-freezer', name: 'Top Freezer', img: S3 + 'AvtWUPGShtiDP6DdteNNuQSL', live: KM + '/products/refrigeration/refrigerators/top-freezer-refrigerators' },
        { id: 'mini', name: 'Mini Fridges', img: S3 + 'TvRsNp4QgqVaVTj5GBbWfEpm', live: KM + '/products/refrigeration/refrigerators/mini-fridges' }
      ],
      extraLinks: [{ name: 'Refrigerator Parts & Accessories', url: KM + '/products/refrigeration/refrigerators/refrigerator-parts-and-accessories' }],
      filters: [
        { key: 'sub', label: 'Type', type: 'sub' },
        { key: 'capBand', label: 'Capacity', options: ['Under 10 cu. ft.', '15–19.9 cu. ft.', '20–24.9 cu. ft.', '25 cu. ft. and up'] },
        { key: 'finishGroup', label: 'Finish', options: ['Stainless steel', 'Black', 'White'] },
        { key: 'flags', label: 'Features', options: ['Counter-depth', 'Ice maker', 'ENERGY STAR®'] }
      ],
      compare: [['Type', 'subName'], ['Capacity', 'capText'], ['Width', 'widthText'], ['Finish', 'finish'], ['Counter-depth', 'f:Counter-depth'], ['Ice maker', 'f:Ice maker'], ['ENERGY STAR®', 'f:ENERGY STAR®']],
      capacity: true
    },
    ranges: {
      id: 'ranges', name: 'Ranges', group: 'Cooking',
      crumbs: [['Cooking', null]],
      intro: 'Electric, induction and gas ranges, many with True Convection, Air Fry and self-clean or steam-clean ovens.',
      live: KM + '/products/cooking/ranges/',
      subs: [
        { id: 'electric', name: 'Electric Ranges', img: S3 + 'AanqqaRT7yrQSs5SSk23bTN5', live: KM + '/products/cooking/ranges/electric-ranges' },
        { id: 'gas', name: 'Gas Ranges', img: S3 + 'd82MgphP7bSuyF3Hkus6gZS6', live: KM + '/products/cooking/ranges/gas-ranges' }
      ],
      extraLinks: [{ name: 'Range Parts & Accessories', url: KM + '/products/cooking/ranges/range-parts-and-accessories' }],
      filters: [
        { key: 'sub', label: 'Fuel', type: 'sub' },
        { key: 'cooktop', label: 'Cooktop', options: ['Induction', 'Smoothtop', 'Gas burners'] },
        { key: 'capBand', label: 'Oven capacity', options: ['Under 5 cu. ft.', '5–5.4 cu. ft.', '5.5 cu. ft. and up'] },
        { key: 'flags', label: 'Oven features', options: ['True Convection', 'Air Fry', 'Self-Clean', 'Steam Clean'] },
        { key: 'controls', label: 'Controls', options: ['Front', 'Rear'] }
      ],
      compare: [['Fuel', 'subName'], ['Cooktop', 'cooktop'], ['Oven capacity', 'capText'], ['Width', 'widthText'], ['Controls', 'controls'], ['True Convection', 'f:True Convection'], ['Air Fry', 'f:Air Fry'], ['Self-Clean', 'f:Self-Clean'], ['Steam Clean', 'f:Steam Clean']],
      capacity: true
    },
    dishwashers: {
      id: 'dishwashers', name: 'Dishwashers', group: 'Dishwashers',
      crumbs: [],
      intro: '24" built-in dishwashers with UltraWash® cleaning. Step up to UltraWash® Plus for TurboDry™ and a removable third rack.',
      live: KM + '/products/dishwashers/built-in-dishwashers',
      hero: '../assets/img/lifestyle-dishwasher.jpg',
      subs: [
        { id: 'ultrawash', name: 'UltraWash® System', img: S3 + 'DhJQauWv26jf4JMgtGNW4TtA', live: KM + '/products/dishwashers/built-in-dishwashers', filterAs: ['washSystem', 'UltraWash®'] },
        { id: 'ultrawash-plus', name: 'UltraWash® Plus', img: S3 + 'esLxb7mroAGnGd15SjURj64W', live: KM + '/products/dishwashers/built-in-dishwashers', filterAs: ['washSystem', 'UltraWash® Plus'] }
      ],
      filters: [
        { key: 'washSystem', label: 'Wash system', options: ['UltraWash®', 'UltraWash® Plus'] },
        { key: 'flags', label: 'Features', options: ['SmartWash®', 'TurboDry™', 'Third rack'] },
        { key: 'finishGroup', label: 'Finish', options: ['Stainless steel', 'Black', 'White'] }
      ],
      compare: [['Width', 'widthText'], ['Wash system', 'washSystem'], ['Finish', 'finish'], ['SmartWash®', 'f:SmartWash®'], ['TurboDry™', 'f:TurboDry™'], ['Third rack', 'f:Third rack'], ['Place settings', 'placeSettings'], ['Noise level', 'dba']],
      capacity: false, singleSubtype: true
    },
    laundry: {
      id: 'laundry', name: 'Washers & Dryers', short: 'Laundry', group: 'Laundry',
      crumbs: [['Laundry', null]],
      intro: 'Front-load and top-load washers, electric and gas dryers, and compact pairs that stack for small spaces.',
      live: KM + '/products/laundry',
      hero: '../assets/img/lifestyle-laundry.jpg',
      subs: [
        { id: 'front-washer', name: 'Front Load Washers', img: S3 + 'T3KXykGqVAwRsBNtWpQdmLjj', live: KM + '/products/laundry/washers/front-load-washers/' },
        { id: 'top-washer', name: 'Top Load Washers', img: S3 + 'C8Kp3kdWF2Vza29D3uKuMS5j', live: KM + '/products/laundry/washers/top-load-washers/' },
        { id: 'electric-dryer', name: 'Electric Dryers', img: S3 + '78mBicCojCWmyGe9WgvuejuE', live: KM + '/products/laundry/dryers/electric-dryers/' },
        { id: 'gas-dryer', name: 'Gas Dryers', img: S3 + 'AyPbUKuRytJGSnfcUkuFUkS7', live: KM + '/products/laundry/dryers/gas-dryers/' }
      ],
      filters: [
        { key: 'sub', label: 'Type', type: 'sub' },
        { key: 'capBand', label: 'Capacity', options: ['Under 4.5 cu. ft.', '4.5–6.9 cu. ft.', '7 cu. ft. and up'] },
        { key: 'flags', label: 'Features', options: ['Steam', 'Accela Wash®', 'Sensor drying', 'Compact'] },
        { key: 'finishGroup', label: 'Finish', options: ['White', 'Metallic silver'] }
      ],
      compare: [['Type', 'subName'], ['Capacity', 'capText'], ['Finish', 'finish'], ['Steam', 'f:Steam'], ['Accela Wash®', 'f:Accela Wash®'], ['Sensor drying', 'f:Sensor drying'], ['Compact', 'f:Compact']],
      capacity: true
    },
    floorcare: {
      id: 'floorcare', name: 'Vacuums & Floor Care', short: 'Floor Care', group: 'Floor Care',
      crumbs: [['Floor Care', null]],
      intro: 'Upright, canister, stick and hand vacuums, plus carpet cleaners, from Kenmore Floor Care.',
      live: FC + '/products/vacuums/',
      external: 'kenmorefloorcare.com',
      subs: [
        { id: 'upright', name: 'Upright', img: BC + '2245/4228/DU1099_hero_forward_with_tools_copy__86907.1705416235.jpg?c=1', live: FC + '/products/vacuums/upright-vacuums/' },
        { id: 'canister', name: 'Canister', img: BC + '5334/5849/BC4030_ATF_Hero_R1__56014.1718914459.jpg?c=1', live: FC + '/products/vacuums/canister-vacuums/' },
        { id: 'stick', name: 'Stick & Cordless', img: BC + '5004/5520/DS1035_ATF_Hero_R1__66981.1718651876.jpg?c=1', live: FC + '/products/vacuums/stick-and-cordless-vacuums/' },
        { id: 'carpet', name: 'Carpet Cleaners', img: BC + '6414/7662/Hero_Image_KW4010__04006.1723034718.jpg?c=1', live: FC + '/products/vacuums/carpet-cleaners/' }
      ],
      extraLinks: [
        { name: 'Steam Cleaners', url: FC + '/products/vacuums/steam-cleaners/' },
        { name: 'Wet/Dry Vacuums', url: FC + '/products/vacuums/wet-dry-vacuums/' },
        { name: 'Parts & Accessories', url: FC + '/products/parts-and-accessories/' }
      ],
      filters: [
        { key: 'sub', label: 'Type', type: 'sub' },
        { key: 'power', label: 'Power', options: ['Corded', 'Cordless'] },
        { key: 'bag', label: 'Bag', options: ['Bagged', 'Bagless'] },
        { key: 'flags', label: 'Features', options: ['HEPA', 'Pet-focused', 'Hair Eliminator®'] }
      ],
      compare: [['Type', 'subName'], ['Power', 'power'], ['Bag', 'bag'], ['HEPA', 'f:HEPA'], ['Pet-focused', 'f:Pet-focused'], ['Hair Eliminator®', 'f:Hair Eliminator®'], ['Weight (as stated)', 'weight']],
      capacity: false
    }
  };

  /* ---------- Mega menu: Kenmore's verified category structure ---------- */
  var menu = [
    { group: 'Refrigeration', img: S3 + 'CJmaqVosiTL9woC3injU1ubj', links: [
      { name: 'All Refrigerators', route: '#/c/refrigerators' },
      { name: 'French Door', route: '#/c/refrigerators?sub=french-door' },
      { name: 'Side-by-Side', route: '#/c/refrigerators?sub=side-by-side' },
      { name: 'Bottom Freezer', route: '#/c/refrigerators?sub=bottom-freezer' },
      { name: 'Top Freezer', route: '#/c/refrigerators?sub=top-freezer' },
      { name: 'Mini Fridges', route: '#/c/refrigerators?sub=mini' },
      { name: 'Parts & Accessories', url: KM + '/products/refrigeration/refrigerators/refrigerator-parts-and-accessories' }] },
    { group: 'Cooking', img: S3 + 'AanqqaRT7yrQSs5SSk23bTN5', links: [
      { name: 'All Ranges', route: '#/c/ranges' },
      { name: 'Electric Ranges', route: '#/c/ranges?sub=electric' },
      { name: 'Gas Ranges', route: '#/c/ranges?sub=gas' },
      { name: 'Microwaves', url: KM + '/products/cooking/microwaves' },
      { name: 'Cookware', url: KM + '/products/cooking/cookware-sets/' },
      { name: 'Small Kitchen Appliances', url: 'https://www.koolatron.com/collections/kenmore' }] },
    { group: 'Dishwashers', img: S3 + 'DhJQauWv26jf4JMgtGNW4TtA', links: [
      { name: 'Built-In Dishwashers', route: '#/c/dishwashers' },
      { name: 'UltraWash® Plus models', route: '#/c/dishwashers?washSystem=UltraWash%C2%AE%20Plus' }] },
    { group: 'Laundry', img: S3 + 'T3KXykGqVAwRsBNtWpQdmLjj', links: [
      { name: 'All Washers & Dryers', route: '#/c/laundry' },
      { name: 'Front Load Washers', route: '#/c/laundry?sub=front-washer' },
      { name: 'Top Load Washers', route: '#/c/laundry?sub=top-washer' },
      { name: 'Electric Dryers', route: '#/c/laundry?sub=electric-dryer' },
      { name: 'Gas Dryers', route: '#/c/laundry?sub=gas-dryer' }] },
    { group: 'Floor Care', img: BC + '5334/5849/BC4030_ATF_Hero_R1__56014.1718914459.jpg?c=1', links: [
      { name: 'All Vacuums', route: '#/c/floorcare' },
      { name: 'Upright Vacuums', route: '#/c/floorcare?sub=upright' },
      { name: 'Canister Vacuums', route: '#/c/floorcare?sub=canister' },
      { name: 'Stick & Cordless', route: '#/c/floorcare?sub=stick' },
      { name: 'Carpet Cleaners', route: '#/c/floorcare?sub=carpet' },
      { name: 'Kenmore Floor Care store', url: FC + '/' }] },
    { group: 'Air & Water', img: null, links: [
      { name: 'Room Air Conditioners', url: KM + '/products/air-and-water-treatment/room-air-conditioners' },
      { name: 'Air Purifiers', url: FC + '/products/air-purifiers/' },
      { name: 'Water Softeners', url: 'https://kenmorewatersolutions.com/?km0821' },
      { name: 'Indoor Fans & Heaters', url: 'https://www.kenmorehomecomfort.com/' },
      { name: 'Heating & Cooling (PDF brochure)', url: 'https://kenmore-interim-image-store.s3.us-east-2.amazonaws.com/2025_heating_and_cooling_brochure.pdf' }] }
  ];

  /* ---------- Products ---------- */
  var P = [];
  function add(o) { P.push(o); }

  // REFRIGERATORS
  add({ id: '46-75525', cat: 'refrigerators', sub: 'french-door', name: '17.5 cu. ft. French Door Refrigerator Fingerprint-Resistant Stainless Steel', img: S3 + 'CJmaqVosiTL9woC3injU1ubj', url: KM + '/products/refrigeration/refrigerators/french-door-refrigerators/175-cu-ft-french-door-refrigerator-fingerprint-resistant-stainless-steel',
    cap: 17.5, finish: 'Fingerprint-resistant stainless steel', flags: ['Counter-depth', 'Ice maker', 'ENERGY STAR®'], featured: 1,
    desc: 'Counter-depth French door fridge with a factory-installed icemaker and two-tier freezer drawer.',
    pdp: { images: [cf('eyJidWNrZXQiOiJrZW5tb3JlLWJyYW5kLXByb2QiLCJrZXkiOiJDSm1hcVZvc2lUTDl3b0MzaW5qVTF1YmoiLCJlZGl0cyI6eyJ3ZWJwIjp7InF1YWxpdHkiOjgwfX19'), cf('eyJidWNrZXQiOiJrZW5tb3JlLWJyYW5kLXByb2QiLCJrZXkiOiJ5RXdWTWs3N3MyUlREWmhqakJmRUVkTVYiLCJlZGl0cyI6eyJ3ZWJwIjp7InF1YWxpdHkiOjgwfX19'), cf('eyJidWNrZXQiOiJrZW5tb3JlLWJyYW5kLXByb2QiLCJrZXkiOiJDYmsxWjZQWDJuWmQ4Ynp0Y3dnbnBWNFUiLCJlZGl0cyI6eyJ3ZWJwIjp7InF1YWxpdHkiOjgwfX19'), cf('eyJidWNrZXQiOiJrZW5tb3JlLWJyYW5kLXByb2QiLCJrZXkiOiJBSjhLTlhxV3RGS1dzdlVKTGFHMU41V3QiLCJlZGl0cyI6eyJ3ZWJwIjp7InF1YWxpdHkiOjgwfX19'), cf('eyJidWNrZXQiOiJrZW5tb3JlLWJyYW5kLXByb2QiLCJrZXkiOiI0M3dKeXdIYzlMUERUektZZXdYaWFCd2kiLCJlZGl0cyI6eyJ3ZWJwIjp7InF1YWxpdHkiOjgwfX19'), cf('eyJidWNrZXQiOiJrZW5tb3JlLWJyYW5kLXByb2QiLCJrZXkiOiJvVEw1NlNYM29maXJwaU01RFlmdWZjZWkiLCJlZGl0cyI6eyJ3ZWJwIjp7InF1YWxpdHkiOjgwfX19'), cf('eyJidWNrZXQiOiJrZW5tb3JlLWJyYW5kLXByb2QiLCJrZXkiOiJKek1hTWY2RHBWcVpoNk5zeUplTG5jNVoiLCJlZGl0cyI6eyJ3ZWJwIjp7InF1YWxpdHkiOjgwfX19')],
      overview: 'Kenmore keeps you perfectly cool and perfectly organized. Store all your fresh and frozen favorite foods inside the fingerprint-resistant stainless steel 17.5 cu. ft. French door fridge. Whether you’ve just finished your weekly grocery shopping or you’re looking for a good midnight snack, this refrigerator comes with gallon-sized door bins and a two-tier freezer to keep everything cool and organized.',
      features: [['Inverter Compressor', 'Intelligently maintains a consistent temperature to keep food fresh. It’s also quieter, more energy efficient and operates with less wear and tear than conventional compressors.'], ['Fingerprint-resistant stainless steel', 'A special coating stands up to a busy household and cleans easily with a damp cloth.'], ['Multi-Flow Air System', 'Dual vents on every refrigerator shelf create even air distribution for long-lasting food freshness.'], ['Factory-installed icemaker', 'Produces up to 4 lbs. of crescent-shaped ice per day.'], ['Two-Tier Freezer Drawer', 'Keeps frozen favorites organized.'], ['Accela Chill', 'Plus clear gallon-size door bins, adjustable glass shelving, spacious crisper drawers and LED lighting.']],
      specs: { 'Capacity & design': { 'Total capacity': '17.5 cu. ft.', 'Style': 'French door', 'Depth': 'Counter-depth design', 'Finish': 'Fingerprint-resistant stainless steel' }, 'Cooling & ice': { 'Compressor': 'Inverter Compressor', 'Air system': 'Multi-Flow Air System', 'Icemaker': 'Factory-installed, up to 4 lbs. of crescent ice per day', 'Fast cooling': 'Accela Chill' }, 'Storage & lighting': { 'Freezer': 'Two-Tier Freezer Drawer', 'Door bins': 'Clear gallon-size door bins', 'Shelving': 'Adjustable glass shelving', 'Lighting': 'LED' }, 'Certifications': { 'ENERGY STAR®': 'Certified' } },
      docs: [{ label: 'Use & care guide (PDF)', url: 'https://i.sears.com/s/d/pdf/mp-tc/10672479/prod_27654852312' }, { label: 'EnergyGuide (PDF)', url: 'https://i.sears.com/s/d/pdf/mp-tc/10672479/prod_27654851912' }, WARRANTY] } });
  add({ id: 'KKFDR32.3X20-SS', cat: 'refrigerators', sub: 'french-door', name: '33 inch 18 Cu Ft Counter-Depth French Door Refrigerator, E-star', img: S3 + 'fmcMGPLCJbvRkf6jo4xTd2qz', url: KM + '/products/refrigeration/refrigerators/french-door-refrigerators/33-inch-18-cu-ft-counter-depth-french-door-refrigerator-e-star', cap: 18, width: 33, finish: '', flags: ['Counter-depth', 'ENERGY STAR®'], desc: '33" wide counter-depth French door refrigerator with 18 cu. ft. of storage.' });
  add({ id: '46-75615', cat: 'refrigerators', sub: 'french-door', name: '27.4 cu. ft. French Door Refrigerator Fingerprint-Resistant Stainless Steel', img: SH + '10672479/prod_27973146212', url: KM + '/products/refrigeration/refrigerators/french-door-refrigerators/274-cu-ft-french-door-refrigerator-fingerprint-resistant-stainless-steel', cap: 27.4, finish: 'Fingerprint-resistant stainless steel', flags: [], desc: 'Large-capacity French door refrigerator with 27.4 cu. ft. of storage.' });
  add({ id: '46-75665', cat: 'refrigerators', sub: 'french-door', name: '26.6 cu. ft. French Door Refrigerator Fingerprint-Resistant Stainless Steel', img: SH + '10673315/prod_27973153212', url: KM + '/products/refrigeration/refrigerators/french-door-refrigerators/266-cu-ft-french-door-refrigerator-fingerprint-resistant-stainless-steel', cap: 26.6, finish: 'Fingerprint-resistant stainless steel', flags: [], desc: 'French door refrigerator with 26.6 cu. ft. of storage.' });
  add({ id: '46-75685', cat: 'refrigerators', sub: 'french-door', name: '25.6 cu. ft. 4-Door French Door Refrigerator with FlexSpace Drawer Fingerprint-Resistant Stainless Steel', img: SH + '10673315/prod_27973152512', url: KM + '/products/refrigeration/refrigerators/french-door-refrigerators/256-cu-ft-4-door-french-door-refrigerator-with-flexspace-drawer-fingerprint-resistant-stainless-steel', cap: 25.6, finish: 'Fingerprint-resistant stainless steel', flags: [], desc: '4-door French door design with a FlexSpace drawer.' });
  add({ id: '46-51845', cat: 'refrigerators', sub: 'side-by-side', name: '29 cu. ft. Side-by-Side Refrigerator Fingerprint-Resistant Stainless Steel', img: SH + '10125306/prod_27973151812', url: KM + '/products/refrigeration/refrigerators/side-by-side-refrigerators/29-cu-ft-side-by-side-refrigerator-fingerprint-resistant-stainless-steel', cap: 29, finish: 'Fingerprint-resistant stainless steel', flags: [], desc: 'Side-by-side refrigerator with 29 cu. ft. of storage.' });
  add({ id: '46-75635', cat: 'refrigerators', sub: 'bottom-freezer', name: '17.8 cu. ft. Counter-Depth Bottom Freezer Refrigerator Fingerprint-Resistant Stainless Steel, ENERGY STAR®', img: SH + '10673315/prod_27973133212', url: KM + '/products/refrigeration/refrigerators/bottom-freezer-refrigerators/178-cu-ft-counter-depth-bottom-freezer-refrigerator-fingerprint-resistant-stainless-steel-energy-star174', cap: 17.8, width: 31, finish: 'Fingerprint-resistant stainless steel', flags: ['Counter-depth', 'Ice maker', 'ENERGY STAR®'],
    desc: 'Counter-depth bottom freezer in a 31" width, with an automatic ice maker and 3-tier freezer.',
    pdp: { images: [SH + '10673315/prod_27973133212', SH + '10673315/prod_27973132612', SH + '10673315/prod_27973132712', SH + '10673315/prod_27973132812', SH + '10673315/prod_27973132912', SH + '10673315/prod_27973133012', SH + '10673315/prod_27973133112'],
      overview: 'Upgrade your kitchen with this Kenmore bottom freezer refrigerator, featuring a sleek bottom mount freezer design and counter-depth styling. This ENERGY STAR® certified fridge offers 17.8 cu. ft. capacity, an automatic ice maker, inverter compressor for quiet efficiency, fingerprint-resistant stainless steel for easy cleaning, and three-tier freezer storage.',
      features: [['Swing-door bottom freezer', 'Drawer organization and wide-open access.'], ['31" space-saving width', '17.8 cu. ft. capacity with counter-depth styling.'], ['Accela Chill® and Accela Freeze®', 'Fan-forced cold air acceleration, and rapid freezing for newly added items.'], ['Automatic ice maker', 'Up to 3.5 lbs. of cubed ice daily.'], ['3-Tier Freezer', '2 drawers and 1 tray.'], ['Inverter Compressor & Eco Mode', 'Energy-saving features, with ENERGY STAR® certification.']],
      specs: { 'Capacity & design': { 'Total capacity': '17.8 cu. ft.', 'Width': '31"', 'Depth': 'Counter-depth styling', 'Doors': 'Reversible', 'Finish': 'Fingerprint-resistant stainless steel' }, 'Cooling & ice': { 'Compressor': 'Inverter Compressor', 'Fast cooling': 'Accela Chill®, Accela Freeze®', 'Ice maker': 'Automatic, up to 3.5 lbs. cubed ice daily', 'Energy': 'Eco Mode' }, 'Storage': { 'Freezer': '3-Tier (2 drawers, 1 tray)', 'Crispers': '2', 'Door bins': '5 clear bins, gallon-sized included', 'Shelving': 'Adjustable and full-width tempered glass', 'Lighting': 'LED' }, 'Certifications': { 'ENERGY STAR®': 'Certified' } },
      docs: [{ label: 'Use & care guide (PDF)', url: 'https://i.sears.com/s/d/pdf/mp-tc/10673315/prod_27973127812' }, { label: 'EnergyGuide (PDF)', url: 'https://i.sears.com/s/d/pdf/mp-tc/10673315/prod_27973129512' }, WARRANTY] } });
  add({ id: '46-75645', cat: 'refrigerators', sub: 'bottom-freezer', name: '22.3 cu. ft. Bottom Freezer Refrigerator Fingerprint-Resistant Stainless Steel & Pull-out Freezer Drawer, ENERGY STAR®', img: SH + '10673315/prod_27973134012', url: KM + '/products/refrigeration/refrigerators/bottom-freezer-refrigerators/223-cu-ft-bottom-freezer-refrigerator-fingerprint-resistant-stainless-steel-pull-out-freezer-drawer-energy-star174', cap: 22.3, finish: 'Fingerprint-resistant stainless steel', flags: ['ENERGY STAR®'], desc: 'Bottom freezer refrigerator with a pull-out freezer drawer.' });
  add({ id: '46-75475', cat: 'refrigerators', sub: 'bottom-freezer', name: '15.1 cu. ft. Bottom Freezer Refrigerator, ENERGY STAR® Fingerprint Resistant Stainless Steel', img: SH + '10672251/prod_27973221912', url: KM + '/products/refrigeration/refrigerators/bottom-freezer-refrigerators/151-cu-ft-bottom-freezer-refrigerator-energy-star174-fingerprint-resistant-stainless-steel', cap: 15.1, finish: 'Fingerprint-resistant stainless steel', flags: ['ENERGY STAR®'], desc: 'Compact-footprint bottom freezer refrigerator with 15.1 cu. ft. of storage.' });
  add({ id: '46-61335', cat: 'refrigerators', sub: 'top-freezer', name: '20.5 cu. ft. Top Freezer Refrigerator Stainless Steel w/Fingerprint Resistance', img: S3 + 'AvtWUPGShtiDP6DdteNNuQSL', url: KM + '/products/refrigeration/refrigerators/top-freezer-refrigerators/205-cu-ft-top-freezer-refrigerator-stainless-steel-wfingerprint-resistance', cap: 20.5, width: 33, finish: 'Stainless steel w/ fingerprint resistance', flags: ['ENERGY STAR®'], featured: 3,
    desc: 'Full-size 20.5 cu. ft. capacity in a 33" width, with humidity-controlled crispers.',
    pdp: { images: [cf('eyJidWNrZXQiOiJrZW5tb3JlLWJyYW5kLXByb2QiLCJrZXkiOiJBdnRXVVBHU2h0aURQNkRkdGVOTnVRU0wiLCJlZGl0cyI6eyJ3ZWJwIjp7InF1YWxpdHkiOjgwfX19'), cf('eyJidWNrZXQiOiJrZW5tb3JlLWJyYW5kLXByb2QiLCJrZXkiOiI3VlRGZGhSY1dteTM0UTk4TUNMV1ZWRjciLCJlZGl0cyI6eyJ3ZWJwIjp7InF1YWxpdHkiOjgwfX19'), cf('eyJidWNrZXQiOiJrZW5tb3JlLWJyYW5kLXByb2QiLCJrZXkiOiIxWXd0c0pSNWJZNmtFSzVIajg0cGJDM1MiLCJlZGl0cyI6eyJ3ZWJwIjp7InF1YWxpdHkiOjgwfX19'), cf('eyJidWNrZXQiOiJrZW5tb3JlLWJyYW5kLXByb2QiLCJrZXkiOiJwNUI1dFdvU2FxOXBwdXBBWW5hd0hvbzQiLCJlZGl0cyI6eyJ3ZWJwIjp7InF1YWxpdHkiOjgwfX19'), cf('eyJidWNrZXQiOiJrZW5tb3JlLWJyYW5kLXByb2QiLCJrZXkiOiJVcTQzMnFmUjFCNThTeGVlb1BTZFVMZ0MiLCJlZGl0cyI6eyJ3ZWJwIjp7InF1YWxpdHkiOjgwfX19'), cf('eyJidWNrZXQiOiJrZW5tb3JlLWJyYW5kLXByb2QiLCJrZXkiOiJ2NXZSMTNvY1dTTGdDS2NxcTNQdjhnRm0iLCJlZGl0cyI6eyJ3ZWJwIjp7InF1YWxpdHkiOjgwfX19'), cf('eyJidWNrZXQiOiJrZW5tb3JlLWJyYW5kLXByb2QiLCJrZXkiOiJUOUxWTmVuUWdha3pWQVRQWFdmOG9VVTgiLCJlZGl0cyI6eyJ3ZWJwIjp7InF1YWxpdHkiOjgwfX19')],
      overview: 'Kenmore makes it easy to organize your groceries and keep items fresh. There’s plenty of cold food storage space in this stylish 20.5 cu. ft. top freezer refrigerator featuring flexible storage options, including full-width glass shelves and adjustable humidity-controlled crisper bins.',
      features: [['Full-size capacity, 33" width', '20.5 cu. ft. of storage in a traditional standard-depth design.'], ['Fingerprint-resistant stainless steel', 'A finish that stays clean with less effort.'], ['Customizable shelving', 'Adjustable, full-width tempered glass shelves.'], ['Humidity-controlled crispers', 'Plus a dairy compartment with a clear cover.'], ['Door storage', '3 clear refrigerator door bins and 2 full-width freezer door bins.'], ['Optional icemaker', 'Up to 3 lbs. of ice per day, sold separately.']],
      specs: { 'Capacity & design': { 'Total capacity': '20.5 cu. ft.', 'Width': '33"', 'Depth': 'Traditional standard-depth', 'Handle': 'Flush-front design with pocket handle', 'Finish': 'Fingerprint-resistant stainless steel' }, 'Storage & lighting': { 'Shelves': 'Full-width tempered glass, adjustable', 'Crispers': 'Humidity-controlled', 'Door bins': '3 refrigerator, 2 freezer', 'Lighting': 'LED' }, 'Ice': { 'Icemaker': 'Optional, up to 3 lbs. per day' }, 'Certifications': { 'ENERGY STAR®': 'Certified' } },
      docs: [{ label: 'Use & care guide (PDF)', url: 'https://i.sears.com/s/d/pdf/mp-tc/10672550/prod_27603923012' }, { label: 'EnergyGuide (PDF)', url: 'https://i.sears.com/s/d/pdf/mp-tc/10672550/prod_27654673012' }, WARRANTY] } });
  add({ id: '46-62312', cat: 'refrigerators', sub: 'top-freezer', name: '18.2 cu. ft. Top Freezer Refrigerator White', img: S3 + '2hW54ZpLHk99vKyvZwFgFcEe', url: KM + '/products/refrigeration/refrigerators/top-freezer-refrigerators/182-cu-ft-top-freezer-refrigerator-white', cap: 18.2, finish: 'White', flags: [], desc: 'Top freezer refrigerator with 18.2 cu. ft. of storage.' });
  add({ id: '46-71339', cat: 'refrigerators', sub: 'top-freezer', name: '20.4 cu. ft. Top Freezer Refrigerator w/ Icemaker, 33" Wide Black', img: S3 + 'LebPriDrZzMfDcjpopJEoBVH', url: KM + '/products/refrigeration/refrigerators/top-freezer-refrigerators/204-cu-ft-top-freezer-refrigerator-w-icemaker-33-wide-black', cap: 20.4, width: 33, finish: 'Black', flags: ['Ice maker'], desc: '33" wide top freezer refrigerator with an icemaker.' });
  add({ id: '46-99119', cat: 'refrigerators', sub: 'mini', name: '4.5 cu. ft. Compact Refrigerator with Chiller Compartment, Glass Shelves & Can Rack Black', img: SH + '10672772/prod_27973126512', url: KM + '/products/refrigeration/refrigerators/mini-fridges/45-cu-ft-compact-refrigerator-with-chiller-compartment-glass-shelves-can-rack-black', cap: 4.5, finish: 'Black', flags: [], desc: 'Compact refrigerator with a chiller compartment, glass shelves and can rack.' });
  add({ id: 'KMR31TBKE', cat: 'refrigerators', sub: 'mini', name: 'Kenmore 3.1 Black Refrigerator', img: S3 + 'TvRsNp4QgqVaVTj5GBbWfEpm', url: KM + '/products/refrigeration/refrigerators/mini-fridges/kenmore-31-black-refrigerator', cap: 3.1, finish: 'Black', flags: [], desc: '3.1 cu. ft. compact refrigerator in black.' });

  // RANGES
  add({ id: '22-96853', cat: 'ranges', sub: 'electric', name: '5.6 cu. ft. Front-Control Electric Induction Range w/ Turbo Boil®, True Convection, Air Fry & Self-Clean Stainless Steel', img: S3 + 'AanqqaRT7yrQSs5SSk23bTN5', url: KM + '/products/cooking/ranges/electric-ranges/56-cu-ft-front-control-electric-induction-range-w-turbo-boil174-true-convection-air-fry-self-clean-stainless-steel', cap: 5.6, cooktop: 'Induction', controls: 'Front', finish: 'Stainless steel', flags: ['True Convection', 'Air Fry', 'Self-Clean'], featured: 2,
    desc: 'Induction cooktop with a 3,700W Turbo Boil® element, True Convection and Air Fry.',
    pdp: { images: [cf('eyJidWNrZXQiOiJrZW5tb3JlLWJyYW5kLXByb2QiLCJrZXkiOiJBYW5xcWFSVDd5clFTczVTU2syM2JUTjUiLCJlZGl0cyI6eyJ3ZWJwIjp7InF1YWxpdHkiOjgwfX19'), cf('eyJidWNrZXQiOiJrZW5tb3JlLWJyYW5kLXByb2QiLCJrZXkiOiJRTVdaZ0gzQkNuZ0NBcHdDZGJNTVFBUmoiLCJlZGl0cyI6eyJ3ZWJwIjp7InF1YWxpdHkiOjgwfX19'), cf('eyJidWNrZXQiOiJrZW5tb3JlLWJyYW5kLXByb2QiLCJrZXkiOiJxalFEMXBzc0xwSFpMaWUxU2pvSnZXa3oiLCJlZGl0cyI6eyJ3ZWJwIjp7InF1YWxpdHkiOjgwfX19'), cf('eyJidWNrZXQiOiJrZW5tb3JlLWJyYW5kLXByb2QiLCJrZXkiOiJlRFExUFdwUEhDWnJZdk5GQW5tRlhRTE0iLCJlZGl0cyI6eyJ3ZWJwIjp7InF1YWxpdHkiOjgwfX19'), cf('eyJidWNrZXQiOiJrZW5tb3JlLWJyYW5kLXByb2QiLCJrZXkiOiJwdlZIeDJ0emRQWDhrSzNudXJ1MThvM0ciLCJlZGl0cyI6eyJ3ZWJwIjp7InF1YWxpdHkiOjgwfX19'), cf('eyJidWNrZXQiOiJrZW5tb3JlLWJyYW5kLXByb2QiLCJrZXkiOiJqS0VLb0RkRzlna1MyVVFSb3BYRExrWXMiLCJlZGl0cyI6eyJ3ZWJwIjp7InF1YWxpdHkiOjgwfX19'), cf('eyJidWNrZXQiOiJrZW5tb3JlLWJyYW5kLXByb2QiLCJrZXkiOiJOQjVCODZnRFNTOXFrZjZiV3ZnR1JwZFUiLCJlZGl0cyI6eyJ3ZWJwIjp7InF1YWxpdHkiOjgwfX19')],
      overview: 'Discover the advantages of induction cooking with this Kenmore range. The induction cooktop is fast, precise, energy-efficient, and easy to clean. A powerful 3,700W Turbo Boil® element really turns up the heat for fast boiling, stir-frying and searing. True Convection ensures even baking on every rack and an air fry setting makes crispy appetizers. The self-clean oven saves time, and the storage drawer conveniently stores cookware.',
      features: [['Four induction elements', 'Multiple heat settings and sizes, with 4 dual-ring elements that adjust to fit different cookware.'], ['3,700W Turbo Boil®', 'Turns up the heat for fast boiling, stir-frying and searing.'], ['True Convection', 'A fan and third heating element preheat quickly and surround food with heat.'], ['Air Fry setting', 'Crispy results in the main oven.'], ['Self-clean cycle', 'Choose 2, 3 or 4 hours.'], ['Thoughtful details', 'Temperature probe, halogen oven light, large window, chrome racks and a storage drawer.']],
      specs: { 'Cooktop': { 'Type': 'Induction', 'Elements': '4, dual ring', 'Turbo Boil® element': '3,700 watts' }, 'Oven': { 'Capacity': '5.6 cu. ft.', 'Convection': 'True Convection', 'Air Fry': 'Yes', 'Self-clean': '2, 3 or 4 hour cycle', 'Temperature probe': 'Yes', 'Light': 'Halogen' }, 'Design': { 'Controls': 'Front', 'Storage': 'Storage drawer', 'Racks': 'Chrome', 'Finish': 'Stainless steel' } },
      docs: [{ label: 'Use & care guide (PDF)', url: 'https://i.sears.com/s/d/pdf/mp-tc/10672583/prod_27972876712' }, WARRANTY] } });
  add({ id: '22-96873', cat: 'ranges', sub: 'electric', name: '5 cu. ft. Front-Control Induction Range, True Convection and Air Fry', img: S3 + 'j9RsBJK9meNjBA3XiMvuaaBq', url: KM + '/products/cooking/ranges/electric-ranges/5-cu-ft-front-control-induction-range-true-convection-and-air-fry', cap: 5, cooktop: 'Induction', controls: 'Front', finish: '', flags: ['True Convection', 'Air Fry'], desc: 'Front-control induction range with True Convection and Air Fry.' });
  add({ id: '22-95163', cat: 'ranges', sub: 'electric', name: '4.8 cu. ft. Front-Control Electric Range with True Convection & Air Fry Stainless Steel', img: S3 + 'GX28zNus3ue3kyKhMXgDaNJP', url: KM + '/products/cooking/ranges/electric-ranges/48-cu-ft-front-control-electric-range-with-true-convection-air-fry-stainless-steel', cap: 4.8, controls: 'Front', finish: 'Stainless steel', flags: ['True Convection', 'Air Fry', 'Self-Clean', 'Steam Clean'],
    desc: 'Five cooktop elements with dual 3,000W Turbo Boil® elements, plus True Convection and Air Fry.',
    pdp: { images: [cf('eyJidWNrZXQiOiJrZW5tb3JlLWJyYW5kLXByb2QiLCJrZXkiOiJHWDI4ek51czN1ZTNreUtoTVhnRGFOSlAiLCJlZGl0cyI6eyJ3ZWJwIjp7InF1YWxpdHkiOjgwfX19'), cf('eyJidWNrZXQiOiJrZW5tb3JlLWJyYW5kLXByb2QiLCJrZXkiOiJodE45U1FiaXNNanBRcTlGTUV5TFNrTksiLCJlZGl0cyI6eyJ3ZWJwIjp7InF1YWxpdHkiOjgwfX19'), cf('eyJidWNrZXQiOiJrZW5tb3JlLWJyYW5kLXByb2QiLCJrZXkiOiJHNURiNzJVQ3JFNTFqek1wZ0E4ZGdXejUiLCJlZGl0cyI6eyJ3ZWJwIjp7InF1YWxpdHkiOjgwfX19'), cf('eyJidWNrZXQiOiJrZW5tb3JlLWJyYW5kLXByb2QiLCJrZXkiOiJzUEpXU1E3TDFGRFYyYVBtMjdoa1p1UUgiLCJlZGl0cyI6eyJ3ZWJwIjp7InF1YWxpdHkiOjgwfX19')],
      overview: 'A front-control electric range with a 4.8 cu. ft. oven, True Convection and Air Fry, five cooktop elements with seven power options, and both Self-Clean and Steam Clean.',
      features: [['True Convection', 'A third heating element behind an internal fan.'], ['Air Fry', 'Makes food crispy on the outside, tender on the inside.'], ['5 cooktop elements', '7 power options for cooking flexibility.'], ['Dual 3,000W Turbo Boil®', 'Two elements for fast boiling.'], ['Precise Set Controls', 'Intuitive controls with advanced cooking options.'], ['Warm Zone', 'Keeps cooked food warm and ready to serve.']],
      specs: { 'Cooktop': { 'Elements': '5, with 7 power options', 'Turbo Boil®': 'Dual 3,000 watt elements', 'Warm Zone': 'Yes' }, 'Oven': { 'Capacity': '4.8 cu. ft.', 'Convection': 'True Convection', 'Air Fry': 'Yes', 'Cleaning': 'Self-Clean and Steam Clean' }, 'Design': { 'Controls': 'Front, Precise Set Controls', 'Finish': 'Fingerprint-resistant stainless steel' } },
      docs: [{ label: 'Use & care guide (PDF)', url: 'https://i.sears.com/s/d/pdf/mp-tc/10672318/prod_27603662012' }, WARRANTY] } });
  add({ id: '22-96843', cat: 'ranges', sub: 'electric', name: '5.6 cu. ft. Front-Control Electric Range with True Convection, Air Fry, and Self-Clean Oven Stainless Steel', img: S3 + '58QQ6GsddxioEFU6xsj2dc1k', url: KM + '/products/cooking/ranges/electric-ranges/56-cu-ft-front-control-electric-range-with-true-convection-air-fry-and-self-clean-oven-stainless-steel', cap: 5.6, controls: 'Front', finish: 'Stainless steel', flags: ['True Convection', 'Air Fry', 'Self-Clean'], desc: '5.6 cu. ft. front-control electric range with True Convection, Air Fry and self-clean.' });
  add({ id: '22-96833', cat: 'ranges', sub: 'electric', name: '5.6 cu. ft. Front-Control Electric Range with True Convection, and Steam Clean Oven Stainless Steel', img: S3 + '5BnySLaZE3QiNM74XeWvCpzV', url: KM + '/products/cooking/ranges/electric-ranges/56-cu-ft-front-control-electric-range-with-true-convection-and-steam-clean-oven-stainless-steel', cap: 5.6, controls: 'Front', finish: 'Stainless steel', flags: ['True Convection', 'Steam Clean'], desc: 'Front-control electric range with True Convection and a steam-clean oven.' });
  add({ id: 'KKFTR4.8REARAFC-SS', cat: 'ranges', sub: 'electric', name: '30 inch 5 cu ft Rear Control Smooth Top Electric Range with Airfry and Convection', img: S3 + 'sxd3k7uJ8Jzp8Hg95ZVc4gvX', url: KM + '/products/cooking/ranges/electric-ranges/30-inch-5-cu-ft-rear-control-smooth-top-electric-range-with-airfry-and-convection', cap: 5, width: 30, cooktop: 'Smoothtop', controls: 'Rear', finish: '', flags: ['Air Fry'], desc: '30" rear-control smooth top electric range with Air Fry and convection.' });
  add({ id: '92223', cat: 'ranges', sub: 'electric', name: '5.2 cu. ft. Electric Range with Steam Clean Stainless Steel', img: S3 + 'tZxs5Y4s8KLHyQUaLG4wzkwj', url: KM + '/products/cooking/ranges/electric-ranges/52-cu-ft-electric-range-with-steam-clean-stainless-steel', cap: 5.2, finish: 'Stainless steel', flags: ['Steam Clean'], desc: '5.2 cu. ft. electric range with steam clean.' });
  add({ id: '22-91943', cat: 'ranges', sub: 'electric', name: '24" Wide Compact Front-Control Electric Range with 4 Burners & Storage Compartment Stainless Steel', img: SH + '10672251/prod_27973240312', url: KM + '/products/cooking/ranges/electric-ranges/24-wide-compact-front-control-electric-range-with-4-burners-storage-compartment-stainless-steel', width: 24, controls: 'Front', finish: 'Stainless steel', flags: [], desc: 'A 24" compact range with 4 burners and a storage compartment for small kitchens.' });
  add({ id: '22-75293', cat: 'ranges', sub: 'gas', name: '4.8 cu. ft. Front-Control Gas Range with True Convection & Air Fry Stainless Steel', img: S3 + 'd82MgphP7bSuyF3Hkus6gZS6', url: KM + '/products/cooking/ranges/gas-ranges/48-cu-ft-front-control-gas-range-with-true-convection-air-fry-stainless-steel', cap: 4.8, cooktop: 'Gas burners', controls: 'Front', finish: 'Stainless steel', flags: ['True Convection', 'Air Fry', 'Self-Clean', 'Steam Clean'],
    desc: 'Five burners including an 18,000 BTU Turbo Boil® burner, with True Convection and Air Fry.',
    pdp: { images: [cf('eyJidWNrZXQiOiJrZW5tb3JlLWJyYW5kLXByb2QiLCJrZXkiOiJkODJNZ3BoUDdiU3V5RjNIa3VzNmdaUzYiLCJlZGl0cyI6eyJ3ZWJwIjp7InF1YWxpdHkiOjgwfX19'), cf('eyJidWNrZXQiOiJrZW5tb3JlLWJyYW5kLXByb2QiLCJrZXkiOiJRVndZRDZZU0dGUFZROTl3YVdmY3kxNXMiLCJlZGl0cyI6eyJ3ZWJwIjp7InF1YWxpdHkiOjgwfX19'), cf('eyJidWNrZXQiOiJrZW5tb3JlLWJyYW5kLXByb2QiLCJrZXkiOiJlcmlVZDFhNGltY1NKeGdmRU1wTmVwaVAiLCJlZGl0cyI6eyJ3ZWJwIjp7InF1YWxpdHkiOjgwfX19'), cf('eyJidWNrZXQiOiJrZW5tb3JlLWJyYW5kLXByb2QiLCJrZXkiOiI0N3VucmNLR0VHdHR1R3dIcWM3ZThUR3giLCJlZGl0cyI6eyJ3ZWJwIjp7InF1YWxpdHkiOjgwfX19'), cf('eyJidWNrZXQiOiJrZW5tb3JlLWJyYW5kLXByb2QiLCJrZXkiOiJuZDFtbm1HZVg0TDdGOEFDaDZLSzJxYmQiLCJlZGl0cyI6eyJ3ZWJwIjp7InF1YWxpdHkiOjgwfX19'), cf('eyJidWNrZXQiOiJrZW5tb3JlLWJyYW5kLXByb2QiLCJrZXkiOiIxVmFUajh1Mm9RenJuVnBid1dQNkdSYXgiLCJlZGl0cyI6eyJ3ZWJwIjp7InF1YWxpdHkiOjgwfX19'), cf('eyJidWNrZXQiOiJrZW5tb3JlLWJyYW5kLXByb2QiLCJrZXkiOiJjdXYyRjd4V1dZSjQ0N0ZOMzNudnhQeDYiLCJlZGl0cyI6eyJ3ZWJwIjp7InF1YWxpdHkiOjgwfX19')],
      overview: 'A front-control gas range with five cooktop burners, an 18,000 BTU Turbo Boil® burner, a 4.8 cu. ft. oven with True Convection and Air Fry, and both Self-Clean and Steam Clean. LP kit included.',
      features: [['True Convection', 'A third heating element behind an internal fan.'], ['Air Fry', 'Crispy on the outside, tender on the inside.'], ['5 cooktop burners', 'For ultimate cooking flexibility.'], ['18,000 BTU Turbo Boil®', 'For ultra-fast boiling.'], ['Self-Clean and Steam Clean', 'Two ways to keep the oven clean.'], ['Everyday details', 'Halogen light, large viewing window, chrome racks, dishwasher-safe grates and a storage drawer.']],
      specs: { 'Cooktop': { 'Burners': '5', 'Turbo Boil® burner': '18,000 BTU', 'Grates': 'Dishwasher-safe' }, 'Oven': { 'Capacity': '4.8 cu. ft.', 'Convection': 'True Convection', 'Air Fry': 'Yes', 'Cleaning': 'Self-Clean and Steam Clean', 'Light': 'Halogen' }, 'Design': { 'Controls': 'Front, Precise Set Controls', 'Finish': 'Fingerprint-resistant stainless steel', 'Included': 'LP kit' } },
      docs: [{ label: 'Use & care guide (PDF)', url: 'https://i.sears.com/s/d/pdf/mp-tc/10672318/prod_27603662212' }, WARRANTY] } });
  add({ id: '22-76853', cat: 'ranges', sub: 'gas', name: '5.6 cu. ft. Front-Control Gas Range with 5 Burners, True Convection, Air Fry and Self-Clean Stainless Steel', img: S3 + '3UagxUoVZooVjgfHyegzrzzv', url: KM + '/products/cooking/ranges/gas-ranges/56-cu-ft-front-control-gas-range-with-5-burners-true-convection-air-fry-and-self-clean-stainless-steel', cap: 5.6, cooktop: 'Gas burners', controls: 'Front', finish: 'Stainless steel', flags: ['True Convection', 'Air Fry', 'Self-Clean'], desc: '5-burner gas range with True Convection, Air Fry and self-clean.' });
  add({ id: '22-76843', cat: 'ranges', sub: 'gas', name: '5.6 cu. ft. Front-Control Gas Range with 5 Burners, Convection, Air Fry, and Self-Clean Stainless Steel', img: S3 + 'SntG1qp9SdfH9SPg5XjSoJR9', url: KM + '/products/cooking/ranges/gas-ranges/56-cu-ft-front-control-gas-range-with-5-burners-convection-air-fry-and-self-clean-stainless-steel', cap: 5.6, cooktop: 'Gas burners', controls: 'Front', finish: 'Stainless steel', flags: ['Air Fry', 'Self-Clean'], desc: '5-burner gas range with convection, Air Fry and self-clean.' });
  add({ id: '22-76083', cat: 'ranges', sub: 'gas', name: '5.2 cu. ft. Gas Range with Steam Clean Stainless Steel', img: SH + '10672926/prod_27973068112', url: KM + '/products/cooking/ranges/gas-ranges/52-cu-ft-gas-range-with-steam-clean-stainless-steel', cap: 5.2, cooktop: 'Gas burners', finish: 'Stainless steel', flags: ['Steam Clean'], desc: '5.2 cu. ft. gas range with steam clean.' });

  // DISHWASHERS
  var DW = KM + '/products/dishwashers/built-in-dishwashers/';
  function dw(id, sys, fin, slug, img, flags, extra) { var o = { id: id, cat: 'dishwashers', sub: 'built-in', name: '24" Built-in Dishwasher with ' + (sys === 'UltraWash®' ? 'UltraWash® System and SmartWash®' : slug.indexOf('turbodry') > -1 ? 'UltraWash® Plus System and TurboDry' : 'UltraWash® Plus System and Removable 3rd Rack') + ' ' + fin, img: S3 + img, url: DW + slug, width: 24, washSystem: sys, finish: fin, flags: flags }; for (var k in extra || {}) o[k] = extra[k]; add(o); }
  dw('22-14585', 'UltraWash®', 'Stainless Steel w/ Fingerprint Resistance', '24-built-in-dishwasher-with-ultrawash174-system-and-smartwash174-stainless-steel-w-fingerprint-resistance', 'DhJQauWv26jf4JMgtGNW4TtA', ['SmartWash®'], { desc: 'UltraWash® cleaning with the SmartWash® sensor cycle.' });
  dw('22-14582', 'UltraWash®', 'White', '24-built-in-dishwasher-with-ultrawash174-system-and-smartwash174-white', 'fNwvQ9Fg7gMCxFdnphreQtd5', ['SmartWash®'], { desc: 'UltraWash® cleaning with the SmartWash® sensor cycle.' });
  dw('22-14589', 'UltraWash®', 'Black', '24-built-in-dishwasher-with-ultrawash174-system-and-smartwash174-black', '1dDb9y1QnqWMrvUkw6SDkBcs', ['SmartWash®'], { desc: 'UltraWash® cleaning with the SmartWash® sensor cycle.' });
  dw('22-14595', 'UltraWash®', 'Stainless Steel w/ Fingerprint Resistance', '24-built-in-dishwasher-with-ultrawash174-system-and-smartwash174-stainless-steel-w-fingerprint-resistance', 'CcCiVxQAEgfNpVMf3pzwHVAj', ['SmartWash®'], { desc: 'UltraWash® cleaning with the SmartWash® sensor cycle.' });
  dw('22-14592', 'UltraWash®', 'White', '24-built-in-dishwasher-with-ultrawash174-system-and-smartwash174-white', 'Y8GxkkUYvY9AzWUsTWVDAuVn', ['SmartWash®'], { desc: 'UltraWash® cleaning with the SmartWash® sensor cycle.' });
  dw('22-14599', 'UltraWash®', 'Black', '24-built-in-dishwasher-with-ultrawash174-system-and-smartwash174-black', 'XB2xMkPEq6KfHPMc988G9qoZ', ['SmartWash®'], { desc: 'UltraWash® cleaning with the SmartWash® sensor cycle.' });
  dw('22-14605', 'UltraWash® Plus', 'Stainless Steel w/ Fingerprint Resistance', '24-built-in-dishwasher-with-ultrawash174-plus-system-and-turbodry-stainless-steel-w-fingerprint-resistance', 'd6GPjzMpupNLcXEBSHb9o8mB', ['SmartWash®', 'TurboDry™', 'Third rack'], { placeSettings: '15', dba: '45 dBA', desc: 'UltraWash® Plus with TurboDry™ and a removable EasyFlex™ third rack; 45 dBA.' });
  dw('22-14602', 'UltraWash® Plus', 'White', '24-built-in-dishwasher-with-ultrawash174-plus-system-and-turbodry-white', 'FDWvZk15j3T2SRePUbVMPN8t', ['TurboDry™'], { desc: 'UltraWash® Plus cleaning with the TurboDry™ system.' });
  dw('22-14609', 'UltraWash® Plus', 'Black', '24-built-in-dishwasher-with-ultrawash174-plus-system-and-turbodry-black', 'JmzKMrR2aGybWXChjQpTWRVF', ['TurboDry™'], { desc: 'UltraWash® Plus cleaning with the TurboDry™ system.' });
  dw('22-14625', 'UltraWash® Plus', 'Stainless Steel w/ Fingerprint Resistance', '24-built-in-dishwasher-with-ultrawash174-plus-system-and-removable-3rd-rack-stainless-steel-w-fingerprint-resistance', 'esLxb7mroAGnGd15SjURj64W', ['SmartWash®', 'TurboDry™', 'Third rack'], { placeSettings: '15', dba: '49 dBA', featured: 4, desc: '15 place settings, removable third rack and TurboDry™, at 49 dBA.',
    pdp: { images: [cf('eyJidWNrZXQiOiJrZW5tb3JlLWJyYW5kLXByb2QiLCJrZXkiOiJlc0x4Yjdtcm9BR25HZDE1U2pVUmo2NFciLCJlZGl0cyI6eyJ3ZWJwIjp7InF1YWxpdHkiOjgwfX19'), cf('eyJidWNrZXQiOiJrZW5tb3JlLWJyYW5kLXByb2QiLCJrZXkiOiI1aHB1NHBMQkZCRG80MlFKUWFUaFlmTXoiLCJlZGl0cyI6eyJ3ZWJwIjp7InF1YWxpdHkiOjgwfX19'), cf('eyJidWNrZXQiOiJrZW5tb3JlLWJyYW5kLXByb2QiLCJrZXkiOiJiM1I3WE1mMmZFUzhIcUFyeUM2bndKWUciLCJlZGl0cyI6eyJ3ZWJwIjp7InF1YWxpdHkiOjgwfX19'), cf('eyJidWNrZXQiOiJrZW5tb3JlLWJyYW5kLXByb2QiLCJrZXkiOiJWWXRoRFBEY2Q2MjNOY0pUV1VCTUZUNjQiLCJlZGl0cyI6eyJ3ZWJwIjp7InF1YWxpdHkiOjgwfX19'), cf('eyJidWNrZXQiOiJrZW5tb3JlLWJyYW5kLXByb2QiLCJrZXkiOiJlclV6dHZGbllvRmRwM1ZpU0RNRWl4cHEiLCJlZGl0cyI6eyJ3ZWJwIjp7InF1YWxpdHkiOjgwfX19'), cf('eyJidWNrZXQiOiJrZW5tb3JlLWJyYW5kLXByb2QiLCJrZXkiOiJQeGtLWUUxcXp1ekZIdFpnZzdZRWFNN1IiLCJlZGl0cyI6eyJ3ZWJwIjp7InF1YWxpdHkiOjgwfX19'), cf('eyJidWNrZXQiOiJrZW5tb3JlLWJyYW5kLXByb2QiLCJrZXkiOiJpeXJLUzJpUFhVODZKYnRhd1RyYXA2WUEiLCJlZGl0cyI6eyJ3ZWJwIjp7InF1YWxpdHkiOjgwfX19')],
      overview: 'This stylish Kenmore 24" Built-In Dishwasher works hard in the background, making sure dishes get clean. UltraWash® Plus technology provides more cleaning coverage and eliminates stuck-on food while the TurboDry™ system helps eliminate spots.',
      features: [['UltraWash® Plus', '3 pressurized spray arms and a 3-stage UltraWash® filter.'], ['SmartWash® cycle', 'Sensor technology adapts the cycle to the load.'], ['TurboDry™', 'A drying system that helps eliminate spots.'], ['Removable third rack', '35% more loading area.'], ['15 place settings', 'With Half Load and Delay Start options.'], ['49 dBA', 'Background-music quiet, with Automatic Leak Detection.']],
      specs: { 'Capacity & sound': { 'Place settings': '15', 'Noise level': '49 dBA' }, 'Cleaning & drying': { 'Wash system': 'UltraWash® Plus, 3 pressurized spray arms', 'Filter': '3-stage UltraWash® filter', 'Sensor cycle': 'SmartWash®', 'Drying': 'TurboDry™', 'Cycles & options': 'Accela Wash, Quiet Wash, Express Wash, Extra Dry, Sani Rinse, Half Load, Delay Start' }, 'Design': { 'Configuration': 'Built-in, 24"', 'Racks': 'Removable third rack', 'Tub': 'Stainless steel', 'Finish': 'Stainless steel with fingerprint resistance', 'Protection': 'Automatic Leak Detection' }, 'Certifications': { 'ENERGY STAR®': 'Certified' } },
      docs: [{ label: 'Use & care guide (PDF)', url: 'https://i.sears.com/s/d/pdf/mp-tc/10672251/prod_27654665112' }, { label: 'EnergyGuide (PDF)', url: 'https://i.sears.com/s/d/pdf/mp-tc/10672251/prod_27654665012' }, WARRANTY] } });
  dw('22-14622', 'UltraWash® Plus', 'White', '24-built-in-dishwasher-with-ultrawash174-plus-system-and-removable-3rd-rack-white', 'auPEvT3Aebdo9cTgB3Wdiijq', ['Third rack'], { desc: 'UltraWash® Plus cleaning with a removable third rack.' });
  dw('22-14629', 'UltraWash® Plus', 'Black', '24-built-in-dishwasher-with-ultrawash174-plus-system-and-removable-3rd-rack-black', '2nQYvg4JbEfg3pJ4toiqS2QQ', ['Third rack'], { desc: 'UltraWash® Plus cleaning with a removable third rack.' });

  // LAUNDRY
  var L = KM + '/products/laundry/';
  add({ id: '26-42272', cat: 'laundry', sub: 'front-washer', name: '4.5 cu. ft. Front-Load Washer w/ Accela Wash® White', img: S3 + 'T3KXykGqVAwRsBNtWpQdmLjj', url: L + 'washers/front-load-washers/45-cu-ft-front-load-washer-w-accela-wash174-white', cap: 4.5, finish: 'White', flags: ['Accela Wash®'], desc: '4.5 cu. ft. front-load washer with Accela Wash® technology.' });
  add({ id: '26-42273', cat: 'laundry', sub: 'front-washer', name: '4.5 cu. ft. Front-Load Washer w/ Accela Wash® Metallic Silver', img: S3 + 'GJiSvA8BeqHYN7JesCKDQb4W', url: L + 'washers/front-load-washers/45-cu-ft-front-load-washer-w-accela-wash174-metallic-silver', cap: 4.5, finish: 'Metallic Silver', flags: ['Accela Wash®'], featured: 5, desc: '4.5 cu. ft. front-load washer with Accela Wash® technology.' });
  add({ id: '26-41202', cat: 'laundry', sub: 'front-washer', name: '2.2 cu. ft. Front Load Compact Washer White', img: S3 + 'EcCgsFqGwETmzjbmySjCCUX9', url: L + 'washers/front-load-washers/22-cu-ft-front-load-compact-washer-white', cap: 2.2, finish: 'White', flags: ['Steam', 'Accela Wash®', 'Compact'],
    desc: 'Compact 2.2 cu. ft. washer with Accela Wash®, a Steam option and 15 wash cycles.',
    pdp: { images: [cf('eyJidWNrZXQiOiJrZW5tb3JlLWJyYW5kLXByb2QiLCJrZXkiOiJFY0Nnc0ZxR3dFVG16amJteVNqQ0NVWDkiLCJlZGl0cyI6eyJ3ZWJwIjp7InF1YWxpdHkiOjgwfX19'), cf('eyJidWNrZXQiOiJrZW5tb3JlLWJyYW5kLXByb2QiLCJrZXkiOiJoaVU2NFp4emlkd0NMNVVxYUx0N3FIdmoiLCJlZGl0cyI6eyJ3ZWJwIjp7InF1YWxpdHkiOjgwfX19'), cf('eyJidWNrZXQiOiJrZW5tb3JlLWJyYW5kLXByb2QiLCJrZXkiOiJldjdwdVRxeENvaENKbVlkMzg0UlE1ZzQiLCJlZGl0cyI6eyJ3ZWJwIjp7InF1YWxpdHkiOjgwfX19'), cf('eyJidWNrZXQiOiJrZW5tb3JlLWJyYW5kLXByb2QiLCJrZXkiOiJYWFE2QndLUGQ4Y28xZkdQejdCRGhQcmciLCJlZGl0cyI6eyJ3ZWJwIjp7InF1YWxpdHkiOjgwfX19'), cf('eyJidWNrZXQiOiJrZW5tb3JlLWJyYW5kLXByb2QiLCJrZXkiOiJKdzROMmNhN3E3RGpTZU5nVmdhckdMQ2YiLCJlZGl0cyI6eyJ3ZWJwIjp7InF1YWxpdHkiOjgwfX19'), cf('eyJidWNrZXQiOiJrZW5tb3JlLWJyYW5kLXByb2QiLCJrZXkiOiJzRFFVSk5jMWU0WGlaNGlYNlVwcHY0MjgiLCJlZGl0cyI6eyJ3ZWJwIjp7InF1YWxpdHkiOjgwfX19'), cf('eyJidWNrZXQiOiJrZW5tb3JlLWJyYW5kLXByb2QiLCJrZXkiOiJINGlXOXAzVXdpZnFOTVJoWkNCRGgzRjciLCJlZGl0cyI6eyJ3ZWJwIjp7InF1YWxpdHkiOjgwfX19')],
      overview: 'Kenmore compact washers and dryers pair up to get laundry clean and fresh, while looking stylish in your home. The compact size is perfect for smaller families and smaller spaces such as studio apartments, basements, condos, vacation homes or anywhere you need a small laundry pair.',
      features: [['Accela Wash® technology', 'Uses 2 powerful sprays, with Active Spray™ dual nozzles delivering concentrated detergent solution.'], ['Active Rinse™', 'Effective rinsing during high spin speeds.'], ['Steam option', 'Adds steam at the end of the cycle.'], ['Express cycle', 'Cleans a small load in 12 minutes.'], ['Direct Drive Motor', 'Spin speeds up to 1,400 RPM, with a lifetime warranty on the motor.'], ['15 wash cycles', 'And 5 temperature selections. ENERGY STAR® certified.']],
      specs: { 'Capacity & performance': { 'Capacity': '2.2 cu. ft.', 'Spin speed': 'Up to 1,400 RPM', 'Motor': 'Direct Drive' }, 'Cycles & options': { 'Wash cycles': '15', 'Temperature selections': '5', 'Express cycle': '12 minutes (small load)', 'Extra Rinse': 'Up to 4 rinses', 'Options': 'Steam, Delay Start, Pre-wash, Clean Washer, Sanitize, Delicates, Wool' }, 'Design': { 'Tub': 'Stainless steel', 'Type': 'Front load, compact', 'Finish': 'White' }, 'Certifications': { 'ENERGY STAR®': 'Certified' } },
      docs: [{ label: 'Use & care guide (PDF)', url: 'https://i.sears.com/s/d/pdf/mp-tc/10672251/prod_27972813912' }, { label: 'EnergyGuide (PDF)', url: 'https://i.sears.com/s/d/pdf/mp-tc/10672251/prod_27972813212' }, WARRANTY] } });
  add({ id: '26-29162', cat: 'laundry', sub: 'top-washer', name: '4.4 cu. ft. Top-Load Washer with Triple Action® Agitator White', img: S3 + 'C8Kp3kdWF2Vza29D3uKuMS5j', url: L + 'washers/top-load-washers/44-cu-ft-top-load-washer-with-triple-action174-agitator-white', cap: 4.4, finish: 'White', flags: [], desc: 'Top-load washer with a Triple Action® agitator.' });
  add({ id: '26-29262', cat: 'laundry', sub: 'top-washer', name: '4.5 cu. ft. Top-Load Washer with Triple Action® Impeller White', img: S3 + 'LN5TrXFJ4EKSkEZVjPF6zJKU', url: L + 'washers/top-load-washers/45-cu-ft-top-load-washer-with-triple-action174-impeller-white', cap: 4.5, finish: 'White', flags: [], desc: 'Top-load washer with a Triple Action® impeller.' });
  add({ id: '26-29182', cat: 'laundry', sub: 'top-washer', name: '4.1 cu. ft. Top-Load Washer with Triple Action® Agitator White', img: SH + '10672781/prod_27973136412', url: L + 'washers/top-load-washers/41-cu-ft-top-load-washer-with-triple-action174-agitator-white', cap: 4.1, finish: 'White', flags: [], desc: 'Top-load washer with a Triple Action® agitator.' });
  add({ id: '26-69162', cat: 'laundry', sub: 'electric-dryer', name: '7.0 cu. ft. Electric Dryer with Sensor Drying System White', img: S3 + '6EFc7N7itd4XDJyQm9kgrjPU', url: L + 'dryers/electric-dryers/70-cu-ft-electric-dryer-with-sensor-drying-system-white', cap: 7, finish: 'White', flags: ['Sensor drying'], desc: 'Electric dryer with a Sensor Drying System.' });
  add({ id: '26-82272', cat: 'laundry', sub: 'electric-dryer', name: '8.0 cu. ft. Electric Front-Load Dryer with Accela Steam Technology White', img: S3 + '78mBicCojCWmyGe9WgvuejuE', url: L + 'dryers/electric-dryers/80-cu-ft-electric-front-load-dryer-with-accela-steam-technology-white', cap: 8, finish: 'White', flags: ['Steam'], desc: 'Front-load electric dryer with Accela Steam technology.' });
  add({ id: '26-82273', cat: 'laundry', sub: 'electric-dryer', name: '8.0 cu. ft. Electric Front-Load Dryer with Accela Steam Technology Metallic Silver', img: S3 + 'fAPPQ9mo84F81AJ3eYVNhhGQ', url: L + 'dryers/electric-dryers/80-cu-ft-electric-front-load-dryer-with-accela-steam-technology-metallic-silver', cap: 8, finish: 'Metallic Silver', flags: ['Steam'], desc: 'Front-load electric dryer with Accela Steam technology.' });
  add({ id: '26-81202', cat: 'laundry', sub: 'electric-dryer', name: '4.0 cu. ft. Compact Dryer White', img: S3 + 'vmVEtmamVcVBSuLQbPaTRc6v', url: L + 'dryers/electric-dryers/40-cu-ft-compact-dryer-white', cap: 4, finish: 'White', flags: ['Sensor drying', 'Compact'],
    desc: 'Ventless compact dryer with Sensor Drying; stacks with the compact washer.',
    pdp: { images: [cf('eyJidWNrZXQiOiJrZW5tb3JlLWJyYW5kLXByb2QiLCJrZXkiOiJ2bVZFdG1hbVZjVkJTdUxRYlBhVFJjNnYiLCJlZGl0cyI6eyJ3ZWJwIjp7InF1YWxpdHkiOjgwfX19'), cf('eyJidWNrZXQiOiJrZW5tb3JlLWJyYW5kLXByb2QiLCJrZXkiOiI4UEdtQ0RrYmsxQW05Q1RzSnZHVHhqUnIiLCJlZGl0cyI6eyJ3ZWJwIjp7InF1YWxpdHkiOjgwfX19'), cf('eyJidWNrZXQiOiJrZW5tb3JlLWJyYW5kLXByb2QiLCJrZXkiOiJXTERZcnJwN3BXNUw3bllBWFhyTFVmR1QiLCJlZGl0cyI6eyJ3ZWJwIjp7InF1YWxpdHkiOjgwfX19'), cf('eyJidWNrZXQiOiJrZW5tb3JlLWJyYW5kLXByb2QiLCJrZXkiOiJ3cEVHb2JFRm45bnpDVmZ2ckJuZjVDbjUiLCJlZGl0cyI6eyJ3ZWJwIjp7InF1YWxpdHkiOjgwfX19'), cf('eyJidWNrZXQiOiJrZW5tb3JlLWJyYW5kLXByb2QiLCJrZXkiOiIyOXpWQU1KVXNtdHdSRFJzZ3RnY2tBNm8iLCJlZGl0cyI6eyJ3ZWJwIjp7InF1YWxpdHkiOjgwfX19'), cf('eyJidWNrZXQiOiJrZW5tb3JlLWJyYW5kLXByb2QiLCJrZXkiOiJ4TGZxeTZOV0MzRUVlVXpiNXFRN2duNmUiLCJlZGl0cyI6eyJ3ZWJwIjp7InF1YWxpdHkiOjgwfX19'), cf('eyJidWNrZXQiOiJrZW5tb3JlLWJyYW5kLXByb2QiLCJrZXkiOiJNanZqVHhBczQ5dkVtM051V1REZlVVTFIiLCJlZGl0cyI6eyJ3ZWJwIjp7InF1YWxpdHkiOjgwfX19')],
      overview: 'Kenmore compact washers and dryers pair up to get laundry clean and fresh, while looking stylish in your home. The compact size is perfect for smaller families and smaller spaces such as studio apartments, basements, condos, vacation homes or anywhere you need a small laundry pair. Position them side-by-side or stack them for a perfect fit.',
      features: [['Sensor Drying', 'A humidity sensor adjusts cycle time.'], ['Ventless condensing system', 'No ducting required.'], ['15 dry cycles', 'With 3 temperature selections for personalized fabric care.'], ['Express Dry', '3 shirts in 12 minutes, or 8 shirts in 29 minutes.'], ['Wrinkle Guard®', 'Intermittent tumbling, plus two-way tumbling for uniform drying.'], ['Stainless steel drum', 'Lifetime warranty against rust and corrosion. ENERGY STAR® certified.']],
      specs: { 'Capacity & venting': { 'Capacity': '4.0 cu. ft.', 'Fuel': 'Electric', 'Venting': 'Ventless (condensing)', 'Installation': 'Side-by-side or stacked' }, 'Cycles & options': { 'Dry cycles': '15', 'Temperature selections': '3', 'Sensor': 'Sensor Drying', 'Options': 'Express Dry, Sanitize, Wrinkle Guard®' }, 'Design': { 'Drum': 'Stainless steel', 'Door': 'Reversible', 'Indicators': 'Water tank indicator, Check Condenser light', 'Drum light': 'Yes' }, 'Certifications': { 'ENERGY STAR®': 'Certified' } },
      docs: [{ label: 'Use & care guide (PDF)', url: 'https://i.sears.com/s/d/pdf/mp-tc/10672251/prod_27972814312' }, WARRANTY] } });
  add({ id: '26-79162', cat: 'laundry', sub: 'gas-dryer', name: '7.0 cu. ft. Gas Dryer with Sensor Drying System White', img: S3 + '9Nx2Ymr5SHE5aY8wT7TVEWTX', url: L + 'dryers/gas-dryers/70-cu-ft-gas-dryer-with-sensor-drying-system-white', cap: 7, finish: 'White', flags: ['Sensor drying'], desc: 'Gas dryer with a Sensor Drying System.' });
  add({ id: '26-92272', cat: 'laundry', sub: 'gas-dryer', name: '8.0 cu. ft. Gas Front-Load Dryer with Accela Steam Technology White', img: S3 + 'AyPbUKuRytJGSnfcUkuFUkS7', url: L + 'dryers/gas-dryers/80-cu-ft-gas-front-load-dryer-with-accela-steam-technology-white', cap: 8, finish: 'White', flags: ['Steam'], desc: 'Front-load gas dryer with Accela Steam technology.' });
  add({ id: '26-92273', cat: 'laundry', sub: 'gas-dryer', name: '8.0 cu. ft. Gas Front-Load Dryer with Accela Steam Technology Metallic Silver', img: S3 + '5TvwnxfdTHtRZvT7ZCyn9dgU', url: L + 'dryers/gas-dryers/80-cu-ft-gas-front-load-dryer-with-accela-steam-technology-metallic-silver', cap: 8, finish: 'Metallic Silver', flags: ['Steam'], desc: 'Front-load gas dryer with Accela Steam technology.' });

  // FLOOR CARE (kenmorefloorcare.com)
  add({ id: 'BC4030', cat: 'floorcare', sub: 'canister', name: 'Kenmore POP-N-GO 600 Series Bagged Canister Vac with Hair Eliminator', img: BC + '5334/5849/BC4030_ATF_Hero_R1__56014.1718914459.jpg?c=1', url: FC + '/products/kenmore-pop-n-go-600-series-bagged-canister-vac-with-hair-eliminator.html', power: 'Corded', bag: 'Bagged', flags: ['Pet-focused', 'Hair Eliminator®'], featured: 6,
    desc: 'All-floors canister with Hair Eliminator®, a sealed AllergenSeal™ air path and a 9.5 ft reach.',
    pdp: { store: true, images: [BC + '5334/5849/BC4030_ATF_Hero_R1__56014.1718914459.jpg?c=1', BC + '5334/5852/BC4030_ATF_MoreSuction_R1__96101.1718914461.jpg?c=1', BC + '5334/5854/BC4030_ATF_HairEliminator_R1__41700.1718914461.jpg?c=1', BC + '5334/5851/BC4030_ATF_AllergenSeal_R1__77304.1718914461.jpg?c=1', BC + '5334/5853/BC4030_ATF_PopNGo_R1__09982.1718914461.jpg?c=1', BC + '5334/5855/BC4030_ATF_ExtendedReach_R1__95353.1718914462.jpg?c=1', BC + '5334/5850/BC4030_ATF_PowerMate_R1__14960.1718914460.jpg?c=1'],
      overview: 'Tired of dealing with pet hair, dust, and crumbs? Meet the Kenmore POP-N-GO® Bagged Canister Vacuum with Hair Eliminator® – your ultimate cleaning ally. This versatile vacuum effortlessly handles hardwood, laminate, and carpets with its all-floors design while actively preventing hair from wrapping around the brushroll for a tangle-free experience.',
      features: [['Hair Eliminator®', 'Automatically removes hair from the brushroll.'], ['AllergenSeal™ System', 'A completely sealed air path that traps 99.97% of dust and particles.'], ['POP-N-GO® tool', 'Switch from carpet to bare floor without changing nozzles.'], ['Extended reach', 'A telescoping wand extends to 9.5 feet.'], ['Auto cord rewind', 'The 26-foot cord retracts automatically.'], ['Stair Grip™ & performance indicator', 'More stable on stairs; shows bag fill and clogs.']],
      specs: { 'General': { 'Model': 'BC4030', 'UPC': '810131260569', 'Type': 'Bagged canister' }, 'Power & reach': { 'Cord': '26 feet with auto rewind', 'Wand': 'Telescoping, extends 9.5 feet' }, 'Filtration': { 'System': 'AllergenSeal™ sealed air path', 'Bag part number': '#53292', 'Filter part number': '#52731' }, 'Included tools': { 'Tools': 'Dusting brush, long crevice tool, motorized Pet PowerMate® tool, POP-N-GO® bare floor brush' } },
      docs: [{ label: 'Use & care guide (PDF)', url: FC + '/product_images/manuals/bc4030manual.pdf' }, { label: 'Compatible replacement bags', url: FC + '/products/parts-and-accessories/kenmore-canister-vacuum-cleaner-bags' }, { label: 'Product registration', url: FC + '/support/product-registration' }, { label: 'Warranty information', url: FC + '/support/warranty-information' }, { label: 'Floor care customer care', url: FC + '/customer-care-overview' }] } });
  add({ id: 'DU4080', cat: 'floorcare', sub: 'upright', name: 'Kenmore FeatherLite Lift-Up Bagless Upright Vacuum with AllergenSeal', img: 'https://cdn11.bigcommerce.com/s-d5fqfj6uoe/products/1362/images/10032/DU4080_ATF_01_R1__33959.1783008938.386.513.jpg?c=1', url: FC + '/products/vacuums/upright-vacuums/kenmore-featherlite-lift-up-bagless-upright-vacuum', power: 'Corded', bag: 'Bagless', flags: ['HEPA', 'Pet-focused'], weight: 'Under 12 lbs', desc: 'Lightweight lift-up bagless upright with AllergenSeal.' });
  add({ id: 'DU1099', cat: 'floorcare', sub: 'upright', name: 'Kenmore FeatherLite™ Bagless Upright Vacuum with Hair Eliminator® Brushroll', img: BC + '2245/4228/DU1099_hero_forward_with_tools_copy__86907.1705416235.jpg?c=1', url: FC + '/products/vacuums/upright-vacuums/kenmore-featherlite-bagless-upright-vacuum-with-hair-eliminator-brushroll/', power: 'Corded', bag: 'Bagless', flags: ['HEPA', 'Pet-focused', 'Hair Eliminator®'], weight: 'Less than 12 lbs', desc: 'Bagless upright with a Hair Eliminator® brushroll.' });
  add({ id: 'DU1292', cat: 'floorcare', sub: 'upright', name: 'Kenmore FeatherLite MAX Bagless Upright Vacuum with Hair Eliminator Brushroll', img: 'https://cdn11.bigcommerce.com/s-d5fqfj6uoe/products/8652/images/9968/DU1292_ATF_01_R1__45210.1782328480.386.513.jpg?c=1', url: FC + '/products/kenmore-featherlite-max-bagless-upright-vacuum-with-hair-eliminator-brushroll/', power: 'Corded', bag: 'Bagless', flags: ['Pet-focused', 'Hair Eliminator®'], weight: '12 lbs', desc: 'FeatherLite MAX bagless upright with a Hair Eliminator® brushroll.' });
  add({ id: 'BU4017', cat: 'floorcare', sub: 'upright', name: 'Kenmore Intuition Lift-Up Bagged Upright Vacuum', img: BC + '8654/9803/BU4017_ATF_01_R1__63344.1778782478.jpg?c=1', url: FC + '/products/kenmore-intuition-lift-up-bagged-upright-vacuum/', power: 'Corded', bag: 'Bagged', flags: ['Pet-focused'], weight: 'Under 15 lbs', desc: 'Intuition lift-up bagged upright vacuum.' });
  add({ id: 'CU7005', cat: 'floorcare', sub: 'upright', name: 'Kenmore Elite Litening Cordless Upright Vacuum', img: BC + '4164/9308/CU7005_ATF_Hero2_R1__41872.1760366602.jpg?c=1', url: FC + '/products/kenmore-elite-litening-cordless-upright-vacuum.html', power: 'Cordless', bag: 'Bagless', flags: ['HEPA', 'Pet-focused'], desc: 'Kenmore Elite cordless upright vacuum.' });
  add({ id: '81714', cat: 'floorcare', sub: 'canister', name: 'Kenmore Elite ULTRA PLUSH 700 Series Bagged Canister Vacuum', img: BC + '195/10064/81714_ATF_01_R1__66342.1786724833.jpg?c=1', url: FC + '/products/kenmore-elite-ultra-plush-700-series-bagged-canister-vacuum.html', power: 'Corded', bag: 'Bagged', flags: ['HEPA', 'Pet-focused'], desc: 'Kenmore Elite 700 Series bagged canister vacuum.' });
  add({ id: '21814', cat: 'floorcare', sub: 'canister', name: 'Kenmore Elite CrossOver 800 Series Bagged Canister Vacuum', img: 'https://cdn11.bigcommerce.com/s-d5fqfj6uoe/images/stencil/728x728/products/116/10097/21814_ATF_01_R2__32969.1787236642.jpg?c=1', url: FC + '/products/vacuums/canister-vacuums/pet-friendly-crossover-canister-vacuum', power: 'Corded', bag: 'Bagged', flags: ['HEPA', 'Pet-focused'], weight: '23 lbs.', desc: 'Kenmore Elite CrossOver 800 Series bagged canister vacuum.' });
  add({ id: 'BC3005', cat: 'floorcare', sub: 'canister', name: 'Kenmore 400 Series Bagged Canister Vacuum Cleaner', img: BC + '1833/2233/BC3005_A_Page_MODULES_Hero__28928.1674485468.jpg?c=1', url: FC + '/products/vacuums/canister-vacuums/kenmore-400-series-bagged-canister-vacuum-cleaner/', power: 'Corded', bag: 'Bagged', flags: ['HEPA'], weight: '19.5 lbs', desc: '400 Series bagged canister vacuum.' });
  add({ id: 'DS1035', cat: 'floorcare', sub: 'stick', name: 'Kenmore Stratus™ | 24V 2-in-1 Cordless Stick Vacuum', img: BC + '5004/5520/DS1035_ATF_Hero_R1__66981.1718651876.jpg?c=1', url: FC + '/products/kenmore-stratus-24v-2-in-1-cordless-stick-vacuum.html', power: 'Cordless', bag: 'Bagless', flags: ['Pet-focused'], weight: 'Hand vacuum about 3 lbs', desc: '24V 2-in-1 cordless stick vacuum that converts to a hand vac.' });
  add({ id: 'DS2010', cat: 'floorcare', sub: 'stick', name: 'Kenmore 200 Series Cordless 25.2V 2-in-1 Stick Vacuum', img: 'https://cdn11.bigcommerce.com/s-d5fqfj6uoe/products/8604/images/9213/DS2010_ATF_01-Hero_R1__09613.1752074775.386.513.jpg?c=1', url: FC + '/products/kenmore-200-series-cordless-25-2v-2-in-1-stick-vacuum.html', power: 'Cordless', bag: 'Bagless', flags: ['Pet-focused'], weight: 'Hand vac less than 3 lbs', desc: '25.2V 2-in-1 cordless stick vacuum.' });
  add({ id: 'HV3005', cat: 'floorcare', sub: 'stick', name: 'Kenmore 11.1V Cordless Hand Vacuum', img: BC + '8586/9168/HV3005_ATF_01-Hero_R1__42251.1750167767.jpg?c=1', url: FC + '/products/kenmore-11-1v-cordless-hand-vacuum.html', power: 'Cordless', bag: 'Bagless', flags: ['Pet-focused'], weight: 'Less than 3 lbs', desc: '11.1V cordless hand vacuum.' });
  add({ id: 'KW4010', cat: 'floorcare', sub: 'carpet', name: 'Kenmore RevitaLite™ Pet Carpet Cleaner', img: BC + '6414/7662/Hero_Image_KW4010__04006.1723034718.jpg?c=1', url: FC + '/products/kenmore-revitalite-pet-carpet-cleaner.html', flags: ['Pet-focused'], desc: 'RevitaLite™ carpet cleaner designed for pet messes.' });
  add({ id: 'KW1049', cat: 'floorcare', sub: 'carpet', name: 'Kenmore SpotLite Go Portable Pet Carpet Cleaner', img: BC + '8651/9924/KW1049_ATF_01_R1__30166.1782148868.jpg?c=1', url: FC + '/products/kenmore-spotlite-go-portable-pet-carpet-cleaner/', flags: ['Pet-focused'], weight: 'Less than 11 lbs', desc: 'Portable spot cleaner for pet messes.' });

  /* ---------- Derived fields ---------- */
  var order = 0;
  P.forEach(function (p) {
    p.model = p.id; p.order = order++;
    var c = categories[p.cat];
    var sub = c.subs.filter(function (s) { return s.id === p.sub; })[0];
    p.subName = sub ? sub.name : (p.cat === 'dishwashers' ? 'Built-In Dishwasher' : '');
    p.capText = p.cap ? p.cap + ' cu. ft.' : '';
    p.widthText = p.width ? p.width + '"' : '';
    var f = (p.finish || '').toLowerCase();
    p.finishGroup = f.indexOf('stainless') > -1 ? 'Stainless steel' : f.indexOf('black') > -1 ? 'Black' : f.indexOf('white') > -1 ? 'White' : f.indexOf('metallic') > -1 ? 'Metallic silver' : '';
    if (p.cat === 'refrigerators' && p.cap) p.capBand = p.cap < 10 ? 'Under 10 cu. ft.' : p.cap < 20 ? '15–19.9 cu. ft.' : p.cap < 25 ? '20–24.9 cu. ft.' : '25 cu. ft. and up';
    if (p.cat === 'ranges' && p.cap) p.capBand = p.cap < 5 ? 'Under 5 cu. ft.' : p.cap < 5.5 ? '5–5.4 cu. ft.' : '5.5 cu. ft. and up';
    if (p.cat === 'laundry' && p.cap) p.capBand = p.cap < 4.5 ? 'Under 4.5 cu. ft.' : p.cap < 7 ? '4.5–6.9 cu. ft.' : '7 cu. ft. and up';
    p.full = !!p.pdp;
  });

  G.KMDATA = {
    categories: categories, menu: menu, products: P,
    links: {
      home: KM + '/', whereToBuy: WTB, manuals: KM + '/use-and-care-guide-search', register: KM + '/productregistration',
      care: KM + '/customer-care', contact: KM + '/contact-us/', warranty: KM + '/warranty-information/', recalls: KM + '/product-recalls/',
      parts: 'https://www.searspartsdirect.com/brand/0582/kenmore-parts', repair: 'https://www.searshomeservices.com/scheduler/shs?partner_source=kenmore',
      fcStore: FC + '/', fcCare: FC + '/customer-care-overview', livemore: 'https://inspiration.kenmore.com/'
    },
    logo: 'https://kenmore-interim-image-store.s3.us-east-2.amazonaws.com/Kenmore_Wordmark_Logo_Black_RGB.svg',
    stories: [
      { tag: 'Care guide', title: 'How to clean your dishwasher filter', url: 'https://inspiration.kenmore.com/how-to-clean-your-dishwasher-filter/', img: '../assets/img/lifestyle-dishwasher.jpg', alt: 'An open Kenmore built-in dishwasher set into deep green cabinets.' },
      { tag: 'Kitchen', title: 'What’s for dinner tonight? Quick, easy, healthy mealtime ideas', url: 'https://inspiration.kenmore.com/whats-for-dinner-tonight-quick-easy-healthy-mealtime-ideas/', img: '../assets/img/story-dinner.jpg', alt: 'A woman leaning on a kitchen counter with fresh vegetables, planning dinner.', stock: true },
      { tag: 'Storage', title: 'Extra storage for the holidays: garage-ready fridges', url: 'https://inspiration.kenmore.com/extra-storage-new-garage-ready-fridges/', img: '../assets/img/lifestyle-kitchen.jpg', alt: 'A Kenmore top-freezer refrigerator beside a Kenmore range in a wood kitchen.' },
      { tag: 'Home', title: 'It’s a new year and a new you: living cleaner and greener', url: 'https://inspiration.kenmore.com/its-a-new-year-and-a-new-you-living-cleaner-and-greener/', img: '../assets/img/lifestyle-laundry.jpg', alt: 'A stacked Kenmore washer and dryer in warm wood cabinetry.' }
    ]
  };
})(window);
