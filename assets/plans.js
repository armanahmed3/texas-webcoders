/* Texas WebCoders pricing data, shared by index.html, pricing.html and ai-receptionist.html.
   REAL prices (from texaswebcoders.com): web, ecom, brand.
   MARKET-BASED prices (set Oct 2026 from US market research, positioned as an affordable Texas studio): recep, chat, auto, saas, app, graphic, video, grow.
   Fields: price, per ('/mo'), from (shows "From"), was (crossed-out price, real packages only), note, best, custom. */
window.PLANS = {
  recep:[
    {name:'Starter', per:'/mo', note:'+ $299 one-time setup', desc:'Never miss a call again. Perfect for a single location.', price:149, items:['Answers calls 24/7 in a natural voice','Custom greeting & script','Takes messages, texts you summaries','Up to 250 call minutes / month','Email support']},
    {name:'Business', per:'/mo', best:true, note:'+ $499 one-time setup', desc:'Books appointments and qualifies leads for you.', price:299, items:['Everything in Starter','Books into Google or Outlook calendar','Lead qualification & urgent call transfer','Up to 800 call minutes / month','CRM integration','Monthly script tuning']},
    {name:'Enterprise', per:'/mo', note:'+ custom setup', desc:'For multi-location teams and high call volume.', price:599, items:['Multiple locations & phone numbers','Unlimited call flows','Up to 2,000 call minutes / month','HIPAA-aware workflows for clinics','Dedicated AI engineer']}
  ],
  chat:[
    {name:'Website Chatbot', per:'/mo', note:'+ $299 one-time setup', desc:'Answer visitors and capture leads on your website.', price:99, items:['Trained on your website & FAQs','Lead capture to email or CRM','Answers 24/7 in seconds','Hand-off to a real person','Monthly conversation report']},
    {name:'Omnichannel Chatbot', per:'/mo', best:true, note:'+ $599 one-time setup', desc:'One AI assistant across every channel your customers use.', price:249, items:['Website, WhatsApp, SMS & Instagram','Bookings & order lookups','CRM sync','Replies in multiple languages','Weekly tuning']},
    {name:'Enterprise Assistant', per:'/mo', note:'+ setup from $1,500', desc:'Private AI for customers and your internal team.', price:599, items:['Private knowledge base (RAG)','Internal team assistant','Single sign-on & role access','Analytics dashboard','Dedicated AI engineer']}
  ],
  auto:[
    {name:'Workflow Starter', from:true, desc:'Automate your three most time-consuming tasks.', price:1499, items:['3 automated workflows','Email, CRM & spreadsheet integrations','AI lead scoring','30 days of support','Full workflow ownership']},
    {name:'Operations Autopilot', from:true, best:true, desc:'Multi-agent AI that runs your back office.', price:4999, items:['Up to 10 automated workflows','Multi-agent AI orchestration','Invoice & form processing','Live dashboards','60 days of support']},
    {name:'Enterprise Automation', from:true, desc:'Company-wide automation with custom AI agents.', price:12000, items:['Unlimited workflows','Custom AI agents','ERP & legacy system integration','Audit logs & security review','Dedicated AI engineer']}
  ],
  saas:[
    {name:'AI MVP', from:true, desc:'Launch your AI product idea and start getting users.', price:14999, items:['Core AI feature (LLM integration)','User accounts & Stripe billing','Admin dashboard','Cloud deployment','Full source code & IP']},
    {name:'Growth SaaS', from:true, best:true, desc:'A scalable, multi-tenant AI platform ready for customers.', price:34999, items:['Multi-tenant architecture','Subscriptions & usage billing','AI agents & private knowledge base','Analytics & admin tools','60 days of support']},
    {name:'Enterprise SaaS', custom:true, desc:'Complex platforms with security and compliance needs.', items:['SOC 2 / HIPAA-ready architecture','Single sign-on & audit trails','Custom integrations','Dedicated product team','Service-level agreement']}
  ],
  web:[
    {name:'Starter Custom Website', desc:'A fast custom website for local businesses and practices.', price:499, was:799, items:['Up to 5 custom responsive pages','Local SEO & Google Maps setup','Sub-0.5s load speed optimization','SSL security & contact forms','100% code & domain ownership','7-day turnaround']},
    {name:'Professional Business & App Portal', best:true, desc:'Client portals, booking and advanced SEO for growing companies.', price:999, was:1499, items:['10+ custom dynamic pages & portals','Interactive 3D WebGL / Framer animations','Online appointment & booking scheduler','Custom client quote estimator','Advanced on-page & technical SEO','30 days free post-launch support']},
    {name:'Enterprise Full-Stack & App Suite', desc:'Full-stack web and mobile apps, SaaS and CRMs.', price:1999, was:2999, items:['Full-stack custom web & mobile app','PostgreSQL / Firebase real-time database','Role-based staff & client portals','Automated invoicing & Stripe payments','Full IP transfer & GitHub repository']}
  ],
  ecom:[
    {name:'Boutique Storefront', desc:'A high-converting custom store for boutique retail and local merchants.', price:799, was:1299, items:['Shopify Plus or custom headless build','Up to 50 products & variations','Stripe, Apple Pay & Google Pay checkout','Automated order & shipping emails','100% mobile-optimized shopping']},
    {name:'Omnichannel Commerce Engine', best:true, desc:'Scale sales with cart recovery, reviews, custom filters and 3D previews.', price:1499, was:2299, items:['Unlimited product catalog','3D product orbit & zoom view','Abandoned cart & upsell automation','QuickBooks / ERP inventory sync','Multi-currency & automatic tax','Sub-0.4s checkout speed']},
    {name:'Headless Global Marketplace', desc:'A high-volume marketplace with vendor portals, split payouts and real-time ERP.', price:2899, was:4499, items:['React 19 / Next.js headless build','Multi-vendor dashboard & commissions','Subscriptions & recurring billing','Redis caching & global CDN','Dedicated SLA support & security hardening']}
  ],
  app:[
    {name:'Starter App', from:true, desc:'A cross-platform app to get your business into customers’ pockets.', price:4999, items:['React Native for iOS & Android','Up to 8 custom screens','User login & push notifications','Admin panel for content','App Store & Google Play publishing']},
    {name:'Business App', from:true, best:true, desc:'A full-featured app with bookings, payments and an AI assistant built in.', price:12999, items:['Up to 20 custom screens','Online booking & Stripe payments','In-app AI chat assistant','Analytics & crash reporting','30 days free post-launch support']},
    {name:'Enterprise Native App', from:true, desc:'Native Swift and Kotlin apps for high-traffic products.', price:29999, items:['Native Swift (iOS) & Kotlin (Android)','Role-based access & offline mode','API, CRM & ERP integrations','Biometric login','Full IP transfer & source code']}
  ],
  brand:[
    {name:'Essential Identity', desc:'A crisp vector logo and essential typography for new businesses.', price:199, was:349, items:['3 unique custom logo concepts','Vector files (AI, EPS, SVG, PNG)','Color, mono & inverted versions','Social avatar & favicon formats','Full commercial & trademark IP']},
    {name:'Corporate Brand Suite', best:true, desc:'A full identity with brand style guide, collateral and stationery.', price:449, was:799, items:['6 bespoke logo concepts','30-page brand style manual','Business cards & letterhead kit','Social media branding & banners','Photorealistic 3D mockups']},
    {name:'3D & Dynamic Identity', desc:'Enterprise identity with an animated 3D logo reveal and packaging.', price:899, was:1499, items:['Unlimited concept exploration','4K 3D animated logo reveal video','Packaging & merch design','Sub-brand architecture','Dedicated art director, 48hr turnaround']}
  ],
  graphic:[
    {name:'Social Media Pack', desc:'Scroll-stopping posts that keep your feed on brand.', price:199, items:['10 custom social post designs','Story & cover templates','Brand-matched style','Editable source files']},
    {name:'Marketing Kit', best:true, desc:'Everything your sales team needs to look professional.', price:599, items:['Brochure or flyer design','Business cards & letterhead','Pitch deck (up to 12 slides)','Print-ready files','3 revision rounds']},
    {name:'Packaging & Print', from:true, desc:'Product packaging and labels that sell on the shelf.', price:899, items:['Product packaging design','Labels & dielines','3D packaging mockups','Print vendor handoff','Full commercial rights']}
  ],
  video:[
    {name:'Video Editing', desc:'Five short-form edits for Reels, TikTok, YouTube Shorts and ads.', price:399, items:['5 short-form videos (up to 60s)','Captions, color grade & sound','Music & sound effects','Formats for every platform','2 revision rounds']},
    {name:'3D Product Animation', from:true, best:true, desc:'Photoreal 3D animation that shows your product at its best.', price:2499, items:['15–30 second 3D animation','Blender modeling & texturing','Photoreal 4K render','Logo reveal & motion graphics','3 revision rounds']},
    {name:'Cinematic 3D Brand Film', from:true, desc:'A 60–90 second 3D story for launches, ads and your website.', price:7499, items:['60–90 second 3D film','Storyboard & script','Professional voiceover','Sound design & music','4K master + social cut-downs']}
  ],
  grow:[
    {name:'Local SEO', per:'/mo', desc:'Get found on Google Maps and in AI search in your city.', price:499, items:['Google Business Profile optimization','Local citations & listings','15 tracked keywords','On-page SEO fixes','Monthly ranking report']},
    {name:'Growth Marketing', per:'/mo', best:true, note:'Ad spend billed separately', desc:'Ads, SEO and social working together to bring in leads.', price:1199, items:['Google & Meta ads management','30 tracked keywords + 4 posts/mo','High-converting landing page','Conversion tracking','Bi-weekly reports']},
    {name:'Full-Funnel Growth', per:'/mo', note:'Ad spend billed separately', desc:'Ads, SEO, social and AI email follow-up as one engine.', price:2499, items:['Ads, SEO & social combined','AI email & SMS follow-up','CRM & lead nurturing','Short-form video reels','Dedicated growth manager']}
  ]
};
