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
  ]
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
@media(max-width:768px){.sidebar{display:none}.main{padding:20px}.field-row{grid-template-columns:1fr}}
</style></head><body>
<div class="topbar">
  <div class="brand">
    <div class="brand-icon">A</div>
    <div><div class="brand-name">Atlas Admin</div><div class="brand-sub">atlas-web-develop.com</div></div>
  </div>
  <div class="topbar-right">
    <a href="https://atlas-web-develop.com" target="_blank" class="view-link">↗ View site</a>
    <form method="POST" action="/cms/logout" style="display:inline"><button class="logout-btn">Sign out</button></form>
  </div>
</div>
<div class="layout">
  <nav class="sidebar">
    <div class="sidebar-section">Sections</div>
    <button class="nav-btn active" onclick="nav('hero',this)"><span class="nav-icon">🏠</span><span class="nav-label">Hero</span></button>
    <button class="nav-btn" onclick="nav('services',this)"><span class="nav-icon">⚡</span><span class="nav-label">Services</span></button>
    <button class="nav-btn" onclick="nav('pricing',this)"><span class="nav-icon">💰</span><span class="nav-label">Pricing</span></button>
    <button class="nav-btn" onclick="nav('testimonials',this)"><span class="nav-icon">⭐</span><span class="nav-label">Testimonials</span></button>
    <button class="nav-btn" onclick="nav('faqs',this)"><span class="nav-icon">❓</span><span class="nav-label">FAQs</span></button>
  </nav>
  <div class="main" id="main"></div>
</div>
<div class="save-bar"><span class="save-msg" id="save-msg">Edit any field and click Save when ready.</span><button class="save-btn" id="save-btn" onclick="saveAll()">Save changes</button></div>
<div class="toast" id="toast"></div>
<script>
const C=${c};let pTab='landing';
function e(s){return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;')}
function nav(name,btn){document.querySelectorAll('.nav-btn').forEach(b=>b.classList.remove('active'));btn.classList.add('active');render(name)}
function render(name){const el=document.getElementById('main');if(name==='hero')el.innerHTML=heroSection();else if(name==='services')el.innerHTML=servicesSection();else if(name==='pricing')el.innerHTML=pricingSection();else if(name==='testimonials')el.innerHTML=testimonialsSection();else if(name==='faqs')el.innerHTML=faqsSection()}
function heroSection(){const h=C.hero||{};return\`<div class="sec-header"><div class="sec-title">Hero</div><div class="sec-desc">The first thing visitors see.</div></div><div class="card"><div class="card-title">Location tag</div><div class="field"><label class="field-label">Tag above headline</label><input class="f-input" type="text" value="\${e(h.tag)}" oninput="C.hero.tag=this.value"/></div></div><div class="card"><div class="card-title">Headline</div><div class="field"><label class="field-label">White part</label><input class="f-input" type="text" value="\${e(h.headlineWhite)}" oninput="C.hero.headlineWhite=this.value"/></div><div class="field"><label class="field-label">Green part</label><input class="f-input" type="text" value="\${e(h.headlineGreen)}" oninput="C.hero.headlineGreen=this.value"/></div></div><div class="card"><div class="card-title">Typewriter text</div><div class="field"><label class="field-label">Text that types out below the headline</label><textarea class="f-input" rows="3" oninput="C.hero.typewriter=this.value">\${e(h.typewriter)}</textarea></div></div>\`}
function servicesSection(){const s=C.services||[];return\`<div class="sec-header"><div class="sec-title">Services</div><div class="sec-desc">The 3 numbered items.</div></div>\${s.map((sv,i)=>\`<div class="card"><div class="card-title">Item \${i+1}</div><div class="field"><label class="field-label">Title</label><input class="f-input" type="text" value="\${e(sv.title)}" oninput="C.services[\${i}].title=this.value"/></div><div class="field"><label class="field-label">Description</label><textarea class="f-input" rows="3" oninput="C.services[\${i}].desc=this.value">\${e(sv.desc)}</textarea></div></div>\`).join('')}\`}
function pricingSection(){return\`<div class="sec-header"><div class="sec-title">Pricing</div><div class="sec-desc">Edit prices and features.</div></div><div class="tab-row"><button class="tab \${pTab==='landing'?'active':''}" onclick="pTab='landing';render('pricing')">Landing Page</button><button class="tab \${pTab==='standard'?'active':''}" onclick="pTab='standard';render('pricing')">Standard Site</button><button class="tab \${pTab==='full'?'active':''}" onclick="pTab='full';render('pricing')">Full Site</button></div>\${pricingCard(pTab)}\`}
function pricingCard(plan){const p=(C.pricing||{})[plan]||{};const feats=(p.features||[]).map((f,i)=>\`<div class="feat-row"><input class="f-input" type="text" value="\${e(f)}" oninput="C.pricing['\${plan}'].features[\${i}]=this.value"/><button class="del-btn" onclick="delFeat('\${plan}',\${i})">×</button></div>\`).join('');return\`<div class="card"><div class="card-title">Price</div><div class="field-row"><div class="field"><label class="field-label">One-time price ($)</label><input class="f-input" type="text" value="\${e(p.price)}" oninput="C.pricing['\${plan}'].price=this.value"/></div><div class="field"><label class="field-label">Monthly line</label><input class="f-input" type="text" value="\${e(p.monthlyDesc)}" oninput="C.pricing['\${plan}'].monthlyDesc=this.value"/></div></div></div><div class="card"><div class="card-title">Features</div><div class="feat-list">\${feats}</div><button class="add-btn" onclick="addFeat('\${plan}')">+ Add feature</button></div>\`}
function addFeat(plan){if(!C.pricing[plan].features)C.pricing[plan].features=[];C.pricing[plan].features.push('New feature');render('pricing')}
function delFeat(plan,i){C.pricing[plan].features.splice(i,1);render('pricing')}
function testimonialsSection(){const ts=C.testimonials||[];return\`<div class="sec-header"><div class="sec-title">Testimonials</div><div class="sec-desc">The 3 client reviews.</div></div>\${ts.map((t,i)=>\`<div class="card"><div class="card-title">Review \${i+1}</div><div class="field"><label class="field-label">Quote</label><textarea class="f-input" rows="4" oninput="C.testimonials[\${i}].text=this.value">\${e(t.text)}</textarea></div><div class="field"><label class="field-label">Name</label><input class="f-input" type="text" value="\${e(t.name)}" oninput="C.testimonials[\${i}].name=this.value"/></div></div>\`).join('')}\`}
function faqsSection(){const faqs=C.faqs||[];return\`<div class="sec-header"><div class="sec-title">FAQs</div><div class="sec-desc">The questions accordion.</div></div>\${faqs.map((f,i)=>\`<div class="card"><div class="card-title">Question \${i+1}</div><div class="field"><label class="field-label">Question</label><input class="f-input" type="text" value="\${e(f.q)}" oninput="C.faqs[\${i}].q=this.value"/></div><div class="field"><label class="field-label">Answer</label><textarea class="f-input" rows="4" oninput="C.faqs[\${i}].a=this.value">\${e(f.a)}</textarea></div></div>\`).join('')}\`}
async function saveAll(){const btn=document.getElementById('save-btn');const msg=document.getElementById('save-msg');btn.disabled=true;btn.textContent='Saving...';try{const res=await fetch('/cms/save',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(C)});if(res.ok){showToast('Saved! Your site is updated.','ok');msg.textContent='All changes saved.';msg.className='save-msg ok'}else{showToast('Save failed. Try again.','err');msg.textContent='Save failed.';msg.className='save-msg err'}}catch{showToast('Network error. Try again.','err')}btn.disabled=false;btn.textContent='Save changes'}
function showToast(msg,type){const t=document.getElementById('toast');t.textContent=msg;t.className='toast show '+type;setTimeout(()=>t.className='toast',3500)}
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

  return new Response('Not found', { status: 404 });
}

async function handleSetup(request, env) {
  const data = await request.formData();
  const username = (data.get('username') || '').trim();
  const password = data.get('password') || '';
  const password2 = data.get('password2') || '';
  if (username.length < 2) return pageHtml(setupPage('Username must be at least 2 characters.'));
  if (password.length < 3) return pageHtml(setupPage('Password must be at least 3 characters.'));
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

    // Everything else — serve static assets
    return env.ASSETS.fetch(request);
  }
};
