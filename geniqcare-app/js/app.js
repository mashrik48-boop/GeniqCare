/* ---------- helpers ---------- */
const $app = () => document.getElementById('app');
const uid = () => Math.random().toString(36).slice(2, 10);
const todayISO = () => new Date().toISOString().slice(0, 10);
const fmtDate = (iso) => {
  const d = new Date(iso + 'T00:00:00');
  const lang = Store.get('lang');
  return d.toLocaleDateString(lang === 'fr' ? 'fr-CA' : 'en-CA', { year: 'numeric', month: 'long', day: 'numeric' });
};
function nav(hash) { location.hash = hash; }
function catalog() { return window.PRODUCTS || []; }

function toast(msg) {
  let el = document.getElementById('toast');
  if (!el) {
    el = document.createElement('div');
    el.id = 'toast';
    document.body.appendChild(el);
  }
  el.textContent = msg;
  el.className = 'toast show';
  clearTimeout(el._t);
  el._t = setTimeout(() => { el.className = 'toast'; }, 2200);
}

/* ---------- shell ---------- */
function shell(contentHtml, opts = {}) {
  const showHelp = opts.help !== false;
  const showNav = opts.nav !== false;
  const showBack = !!opts.back;
  const title = opts.title || '';
  return `
  <div class="screen">
    <div class="topbar">
      ${showBack ? `<button class="iconbtn" id="backBtn">‹</button>` : `<div style="width:32px"></div>`}
      ${title ? `<div class="topbar-title">${title}</div>` : `<div></div>`}
      <div class="topbar-right">
        ${showHelp ? `<button class="chip help-chip" id="helpChip">💬 ${t('help.needhelp')}</button>` : ''}
      </div>
    </div>
    <div class="content">${contentHtml}</div>
    ${showNav ? bottomNav(opts.active) : ''}
  </div>`;
}

function bottomNav(active) {
  const items = [
    ['plan', '💊', 'nav.supplements', '#/plan'],
    ['health', '❤️', 'nav.health', '#/health'],
    ['home', '🏠', 'nav.home', '#/home'],
    ['more', '▦', 'nav.more', '#/more'],
    ['profile', '👤', 'nav.profile', '#/profile'],
  ];
  return `<div class="bottomnav">
    ${items.map(([key, icon, label, href]) => `
      <a class="navitem ${active === key ? 'active' : ''}" href="${href}">
        <span class="navicon">${icon}</span>
        <span class="navlabel">${t(label)}</span>
      </a>`).join('')}
  </div>`;
}

function bindShell() {
  const help = document.getElementById('helpChip');
  if (help) help.addEventListener('click', () => { Store.set('chat.open', true); renderChat(); });
  const back = document.getElementById('backBtn');
  if (back) back.addEventListener('click', () => history.back());
}

/* ---------- SPLASH ---------- */
function renderSplash() {
  $app().innerHTML = `
    <div class="splash">
      <div class="splash-logo">GeniqCare</div>
      <div class="splash-tag">${t('app.tagline')}</div>
    </div>`;
  setTimeout(() => {
    nav(Store.get('auth.loggedIn') ? (Store.get('onboardingComplete') ? '#/home' : '#/onboarding') : '#/auth-login');
  }, 1200);
}

/* ---------- AUTH ---------- */
function langSwitch(variant) {
  const lang = Store.get('lang');
  return `<div class="langswitch ${variant === 'auth' ? 'auth-position' : ''}" id="langSwitch">
    <span class="${lang === 'fr' ? 'active' : ''}" data-lang="fr">FR</span>
    <span class="${lang === 'en' ? 'active' : ''}" data-lang="en">EN</span>
  </div>`;
}
function bindLangSwitch(afterFn) {
  const el = document.getElementById('langSwitch');
  if (!el) return;
  el.querySelectorAll('span').forEach(s => s.addEventListener('click', () => {
    Store.set('lang', s.dataset.lang);
    afterFn();
  }));
}

function renderAuth(mode) {
  const isSignup = mode === 'signup';
  $app().innerHTML = `
    <div class="authscreen">
      ${langSwitch('auth')}
      <div class="auth-logo">GeniqCare</div>
      <h1 class="auth-title">${isSignup ? t('auth.createtitle') : t('auth.title')}</h1>
      <form id="authForm" class="authform">
        <input type="text" id="authEmail" placeholder="${t('auth.email')}" required />
        <div class="pwfield">
          <input type="password" id="authPw" placeholder="${isSignup ? t('auth.createpassword') : t('auth.password')}" required />
        </div>
        ${isSignup ? `<div class="pwfield"><input type="password" id="authPw2" placeholder="${t('auth.confirmpassword')}" required /></div>` : ''}
        ${!isSignup ? `<label class="checkrow"><input type="checkbox" id="keepSignedIn" checked /> ${t('auth.keepsignedin')}</label>
          <a class="linktext" href="#" id="forgotLink">${t('auth.forgot')}</a>` : ''}
        ${isSignup ? `<label class="checkrow"><input type="checkbox" id="agreeTerms" required /> <span>${t('auth.terms')}</span></label>` : ''}
        <div class="formerr" id="authErr"></div>
        <button type="submit" class="btn-primary">${isSignup ? t('btn.signup') : t('btn.login')}</button>
      </form>
      <div class="or-row"><span></span><small>or</small><span></span></div>
      <button class="btn-outline" id="googleBtn">🇬 ${t('auth.google')}</button>
      <button class="btn-outline" id="metaBtn">Ⓜ️ ${t('auth.meta')}</button>
      <div class="auth-footer">
        ${isSignup ? t('auth.alreadyreg') : t('auth.havelacc')}
        <a href="${isSignup ? '#/auth-login' : '#/auth-signup'}">${isSignup ? t('btn.login') : t('btn.signup')}</a>
      </div>
    </div>`;
  bindLangSwitch(() => renderAuth(mode));
  document.getElementById('authForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('authEmail').value.trim();
    const pw = document.getElementById('authPw').value;
    const errEl = document.getElementById('authErr');
    if (!email || !pw) { errEl.textContent = t('auth.err.required'); return; }
    if (isSignup) {
      const pw2 = document.getElementById('authPw2').value;
      if (pw !== pw2) { errEl.textContent = t('auth.err.mismatch'); return; }
      if (pw.length < 8) { errEl.textContent = t('auth.err.short'); return; }
    }
    Store.set('auth', { loggedIn: true, email });
    toast(isSignup ? '✓' : '✓');
    nav(Store.get('onboardingComplete') ? '#/home' : '#/onboarding');
  });
  ['googleBtn', 'metaBtn'].forEach(id => {
    const b = document.getElementById(id);
    if (b) b.addEventListener('click', () => {
      Store.set('auth', { loggedIn: true, email: id === 'googleBtn' ? 'google-user' : 'meta-user' });
      nav(Store.get('onboardingComplete') ? '#/home' : '#/onboarding');
    });
  });
  const forgot = document.getElementById('forgotLink');
  if (forgot) forgot.addEventListener('click', (e) => { e.preventDefault(); toast('✉️'); });
}

/* ---------- ONBOARDING ---------- */
function renderOnboarding() {
  const step = Store.get('onboardingStep') || 1;
  const pct = (step - 1) * 25;
  const u = Store.get('user');

  let body = '';
  if (step === 1) {
    body = `
      <h2>${t('onb.step1.title')}</h2>
      <p class="sub">${t('onb.step1.sub')}</p>
      <div class="field"><label>${t('onb.firstname')}</label><input id="ob_fn" value="${u.firstName || ''}" /></div>
      <div class="field"><label>${t('onb.lastname')}</label><input id="ob_ln" value="${u.lastName || ''}" /></div>
      <div class="field"><label>${t('onb.dob')}</label><input id="ob_dob" type="date" value="${u.dob || ''}" /></div>
      <div class="field"><label>${t('onb.gender')}</label>
        <div class="pilltoggle">
          <button type="button" data-v="male" class="${u.gender === 'male' ? 'active' : ''}">${t('onb.male')}</button>
          <button type="button" data-v="female" class="${u.gender === 'female' ? 'active' : ''}">${t('onb.female')}</button>
        </div>
      </div>
      <div class="field"><label>${t('onb.units')}</label>
        <div class="pilltoggle">
          <button type="button" data-u="metric" class="${Store.get('units') !== 'imperial' ? 'active' : ''}">Kg, cm</button>
          <button type="button" data-u="imperial" class="${Store.get('units') === 'imperial' ? 'active' : ''}">Lb, ft</button>
        </div>
      </div>
      <div class="field"><label>${t('onb.height')}</label><input id="ob_h" type="number" value="${u.height || ''}" /></div>
    `;
  } else if (step === 2) {
    body = `<h2>${t('onb.step2.title')}</h2><p class="sub">${t('onb.step2.sub')}</p>
      <div class="selectlist">
      ${GOALS.map(g => `<button type="button" class="selectitem ${u.goals.includes(g) ? 'active' : ''}" data-g="${g}">${t('goal.' + g)}</button>`).join('')}
      </div>`;
  } else if (step === 3) {
    body = `<h2>${t('onb.step3.title')}</h2><p class="sub">${t('onb.step3.sub')}</p>
      <div class="selectlist">
      ${DIETS.map(d => `<button type="button" class="selectitem ${u.diet.includes(d) ? 'active' : ''}" data-d="${d}">${t('diet.' + d)}</button>`).join('')}
      </div>`;
  } else if (step === 4) {
    body = `<h2>${t('onb.step4.title')}</h2><p class="sub">${t('onb.step4.sub')}</p>
      <div class="iconGrid">
      ${TOPICS.map(top => `<button type="button" class="topicItem ${u.topics.includes(top) ? 'active' : ''}" data-top="${top}">${t('topic.' + top)}</button>`).join('')}
      </div>`;
  }

  $app().innerHTML = `
    <div class="screen">
      <div class="topbar">
        <div style="width:32px"></div>
        <div class="progresswrap"><div class="progressbar" style="width:${pct}%"></div></div>
        <a class="linktext skiplink" href="#" id="skipOnb">${t('btn.skip')}</a>
      </div>
      <div class="content onbcontent">${body}</div>
      <div class="onbfooter">
        <button class="btn-primary" id="obNext">${t('btn.next')}</button>
      </div>
    </div>`;

  if (step === 1) {
    document.querySelectorAll('.pilltoggle button[data-v]').forEach(b => b.addEventListener('click', () => {
      Store.set('user.gender', b.dataset.v); renderOnboarding();
    }));
    document.querySelectorAll('.pilltoggle button[data-u]').forEach(b => b.addEventListener('click', () => {
      Store.set('units', b.dataset.u); renderOnboarding();
    }));
  }
  if (step === 2) {
    document.querySelectorAll('.selectitem[data-g]').forEach(b => b.addEventListener('click', () => {
      const g = b.dataset.g; const arr = Store.get('user.goals');
      Store.set('user.goals', arr.includes(g) ? arr.filter(x => x !== g) : [...arr, g]);
      renderOnboarding();
    }));
  }
  if (step === 3) {
    document.querySelectorAll('.selectitem[data-d]').forEach(b => b.addEventListener('click', () => {
      const d = b.dataset.d; const arr = Store.get('user.diet');
      Store.set('user.diet', arr.includes(d) ? arr.filter(x => x !== d) : [...arr, d]);
      renderOnboarding();
    }));
  }
  if (step === 4) {
    document.querySelectorAll('.topicItem[data-top]').forEach(b => b.addEventListener('click', () => {
      const top = b.dataset.top; const arr = Store.get('user.topics');
      Store.set('user.topics', arr.includes(top) ? arr.filter(x => x !== top) : [...arr, top]);
      renderOnboarding();
    }));
  }

  document.getElementById('skipOnb').addEventListener('click', (e) => {
    e.preventDefault();
    finishOrAdvance(step);
  });
  document.getElementById('obNext').addEventListener('click', () => {
    if (step === 1) {
      Store.set('user.firstName', document.getElementById('ob_fn').value);
      Store.set('user.lastName', document.getElementById('ob_ln').value);
      Store.set('user.dob', document.getElementById('ob_dob').value);
      Store.set('user.height', document.getElementById('ob_h').value);
    }
    finishOrAdvance(step);
  });
}
function finishOrAdvance(step) {
  if (step >= 4) {
    Store.set('onboardingComplete', true);
    Store.set('notifications', [...Store.get('notifications'), { id: uid(), type: 'welcome', read: false, date: new Date().toISOString() }]);
    toast('✓ ' + t('home.greeting', { name: Store.get('user.firstName') || '' }));
    nav('#/home');
  } else {
    Store.set('onboardingStep', step + 1);
    renderOnboarding();
  }
}

/* ---------- HOME ---------- */
function todaysDoses() {
  const active = Store.get('userSupplements').filter(s => s.active);
  const log = Store.get('doseLog')[todayISO()] || {};
  const doses = [];
  active.forEach(s => {
    (s.reminderTimes.length ? s.reminderTimes : ['09:00']).forEach(time => {
      const key = s.id + '_' + time;
      doses.push({ supplement: s, time, taken: !!(log[key] && log[key].taken), key });
    });
  });
  return doses.sort((a, b) => a.time.localeCompare(b.time));
}

function renderHome() {
  const lang = Store.get('lang');
  const name = Store.get('user.firstName') || '';
  const doses = todaysDoses();
  const lab = Store.get('labResults')[0];
  const nut = NUTRIENTS[lab.nutrient];
  const appts = Store.get('appointments').filter(a => a.status === 'booked' && a.datetime > new Date().toISOString());
  const nextAppt = appts.sort((a, b) => a.datetime.localeCompare(b.datetime))[0];
  const unread = Store.get('notifications').filter(n => !n.read).length;

  const content = `
    <div class="homehead">
      <div>
        <div class="greeting">${t('home.greeting', { name })}</div>
      </div>
      <a href="#/notifications" class="bellwrap">🔔${unread ? `<span class="badge">${unread}</span>` : ''}</a>
    </div>

    <div class="section-title">${t('home.todaysupp')}</div>
    ${doses.length === 0 ? `<div class="emptycard">${t('home.noplan')}</div>` : `
    <div class="dosecards">
      ${doses.map(d => `
        <div class="dosecard">
          <div class="dosecard-img">💊</div>
          <div class="dosecard-body">
            <div class="dosecard-name">${d.supplement.name}</div>
            <div class="dosecard-dosage">${d.supplement.dosage}</div>
          </div>
          <button class="dosechip ${d.taken ? 'taken' : ''}" data-key="${d.key}" data-sid="${d.supplement.id}" data-time="${d.time}">
            ${d.taken ? '✓ ' + t('status.taken', { time: d.time }) : '🔔 ' + t('status.upcoming', { time: d.time })}
          </button>
        </div>`).join('')}
    </div>`}

    <div class="section-title">${t('home.nutrients')}</div>
    <a class="nutrientcard" href="#/health/tracker">
      <div>
        <div class="nutrientcard-name">${lang === 'fr' ? nut.name_fr : nut.name_en}, ${fmtDate(lab.date)}</div>
        <div class="nutrientcard-value">${lab.value} ${lab.unit}</div>
      </div>
      <div class="chevron">›</div>
    </a>

    <div class="section-title">${t('home.upcoming')}</div>
    ${nextAppt ? `
    <a class="apptbanner" href="#/health">
      <div class="apptbanner-avatar">👩‍⚕️</div>
      <div>
        <div class="apptbanner-title">${lang === 'fr' ? PRACTITIONERS.find(p=>p.id===nextAppt.practitionerId).type_fr : PRACTITIONERS.find(p=>p.id===nextAppt.practitionerId).type_en} — ${PRACTITIONERS.find(p=>p.id===nextAppt.practitionerId).name}</div>
        <div class="apptbanner-sub">${fmtDate(nextAppt.datetime.slice(0,10))} · ${nextAppt.datetime.slice(11,16)}</div>
      </div>
    </a>` : `<div class="emptycard">${t('home.noappt')}</div>`}
  `;

  $app().innerHTML = shell(content, { active: 'home' });
  bindShell();
  document.querySelectorAll('.dosechip').forEach(btn => btn.addEventListener('click', () => {
    const log = Store.get('doseLog');
    const day = log[todayISO()] || {};
    const key = btn.dataset.key;
    const now = new Date().toISOString().slice(11, 16);
    day[key] = { taken: !day[key] || !day[key].taken, takenAt: now };
    log[todayISO()] = day;
    Store.set('doseLog', log);
    renderHome();
  }));
}

/* ---------- PLAN: schedule ---------- */
function renderPlan() {
  const active = Store.get('userSupplements').filter(s => s.active);
  const doses = todaysDoses();

  const content = `
    <div class="pagehead">${t('plan.title')}</div>
    <div class="segmented" id="planSeg">
      <button class="seg-active" data-v="today">${t('plan.today')}</button>
      <button data-v="week">${t('plan.week')}</button>
      <button data-v="all">${t('plan.all')}</button>
    </div>
    ${active.length === 0 ? `
      <div class="emptystate">
        <div class="emptystate-icon">💊</div>
        <p>${t('plan.empty')}</p>
        <button class="btn-primary" id="emptyAddBtn">${t('plan.emptycta')}</button>
      </div>` : `
      <div class="scheduleList">
      ${doses.map(d => `
        <div class="schedulerow">
          <div class="schedulerow-img">💊</div>
          <div class="schedulerow-body">
            <div class="schedulerow-name">${d.supplement.name}</div>
            <div class="schedulerow-dosage">${d.supplement.dosage} · ${d.time}</div>
          </div>
          <button class="dosechip small ${d.taken ? 'taken' : ''}" data-key="${d.key}">
            ${d.taken ? '✓' : t('btn.markastaken')}
          </button>
          <button class="iconbtn small danger" data-remove="${d.supplement.id}">✕</button>
        </div>`).join('')}
      </div>`}
    <button class="fab" id="fabAdd">+</button>
  `;
  $app().innerHTML = shell(content, { active: 'plan' });
  bindShell();
  document.querySelectorAll('#fabAdd, #emptyAddBtn').forEach(b => b.addEventListener('click', () => nav('#/plan/add')));
  document.querySelectorAll('.dosechip[data-key]').forEach(btn => btn.addEventListener('click', () => {
    const log = Store.get('doseLog');
    const day = log[todayISO()] || {};
    const key = btn.dataset.key;
    const now = new Date().toISOString().slice(11, 16);
    day[key] = { taken: !day[key] || !day[key].taken, takenAt: now };
    log[todayISO()] = day;
    Store.set('doseLog', log);
    renderPlan();
  }));
  document.querySelectorAll('[data-remove]').forEach(btn => btn.addEventListener('click', () => {
    const id = btn.dataset.remove;
    const supp = Store.get('userSupplements').find(s => s.id === id);
    if (confirm(t('plan.removeconfirm', { name: supp.name }))) {
      Store.set('userSupplements', Store.get('userSupplements').map(s => s.id === id ? { ...s, active: false } : s));
      renderPlan();
    }
  }));
}

/* ---------- PLAN: add supplement ---------- */
let addTab = 'browse';
let addSearch = '';
function renderAddSupplement() {
  const products = catalog();
  const filtered = products.filter(p => p.name.toLowerCase().includes(addSearch.toLowerCase()));

  const content = `
    <div class="pagehead">${t('add.title')}</div>
    <input class="searchbar" id="addSearchInput" placeholder="${t('add.search')}" value="${addSearch}" />
    <div class="segmented" id="addTabs">
      <button data-v="browse" class="${addTab === 'browse' ? 'seg-active' : ''}">${t('add.browse')}</button>
      <button data-v="qr" class="${addTab === 'qr' ? 'seg-active' : ''}">${t('add.qr')}</button>
      <button data-v="formula" class="${addTab === 'formula' ? 'seg-active' : ''}">${t('add.formula')}</button>
    </div>
    <div id="addTabBody">${addTab === 'browse' ? renderBrowseTab(filtered) : addTab === 'qr' ? renderQrTab() : renderFormulaTab()}</div>
  `;
  $app().innerHTML = shell(content, { back: true, nav: false, title: '' });
  bindShell();
  document.getElementById('addSearchInput').addEventListener('input', (e) => { addSearch = e.target.value; renderAddSupplement(); });
  document.querySelectorAll('#addTabs button').forEach(b => b.addEventListener('click', () => { addTab = b.dataset.v; renderAddSupplement(); }));
  bindAddTabEvents();
}
function renderBrowseTab(list) {
  return `<div class="productgrid">
    ${list.slice(0, 60).map(p => `
      <div class="productcard">
        <div class="productcard-img">${p.image ? `<img src="${p.image}" onerror="this.style.display='none'"/>` : '💊'}</div>
        <div class="productcard-name">${p.name}</div>
        <div class="productcard-price">$${p.price.toFixed(2)}</div>
        <button class="btn-mini" data-addsku="${p.sku}">${t('btn.add')}</button>
      </div>`).join('')}
  </div>`;
}
function renderQrTab() {
  return `<div class="qrpane">
    <div class="qrbox">📷</div>
    <p class="sub">${t('add.qrhint')}</p>
    <input id="qrInput" placeholder="${t('add.qrplaceholder')}" />
    <button class="btn-primary" id="qrGoBtn">${t('add.qrgo')}</button>
    <div id="qrResult"></div>
  </div>`;
}
function renderFormulaTab() {
  const goals = Store.get('user.goals');
  const recs = catalog().filter(p => goals.some(g => p.name.toLowerCase().includes(g))).slice(0, 6);
  const list = recs.length ? recs : catalog().slice(0, 4);
  return `<p class="sub" style="padding:0 16px">${t('add.formula')}</p>
    <div class="productgrid">
    ${list.map(p => `
      <div class="productcard">
        <div class="productcard-img">${p.image ? `<img src="${p.image}" onerror="this.style.display='none'"/>` : '💊'}</div>
        <div class="productcard-name">${p.name}</div>
        <div class="productcard-price">$${p.price.toFixed(2)}</div>
        <button class="btn-mini" data-addsku="${p.sku}">${t('btn.add')}</button>
      </div>`).join('')}
    </div>`;
}
function bindAddTabEvents() {
  document.querySelectorAll('[data-addsku]').forEach(btn => btn.addEventListener('click', () => openAddSheet(btn.dataset.addsku)));
  const qrBtn = document.getElementById('qrGoBtn');
  if (qrBtn) qrBtn.addEventListener('click', () => {
    const val = document.getElementById('qrInput').value.trim();
    const p = catalog().find(x => x.sku === val);
    const resEl = document.getElementById('qrResult');
    if (!p) { resEl.innerHTML = `<p class="formerr">${t('add.qrnotfound')}</p>`; return; }
    resEl.innerHTML = '';
    openAddSheet(p.sku);
  });
}
function openAddSheet(sku) {
  const p = catalog().find(x => x.sku === sku);
  if (!p) return;
  const sheet = document.createElement('div');
  sheet.className = 'sheetbg open';
  sheet.innerHTML = `
    <div class="sheet open">
      <div class="sheet-head"><h2>${p.name}</h2><button id="sheetClose">&times;</button></div>
      <div class="sheet-body">
        <div class="field"><label>${t('add.dosage')}</label><input id="sheetDosage" value="1 capsule" /></div>
        <div class="field"><label>${t('add.timesperday')}</label>
          <div class="stepper">
            <button id="stepMinus">-</button><span id="stepVal">1</span><button id="stepPlus">+</button>
          </div>
        </div>
        <div class="field"><label>${t('add.remindertimes')}</label><input id="sheetTime" type="time" value="09:00" /></div>
      </div>
      <div class="sheet-foot"><button class="btn-primary" id="sheetConfirm">${t('btn.addtoplan')}</button></div>
    </div>`;
  document.body.appendChild(sheet);
  let times = 1;
  sheet.querySelector('#stepMinus').addEventListener('click', () => { times = Math.max(1, times - 1); sheet.querySelector('#stepVal').textContent = times; });
  sheet.querySelector('#stepPlus').addEventListener('click', () => { times = Math.min(4, times + 1); sheet.querySelector('#stepVal').textContent = times; });
  sheet.querySelector('#sheetClose').addEventListener('click', () => sheet.remove());
  sheet.addEventListener('click', (e) => { if (e.target === sheet) sheet.remove(); });
  sheet.querySelector('#sheetConfirm').addEventListener('click', () => {
    const dosage = sheet.querySelector('#sheetDosage').value;
    const baseTime = sheet.querySelector('#sheetTime').value;
    const reminderTimes = Array.from({ length: times }, (_, i) => {
      const [h, m] = baseTime.split(':').map(Number);
      const total = (h * 60 + m + i * (12 * 60 / times)) % (24 * 60);
      return String(Math.floor(total / 60)).padStart(2, '0') + ':' + String(total % 60).padStart(2, '0');
    });
    const list = Store.get('userSupplements');
    list.push({ id: uid(), sku: p.sku, name: p.name, dosage, timesPerDay: times, reminderTimes, active: true, dateAdded: todayISO() });
    Store.set('userSupplements', list);
    sheet.remove();
    toast('✓ ' + p.name);
    nav('#/plan');
  });
}

/* ---------- HEALTH ---------- */
let healthTab = 'upcoming';
function renderHealth() {
  const lang = Store.get('lang');
  const appts = Store.get('appointments');
  const upcoming = appts.filter(a => a.status === 'booked');
  const past = appts.filter(a => a.status !== 'booked');
  const list = healthTab === 'upcoming' ? upcoming : past;

  const content = `
    <div class="pagehead">${t('health.title')}</div>
    <button class="btn-primary" style="margin:0 16px 12px" id="bookBtn">${t('btn.book_consultation')}</button>
    <div class="segmented" style="margin:0 16px 12px">
      <button data-v="upcoming" class="${healthTab === 'upcoming' ? 'seg-active' : ''}">${t('health.upcoming')}</button>
      <button data-v="past" class="${healthTab === 'past' ? 'seg-active' : ''}">${t('health.past')}</button>
    </div>
    ${list.length === 0 ? `<div class="emptycard">${t('health.noappointments')}</div>` : `
    <div class="scheduleList">
    ${list.map(a => {
      const pr = PRACTITIONERS.find(p => p.id === a.practitionerId);
      return `<div class="schedulerow">
        <div class="schedulerow-img">👩‍⚕️</div>
        <div class="schedulerow-body">
          <div class="schedulerow-name">${lang === 'fr' ? pr.type_fr : pr.type_en} — ${pr.name}</div>
          <div class="schedulerow-dosage">${fmtDate(a.datetime.slice(0,10))} · ${a.datetime.slice(11,16)}</div>
        </div>
        <span class="statuspill">${t('status.' + a.status)}</span>
      </div>`;
    }).join('')}
    </div>`}
    <div class="section-title" style="margin-top:24px">${t('health.nutrienttitle')}</div>
    <a class="btn-outline" style="display:block;text-align:center;margin:0 16px" href="#/health/tracker">${t('btn.viewall')}</a>
  `;
  $app().innerHTML = shell(content, { active: 'health' });
  bindShell();
  document.getElementById('bookBtn').addEventListener('click', () => {
    Store.set('chat.open', true);
    Store.set('chat.stage', 'ask_type');
    Store.set('chat.messages', [
      ...Store.get('chat.messages'),
      { from: 'bot', text: t('chat.ask.type') }
    ]);
    renderChat();
  });
  document.querySelectorAll('.segmented button[data-v]').forEach(b => b.addEventListener('click', () => { healthTab = b.dataset.v; renderHealth(); }));
}

function renderTracker() {
  const lang = Store.get('lang');
  const results = Store.get('labResults');
  const byNutrient = {};
  results.forEach(r => { (byNutrient[r.nutrient] = byNutrient[r.nutrient] || []).push(r); });

  const content = `
    <div class="pagehead">${t('health.nutrienttitle')}</div>
    <div class="gaugerow">
      ${Object.keys(NUTRIENTS).map(k => {
        const n = NUTRIENTS[k];
        const latest = (byNutrient[k] || []).sort((a,b)=>b.date.localeCompare(a.date))[0];
        const inRange = latest && latest.value >= n.min && latest.value <= n.max;
        return `<div class="gauge ${latest ? (inRange ? 'ok' : 'warn') : 'muted'}">
          <div class="gauge-value">${latest ? latest.value : '—'}</div>
          <div class="gauge-label">${lang === 'fr' ? n.name_fr : n.name_en}</div>
        </div>`;
      }).join('')}
    </div>
    ${Object.keys(byNutrient).map(k => {
      const n = NUTRIENTS[k];
      const rows = byNutrient[k].sort((a,b)=>a.date.localeCompare(b.date));
      const max = Math.max(...rows.map(r => r.value), n.max);
      return `<div class="nutrientdetail">
        <div class="nutrientdetail-title">${lang === 'fr' ? n.name_fr : n.name_en}</div>
        <div class="barchart">
          ${rows.map(r => `<div class="bar" style="height:${Math.max(8, r.value / max * 80)}px" title="${r.value}"></div>`).join('')}
        </div>
        <div class="nutrientdetail-rows">
        ${rows.slice().reverse().map(r => `<div class="nutrientdetail-row">
          <span>${fmtDate(r.date)}</span><span>${r.value} ${r.unit}</span>
          <span class="tag">${r.source === 'lab' ? t('health.labverified') : t('health.selfreported')}</span>
        </div>`).join('')}
        </div>
      </div>`;
    }).join('')}
    <button class="btn-outline" style="display:block;margin:16px" id="addResultBtn">${t('health.addresult')}</button>
  `;
  $app().innerHTML = shell(content, { back: true, nav: false });
  bindShell();
  document.getElementById('addResultBtn').addEventListener('click', () => {
    const nutrient = prompt(Object.keys(NUTRIENTS).map(k => k + ': ' + (lang==='fr'?NUTRIENTS[k].name_fr:NUTRIENTS[k].name_en)).join('\n'), 'b12');
    if (!nutrient || !NUTRIENTS[nutrient]) return;
    const value = parseFloat(prompt(t('health.addresult')));
    if (!value) return;
    const results2 = Store.get('labResults');
    results2.push({ nutrient, value, unit: '', date: todayISO(), source: 'self' });
    Store.set('labResults', results2);
    renderTracker();
  });
}

/* ---------- CONTENT ---------- */
let contentQuery = '';
function renderContent() {
  const lang = Store.get('lang');
  const filtered = ARTICLES.filter(a => (lang === 'fr' ? a.title_fr : a.title_en).toLowerCase().includes(contentQuery.toLowerCase()));
  const saved = Store.get('savedArticles');
  const content = `
    <div class="pagehead">${t('content.title')}</div>
    <input class="searchbar" id="contentSearch" placeholder="${t('content.search')}" value="${contentQuery}" />
    ${filtered.length === 0 ? `<div class="emptycard">${t('content.noresults', { q: contentQuery })}</div>` : `
    <div class="articleList">
    ${filtered.map(a => `
      <div class="articlecard">
        <div class="articlecard-hero">📰</div>
        <div class="articlecard-body">
          <div class="articlecard-title">${lang === 'fr' ? a.title_fr : a.title_en}</div>
          <div class="articlecard-sub">${lang === 'fr' ? a.body_fr : a.body_en}</div>
          <div class="articlecard-meta">${t('content.readtime', { min: a.min })} <button class="iconbtn" data-save="${a.id}">${saved.includes(a.id) ? '★' : '☆'}</button></div>
        </div>
      </div>`).join('')}
    </div>`}
  `;
  $app().innerHTML = shell(content, { active: 'more' });
  bindShell();
  document.getElementById('contentSearch').addEventListener('input', (e) => { contentQuery = e.target.value; renderContent(); });
  document.querySelectorAll('[data-save]').forEach(b => b.addEventListener('click', () => {
    const id = b.dataset.save;
    let s = Store.get('savedArticles');
    s = s.includes(id) ? s.filter(x => x !== id) : [...s, id];
    Store.set('savedArticles', s);
    renderContent();
  }));
}

/* ---------- MORE (grid menu) ---------- */
function renderMore() {
  const items = [
    ['#/content', '📰', 'content.title'],
    ['#/notifications', '🔔', 'notif.title'],
    ['#/orders', '🧾', 'orders.title'],
    ['#/settings', '⚙️', 'settings.title'],
    ['#/account', '🔐', 'account.title'],
  ];
  const content = `
    <div class="pagehead">${t('nav.more')}</div>
    <div class="moregrid">
      ${items.map(([href, icon, key]) => `
        <a class="moreitem" href="${href}">
          <div class="moreitem-icon">${icon}</div>
          <div>${t(key)}</div>
        </a>`).join('')}
    </div>`;
  $app().innerHTML = shell(content, { active: 'more' });
  bindShell();
}

/* ---------- PROFILE ---------- */
function renderProfile() {
  const lang = Store.get('lang');
  const u = Store.get('user');
  const content = `
    <div class="pagehead">${t('profile.title')}</div>
    <div class="profilehead">
      <div class="profile-avatar">👤</div>
      <div class="profile-name">${u.firstName} ${u.lastName}</div>
    </div>
    <div class="collapsible">
      <div class="collapsible-title">${t('profile.personal')}</div>
      <div class="kv"><span>${t('onb.dob')}</span><span>${u.dob || '—'}</span></div>
      <div class="kv"><span>${t('onb.gender')}</span><span>${u.gender ? t('onb.' + u.gender) : '—'}</span></div>
      <div class="kv"><span>${t('onb.height')}</span><span>${u.height || '—'} cm</span></div>
    </div>
    <div class="collapsible">
      <div class="collapsible-title">${t('profile.goals')}</div>
      <div class="tagrow">${u.goals.map(g => `<span class="tag">${t('goal.' + g)}</span>`).join('') || '—'}</div>
    </div>
    <div class="collapsible">
      <div class="collapsible-title">${t('profile.diet')}</div>
      <div class="tagrow">${u.diet.map(d => `<span class="tag">${t('diet.' + d)}</span>`).join('') || '—'}</div>
    </div>
    <div class="collapsible">
      <div class="collapsible-title">${t('profile.topics')}</div>
      <div class="tagrow">${u.topics.map(x => `<span class="tag">${t('topic.' + x)}</span>`).join('') || '—'}</div>
    </div>
    <button class="btn-outline" style="display:block;margin:16px" id="retakeBtn">${t('btn.retake_onboarding')}</button>
    <button class="btn-outline" style="display:block;margin:0 16px 16px;color:#c0392b;border-color:#f2c6c0" id="logoutBtn">${t('btn.logout')}</button>
  `;
  $app().innerHTML = shell(content, { active: 'profile' });
  bindShell();
  document.getElementById('retakeBtn').addEventListener('click', () => { Store.set('onboardingStep', 1); Store.set('onboardingComplete', false); nav('#/onboarding'); });
  document.getElementById('logoutBtn').addEventListener('click', () => { Store.set('auth', { loggedIn: false, email: null }); nav('#/auth-login'); });
}

/* ---------- NOTIFICATIONS ---------- */
let notifTab = 'inbox';
function renderNotifications() {
  const lang = Store.get('lang');
  const notifs = Store.get('notifications').slice().sort((a,b)=>b.date.localeCompare(a.date));
  const prefs = Store.get('notifPrefs');
  const notifCopy = {
    welcome: { en: 'Welcome to GeniqCare!', fr: 'Bienvenue chez GeniqCare!' },
    dose: { en: 'Time to take your supplement.', fr: 'C\'est l\'heure de prendre votre supplément.' },
    appt: { en: 'Your appointment is confirmed.', fr: 'Votre rendez-vous est confirmé.' },
  };
  const body = notifTab === 'inbox' ? `
    ${notifs.length === 0 ? `<div class="emptycard">${t('notif.empty')}</div>` : `
    <div class="notiflist">
    ${notifs.map(n => `
      <div class="notifrow ${n.read ? '' : 'unread'}" data-id="${n.id}">
        <span class="dot"></span>
        <div>
          <div>${(notifCopy[n.type] && notifCopy[n.type][lang]) || n.type}</div>
          <div class="notifrow-time">${new Date(n.date).toLocaleString(lang === 'fr' ? 'fr-CA' : 'en-CA')}</div>
        </div>
      </div>`).join('')}
    </div>`}
  ` : `
    <div class="preflist">
    ${['dose', 'appt', 'order', 'content'].map(k => `
      <div class="prefrow">
        <div class="prefrow-title">${t('notif.' + (k === 'dose' ? 'dosereminders' : k === 'appt' ? 'apptreminders' : k === 'order' ? 'orderupdates' : 'content'))}</div>
        <div class="prefrow-toggles">
          ${['push','email','sms'].map(ch => `
            <label><input type="checkbox" data-k="${k}" data-ch="${ch}" ${prefs[k][ch] ? 'checked' : ''}/> ${t('notif.' + ch)}</label>
          `).join('')}
        </div>
      </div>`).join('')}
    </div>
  `;
  const content = `
    <div class="pagehead">${t('notif.title')}</div>
    <div class="segmented" style="margin:0 16px 12px">
      <button data-v="inbox" class="${notifTab === 'inbox' ? 'seg-active' : ''}">${t('notif.inbox')}</button>
      <button data-v="preferences" class="${notifTab === 'preferences' ? 'seg-active' : ''}">${t('notif.preferences')}</button>
    </div>
    ${body}
  `;
  $app().innerHTML = shell(content, { back: true, nav: false });
  bindShell();
  document.querySelectorAll('.segmented button[data-v]').forEach(b => b.addEventListener('click', () => { notifTab = b.dataset.v; renderNotifications(); }));
  document.querySelectorAll('.notifrow').forEach(r => r.addEventListener('click', () => {
    const list = Store.get('notifications').map(n => n.id === r.dataset.id ? { ...n, read: true } : n);
    Store.set('notifications', list);
    renderNotifications();
  }));
  document.querySelectorAll('.prefrow input').forEach(inp => inp.addEventListener('change', () => {
    const p = Store.get('notifPrefs');
    p[inp.dataset.k][inp.dataset.ch] = inp.checked;
    Store.set('notifPrefs', p);
  }));
}

/* ---------- SETTINGS ---------- */
function renderSettings() {
  const content = `
    <div class="pagehead">${t('settings.title')}</div>
    <div class="settingsrow">
      <span>${t('settings.language')}</span>
      ${langSwitch()}
    </div>
    <div class="settingsrow">
      <span>${t('settings.units')}</span>
      <div class="pilltoggle">
        <button data-u="metric" class="${Store.get('units') !== 'imperial' ? 'active' : ''}">Kg, cm</button>
        <button data-u="imperial" class="${Store.get('units') === 'imperial' ? 'active' : ''}">Lb, ft</button>
      </div>
    </div>
    <div class="settingsrow">
      <span>${t('settings.theme')}</span>
      <select id="themeSel">
        <option value="light" ${Store.get('theme')==='light'?'selected':''}>${t('settings.light')}</option>
        <option value="dark" ${Store.get('theme')==='dark'?'selected':''}>${t('settings.dark')}</option>
        <option value="system" ${Store.get('theme')==='system'?'selected':''}>${t('settings.system')}</option>
      </select>
    </div>
    <div class="settingsrow">
      <span>${t('settings.reducemotion')}</span>
      <input type="checkbox" id="reduceMotionChk" ${Store.get('reduceMotion') ? 'checked' : ''}/>
    </div>
    <div class="section-title">${t('settings.about')}</div>
    <div class="settingsrow"><span>${t('settings.version')}</span><span>1.0.0</span></div>
    <a class="settingsrow" href="#" id="termsLink"><span>${t('settings.terms')}</span><span>›</span></a>
    <a class="settingsrow" href="#" id="privacyLink"><span>${t('settings.privacy')}</span><span>›</span></a>
  `;
  $app().innerHTML = shell(content, { back: true, nav: false });
  bindShell();
  bindLangSwitch(() => renderSettings());
  document.querySelectorAll('.pilltoggle button[data-u]').forEach(b => b.addEventListener('click', () => { Store.set('units', b.dataset.u); renderSettings(); }));
  document.getElementById('themeSel').addEventListener('change', (e) => { Store.set('theme', e.target.value); applyTheme(); });
  document.getElementById('reduceMotionChk').addEventListener('change', (e) => Store.set('reduceMotion', e.target.checked));
  ['termsLink', 'privacyLink'].forEach(id => document.getElementById(id).addEventListener('click', (e) => { e.preventDefault(); toast('📄'); }));
}

/* ---------- ACCOUNT ---------- */
function renderAccount() {
  const content = `
    <div class="pagehead">${t('account.title')}</div>
    <div class="field"><label>${t('account.email')}</label><input value="${Store.get('auth.email') || ''}" id="accEmail"/></div>
    <div class="field"><label>${t('account.phone')}</label><input id="accPhone" placeholder="514-555-0100"/></div>
    <div class="section-title">${t('account.changepw')}</div>
    <div class="field"><input type="password" placeholder="${t('account.currentpw')}"/></div>
    <div class="field"><input type="password" placeholder="${t('account.newpw')}"/></div>
    <button class="btn-outline" style="display:block;margin:16px" id="savePwBtn">${t('btn.save')}</button>
    <div class="section-title">${t('account.social')}</div>
    <div class="emptycard">—</div>
    <div class="dangerzone">
      <button class="btn-danger" id="delAccBtn">${t('btn.delete_account')}</button>
    </div>
  `;
  $app().innerHTML = shell(content, { back: true, nav: false });
  bindShell();
  document.getElementById('savePwBtn').addEventListener('click', () => toast('✓'));
  document.getElementById('delAccBtn').addEventListener('click', () => {
    const sheet = document.createElement('div');
    sheet.className = 'sheetbg open';
    sheet.innerHTML = `<div class="sheet open">
      <div class="sheet-head"><h2>${t('btn.delete_account')}</h2><button id="delClose">&times;</button></div>
      <div class="sheet-body">
        <p class="sub">${t('account.deletewarning')}</p>
        <div class="field"><label>${t('account.deleteconfirmpw')}</label><input type="password" id="delPw"/></div>
      </div>
      <div class="sheet-foot"><button class="btn-danger" id="delConfirm">${t('btn.confirm')}</button></div>
    </div>`;
    document.body.appendChild(sheet);
    sheet.querySelector('#delClose').addEventListener('click', () => sheet.remove());
    sheet.querySelector('#delConfirm').addEventListener('click', () => {
      sheet.remove();
      toast(t('account.deleted'));
      Store.reset();
      nav('#/auth-login');
    });
  });
}

/* ---------- ORDERS ---------- */
let ordersTab = 'orders';
function renderOrders() {
  const orders = Store.get('orders');
  const subs = Store.get('subscriptions');
  const body = ordersTab === 'orders' ? (
    orders.length === 0 ? `<div class="emptycard">${t('orders.empty')}</div>` :
    `<div class="scheduleList">${orders.map(o => `<div class="schedulerow"><div class="schedulerow-body"><div class="schedulerow-name">#${o.id}</div></div><span class="statuspill">${t('status.' + o.status)}</span></div>`).join('')}</div>`
  ) : (
    subs.length === 0 ? `<div class="emptycard">${t('orders.subempty')}</div>` :
    `<div class="scheduleList">${subs.map(s => `<div class="schedulerow"><div class="schedulerow-body"><div class="schedulerow-name">${s.name}</div><div class="schedulerow-dosage">${t('orders.nextbilling')}: ${s.nextBilling}</div></div></div>`).join('')}</div>`
  );
  const content = `
    <div class="pagehead">${t('orders.title')}</div>
    <div class="segmented" style="margin:0 16px 12px">
      <button data-v="orders" class="${ordersTab === 'orders' ? 'seg-active' : ''}">${t('orders.orders')}</button>
      <button data-v="subscriptions" class="${ordersTab === 'subscriptions' ? 'seg-active' : ''}">${t('orders.subscriptions')}</button>
    </div>
    ${body}
    <div class="section-title">${t('orders.paymentmethods')}</div>
    <div class="emptycard">•••• 4242</div>
    <button class="btn-outline" style="display:block;margin:16px" id="addPayBtn">${t('orders.addpayment')}</button>
  `;
  $app().innerHTML = shell(content, { back: true, nav: false });
  bindShell();
  document.querySelectorAll('.segmented button[data-v]').forEach(b => b.addEventListener('click', () => { ordersTab = b.dataset.v; renderOrders(); }));
  document.getElementById('addPayBtn').addEventListener('click', () => toast('✓'));
}

/* ---------- AI ASSISTANT CHAT ---------- */
const SLOTS = ['13:30', '14:30', '15:30', '16:00'];
function renderChat() {
  let overlay = document.getElementById('chatOverlay');
  const open = Store.get('chat.open');
  if (!open) { if (overlay) overlay.remove(); return; }
  const msgs = Store.get('chat.messages');
  const name = Store.get('user.firstName') || '';
  if (msgs.length === 0) {
    msgs.push({ from: 'bot', text: t('chat.greeting', { name }) });
    Store.set('chat.messages', msgs);
  }
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'chatOverlay';
    document.body.appendChild(overlay);
  }
  const stage = Store.get('chat.stage');
  overlay.innerHTML = `
    <div class="chatbg"></div>
    <div class="chatpanel">
      <div class="chat-head"><span>🤖 ${t('chat.title')}</span><button id="chatClose">&times;</button></div>
      <div class="chat-body" id="chatBody">
        ${Store.get('chat.messages').map(m => `<div class="bubble ${m.from}">${m.text}</div>`).join('')}
        ${stage === 'idle' || stage === undefined ? `
          <div class="chips-row">
            <button class="chip chatchip" data-opt="consultation">${t('chat.opt.consultation')}</button>
            <button class="chip chatchip" data-opt="plan">${t('chat.opt.plan')}</button>
            <button class="chip chatchip" data-opt="order">${t('chat.opt.order')}</button>
          </div>` : ''}
        ${stage === 'ask_type' ? `
          <div class="chips-row">
            <button class="chip chatchip" data-type="1">${t('health.consultationtype')}</button>
            <button class="chip chatchip" data-type="2">${t('health.consultationtype2')}</button>
            <button class="chip chatchip" data-type="3">${t('health.consultationtype3')}</button>
            <button class="chip chatchip" data-type="4">${t('health.consultationtype4')}</button>
          </div>` : ''}
        ${stage === 'pick_slot' ? `
          <div class="chips-row">
            ${SLOTS.map(s => `<button class="chip chatchip" data-slot="${s}">${s}</button>`).join('')}
          </div>` : ''}
        ${stage === 'escalate' ? `
          <div class="chips-row"><button class="chip chatchip" data-human="1">${t('chat.talk_to_human')}</button></div>` : ''}
      </div>
      <div class="chat-input-row">
        <input id="chatInput" placeholder="${t('chat.placeholder')}"/>
        <button id="chatSend">➤</button>
      </div>
    </div>`;
  overlay.querySelector('#chatClose').addEventListener('click', () => { Store.set('chat.open', false); renderChat(); });
  overlay.querySelector('.chatbg').addEventListener('click', () => { Store.set('chat.open', false); renderChat(); });
  overlay.querySelectorAll('[data-opt]').forEach(b => b.addEventListener('click', () => chatUserSays(b.dataset.opt)));
  overlay.querySelectorAll('[data-type]').forEach(b => b.addEventListener('click', () => chatPickType(b.textContent)));
  overlay.querySelectorAll('[data-slot]').forEach(b => b.addEventListener('click', () => chatPickSlot(b.dataset.slot)));
  const human = overlay.querySelector('[data-human]');
  if (human) human.addEventListener('click', () => chatTalkToHuman());
  overlay.querySelector('#chatSend').addEventListener('click', chatSendFreeText);
  overlay.querySelector('#chatInput').addEventListener('keydown', (e) => { if (e.key === 'Enter') chatSendFreeText(); });
  const body = overlay.querySelector('#chatBody');
  body.scrollTop = body.scrollHeight;
}
function pushMsg(from, text) {
  const msgs = Store.get('chat.messages');
  msgs.push({ from, text });
  Store.set('chat.messages', msgs);
}
function chatUserSays(opt) {
  if (opt === 'consultation') {
    pushMsg('user', t('chat.opt.consultation'));
    pushMsg('bot', t('chat.ask.type'));
    Store.set('chat.stage', 'ask_type');
  } else {
    pushMsg('user', t(opt === 'plan' ? 'chat.opt.plan' : 'chat.opt.order'));
    pushMsg('bot', t('chat.fallback'));
    Store.set('chat.stage', 'idle');
  }
  renderChat();
}
function chatPickType(typeLabel) {
  pushMsg('user', typeLabel);
  Store.set('chat.slotChoice', { type: typeLabel });
  pushMsg('bot', t('chat.slot.pick'));
  Store.set('chat.stage', 'pick_slot');
  renderChat();
}
function chatPickSlot(slot) {
  pushMsg('user', slot);
  const choice = Store.get('chat.slotChoice') || {};
  const date = new Date(); date.setDate(date.getDate() + 1);
  const dateIso = date.toISOString().slice(0, 10);
  const practitioner = PRACTITIONERS[0];
  const appts = Store.get('appointments');
  appts.push({ id: uid(), practitionerId: practitioner.id, datetime: dateIso + 'T' + slot, status: 'booked', bookedVia: 'ai_chat' });
  Store.set('appointments', appts);
  const notifs = Store.get('notifications');
  notifs.push({ id: uid(), type: 'appt', read: false, date: new Date().toISOString() });
  Store.set('notifications', notifs);
  pushMsg('bot', t('chat.slot.confirm', { date: fmtDate(dateIso), time: slot }));
  Store.set('chat.stage', 'idle');
  renderChat();
}
function chatTalkToHuman() {
  pushMsg('user', t('chat.talk_to_human'));
  pushMsg('bot', t('chat.human.sent'));
  Store.set('chat.stage', 'idle');
  renderChat();
}
let chatFailCount = 0;
function chatSendFreeText() {
  const input = document.getElementById('chatInput');
  const val = input.value.trim();
  if (!val) return;
  pushMsg('user', val);
  chatFailCount++;
  if (chatFailCount >= 2) {
    pushMsg('bot', t('chat.escalate'));
    Store.set('chat.stage', 'escalate');
    chatFailCount = 0;
  } else {
    pushMsg('bot', t('chat.fallback'));
    Store.set('chat.stage', 'idle');
  }
  input.value = '';
  renderChat();
}

/* ---------- theme ---------- */
function applyTheme() {
  const theme = Store.get('theme');
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const dark = theme === 'dark' || (theme === 'system' && prefersDark);
  document.documentElement.dataset.theme = dark ? 'dark' : 'light';
}

/* ---------- router ---------- */
function router() {
  const hash = location.hash || '#/splash';
  if (!Store.get('auth.loggedIn') && !hash.startsWith('#/auth') && hash !== '#/splash') {
    nav('#/auth-login'); return;
  }
  if (Store.get('auth.loggedIn') && !Store.get('onboardingComplete') && hash !== '#/onboarding' && hash !== '#/splash') {
    nav('#/onboarding'); return;
  }
  if (hash === '#/splash') return renderSplash();
  if (hash === '#/auth-login') return renderAuth('login');
  if (hash === '#/auth-signup') return renderAuth('signup');
  if (hash === '#/onboarding') return renderOnboarding();
  if (hash === '#/home') return renderHome();
  if (hash === '#/plan') return renderPlan();
  if (hash === '#/plan/add') return renderAddSupplement();
  if (hash === '#/health') return renderHealth();
  if (hash === '#/health/tracker') return renderTracker();
  if (hash === '#/content') return renderContent();
  if (hash === '#/more') return renderMore();
  if (hash === '#/notifications') return renderNotifications();
  if (hash === '#/settings') return renderSettings();
  if (hash === '#/account') return renderAccount();
  if (hash === '#/orders') return renderOrders();
  if (hash === '#/profile') return renderProfile();
  nav('#/home');
}

window.addEventListener('hashchange', () => { router(); renderChat(); });
window.addEventListener('DOMContentLoaded', () => {
  applyTheme();
  fetch('data/products.json').then(r => r.json()).then(data => {
    window.PRODUCTS = data.filter(p => p.name && p.price);
    router();
    renderChat();
  }).catch(() => { window.PRODUCTS = []; router(); renderChat(); });
  if ('serviceWorker' in navigator) navigator.serviceWorker.register('sw.js').catch(() => {});
});
