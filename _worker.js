// Atlas Admin + Content API — handles /cms/* and /api/content
// Everything else falls through to static assets (env.ASSETS)

const DEFAULT_CONTENT = {
  hero: {
    tag: 'Bixby · Jenks · Broken Arrow · Tulsa',
    headlineWhite: 'Your business deserves',
    headlineGreen: 'a real website',
    typewriter: 'Professional websites for local businesses in the Bixby and Tulsa area. Built in about 2 weeks. You see a free mockup before you pay anything.'
  },
  services: [
    { title: 'Get found on Google', desc: 'When someone searches "plumber near Bixby" or "HVAC in Tulsa," your business shows up, not your competitor\'s. We handle Google Maps setup, local SEO, and schema markup so you rank where it counts.' },
    { title: 'Built for mobile', desc: 'Over 80% of your customers will find you on their phone. We design mobile-first every time, with a tap-to-call button front and center and pages that load in under 2 seconds.' },
    { title: 'Everything included', desc: 'Forms, photo gallery, Google Reviews, your hours and service area all in one place. No more sending people to your Facebook page hoping they find your number.' }
  ],
  pricing: {
    landing: {
      price: '199', monthlyDesc: '+ $99/mo: hosting, domain, security & 6 edits/mo',
      features: ['Single-page professional site','Your services, hours & contact info','Photo gallery','Contact / quote request form','Mobile-friendly design','Basic SEO setup','Free mockup before you pay','6 edits per month included']
    },
    standard: {
      price: '449', monthlyDesc: '+ $99/mo: hosting, domain, security & 14 edits/mo',
      features: ['Everything in Landing Page','Multiple pages (About, Services, etc.)','Google Reviews integration','Before/after project gallery','Full SEO: title tags, meta, schema','Google Business Profile setup','Free mockup before you pay','14 edits per month included']
    },
    full: {
      price: '799', monthlyDesc: '+ $99/mo: hosting, domain, security & unlimited edits',
      features: ['Everything in Standard','Custom design, your brand, not a template','Online booking or quote request system','Blog or news section','Advanced SEO: city landing pages','Priority turnaround','Free mockup before you pay','Unlimited edits per month included']
    }
  },
  testimonials: [
    { text: 'I was skeptical at first but Jett put together a mockup in two days and it looked exactly like what I wanted. We went live in under 2 weeks and I\'ve already gotten 3 calls from people who found me on Google.', name: 'Mike R.' },
    { text: 'I had no idea how to get a website done without spending thousands. Atlas made it simple and affordable. The free mockup sealed the deal, I could see exactly what I was getting before paying anything.', name: 'Sarah K.' },
    { text: 'My landscaping business was all word of mouth. Now I show up when people search for landscapers in Tulsa. Jett handled everything. I just sent him some photos and my phone number and we were off.', name: 'Derek T.' }
  ],
  faqs: [
    { q: 'Do I own my website?', a: 'You own your content, your brand, and your domain name. Those are yours forever. I handle the technical side (hosting, security, updates) as part of the monthly plan. If you ever want to move on, I\'ll hand over all your files, no hassle.' },
    { q: 'How does the $99/mo work?', a: 'It covers everything to keep your site running: hosting, your domain name, SSL security certificate, and edits. Without it, you\'d be paying separately for hosting (~$10-20/mo), your domain (~$15/yr), and any time a developer touches your site. The monthly plan bundles it all into one flat rate with no surprises.' },
    { q: 'What if I want changes after launch?', a: "That's what the monthly plan is for. Need to update your hours, add a new service, swap out photos, or change your prices? Just text or email me and I'll get it done, usually same day. No hourly rates, no invoices, no waiting." },
    { q: 'How long does it take to build?', a: "About 2 weeks from the time you approve the mockup. First I build a free mockup so you can see exactly what you're getting, no commitment until you say it looks good. Once approved, the real site follows in roughly 2 weeks depending on how quickly you can get me photos and info." },
    { q: 'What do you need from me to get started?', a: "Not much. Your business name, phone number, a description of what you do, your service area, and any photos you want on the site. I'll handle the rest: writing, layout, SEO setup, everything. Most clients send me a few texts and we're off." },
    { q: 'Can I cancel the monthly plan?', a: "Yes, any time. No long-term contracts. If you cancel, your domain name is yours to keep. That's always in your name. The website itself comes down since it's part of the monthly plan, but you walk away with your domain and can use it however you like." }
  ],
  custom: { html: '', css: '', js: '' },
  trustBar: [
    {icon:'📍',text:'Local to Bixby & Tulsa'},
    {icon:'⚡',text:'Delivered in ~2 weeks'},
    {icon:'🖼️',text:'Free mockup before you commit'},
    {icon:'🔧',text:'Unlimited edits with Full Site plan'},
    {icon:'💰',text:'Starting at $199'},
    {icon:'🤝',text:'Oklahoma-owned, no overseas outsourcing'}
  ],
  howItWorks: {
    heading: 'Simple process, no surprises',
    subtext: 'No agency jargon, no bloated timelines. You talk to me directly, start to finish.',
    steps: [
      {title:'You reach out',text:'Fill out the form or call me. Tell me what your business does and what you need.'},
      {title:'Free mockup',text:"I build a mockup of your site so you can see exactly what you're getting before spending a dollar."},
      {title:'We build it',text:"You approve the mockup, I build the real thing. Usually done in about 2 weeks. You give feedback throughout."},
      {title:'You go live',text:"Site goes live on your domain. You own your content and brand, we handle the technical side. Unlimited edits included with the Full Site plan."}
    ],
    ctaHeading: 'Want to see what your site could look like?',
    ctaText: "Fill out the form and I'll put together a free mockup for your business — no commitment."
  },
  bizChips: ['🔧 Plumbers','❄️ HVAC','🌿 Landscapers','🍽️ Restaurants','✂️ Salons','🏗️ Contractors','🚗 Auto Repair','🧹 Cleaning','🐾 Pet Services','💅 Nail Salons','🔑 Real Estate','⚡ Electricians'],
  sectionHeadings: {
    services: {label:'What you get',heading:'Three reasons your business needs a website',subtext:"Not a brochure. A tool that works for you around the clock, while you're on the job."},
    pricing: {label:'Pricing',heading:'Straight pricing, no hidden fees',subtext:'One-time build fee plus a simple monthly plan that covers everything to keep your site running. No surprises.'},
    testimonials: {label:'What clients say',heading:'Real results for real businesses',subtext:'Local business owners who went from no online presence to getting found every day.'},
    faq: {label:'FAQ',heading:'Common questions',subtext:'Straight answers, no sales speak.'},
    contact: {heading:"Let's build your site",subtext:"Send me a message and I'll put together a free mockup of your site, no cost, no commitment. If you like it, we'll go from there."}
  },
  footer: {area:'Serving Bixby, Jenks, Broken Arrow, and Tulsa, OK'},
  announcement: { enabled: false, text: '', bg: '#16a34a' },
  seo: {
    title: 'Local Business Websites | Atlas Web Development, Bixby & Tulsa, OK',
    description: 'Professional websites for small businesses in Bixby, Jenks, and Tulsa. Fast delivery, fair prices, free mockup. Local web designer.',
    ogTitle: 'Local Business Websites | Atlas Web Development',
    ogDescription: 'Professional websites for small businesses in Bixby & Tulsa. Free mockup, 2-week delivery, starting at $199.'
  },
  contact: {
    phone: '(918) 829-3252',
    email: 'jett@atlas-web-develop.com',
    responseTime: 'Same day, usually within a few hours',
    serviceArea: 'Bixby, Jenks, Glenpool, Broken Arrow, Sand Springs, Owasso, Tulsa'
  },
  stats: [
    { value: '199', prefix: '$', suffix: '', label: 'Starting price' },
    { value: '2', prefix: '', suffix: ' weeks', label: 'Average delivery' },
    { value: '99', prefix: '$', suffix: '/mo', label: 'All-in monthly plan' }
  ],
  hours: {
    mon: '8am – 6pm', tue: '8am – 6pm', wed: '8am – 6pm',
    thu: '8am – 6pm', fri: '8am – 6pm', sat: 'By appointment', sun: 'Closed'
  }
};

// ── Crypto ──────────────────────────────────────────────

async function hashPassword(password, salt) {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey('raw', enc.encode(password), 'PBKDF2', false, ['deriveBits']);
  const bits = await crypto.subtle.deriveBits({ name: 'PBKDF2', salt: enc.encode(salt), iterations: 100000, hash: 'SHA-256' }, key, 256);
  return Array.from(new Uint8Array(bits)).map(b => b.toString(16).padStart(2, '0')).join('');
}

function timingSafeEqual(a, b) {
  const la = String(a), lb = String(b);
  let result = la.length === lb.length ? 0 : 1;
  const len = Math.max(la.length, lb.length);
  for (let i = 0; i < len; i++) result |= (la.charCodeAt(i % la.length) ^ lb.charCodeAt(i % lb.length));
  return result === 0;
}

async function getOrCreateSecret(env) {
  let s = await env.CONTENT.get('auth:secret');
  if (!s) {
    const b = new Uint8Array(32);
    crypto.getRandomValues(b);
    s = Array.from(b).map(x => x.toString(16).padStart(2, '0')).join('');
    await env.CONTENT.put('auth:secret', s);
  }
  return s;
}

async function createSession(env) {
  const b = new Uint8Array(32);
  crypto.getRandomValues(b);
  const token = Array.from(b).map(x => x.toString(16).padStart(2, '0')).join('');
  const secret = await getOrCreateSecret(env);
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey('raw', enc.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  const sig = await crypto.subtle.sign('HMAC', key, enc.encode(token));
  const sigHex = Array.from(new Uint8Array(sig)).map(b => b.toString(16).padStart(2, '0')).join('');
  await env.CONTENT.put(`session:${token}`, '1', { expirationTtl: 86400 });
  return `${token}.${sigHex}`;
}

async function verifySession(request, env) {
  const cookieHeader = request.headers.get('Cookie') || '';
  const match = cookieHeader.match(/atlas_cms=([^;]+)/);
  if (!match) return false;
  const signed = decodeURIComponent(match[1]);
  const dot = signed.lastIndexOf('.');
  if (dot === -1) return false;
  const token = signed.slice(0, dot), sig = signed.slice(dot + 1);
  const secret = await getOrCreateSecret(env);
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey('raw', enc.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  const expected = await crypto.subtle.sign('HMAC', key, enc.encode(token));
  const expectedHex = Array.from(new Uint8Array(expected)).map(b => b.toString(16).padStart(2, '0')).join('');
  if (!timingSafeEqual(sig, expectedHex)) return false;
  return !!(await env.CONTENT.get(`session:${token}`));
}

// ── Helpers ──────────────────────────────────────────────

function esc(s) {
  return String(s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
function pageHtml(body, status = 200) {
  return new Response(body, { status, headers: { 'Content-Type': 'text/html; charset=utf-8' } });
}
function redirect(url) {
  return new Response(null, { status: 303, headers: { Location: url } });
}

// ── Pages ────────────────────────────────────────────────

function setupPage(error = '') {
  return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/><title>Atlas Admin Setup</title><style>*{box-sizing:border-box;margin:0;padding:0}body{font-family:-apple-system,BlinkMacSystemFont,'Inter',sans-serif;background:#f3f4f6;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:16px}.wrap{background:#fff;border-radius:16px;padding:40px;width:100%;max-width:400px;box-shadow:0 4px 24px rgba(0,0,0,.09)}.brand{display:flex;align-items:center;gap:12px;margin-bottom:28px}.icon{width:40px;height:40px;background:#16a34a;border-radius:10px;display:flex;align-items:center;justify-content:center;color:#fff;font-size:18px;font-weight:800}h1{font-size:22px;font-weight:700;margin-bottom:4px}.sub{font-size:14px;color:#6b7280;margin-bottom:20px}.notice{background:#fefce8;border:1px solid #fef08a;color:#854d0e;padding:11px 14px;border-radius:8px;font-size:13px;margin-bottom:20px}label{display:block;font-size:12px;font-weight:600;color:#374151;margin-bottom:5px}input{width:100%;border:1px solid #e5e7eb;border-radius:8px;padding:10px 13px;font-size:14px;font-family:inherit;color:#111;outline:none;transition:border-color .15s;margin-bottom:14px}input:focus{border-color:#16a34a;box-shadow:0 0 0 3px #dcfce7}.btn{width:100%;background:#16a34a;color:#fff;border:none;border-radius:8px;padding:12px;font-size:15px;font-weight:600;font-family:inherit;cursor:pointer;transition:background .15s}.btn:hover{background:#15803d}.err{background:#fef2f2;border:1px solid #fecaca;color:#dc2626;padding:10px 14px;border-radius:8px;font-size:13px;margin-bottom:16px}</style></head><body><div class="wrap"><div class="brand"><div class="icon">A</div><div><div style="font-size:17px;font-weight:700">Atlas Admin</div><div style="font-size:12px;color:#9ca3af">First time setup</div></div></div><h1>Create your account</h1><p class="sub">Set the username and password you'll use to log in.</p><div class="notice">This setup page disappears after your account is created.</div>${error ? `<div class="err">${esc(error)}</div>` : ''}<form method="POST" action="/cms/setup"><label>Username</label><input type="text" name="username" value="JETTK" required autocomplete="off"/><label>Password</label><input type="password" name="password" required autocomplete="new-password"/><label>Confirm password</label><input type="password" name="password2" required autocomplete="new-password"/><button type="submit" class="btn">Create account →</button></form></div></body></html>`;
}

function loginPage(error = '') {
  return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/><title>Atlas Admin</title><style>*{box-sizing:border-box;margin:0;padding:0}body{font-family:-apple-system,BlinkMacSystemFont,'Inter',sans-serif;background:#f3f4f6;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:16px}.wrap{background:#fff;border-radius:16px;padding:40px;width:100%;max-width:380px;box-shadow:0 4px 24px rgba(0,0,0,.09)}.brand{display:flex;align-items:center;gap:12px;margin-bottom:28px}.icon{width:40px;height:40px;background:#16a34a;border-radius:10px;display:flex;align-items:center;justify-content:center;color:#fff;font-size:18px;font-weight:800}h1{font-size:22px;font-weight:700;margin-bottom:4px}.sub{font-size:14px;color:#6b7280;margin-bottom:24px}label{display:block;font-size:12px;font-weight:600;color:#374151;margin-bottom:5px}input{width:100%;border:1px solid #e5e7eb;border-radius:8px;padding:10px 13px;font-size:14px;font-family:inherit;color:#111;outline:none;transition:border-color .15s;margin-bottom:14px}input:focus{border-color:#16a34a;box-shadow:0 0 0 3px #dcfce7}.btn{width:100%;background:#16a34a;color:#fff;border:none;border-radius:8px;padding:12px;font-size:15px;font-weight:600;font-family:inherit;cursor:pointer;transition:background .15s}.btn:hover{background:#15803d}.err{background:#fef2f2;border:1px solid #fecaca;color:#dc2626;padding:10px 14px;border-radius:8px;font-size:13px;margin-bottom:16px}</style></head><body><div class="wrap"><div class="brand"><div class="icon">A</div><div><div style="font-size:17px;font-weight:700">Atlas Admin</div><div style="font-size:12px;color:#9ca3af">Website dashboard</div></div></div><h1>Welcome back</h1><p class="sub">Sign in to edit your website.</p>${error ? `<div class="err">${esc(error)}</div>` : ''}<form method="POST" action="/cms/login"><label>Username</label><input type="text" name="username" autocomplete="username" required/><label>Password</label><input type="password" name="password" autocomplete="current-password" required/><button type="submit" class="btn">Sign in →</button></form></div></body></html>`;
}

function dashboardPage(contentData) {
  const c = JSON.stringify(contentData || DEFAULT_CONTENT);
  return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/><title>Atlas Admin</title><style>
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:-apple-system,BlinkMacSystemFont,'Inter',sans-serif;background:#f0f2f5;color:#111;min-height:100vh}
/* Topbar */
.topbar{background:linear-gradient(135deg,#0a2e1e 0%,#134e3a 100%);padding:0 24px;height:60px;display:flex;align-items:center;justify-content:space-between;position:sticky;top:0;z-index:10;box-shadow:0 2px 12px rgba(0,0,0,.25)}
.brand{display:flex;align-items:center;gap:12px}
.brand-icon{width:36px;height:36px;background:#16a34a;border-radius:9px;display:flex;align-items:center;justify-content:center;color:#fff;font-size:16px;font-weight:800;box-shadow:0 2px 8px rgba(22,163,74,.4)}
.brand-name{font-size:16px;font-weight:700;color:#fff;letter-spacing:-.2px}
.brand-sub{font-size:11px;color:#86efac;font-weight:500;margin-top:1px}
.topbar-right{display:flex;align-items:center;gap:8px}
.view-link{font-size:13px;color:rgba(255,255,255,.75);text-decoration:none;font-weight:500;padding:7px 14px;border-radius:8px;border:1px solid rgba(255,255,255,.2);transition:all .15s;display:flex;align-items:center;gap:5px}
.view-link:hover{background:rgba(255,255,255,.12);color:#fff;border-color:rgba(255,255,255,.4)}
.logout-btn{background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.15);border-radius:8px;padding:7px 14px;font-size:13px;font-weight:500;color:rgba(255,255,255,.75);cursor:pointer;font-family:inherit;transition:all .15s}
.logout-btn:hover{background:rgba(220,38,38,.2);border-color:rgba(252,165,165,.4);color:#fca5a5}
/* Layout */
.layout{display:flex;min-height:calc(100vh - 60px - 57px)}
/* Sidebar */
.sidebar{width:220px;background:linear-gradient(180deg,#0f3d2e 0%,#0a2e1e 100%);padding:20px 12px;flex-shrink:0;display:flex;flex-direction:column;gap:4px}
.sidebar-section{font-size:10px;font-weight:700;color:rgba(134,239,172,.6);text-transform:uppercase;letter-spacing:1px;padding:0 10px;margin-bottom:6px;margin-top:8px}
.sidebar-section:first-child{margin-top:0}
.nav-btn{display:flex;align-items:center;gap:10px;padding:10px 12px;border-radius:10px;cursor:pointer;font-size:14px;font-weight:500;color:rgba(255,255,255,.65);transition:all .15s;border:none;background:transparent;width:100%;text-align:left;font-family:inherit}
.nav-btn:hover{background:rgba(255,255,255,.08);color:rgba(255,255,255,.9)}
.nav-btn.active{background:linear-gradient(135deg,rgba(22,163,74,.35),rgba(22,163,74,.2));color:#4ade80;font-weight:600;border:1px solid rgba(74,222,128,.2)}
.nav-icon{font-size:16px;width:22px;text-align:center;flex-shrink:0}
.nav-label{flex:1}
/* Main */
.main{flex:1;padding:32px;overflow-y:auto;max-width:860px}
.sec-header{margin-bottom:28px}
.sec-title{font-size:24px;font-weight:700;letter-spacing:-.4px;color:#111}
.sec-desc{font-size:14px;color:#6b7280;margin-top:5px;line-height:1.5}
/* Cards */
.card{background:#fff;border:1px solid #e5e7eb;border-radius:14px;padding:24px;margin-bottom:16px;box-shadow:0 1px 4px rgba(0,0,0,.05)}
.card-title{font-size:11px;font-weight:700;color:#9ca3af;text-transform:uppercase;letter-spacing:.8px;margin-bottom:18px;padding-bottom:12px;border-bottom:1px solid #f3f4f6;display:flex;align-items:center;gap:6px}
/* Fields */
.field{margin-bottom:16px}.field:last-child{margin-bottom:0}
.field-row{display:grid;grid-template-columns:1fr 1fr;gap:14px}
.field-label{display:block;font-size:12px;font-weight:600;color:#374151;margin-bottom:5px}
.field-hint{font-size:11px;color:#9ca3af;margin-top:4px}
.f-input{width:100%;border:1.5px solid #e5e7eb;border-radius:9px;padding:10px 13px;font-size:14px;font-family:inherit;color:#111;outline:none;transition:all .15s;background:#fff;resize:vertical;line-height:1.5}
.f-input:focus{border-color:#16a34a;box-shadow:0 0 0 3px rgba(22,163,74,.12)}
/* Tabs */
.tab-row{display:flex;gap:8px;margin-bottom:22px}
.tab{background:#fff;border:1.5px solid #e5e7eb;border-radius:20px;padding:7px 18px;font-size:13px;font-weight:500;color:#6b7280;cursor:pointer;transition:all .15s;font-family:inherit;box-shadow:0 1px 3px rgba(0,0,0,.05)}
.tab.active{background:linear-gradient(135deg,#15803d,#16a34a);border-color:transparent;color:#fff;font-weight:600;box-shadow:0 2px 8px rgba(22,163,74,.3)}
/* Feature list */
.feat-list{display:flex;flex-direction:column;gap:7px}
.feat-row{display:flex;gap:8px;align-items:center}
.feat-row .f-input{flex:1}
.del-btn{flex-shrink:0;width:34px;height:38px;background:transparent;border:1.5px solid #e5e7eb;border-radius:8px;cursor:pointer;color:#9ca3af;font-size:18px;transition:all .15s;display:flex;align-items:center;justify-content:center}
.del-btn:hover{border-color:#fca5a5;color:#dc2626;background:#fef2f2}
.add-btn{margin-top:10px;background:#f0fdf4;border:1.5px dashed #86efac;border-radius:9px;padding:8px 16px;font-size:13px;font-weight:600;color:#16a34a;cursor:pointer;transition:all .15s;font-family:inherit;width:100%;text-align:center}
.add-btn:hover{background:#dcfce7;border-color:#4ade80}
/* Save bar */
.save-bar{background:#fff;border-top:1px solid #e5e7eb;padding:14px 32px;display:flex;align-items:center;justify-content:space-between;position:sticky;bottom:0;box-shadow:0 -2px 12px rgba(0,0,0,.06)}
.save-msg{font-size:13px;color:#9ca3af}
.save-msg.ok{color:#16a34a;font-weight:600}
.save-msg.err{color:#dc2626;font-weight:600}
.save-btn{background:linear-gradient(135deg,#15803d,#16a34a);color:#fff;border:none;border-radius:9px;padding:11px 28px;font-size:14px;font-weight:600;font-family:inherit;cursor:pointer;transition:all .15s;box-shadow:0 2px 8px rgba(22,163,74,.3)}
.save-btn:hover{box-shadow:0 4px 16px rgba(22,163,74,.45);transform:translateY(-1px)}
.save-btn:disabled{background:#9ca3af;box-shadow:none;transform:none;cursor:not-allowed}
/* Toast */
.toast{position:fixed;bottom:84px;right:24px;background:#111;color:#fff;padding:13px 20px;border-radius:12px;font-size:14px;font-weight:500;z-index:999;opacity:0;transform:translateY(10px);transition:all .25s;pointer-events:none;box-shadow:0 4px 20px rgba(0,0,0,.25)}
.toast.show{opacity:1;transform:translateY(0)}
.toast.ok{background:linear-gradient(135deg,#15803d,#16a34a)}
.toast.err{background:#dc2626}
/* Code editor */
.code-wrap{position:relative}
.code-lang{position:absolute;top:10px;right:12px;font-size:10px;font-weight:700;color:#4b5563;text-transform:uppercase;letter-spacing:.8px;background:#f3f4f6;padding:2px 8px;border-radius:4px}
.code-editor{width:100%;font-family:'Courier New',Consolas,'Monaco',monospace;font-size:13px;background:#1a1d23;color:#abb2bf;border:1.5px solid #2d3139;border-radius:10px;padding:14px;min-height:180px;line-height:1.7;resize:vertical;outline:none;transition:border-color .15s;tab-size:2;-moz-tab-size:2}
.code-editor:focus{border-color:#16a34a;box-shadow:0 0 0 3px rgba(22,163,74,.15)}
.code-editor::placeholder{color:#4b5563}
.sidebar-divider{height:1px;background:rgba(255,255,255,.07);margin:8px 4px}
@media(max-width:768px){.sidebar{display:none}.main{padding:20px}.field-row{grid-template-columns:1fr}}
/* Theme toggle btn */
.theme-btn{background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.15);border-radius:8px;padding:7px 11px;font-size:16px;cursor:pointer;transition:all .15s;line-height:1;color:rgba(255,255,255,.8)}
.theme-btn:hover{background:rgba(255,255,255,.16);border-color:rgba(255,255,255,.3)}
/* Dark mode */
body.dark{background:#0f1117;color:#e5e7eb}
body.dark .card{background:#1a1d23;border-color:#2d3139;box-shadow:none}
body.dark .card-title{border-bottom-color:#2d3139;color:#6b7280}
body.dark .sec-title{color:#f3f4f6}
body.dark .sec-desc{color:#9ca3af}
body.dark .field-label{color:#d1d5db}
body.dark .field-hint{color:#6b7280}
body.dark .f-input{background:#252931;border-color:#374151;color:#e5e7eb}
body.dark .f-input:focus{border-color:#16a34a;background:#1e2530;box-shadow:0 0 0 3px rgba(22,163,74,.15)}
body.dark .tab{background:#1a1d23;border-color:#374151;color:#9ca3af;box-shadow:none}
body.dark .tab.active{background:linear-gradient(135deg,#15803d,#16a34a);border-color:transparent;color:#fff}
body.dark .save-bar{background:#1a1d23;border-top-color:#2d3139;box-shadow:0 -2px 12px rgba(0,0,0,.4)}
body.dark .save-msg{color:#6b7280}
body.dark .save-msg.ok{color:#4ade80}
body.dark .add-btn{background:#0a2e1e;border-color:#166534;color:#4ade80}
body.dark .add-btn:hover{background:#14532d;border-color:#22c55e}
body.dark .del-btn{border-color:#374151;color:#6b7280}
body.dark .del-btn:hover{border-color:#fca5a5;color:#dc2626;background:#2a1515}
body.dark .sidebar-divider{background:rgba(255,255,255,.07)}
body.dark .view-link{color:rgba(255,255,255,.7)}
body.dark .logout-btn{color:rgba(255,255,255,.7)}
</style></head><body>
<div class="topbar">
  <div class="brand">
    <div class="brand-icon">A</div>
    <div><div class="brand-name">Atlas Admin</div><div class="brand-sub">atlas-web-develop.com</div></div>
  </div>
  <div class="topbar-right">
    <button class="theme-btn" id="theme-btn" onclick="toggleTheme()" title="Toggle dark/light mode">🌙</button>
    <a href="https://atlas-web-develop.com" target="_blank" class="view-link">↗ View site</a>
    <form method="POST" action="/cms/logout" style="display:inline"><button class="logout-btn">Sign out</button></form>
  </div>
</div>
<div class="layout">
  <nav class="sidebar">
    <div class="sidebar-section">Sections</div>
    <button class="nav-btn active" onclick="nav('hero',this)"><span class="nav-icon">🏠</span><span class="nav-label">Hero</span></button>
    <button class="nav-btn" onclick="nav('trustbar',this)"><span class="nav-icon">✅</span><span class="nav-label">Trust Bar</span></button>
    <button class="nav-btn" onclick="nav('services',this)"><span class="nav-icon">⚡</span><span class="nav-label">Services</span></button>
    <button class="nav-btn" onclick="nav('hiw',this)"><span class="nav-icon">🔢</span><span class="nav-label">How It Works</span></button>
    <button class="nav-btn" onclick="nav('pricing',this)"><span class="nav-icon">💰</span><span class="nav-label">Pricing</span></button>
    <button class="nav-btn" onclick="nav('testimonials',this)"><span class="nav-icon">⭐</span><span class="nav-label">Testimonials</span></button>
    <button class="nav-btn" onclick="nav('faqs',this)"><span class="nav-icon">❓</span><span class="nav-label">FAQs</span></button>
    <button class="nav-btn" onclick="nav('bizchips',this)"><span class="nav-icon">🏷️</span><span class="nav-label">Business Types</span></button>
    <button class="nav-btn" onclick="nav('headings',this)"><span class="nav-icon">📝</span><span class="nav-label">Section Headings</span></button>
    <button class="nav-btn" onclick="nav('footer',this)"><span class="nav-icon">🦶</span><span class="nav-label">Footer</span></button>
    <div class="sidebar-divider"></div>
    <div class="sidebar-section">Site Settings</div>
    <button class="nav-btn" onclick="nav('contact',this)"><span class="nav-icon">📞</span><span class="nav-label">Contact Info</span></button>
    <button class="nav-btn" onclick="nav('hours',this)"><span class="nav-icon">🕐</span><span class="nav-label">Business Hours</span></button>
    <button class="nav-btn" onclick="nav('stats',this)"><span class="nav-icon">📊</span><span class="nav-label">Stats Bar</span></button>
    <div class="sidebar-divider"></div>
    <div class="sidebar-section">Marketing</div>
    <button class="nav-btn" onclick="nav('announcement',this)"><span class="nav-icon">📢</span><span class="nav-label">Announcement</span></button>
    <button class="nav-btn" onclick="nav('seo',this)"><span class="nav-icon">🔍</span><span class="nav-label">SEO</span></button>
    <div class="sidebar-divider"></div>
    <div class="sidebar-section">Advanced</div>
    <button class="nav-btn" onclick="nav('html',this)"><span class="nav-icon">🧩</span><span class="nav-label">HTML Blocks</span></button>
    <button class="nav-btn" onclick="nav('code',this)"><span class="nav-icon">💻</span><span class="nav-label">CSS &amp; JS</span></button>
    <button class="nav-btn" onclick="nav('fulleditor',this)"><span class="nav-icon">⌨️</span><span class="nav-label">Full Editor</span></button>
    <div class="sidebar-divider"></div>
    <div class="sidebar-section">Account</div>
    <button class="nav-btn" onclick="nav('password',this)"><span class="nav-icon">🔒</span><span class="nav-label">Change Password</span></button>
  </nav>
  <div class="main" id="main"></div>
</div>
<div class="save-bar"><span class="save-msg" id="save-msg">Edit any field and click Save when ready.</span><button class="save-btn" id="save-btn" onclick="saveAll()">Save changes</button></div>
<div class="toast" id="toast"></div>
<script>
const C=${c};let pTab='landing';
function e(s){return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;')}
function nav(name,btn){document.querySelectorAll('.nav-btn').forEach(b=>b.classList.remove('active'));btn.classList.add('active');render(name)}
function render(name){const el=document.getElementById('main');if(name==='hero')el.innerHTML=heroSection();else if(name==='trustbar')el.innerHTML=trustBarSection();else if(name==='services')el.innerHTML=servicesSection();else if(name==='hiw')el.innerHTML=hiwSection();else if(name==='pricing')el.innerHTML=pricingSection();else if(name==='testimonials')el.innerHTML=testimonialsSection();else if(name==='faqs')el.innerHTML=faqsSection();else if(name==='bizchips')el.innerHTML=bizChipsSection();else if(name==='headings')el.innerHTML=sectionHeadingsSection();else if(name==='footer')el.innerHTML=footerSection();else if(name==='contact')el.innerHTML=contactSection();else if(name==='hours')el.innerHTML=hoursSection();else if(name==='stats')el.innerHTML=statsSection();else if(name==='announcement')el.innerHTML=announcementSection();else if(name==='seo')el.innerHTML=seoSection();else if(name==='html')el.innerHTML=htmlSection();else if(name==='code')el.innerHTML=codeSection();else if(name==='password')el.innerHTML=passwordSection();else if(name==='fulleditor'){el.innerHTML=fullEditorSection();loadFullEditor();}}
function heroSection(){const h=C.hero||{};return\`<div class="sec-header"><div class="sec-title">Hero</div><div class="sec-desc">The first thing visitors see.</div></div><div class="card"><div class="card-title">Location tag</div><div class="field"><label class="field-label">Tag above headline</label><input class="f-input" type="text" value="\${e(h.tag)}" oninput="C.hero.tag=this.value"/></div></div><div class="card"><div class="card-title">Headline</div><div class="field"><label class="field-label">White part</label><input class="f-input" type="text" value="\${e(h.headlineWhite)}" oninput="C.hero.headlineWhite=this.value"/></div><div class="field"><label class="field-label">Green part</label><input class="f-input" type="text" value="\${e(h.headlineGreen)}" oninput="C.hero.headlineGreen=this.value"/></div></div><div class="card"><div class="card-title">Typewriter text</div><div class="field"><label class="field-label">Text that types out below the headline</label><textarea class="f-input" rows="3" oninput="C.hero.typewriter=this.value">\${e(h.typewriter)}</textarea></div></div>\`}
function servicesSection(){const s=C.services||[];return\`<div class="sec-header"><div class="sec-title">Services</div><div class="sec-desc">The 3 numbered items.</div></div>\${s.map((sv,i)=>\`<div class="card"><div class="card-title">Item \${i+1}</div><div class="field"><label class="field-label">Title</label><input class="f-input" type="text" value="\${e(sv.title)}" oninput="C.services[\${i}].title=this.value"/></div><div class="field"><label class="field-label">Description</label><textarea class="f-input" rows="3" oninput="C.services[\${i}].desc=this.value">\${e(sv.desc)}</textarea></div></div>\`).join('')}\`}
function pricingSection(){return\`<div class="sec-header"><div class="sec-title">Pricing</div><div class="sec-desc">Edit prices and features.</div></div><div class="tab-row"><button class="tab \${pTab==='landing'?'active':''}" onclick="pTab='landing';render('pricing')">Landing Page</button><button class="tab \${pTab==='standard'?'active':''}" onclick="pTab='standard';render('pricing')">Standard Site</button><button class="tab \${pTab==='full'?'active':''}" onclick="pTab='full';render('pricing')">Full Site</button></div>\${pricingCard(pTab)}\`}
function pricingCard(plan){const p=(C.pricing||{})[plan]||{};const feats=(p.features||[]).map((f,i)=>\`<div class="feat-row"><input class="f-input" type="text" value="\${e(f)}" oninput="C.pricing['\${plan}'].features[\${i}]=this.value"/><button class="del-btn" onclick="delFeat('\${plan}',\${i})">×</button></div>\`).join('');return\`<div class="card"><div class="card-title">Price</div><div class="field-row"><div class="field"><label class="field-label">One-time price ($)</label><input class="f-input" type="text" value="\${e(p.price)}" oninput="C.pricing['\${plan}'].price=this.value"/></div><div class="field"><label class="field-label">Monthly line</label><input class="f-input" type="text" value="\${e(p.monthlyDesc)}" oninput="C.pricing['\${plan}'].monthlyDesc=this.value"/></div></div></div><div class="card"><div class="card-title">Features</div><div class="feat-list">\${feats}</div><button class="add-btn" onclick="addFeat('\${plan}')">+ Add feature</button></div>\`}
function addFeat(plan){if(!C.pricing[plan].features)C.pricing[plan].features=[];C.pricing[plan].features.push('New feature');render('pricing')}
function delFeat(plan,i){C.pricing[plan].features.splice(i,1);render('pricing')}
function testimonialsSection(){const ts=C.testimonials||[];return\`<div class="sec-header"><div class="sec-title">Testimonials</div><div class="sec-desc">The 3 client reviews.</div></div>\${ts.map((t,i)=>\`<div class="card"><div class="card-title">Review \${i+1}</div><div class="field"><label class="field-label">Quote</label><textarea class="f-input" rows="4" oninput="C.testimonials[\${i}].text=this.value">\${e(t.text)}</textarea></div><div class="field"><label class="field-label">Name</label><input class="f-input" type="text" value="\${e(t.name)}" oninput="C.testimonials[\${i}].name=this.value"/></div></div>\`).join('')}\`}
function faqsSection(){const faqs=C.faqs||[];return\`<div class="sec-header"><div class="sec-title">FAQs</div><div class="sec-desc">The questions accordion.</div></div>\${faqs.map((f,i)=>\`<div class="card"><div class="card-title">Question \${i+1}</div><div class="field"><label class="field-label">Question</label><input class="f-input" type="text" value="\${e(f.q)}" oninput="C.faqs[\${i}].q=this.value"/></div><div class="field"><label class="field-label">Answer</label><textarea class="f-input" rows="4" oninput="C.faqs[\${i}].a=this.value">\${e(f.a)}</textarea></div></div>\`).join('')}\`}
function contactSection(){if(!C.contact)C.contact={phone:'(918) 829-3252',email:'jett@atlas-web-develop.com',responseTime:'Same day, usually within a few hours',serviceArea:'Bixby, Jenks, Glenpool, Broken Arrow, Sand Springs, Owasso, Tulsa'};const ct=C.contact;return\`<div class="sec-header"><div class="sec-title">Contact Info</div><div class="sec-desc">Your phone number, email, and service area shown in the contact section and footer.</div></div><div class="card"><div class="card-title">📞 Contact details</div><div class="field-row"><div class="field"><label class="field-label">Phone number</label><input class="f-input" type="text" value="\${e(ct.phone)}" oninput="C.contact.phone=this.value"/></div><div class="field"><label class="field-label">Email address</label><input class="f-input" type="text" value="\${e(ct.email)}" oninput="C.contact.email=this.value"/></div></div><div class="field"><label class="field-label">Response time</label><input class="f-input" type="text" value="\${e(ct.responseTime)}" oninput="C.contact.responseTime=this.value"/></div><div class="field"><label class="field-label">Service area</label><input class="f-input" type="text" value="\${e(ct.serviceArea)}" oninput="C.contact.serviceArea=this.value"/></div></div>\`}

function hoursSection(){if(!C.hours)C.hours={mon:'8am – 6pm',tue:'8am – 6pm',wed:'8am – 6pm',thu:'8am – 6pm',fri:'8am – 6pm',sat:'By appointment',sun:'Closed'};const h=C.hours;const days=[['mon','Monday'],['tue','Tuesday'],['wed','Wednesday'],['thu','Thursday'],['fri','Friday'],['sat','Saturday'],['sun','Sunday']];return\`<div class="sec-header"><div class="sec-title">Business Hours</div><div class="sec-desc">Shown in the contact section of your site. Leave blank to hide a day.</div></div><div class="card"><div class="card-title">🕐 Weekly schedule</div>\${days.map(([k,label])=>\`<div class="field-row" style="align-items:center;margin-bottom:10px"><div style="font-size:13px;font-weight:600;color:#374151;padding-top:4px">\${label}</div><div><input class="f-input" type="text" value="\${e(h[k])}" oninput="C.hours['\${k}']=this.value" placeholder="Closed"/></div></div>\`).join('')}</div>\`}

function statsSection(){if(!C.stats)C.stats=[{value:'199',prefix:'$',suffix:'',label:'Starting price'},{value:'2',prefix:'',suffix:' weeks',label:'Average delivery'},{value:'99',prefix:'$',suffix:'/mo',label:'All-in monthly plan'}];return\`<div class="sec-header"><div class="sec-title">Stats Bar</div><div class="sec-desc">The three numbers that count up below the hero. Update when your pricing or timeline changes.</div></div>\${C.stats.map((s,i)=>\`<div class="card"><div class="card-title">Stat \${i+1}</div><div class="field-row"><div class="field"><label class="field-label">Value</label><input class="f-input" type="text" value="\${e(s.value)}" oninput="C.stats[\${i}].value=this.value"/></div><div class="field"><label class="field-label">Label below</label><input class="f-input" type="text" value="\${e(s.label)}" oninput="C.stats[\${i}].label=this.value"/></div></div><div class="field-row"><div class="field"><label class="field-label">Prefix (e.g. $)</label><input class="f-input" type="text" value="\${e(s.prefix)}" oninput="C.stats[\${i}].prefix=this.value"/></div><div class="field"><label class="field-label">Suffix (e.g. /mo)</label><input class="f-input" type="text" value="\${e(s.suffix)}" oninput="C.stats[\${i}].suffix=this.value"/></div></div></div>\`).join('')}\`}

function annToggle(){C.announcement.enabled=!C.announcement.enabled;const on=C.announcement.enabled;const tog=document.getElementById('ann-toggle');const dot=document.getElementById('ann-dot');const status=document.getElementById('ann-status');if(tog)tog.style.background=on?'#16a34a':'#d1d5db';if(dot)dot.style.left=on?'25px':'3px';if(status)status.textContent=on?'Banner is ON — showing on your site':'Banner is OFF';}
function annUpdate(){const t=C.announcement.text||'';const b=C.announcement.bg||'#16a34a';const bar=document.getElementById('ann-preview-bar');if(bar){bar.style.background=b;bar.innerHTML=t||'<em style="opacity:.4">Your announcement text will appear here</em>';}}
function annColor(col){C.announcement.bg=col;document.querySelectorAll('.cswatch').forEach(s=>s.style.boxShadow='none');document.getElementById('cswatch-'+col.replace('#',''))?.style.setProperty('box-shadow','0 0 0 3px #fff, 0 0 0 5px '+col);annUpdate();}
function announcementSection(){if(!C.announcement)C.announcement={enabled:false,text:'',bg:'#16a34a'};const a=C.announcement;return\`<div class="sec-header"><div class="sec-title">Announcement Bar</div><div class="sec-desc">A banner at the very top of your site. Great for promos, limited-time offers, or important notices.</div></div><div class="card"><div class="card-title">📢 Banner settings</div><div style="display:flex;align-items:center;gap:14px;background:#f9fafb;border:1px solid #e5e7eb;padding:14px 16px;border-radius:10px;margin-bottom:18px"><div id="ann-toggle" onclick="annToggle()" style="width:48px;height:26px;border-radius:13px;background:\${a.enabled?'#16a34a':'#d1d5db'};position:relative;cursor:pointer;transition:background .2s;flex-shrink:0"><div id="ann-dot" style="width:20px;height:20px;border-radius:50%;background:#fff;position:absolute;top:3px;left:\${a.enabled?'25px':'3px'};transition:left .2s;box-shadow:0 1px 4px rgba(0,0,0,.2)"></div></div><span id="ann-status" style="font-size:14px;font-weight:600;color:#374151">\${a.enabled?'Banner is ON — showing on your site':'Banner is OFF'}</span></div><div class="field"><label class="field-label">Banner text</label><input class="f-input" type="text" value="\${e(a.text)}" placeholder="e.g. First 5 clients get 3 months free — only 2 spots left!" oninput="C.announcement.text=this.value;annUpdate()"/></div><div class="field"><label class="field-label">Background color</label><div style="display:flex;gap:10px;flex-wrap:wrap;margin-top:6px">\${['#16a34a','#0ea5e9','#f59e0b','#dc2626','#7c3aed','#111827'].map(col=>'<div id="cswatch-'+col.replace('#','')+'" onclick="annColor(\\''+col+'\\')" class="cswatch" style="width:34px;height:34px;border-radius:9px;background:'+col+';cursor:pointer;box-shadow:'+(a.bg===col?'0 0 0 3px #fff,0 0 0 5px '+col:'none')+'" onmouseover="this.style.transform=\\'scale(1.1)\\'" onmouseout="this.style.transform=\\'scale(1)\\'"></div>').join('')}</div></div></div><div style="margin-top:4px"><div style="font-size:11px;font-weight:700;color:#9ca3af;text-transform:uppercase;letter-spacing:.8px;margin-bottom:8px">Live preview</div><div id="ann-preview-bar" style="background:\${a.bg||'#16a34a'};color:#fff;text-align:center;padding:12px 20px;font-size:14px;font-weight:600;border-radius:10px;min-height:44px;display:flex;align-items:center;justify-content:center">\${a.text||'<em style="opacity:.4">Your announcement text will appear here</em>'}</div></div>\`}

function seoSection(){if(!C.seo)C.seo={title:'Local Business Websites | Atlas Web Development, Bixby & Tulsa, OK',description:'Professional websites for small businesses in Bixby, Jenks, and Tulsa. Fast delivery, fair prices, free mockup. Local web designer.',ogTitle:'Local Business Websites | Atlas Web Development',ogDescription:'Professional websites for small businesses in Bixby & Tulsa. Free mockup, 2-week delivery, starting at $199.'};const s=C.seo;return\`<div class="sec-header"><div class="sec-title">SEO</div><div class="sec-desc">What Google sees. The title and description show up in search results. Keep them accurate and under the character limits shown.</div></div><div class="card"><div class="card-title">🔍 Google search result</div><div style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:10px;padding:16px;margin-bottom:20px;font-family:Arial,sans-serif"><div style="font-size:12px;color:#006621;margin-bottom:2px">atlas-web-develop.com</div><div style="font-size:18px;color:#1a0dab;margin-bottom:4px" id="seo-title-preview">\${e(s.title)}</div><div style="font-size:13px;color:#545454" id="seo-desc-preview">\${e(s.description)}</div></div><div class="field"><label class="field-label">Page title <span style="color:#9ca3af;font-weight:400">(50–60 chars ideal)</span></label><input class="f-input" type="text" value="\${e(s.title)}" oninput="C.seo.title=this.value;document.getElementById('seo-title-preview').textContent=this.value"/></div><div class="field"><label class="field-label">Meta description <span style="color:#9ca3af;font-weight:400">(150–160 chars ideal)</span></label><textarea class="f-input" rows="3" oninput="C.seo.description=this.value;document.getElementById('seo-desc-preview').textContent=this.value">\${e(s.description)}</textarea></div></div><div class="card"><div class="card-title">📱 Social share preview</div><div class="field"><label class="field-label">OG Title (shows when shared on Facebook, iMessage, etc.)</label><input class="f-input" type="text" value="\${e(s.ogTitle)}" oninput="C.seo.ogTitle=this.value"/></div><div class="field"><label class="field-label">OG Description</label><textarea class="f-input" rows="2" oninput="C.seo.ogDescription=this.value">\${e(s.ogDescription)}</textarea></div></div>\`}

function passwordSection(){return\`<div class="sec-header"><div class="sec-title">Change Password</div><div class="sec-desc">Update your admin login credentials.</div></div><div class="card"><div class="card-title">🔒 New password</div><div id="pw-msg"></div><form onsubmit="changePw(event)"><div class="field"><label class="field-label">Current password</label><input class="f-input" type="password" id="pw-current" required/></div><div class="field"><label class="field-label">New password</label><input class="f-input" type="password" id="pw-new" required/></div><div class="field"><label class="field-label">Confirm new password</label><input class="f-input" type="password" id="pw-confirm" required/></div><button type="submit" class="save-btn" style="margin-top:8px">Update password</button></form></div>\`}

async function changePw(e){e.preventDefault();const cur=document.getElementById('pw-current').value;const nw=document.getElementById('pw-new').value;const cf=document.getElementById('pw-confirm').value;const msg=document.getElementById('pw-msg');if(nw!==cf){msg.innerHTML='<div style="background:#fef2f2;border:1px solid #fecaca;color:#dc2626;padding:10px 14px;border-radius:8px;font-size:13px;margin-bottom:14px">Passwords do not match.</div>';return;}if(nw.length<10){msg.innerHTML='<div style="background:#fef2f2;border:1px solid #fecaca;color:#dc2626;padding:10px 14px;border-radius:8px;font-size:13px;margin-bottom:14px">Password must be at least 10 characters.</div>';return;}try{const res=await fetch('/cms/change-password',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({current:cur,newPassword:nw})});const txt=await res.text();if(res.ok){msg.innerHTML='<div style="background:#f0fdf4;border:1px solid #bbf7d0;color:#16a34a;padding:10px 14px;border-radius:8px;font-size:13px;margin-bottom:14px;font-weight:600">Password updated successfully.</div>';document.getElementById('pw-current').value='';document.getElementById('pw-new').value='';document.getElementById('pw-confirm').value='';}else{msg.innerHTML='<div style="background:#fef2f2;border:1px solid #fecaca;color:#dc2626;padding:10px 14px;border-radius:8px;font-size:13px;margin-bottom:14px">'+txt+'</div>';}}catch{msg.innerHTML='<div style="background:#fef2f2;border:1px solid #fecaca;color:#dc2626;padding:10px 14px;border-radius:8px;font-size:13px;margin-bottom:14px">Network error. Try again.</div>';}}

function fullEditorSection(){return\`<div class="sec-header"><div class="sec-title">Full HTML Editor</div><div class="sec-desc">Edit the complete source code of your site. <strong>Be careful</strong> — saving here goes live instantly and overrides all CMS text edits. Use Reset to go back to the original.</div></div>
<div class="card" style="padding:0;overflow:hidden;border-color:#e5e7eb">
  <div style="display:flex;align-items:center;justify-content:space-between;padding:12px 18px;background:#1a1d23;border-bottom:1px solid #2d3139">
    <div style="display:flex;align-items:center;gap:10px">
      <div style="width:10px;height:10px;border-radius:50%;background:#ef4444"></div>
      <div style="width:10px;height:10px;border-radius:50%;background:#f59e0b"></div>
      <div style="width:10px;height:10px;border-radius:50%;background:#22c55e"></div>
      <span style="font-size:12px;color:#6b7280;margin-left:6px;font-family:monospace">index.html</span>
    </div>
    <div style="display:flex;gap:8px">
      <button onclick="resetFullHtml()" style="background:transparent;border:1px solid #4b5563;border-radius:7px;padding:6px 14px;font-size:12px;font-weight:600;color:#9ca3af;cursor:pointer;font-family:inherit;transition:all .15s" onmouseover="this.style.borderColor='#ef4444';this.style.color='#ef4444'" onmouseout="this.style.borderColor='#4b5563';this.style.color='#9ca3af'">↩ Reset to original</button>
      <button onclick="saveFullHtml()" id="fe-save-btn" style="background:linear-gradient(135deg,#15803d,#16a34a);border:none;border-radius:7px;padding:6px 16px;font-size:12px;font-weight:600;color:#fff;cursor:pointer;font-family:inherit;box-shadow:0 2px 8px rgba(22,163,74,.3)">Save &amp; go live</button>
    </div>
  </div>
  <div id="fe-loading" style="background:#1a1d23;color:#6b7280;padding:40px;text-align:center;font-family:monospace;font-size:13px">Loading editor...</div>
  <div id="full-editor-wrap" style="display:none"></div>
</div>
<div id="fe-status" style="margin-top:10px;font-size:13px;color:#9ca3af"></div>\`}

async function loadFullEditor(){
  if(window._feLoaded){initCM();return;}
  window._feLoaded=true;
  const loadCSS=href=>{const l=document.createElement('link');l.rel='stylesheet';l.href=href;document.head.appendChild(l);};
  const loadJS=src=>new Promise(res=>{const s=document.createElement('script');s.src=src;s.onload=res;document.head.appendChild(s);});
  loadCSS('https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.16/codemirror.min.css');
  loadCSS('https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.16/theme/dracula.min.css');
  await loadJS('https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.16/codemirror.min.js');
  await loadJS('https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.16/mode/xml/xml.min.js');
  await loadJS('https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.16/mode/javascript/javascript.min.js');
  await loadJS('https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.16/mode/css/css.min.js');
  await loadJS('https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.16/mode/htmlmixed/htmlmixed.min.js');
  initCM();
}

async function initCM(){
  const wrap=document.getElementById('full-editor-wrap');
  const loading=document.getElementById('fe-loading');
  if(!wrap||!window.CodeMirror)return;
  const res=await fetch('/cms/get-html');
  const html=await res.text();
  wrap.style.display='block';
  if(loading)loading.style.display='none';
  if(window._cm){window._cm.setValue(html);return;}
  window._cm=CodeMirror(wrap,{value:html,mode:'htmlmixed',theme:'dracula',lineNumbers:true,lineWrapping:true,tabSize:2,indentWithTabs:false,extraKeys:{'Ctrl-S':saveFullHtml,'Cmd-S':saveFullHtml}});
  window._cm.setSize('100%','680px');
}

async function saveFullHtml(){
  const btn=document.getElementById('fe-save-btn');
  const status=document.getElementById('fe-status');
  if(!window._cm)return;
  if(btn)btn.textContent='Saving...';
  const res=await fetch('/cms/save-html',{method:'POST',headers:{'Content-Type':'text/plain'},body:window._cm.getValue()});
  if(res.ok){showToast('Page saved and live!','ok');if(status)status.textContent='Last saved: '+new Date().toLocaleTimeString();}
  else showToast('Save failed. Try again.','err');
  if(btn)btn.textContent='Save & go live';
}

async function resetFullHtml(){
  if(!confirm('Reset to original? This removes all your code edits.'))return;
  const res=await fetch('/cms/reset-html',{method:'POST'});
  if(res.ok){showToast('Reset to original.','ok');window._cm=null;await loadFullEditor();}
  else showToast('Reset failed.','err');
}

function htmlSection(){if(!C.custom)C.custom={html:'',css:'',js:''};return\`<div class="sec-header"><div class="sec-title">HTML Editor</div><div class="sec-desc">Add custom HTML to the bottom of your page. Use this for embedding Google Maps, chat widgets, booking tools, or anything else.</div></div><div class="card"><div class="card-title">🧩 Custom HTML block</div><div class="field"><label class="field-label">Paste any HTML here — it will be added to your live site automatically</label><div class="code-wrap"><span class="code-lang">HTML</span><textarea class="code-editor" rows="14" placeholder="&lt;!-- Example: embed a Google Map --&gt;&#10;&lt;div style=&quot;margin:40px 0&quot;&gt;&#10;  &lt;iframe src=&quot;...&quot; width=&quot;100%&quot; height=&quot;400&quot;&gt;&lt;/iframe&gt;&#10;&lt;/div&gt;" oninput="C.custom.html=this.value" onkeydown="tabKey(event)">\${e(C.custom.html)}</textarea></div><div class="field-hint">Supports iframes, divs, scripts — anything valid HTML. Changes go live after you click Save.</div></div></div>\`}
function codeSection(){if(!C.custom)C.custom={html:'',css:'',js:''};return\`<div class="sec-header"><div class="sec-title">CSS &amp; JavaScript</div><div class="sec-desc">Add custom styles or scripts. Great for tweaking colors, fonts, adding analytics, or live chat.</div></div><div class="card"><div class="card-title">🎨 Custom CSS</div><div class="field"><label class="field-label">Styles injected into the &lt;head&gt; of your page</label><div class="code-wrap"><span class="code-lang">CSS</span><textarea class="code-editor" rows="10" placeholder="/* Example: change the green color */&#10;:root { --green: #0d9488; }&#10;&#10;/* Example: bigger hero text */&#10;.hero h1 { font-size: 72px; }" oninput="C.custom.css=this.value" onkeydown="tabKey(event)">\${e(C.custom.css)}</textarea></div></div></div><div class="card"><div class="card-title">⚡ Custom JavaScript</div><div class="field"><label class="field-label">Scripts injected before &lt;/body&gt; — analytics, chat, tracking, etc.</label><div class="code-wrap"><span class="code-lang">JS</span><textarea class="code-editor" rows="10" placeholder="// Example: Google Analytics&#10;window.dataLayer = window.dataLayer || [];&#10;&#10;// Example: show an alert on load&#10;// alert('Welcome!');" oninput="C.custom.js=this.value" onkeydown="tabKey(event)">\${e(C.custom.js)}</textarea></div></div></div>\`}
function trustBarSection(){if(!C.trustBar)C.trustBar=[{icon:'📍',text:'Local to Bixby & Tulsa'},{icon:'⚡',text:'Delivered in ~2 weeks'},{icon:'🖼️',text:'Free mockup before you commit'},{icon:'🔧',text:'Unlimited edits with Full Site plan'},{icon:'💰',text:'Starting at $199'},{icon:'🤝',text:'Oklahoma-owned, no overseas outsourcing'}];return\`<div class="sec-header"><div class="sec-title">Trust Bar</div><div class="sec-desc">The 6 trust bullets that appear below the hero. Keep them short and punchy.</div></div>\${C.trustBar.map((item,i)=>\`<div class="card"><div class="card-title">Item \${i+1}</div><div class="field-row"><div class="field"><label class="field-label">Icon (emoji)</label><input class="f-input" type="text" value="\${e(item.icon)}" oninput="C.trustBar[\${i}].icon=this.value" style="font-size:20px;text-align:center"/></div><div class="field"><label class="field-label">Text</label><input class="f-input" type="text" value="\${e(item.text)}" oninput="C.trustBar[\${i}].text=this.value"/></div></div></div>\`).join('')}\`}

function hiwSection(){if(!C.howItWorks)C.howItWorks={heading:'Simple process, no surprises',subtext:'No agency jargon, no bloated timelines. You talk to me directly, start to finish.',steps:[{title:'You reach out',text:'Fill out the form or call me. Tell me what your business does and what you need.'},{title:'Free mockup',text:"I build a mockup of your site so you can see exactly what you're getting before spending a dollar."},{title:'We build it',text:"You approve the mockup, I build the real thing. Usually done in about 2 weeks. You give feedback throughout."},{title:'You go live',text:"Site goes live on your domain. You own your content and brand, we handle the technical side. Unlimited edits included with the Full Site plan."}],ctaHeading:'Want to see what your site could look like?',ctaText:"Fill out the form and I'll put together a free mockup for your business — no commitment."};const hiw=C.howItWorks;return\`<div class="sec-header"><div class="sec-title">How It Works</div><div class="sec-desc">The 4-step process section and the CTA below it.</div></div><div class="card"><div class="card-title">Section heading</div><div class="field"><label class="field-label">Heading</label><input class="f-input" type="text" value="\${e(hiw.heading)}" oninput="C.howItWorks.heading=this.value"/></div><div class="field"><label class="field-label">Subtext</label><textarea class="f-input" rows="2" oninput="C.howItWorks.subtext=this.value">\${e(hiw.subtext)}</textarea></div></div>\${(hiw.steps||[]).map((s,i)=>\`<div class="card"><div class="card-title">Step \${i+1}</div><div class="field"><label class="field-label">Title</label><input class="f-input" type="text" value="\${e(s.title)}" oninput="C.howItWorks.steps[\${i}].title=this.value"/></div><div class="field"><label class="field-label">Description</label><textarea class="f-input" rows="3" oninput="C.howItWorks.steps[\${i}].text=this.value">\${e(s.text)}</textarea></div></div>\`).join('')}<div class="card"><div class="card-title">Bottom CTA</div><div class="field"><label class="field-label">Heading</label><input class="f-input" type="text" value="\${e(hiw.ctaHeading)}" oninput="C.howItWorks.ctaHeading=this.value"/></div><div class="field"><label class="field-label">Text</label><textarea class="f-input" rows="2" oninput="C.howItWorks.ctaText=this.value">\${e(hiw.ctaText)}</textarea></div></div>\`}

function bizChipsSection(){if(!C.bizChips)C.bizChips=['🔧 Plumbers','❄️ HVAC','🌿 Landscapers','🍽️ Restaurants','✂️ Salons','🏗️ Contractors','🚗 Auto Repair','🧹 Cleaning','🐾 Pet Services','💅 Nail Salons','🔑 Real Estate','⚡ Electricians'];return\`<div class="sec-header"><div class="sec-title">Business Types</div><div class="sec-desc">The chips that show which business types you work with, under the Services section.</div></div><div class="card"><div class="card-title">Chips</div><div class="feat-list">\${C.bizChips.map((chip,i)=>\`<div class="feat-row"><input class="f-input" type="text" value="\${e(chip)}" oninput="C.bizChips[\${i}]=this.value"/><button class="del-btn" onclick="C.bizChips.splice(\${i},1);render('bizchips')">×</button></div>\`).join('')}</div><button class="add-btn" onclick="C.bizChips.push('🆕 New type');render('bizchips')">+ Add chip</button></div>\`}

function sectionHeadingsSection(){if(!C.sectionHeadings)C.sectionHeadings={services:{label:'What you get',heading:'Three reasons your business needs a website',subtext:"Not a brochure. A tool that works for you around the clock, while you're on the job."},pricing:{label:'Pricing',heading:'Straight pricing, no hidden fees',subtext:'One-time build fee plus a simple monthly plan that covers everything to keep your site running. No surprises.'},testimonials:{label:'What clients say',heading:'Real results for real businesses',subtext:'Local business owners who went from no online presence to getting found every day.'},faq:{label:'FAQ',heading:'Common questions',subtext:'Straight answers, no sales speak.'},contact:{heading:"Let's build your site",subtext:"Send me a message and I'll put together a free mockup of your site, no cost, no commitment. If you like it, we'll go from there."}};const sh=C.sectionHeadings;const mkCard=(title,key,hasLabel)=>\`<div class="card"><div class="card-title">\${title}</div>\${hasLabel?\`<div class="field"><label class="field-label">Label (small text above heading)</label><input class="f-input" type="text" value="\${e((sh[key]||{}).label)}" oninput="if(!C.sectionHeadings['\${key}'])C.sectionHeadings['\${key}']={};C.sectionHeadings['\${key}'].label=this.value"/></div>\`:''}<div class="field"><label class="field-label">Heading</label><input class="f-input" type="text" value="\${e((sh[key]||{}).heading)}" oninput="if(!C.sectionHeadings['\${key}'])C.sectionHeadings['\${key}']={};C.sectionHeadings['\${key}'].heading=this.value"/></div><div class="field"><label class="field-label">Subtext</label><textarea class="f-input" rows="2" oninput="if(!C.sectionHeadings['\${key}'])C.sectionHeadings['\${key}']={};C.sectionHeadings['\${key}'].subtext=this.value">\${e((sh[key]||{}).subtext)}</textarea></div></div>\`;return\`<div class="sec-header"><div class="sec-title">Section Headings</div><div class="sec-desc">The headline and subtext at the top of each page section.</div></div>\${mkCard('Services','services',true)}\${mkCard('Pricing','pricing',true)}\${mkCard('Testimonials','testimonials',true)}\${mkCard('FAQ','faq',true)}\${mkCard('Contact','contact',false)}\`}

function footerSection(){if(!C.footer)C.footer={area:'Serving Bixby, Jenks, Broken Arrow, and Tulsa, OK'};return\`<div class="sec-header"><div class="sec-title">Footer</div><div class="sec-desc">The service area text shown in the footer.</div></div><div class="card"><div class="card-title">Service area text</div><div class="field"><input class="f-input" type="text" value="\${e(C.footer.area)}" oninput="C.footer.area=this.value"/></div></div>\`}

function tabKey(e){if(e.key==='Tab'){e.preventDefault();const s=e.target.selectionStart,en=e.target.selectionEnd;e.target.value=e.target.value.substring(0,s)+'  '+e.target.value.substring(en);e.target.selectionStart=e.target.selectionEnd=s+2}}
async function saveAll(){const btn=document.getElementById('save-btn');const msg=document.getElementById('save-msg');btn.disabled=true;btn.textContent='Saving...';try{const res=await fetch('/cms/save',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(C)});if(res.ok){showToast('Saved! Your site is updated.','ok');msg.textContent='All changes saved.';msg.className='save-msg ok'}else{showToast('Save failed. Try again.','err');msg.textContent='Save failed.';msg.className='save-msg err'}}catch{showToast('Network error. Try again.','err')}btn.disabled=false;btn.textContent='Save changes'}
function showToast(msg,type){const t=document.getElementById('toast');t.textContent=msg;t.className='toast show '+type;setTimeout(()=>t.className='toast',3500)}
function initTheme(){if(localStorage.getItem('atlas-theme')==='dark'){document.body.classList.add('dark');const b=document.getElementById('theme-btn');if(b)b.textContent='☀️';}}
function toggleTheme(){const dark=document.body.classList.toggle('dark');localStorage.setItem('atlas-theme',dark?'dark':'light');const b=document.getElementById('theme-btn');if(b)b.textContent=dark?'☀️':'🌙';}
initTheme();
render('hero');
</script></body></html>`;
}

// ── Route handlers ───────────────────────────────────────

async function handleCms(request, env) {
  const url = new URL(request.url);
  const path = url.pathname.replace(/^\/cms\/?/, '') || '';
  const method = request.method;
  const adminExists = !!(await env.CONTENT.get('auth:hash'));

  if (!adminExists) {
    if (path === 'setup' && method === 'POST') return handleSetup(request, env);
    return pageHtml(setupPage());
  }

  if (path === '' || path === 'login') {
    if (method === 'POST') return handleLogin(request, env);
    const authed = await verifySession(request, env);
    if (authed) return redirect('/cms/dashboard');
    return pageHtml(loginPage());
  }

  if (path === 'logout' && method === 'POST') {
    return new Response(null, { status: 303, headers: { Location: '/cms', 'Set-Cookie': 'atlas_cms=; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=0' } });
  }

  const authed = await verifySession(request, env);
  if (!authed) return redirect('/cms');

  if (path === 'dashboard') {
    const content = await env.CONTENT.get('site_content', { type: 'json' });
    return pageHtml(dashboardPage(content));
  }

  if (path === 'save' && method === 'POST') {
    try {
      const content = await request.json();
      if (typeof content !== 'object' || !content) return new Response('Invalid', { status: 400 });
      await env.CONTENT.put('site_content', JSON.stringify(content));
      return new Response('OK');
    } catch { return new Response('Error', { status: 500 }); }
  }

  if (path === 'change-password' && method === 'POST') {
    return handleChangePassword(request, env);
  }

  if (path === 'get-html' && method === 'GET') {
    const custom = await env.CONTENT.get('custom_page_html');
    if (custom) return new Response(custom, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
    const asset = await env.ASSETS.fetch(new Request('https://atlas-web-develop.com/'));
    const html = await asset.text();
    return new Response(html, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
  }

  if (path === 'save-html' && method === 'POST') {
    const html = await request.text();
    if (!html || html.length < 50) return new Response('Invalid', { status: 400 });
    await env.CONTENT.put('custom_page_html', html);
    return new Response('OK');
  }

  if (path === 'reset-html' && method === 'POST') {
    await env.CONTENT.delete('custom_page_html');
    return new Response('OK');
  }

  return new Response('Not found', { status: 404 });
}

async function handleSetup(request, env) {
  const data = await request.formData();
  const username = (data.get('username') || '').trim();
  const password = data.get('password') || '';
  const password2 = data.get('password2') || '';
  if (username.length < 2) return pageHtml(setupPage('Username must be at least 2 characters.'));
  if (password.length < 10) return pageHtml(setupPage('Password must be at least 10 characters.'));
  if (password !== password2) return pageHtml(setupPage('Passwords do not match.'));
  const saltBytes = new Uint8Array(16);
  crypto.getRandomValues(saltBytes);
  const salt = Array.from(saltBytes).map(b => b.toString(16).padStart(2, '0')).join('');
  const hash = await hashPassword(password, salt);
  await env.CONTENT.put('auth:username', username);
  await env.CONTENT.put('auth:hash', hash);
  await env.CONTENT.put('auth:salt', salt);
  return redirect('/cms');
}

async function handleLogin(request, env) {
  const ip = request.headers.get('CF-Connecting-IP') || 'unknown';
  const ratKey = `ratelimit:${ip}`;
  const ratData = await env.CONTENT.get(ratKey, { type: 'json' });
  const now = Date.now();
  if (ratData && ratData.count >= 5 && (now - ratData.firstAt) < 900000) {
    return pageHtml(loginPage('Too many failed attempts. Try again in 15 minutes.'), 429);
  }
  const data = await request.formData();
  const username = (data.get('username') || '').trim();
  const password = data.get('password') || '';
  const storedUser = await env.CONTENT.get('auth:username');
  const storedHash = await env.CONTENT.get('auth:hash');
  const storedSalt = await env.CONTENT.get('auth:salt');
  const inputHash = await hashPassword(password, storedSalt || '');
  const valid = timingSafeEqual(username, storedUser || '') && timingSafeEqual(inputHash, storedHash || '');
  if (!valid) {
    const newRat = { count: (ratData?.count || 0) + 1, firstAt: ratData?.firstAt || now };
    await env.CONTENT.put(ratKey, JSON.stringify(newRat), { expirationTtl: 900 });
    return pageHtml(loginPage('Incorrect username or password.'));
  }
  await env.CONTENT.delete(ratKey);
  const session = await createSession(env);
  return new Response(null, { status: 303, headers: { Location: '/cms/dashboard', 'Set-Cookie': `atlas_cms=${encodeURIComponent(session)}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=86400` } });
}

async function handleChangePassword(request, env) {
  try {
    const { current, newPassword } = await request.json();
    if (!current || !newPassword) return new Response('Missing fields', { status: 400 });
    if (newPassword.length < 3) return new Response('Password too short', { status: 400 });
    const storedHash = await env.CONTENT.get('auth:hash');
    const storedSalt = await env.CONTENT.get('auth:salt');
    const currentHash = await hashPassword(current, storedSalt || '');
    if (!timingSafeEqual(currentHash, storedHash || '')) {
      return new Response('Current password is incorrect', { status: 401 });
    }
    const saltBytes = new Uint8Array(16);
    crypto.getRandomValues(saltBytes);
    const newSalt = Array.from(saltBytes).map(b => b.toString(16).padStart(2, '0')).join('');
    const newHash = await hashPassword(newPassword, newSalt);
    await env.CONTENT.put('auth:hash', newHash);
    await env.CONTENT.put('auth:salt', newSalt);
    return new Response('OK');
  } catch { return new Response('Error', { status: 500 }); }
}

// ── Main Worker ──────────────────────────────────────────

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Content API
    if (url.pathname === '/api/content' && request.method === 'GET') {
      try {
        const content = await env.CONTENT.get('site_content', { type: 'json' });
        return new Response(JSON.stringify(content || null), {
          headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' }
        });
      } catch {
        return new Response('null', { headers: { 'Content-Type': 'application/json' } });
      }
    }

    // Admin dashboard
    if (url.pathname.startsWith('/cms')) {
      return handleCms(request, env);
    }

    // Check for custom HTML saved from full editor
    if ((url.pathname === '/' || url.pathname === '/index.html') && request.method === 'GET') {
      const customHtml = await env.CONTENT.get('custom_page_html');
      if (customHtml) {
        return new Response(customHtml, { headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store' } });
      }
    }

    // Serve static assets — inject CMS content into any HTML response
    const assetRes = await env.ASSETS.fetch(request);
    const ct = assetRes.headers.get('content-type') || '';
    if (!ct.includes('text/html') || request.method !== 'GET') return assetRes;
    if (url.pathname.startsWith('/demos/')) return assetRes;

    try {
      const content = await env.CONTENT.get('site_content', { type: 'json' });
      if (!content) return assetRes;
      let html = await assetRes.text();

      // SEO
      const seo = content.seo;
      if (seo) {
        if (seo.title) html = html.replace(/<title>[^<]*<\/title>/, `<title>${seo.title}</title>`);
        if (seo.description) html = html.replace(/(<meta name="description" content=")[^"]*(")/,`$1${seo.description}$2`);
        if (seo.ogTitle) html = html.replace(/(<meta property="og:title" content=")[^"]*(")/,`$1${seo.ogTitle}$2`);
        if (seo.ogDescription) html = html.replace(/(<meta property="og:description" content=")[^"]*(")/,`$1${seo.ogDescription}$2`);
      }

      // Full CMS injection script
      const injectData = {};
      if (content.hero) injectData.hero = content.hero;
      if (content.services) injectData.services = content.services;
      if (content.pricing) injectData.pricing = content.pricing;
      if (content.testimonials) injectData.testimonials = content.testimonials;
      if (content.faqs) injectData.faqs = content.faqs;
      if (content.contact) injectData.contact = content.contact;
      if (content.stats) injectData.stats = content.stats;
      if (content.hours) injectData.hours = content.hours;
      if (content.trustBar) injectData.trustBar = content.trustBar;
      if (content.howItWorks) injectData.howItWorks = content.howItWorks;
      if (content.bizChips) injectData.bizChips = content.bizChips;
      if (content.sectionHeadings) injectData.sectionHeadings = content.sectionHeadings;
      if (content.footer) injectData.footer = content.footer;
      const injectScript = `<script>(function(){const D=${JSON.stringify(injectData).replace(/<\/script>/gi, '<\\/script>')};window.__CMS=D;
function gi(id){return document.getElementById(id);}
function st(id,val){var el=gi(id);if(el&&val!==undefined)el.textContent=val;}
function hesc(s){return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');}
if(D.hero){var h=D.hero;st('cms-hero-tag',h.tag);var h1=gi('cms-hero-h1');if(h1&&h.headlineWhite){var ws=h.headlineWhite.split(' ');var gs=hesc(h.headlineGreen||'');var bd=2.9;var html='';ws.forEach(function(w,i){html+='<span class="hero-word" style="animation-delay:'+(bd+i*0.15)+'s">'+hesc(w)+'</span> ';});html+='<span class="hero-word green" style="animation-delay:'+(bd+ws.length*0.15)+'s"> '+gs+'</span>';h1.innerHTML=html;}}
if(D.services){D.services.forEach(function(s,i){st('cms-svc-'+i+'-title',s.title);st('cms-svc-'+i+'-desc',s.desc);});}
if(D.pricing){['landing','standard','full'].forEach(function(plan){var p=D.pricing[plan];if(!p)return;var pe=gi('cms-price-'+plan);if(pe)pe.innerHTML='<sup>$<\/sup>'+p.price;st('cms-monthly-'+plan,p.monthlyDesc);var fe=gi('cms-features-'+plan);if(fe&&p.features)fe.innerHTML=p.features.map(function(f){return'<li><span class="check">✓<\/span> '+f+'<\/li>';}).join('');});}
if(D.testimonials){D.testimonials.forEach(function(t,i){var txt=gi('cms-testi-'+i+'-text');if(txt)txt.textContent='"'+t.text+'"';st('cms-testi-'+i+'-name',t.name);var av=gi('cms-testi-'+i+'-avatar');if(av&&t.name)av.textContent=t.name[0].toUpperCase();});}
if(D.faqs){var fl=gi('cms-faq-list');if(fl)fl.innerHTML=D.faqs.map(function(f){return'<div class="faq-item"><button class="faq-q" onclick="toggleFaq(this)">'+hesc(f.q)+'<span class="faq-icon">+<\/span><\/button><div class="faq-a"><p>'+hesc(f.a)+'<\/p><\/div><\/div>';}).join('');}
if(D.contact){st('cms-phone',D.contact.phone);st('cms-nav-phone',D.contact.phone);st('cms-email',D.contact.email);st('cms-response',D.contact.responseTime);st('cms-area',D.contact.serviceArea);var ph=gi('cms-phone');if(ph)ph.href='tel:'+D.contact.phone.replace(/\\D/g,'');var np=gi('cms-nav-phone');if(np)np.href='tel:'+D.contact.phone.replace(/\\D/g,'');}
if(D.stats){document.querySelectorAll('.stat-num').forEach(function(el,i){var s=D.stats[i];if(!s)return;el.dataset.target=s.value;el.dataset.prefix=s.prefix||'';el.dataset.suffix=s.suffix||'';el.textContent=(s.prefix||'')+'0'+(s.suffix||'');});document.querySelectorAll('.stat-desc').forEach(function(el,i){if(D.stats[i])el.textContent=D.stats[i].label;});}
if(D.hours){var he=gi('cms-hours');var hw=gi('cms-hours-wrap');if(he){var days=['mon','tue','wed','thu','fri','sat','sun'],names=['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];he.innerHTML=days.map(function(d,i){return'<div style="display:flex;justify-content:space-between;padding:4px 0;border-bottom:1px solid #f3f4f6;font-size:14px;"><span style="color:#6b7280">'+names[i]+'</span><span style="font-weight:600">'+(D.hours[d]||'')+'</span><\/div>';}).join('');if(hw)hw.style.display='block';}}
if(D.trustBar){var tb=gi('cms-trust-bar');if(tb)tb.innerHTML=D.trustBar.map(function(item){return'<div class="trust-item"><div class="trust-icon">'+hesc(item.icon)+'<\/div>'+hesc(item.text)+'<\/div>';}).join('');}
if(D.howItWorks){var hiw=D.howItWorks;st('cms-hiw-heading',hiw.heading);st('cms-hiw-subtext',hiw.subtext);st('cms-hiw-cta-heading',hiw.ctaHeading);st('cms-hiw-cta-text',hiw.ctaText);if(hiw.steps)hiw.steps.forEach(function(s,i){st('cms-hiw-'+i+'-title',s.title);st('cms-hiw-'+i+'-text',s.text);});}
if(D.bizChips){var bc=gi('cms-biz-chips');if(bc)bc.innerHTML=D.bizChips.map(function(c){return'<span>'+c+'<\/span>';}).join('');}
if(D.sectionHeadings){var sh=D.sectionHeadings;if(sh.services){st('cms-services-label',sh.services.label);st('cms-services-heading',sh.services.heading);st('cms-services-subtext',sh.services.subtext);}if(sh.pricing){st('cms-pricing-label',sh.pricing.label);st('cms-pricing-heading',sh.pricing.heading);st('cms-pricing-subtext',sh.pricing.subtext);}if(sh.testimonials){st('cms-testi-label',sh.testimonials.label);st('cms-testi-heading',sh.testimonials.heading);st('cms-testi-subtext',sh.testimonials.subtext);}if(sh.faq){st('cms-faq-label',sh.faq.label);st('cms-faq-heading',sh.faq.heading);st('cms-faq-subtext',sh.faq.subtext);}if(sh.contact){st('cms-contact-heading',sh.contact.heading);st('cms-contact-subtext',sh.contact.subtext);}}
if(D.footer){st('cms-footer-area',D.footer.area);}
})();<\/script>`;
      html = html.replace('</body>', injectScript + '\n</body>');

      // Custom CSS / HTML / JS
      const custom = content.custom;
      if (custom) {
        if (custom.css) html = html.replace('</head>', `<style>${custom.css}</style></head>`);
        if (custom.html) html = html.replace('</body>', `${custom.html}\n</body>`);
        if (custom.js) html = html.replace('</body>', `<script>${custom.js}<\/script>\n</body>`);
      }

      return new Response(html, { headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store' } });
    } catch { return assetRes; }
  }
};
