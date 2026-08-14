/* Orthodox Way — app shell: routing, rendering, search, bookmarks, quiz, journal */
(function () {
  'use strict';

  const app = document.getElementById('app');

  /* ---------------- storage ---------------- */
  const store = {
    get(key, fallback) {
      try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; }
      catch (e) { return fallback; }
    },
    set(key, val) { localStorage.setItem(key, JSON.stringify(val)); }
  };

  const state = {
    bookmarks: store.get('ow_bookmarks', []),
    journal: store.get('ow_journal', []),
    fontScale: store.get('ow_fontscale', 1),
    kyrie: store.get('ow_kyrie', 0),
    quizHistory: store.get('ow_quiz_history', []),
    catFilter: 'all',
    quiz: null
  };

  function toggleBookmark(kind, id, title, meta) {
    const key = kind + ':' + id;
    const idx = state.bookmarks.findIndex(b => b.key === key);
    if (idx >= 0) state.bookmarks.splice(idx, 1);
    else state.bookmarks.unshift({ key, kind, id, title, meta, ts: Date.now() });
    store.set('ow_bookmarks', state.bookmarks);
    return idx < 0;
  }
  function isBookmarked(kind, id) { return state.bookmarks.some(b => b.key === kind + ':' + id); }

  function toast(msg) {
    const t = document.createElement('div');
    t.className = 'toast';
    t.textContent = msg;
    document.body.appendChild(t);
    setTimeout(() => t.remove(), 1800);
  }

  /* ---------------- router ---------------- */
  function go(hash) { location.hash = hash; }
  window.addEventListener('hashchange', render);
  window.addEventListener('DOMContentLoaded', render);

  function parseRoute() {
    const h = location.hash.replace(/^#\/?/, '') || 'home';
    const parts = h.split('/');
    return { name: parts[0], param: parts[1] ? decodeURIComponent(parts[1]) : null };
  }

  /* ---------------- helpers ---------------- */
  function esc(s) {
    return (s || '').replace(/[&<>"']/g, c => ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[c]));
  }
  function initials(name) {
    return name.replace('St. ', '').replace('Fr. ', '').split(' ').map(w => w[0]).slice(0,2).join('');
  }

  /* ---------------- topbar / nav shared chrome ---------------- */
  function topbar(title, opts) {
    opts = opts || {};
    const back = opts.back ? `<button class="back-btn" data-back>‹</button>` : '';
    const bm = opts.bookmarkActive !== undefined
      ? `<button class="icon-btn" data-bookmark-toggle>${opts.bookmarkActive ? '★' : '☆'}</button>` : '';
    const search = opts.showSearch ? `<button class="icon-btn" data-nav="search">⌕</button>` : '';
    return `<div class="topbar">${back}<h1><span class="glyph">☩</span> ${esc(title)}</h1>${search}${bm}</div>`;
  }

  const NAV_ITEMS = [
    { id: 'home', label: 'Home', icon: '⌂' },
    { id: 'catechism', label: 'Catechism', icon: '☩' },
    { id: 'commentary', label: 'Commentary', icon: '📜' },
    { id: 'traditions', label: 'Traditions', icon: '⛪' },
    { id: 'more', label: 'More', icon: '⋯' }
  ];
  function bottomNav(active) {
    const activeGroup = ['prayers','qa','quiz','notes','journal','bookmarks','search'].includes(active) ? 'more' : active;
    return `<div class="bottom-nav">${NAV_ITEMS.map(n => `
      <button class="nav-btn ${n.id === activeGroup ? 'active' : ''}" data-nav="${n.id}">
        <span class="nav-icon">${n.icon}</span><span>${n.label}</span>
      </button>`).join('')}</div>`;
  }

  /* ---------------- views ---------------- */
  function viewHome() {
    const dailyVerses = [
      ['The Lord is my light and my salvation; whom shall I fear?', 'Psalm 27:1'],
      ['I can do all things through Christ who strengthens me.', 'Philippians 4:13'],
      ['Taste and see that the Lord is good.', 'Psalm 34:8']
    ];
    const v = dailyVerses[new Date().getDate() % dailyVerses.length];
    return `
      <div class="home-header">
        <div class="brand">
          <span class="glyph">☩</span>
          <div class="brand-text">
            <h1>Orthodox Way</h1>
            <div class="subtitle">Oriental Catechism</div>
          </div>
          <span class="bell">🔔</span>
        </div>
        <div class="greeting">Good morning, beloved in Christ</div>
        <div class="verse">"${esc(v[0])}"<cite>— ${esc(v[1])}</cite></div>
      </div>
      <div class="view no-pad-top">
        <hr class="rule"/>
        <div class="section-label">Explore</div>
        <div class="grid-2">
          <button class="tile tile-red" data-nav="catechism"><span class="tile-icon">📕</span><span class="tile-label">Catechism</span></button>
          <button class="tile tile-green" data-nav="commentary"><span class="tile-icon">📜</span><span class="tile-label">Bible Commentary</span></button>
          <button class="tile tile-purple" data-nav="traditions"><span class="tile-icon">⛪</span><span class="tile-label">Traditions</span></button>
          <button class="tile tile-bronze" data-nav="prayers"><span class="tile-icon">📅</span><span class="tile-label">Daily Readings &amp; Prayers</span></button>
        </div>
        <div class="grid-2" style="margin-top:12px;">
          <button class="tile tile-blue" data-nav="qa"><span class="tile-icon">🕊</span><span class="tile-label">Prayers &amp; Q&amp;A</span></button>
          <button class="tile tile-red" data-nav="quiz"><span class="tile-icon">✎</span><span class="tile-label">Catechism Quiz</span></button>
        </div>
        <div class="grid-3" style="margin-top:12px;">
          <button class="tile" data-nav="notes"><span class="tile-icon">📖</span><span class="tile-label">Notes</span></button>
          <button class="tile" data-nav="journal"><span class="tile-icon">✍</span><span class="tile-label">Journal</span></button>
          <button class="tile" data-nav="bookmarks"><span class="tile-icon">★</span><span class="tile-label">Bookmarks</span></button>
        </div>
        <div class="section-label" style="margin-top:22px;">Featured Tradition</div>
        <div class="feature-card">
          <h3>Ethiopian Tewahedo</h3>
          <p>Ancient faith from the land of Aksum, rich in monastic heritage and worship.</p>
          <div class="learn-more" data-nav="traditions">Learn more →</div>
          <div class="dots"><span class="active"></span><span></span><span></span><span></span><span></span></div>
        </div>
      </div>
      ${bottomNav('home')}`;
  }

  function chipRow(items, activeId, dataAttr) {
    return `<div class="chip-row">${items.map(i => `
      <button class="chip ${i.id === activeId ? 'active' : ''}" data-${dataAttr}="${i.id}">${esc(i.label)}</button>`).join('')}</div>`;
  }

  function viewCatechism() {
    const filtered = state.catFilter === 'all' ? CATECHISM : CATECHISM.filter(c => c.traditions.includes('all') || c.traditions.includes(state.catFilter));
    return `
      ${topbar('Catechism', { showSearch: true })}
      <div class="view">
        ${chipRow(TRADITIONS, state.catFilter, 'trad')}
        ${filtered.map(c => catechismCard(c)).join('')}
      </div>
      ${bottomNav('catechism')}`;
  }

  function catechismCard(c) {
    const bm = isBookmarked('catechism', c.id);
    return `<div class="list-card" data-nav="catechism-detail" data-id="${c.id}">
      <div class="avatar">${c.icon}</div>
      <div class="content">
        <h3>${esc(c.title)}</h3>
        <p>${esc(c.summary)}</p>
        <span class="tag ${c.tag === 'Sacraments' ? 'tag-sacrament' : c.tag === 'Christian Life' ? 'tag-life' : c.tag === 'Church' ? 'tag-church' : ''}">${esc(c.tag)}</span>
        <span class="tier-badge" style="margin-left:6px;">${esc(c.tier)}</span>
      </div>
      <button class="bookmark-btn ${bm ? 'active' : ''}" data-bm-quick="catechism:${c.id}:${esc(c.title)}">${bm ? '★' : '☆'}</button>
    </div>`;
  }

  function viewCatechismDetail(id) {
    const c = CATECHISM.find(x => x.id === id);
    if (!c) return viewCatechism();
    const bm = isBookmarked('catechism', c.id);
    return `
      ${topbar('Catechism', { back: true, bookmarkActive: bm })}
      <div class="view">
        <div class="detail-title">${esc(c.title)}</div>
        <div class="detail-tags">
          <span class="badge faith">${esc(c.tag)}</span>
          <span class="badge tradition">All Traditions</span>
        </div>
        <div class="detail-body">${c.body.map(p => `<p>${esc(p)}</p>`).join('')}</div>
        <div class="info-box">
          <h4>📖 Scripture References</h4>
          <div class="refs">${c.scripture.join(' • ')}</div>
        </div>
        <div class="section-label">Patristic Witness</div>
        ${c.patristics.map(p => `<div class="patristic-card">
          <div class="father">${esc(p.father)} <span class="subtle">(${esc(p.tradition)})</span></div>
          <div class="quote">"${esc(p.quote)}"</div>
          <div class="source">${esc(p.source)}</div>
        </div>`).join('')}
        ${c.related && c.related.length ? `<div class="section-label">Related Topics</div>
        <div class="related-topics">${c.related.map(rid => {
          const rc = CATECHISM.find(x => x.id === rid);
          return rc ? `<span class="rt" data-nav="catechism-detail" data-id="${rid}">${esc(rc.title)}</span>` : '';
        }).join('')}</div>` : ''}
      </div>
      ${bottomNav('catechism')}`;
  }

  /* ---------------- Commentary ---------------- */
  let commentaryIdx = 0;
  function viewCommentaryIndex() {
    const books = [...new Set(COMMENTARIES.map(c => c.book))];
    return `
      ${topbar('Commentary', { showSearch: true })}
      <div class="view">
        <p class="subtle" style="margin-bottom:14px;">Patristic exegesis on Scripture, including the commentaries of Fr. Tadros Malaty alongside the classical Church Fathers.</p>
        ${books.map(book => `<div class="book-group">
          <h3>${esc(book)}</h3>
          ${COMMENTARIES.filter(c => c.book === book).map(c => `
            <div class="list-card" data-nav="commentary-detail" data-id="${c.order}">
              <div class="avatar">📜</div>
              <div class="content">
                <h3>${esc(c.ref)}</h3>
                <p>${esc(c.text.slice(0, 90))}${c.text.length > 90 ? '…' : ''}</p>
              </div>
            </div>`).join('')}
        </div>`).join('')}
      </div>
      ${bottomNav('commentary')}`;
  }

  function viewCommentaryDetail(order) {
    const list = COMMENTARIES;
    const i = list.findIndex(c => String(c.order) === String(order));
    const c = list[i] || list[0];
    commentaryIdx = i < 0 ? 0 : i;
    const bm = isBookmarked('commentary', c.order);
    return `
      ${topbar('Commentary', { back: true, bookmarkActive: bm })}
      <div class="view">
        <div class="commentary-nav">
          <button data-commentary-prev="${c.order}" ${commentaryIdx <= 0 ? 'disabled style="opacity:.3"' : ''}>‹</button>
          <span class="ref-label">${esc(c.ref)}</span>
          <button data-commentary-next="${c.order}" ${commentaryIdx >= list.length - 1 ? 'disabled style="opacity:.3"' : ''}>›</button>
        </div>
        <div class="verse-card">
          <div class="verse-ref">${esc(c.ref)}</div>
          <div class="verse-text">${esc(c.text)}</div>
        </div>
        ${c.entries.map(e => `<div class="commentary-entry">
          <div class="avatar">${initials(e.father)}</div>
          <div class="content">
            <div class="father">${esc(e.father)}</div>
            <div class="father-tags"><span class="badge tradition">${esc(e.tradition)}</span><span class="badge faith">Commentary</span></div>
            <div class="text">${esc(e.text)}</div>
            <div class="source">Source: ${esc(e.source)}</div>
          </div>
        </div>`).join('')}
      </div>
      ${bottomNav('commentary')}`;
  }

  /* ---------------- Traditions ---------------- */
  const TRADITION_INFO = [
    { id: 'coptic', name: 'Coptic Orthodox Church', desc: 'Church of Alexandria, founded by tradition by St. Mark the Evangelist; home of the Agpeya, the Divine Liturgy of St. Basil, St. Gregory, and St. Cyril, and the great desert monastic tradition.' },
    { id: 'ethiopian', name: 'Ethiopian Tewahedo', desc: 'Ancient faith from the land of Aksum, rich in monastic heritage and worship, with a liturgy rooted deeply in Old Testament practice and the Ge\'ez language.' },
    { id: 'syriac', name: 'Syriac Orthodox Church', desc: 'The Church of Antioch, praying in Aramaic, the language of Christ Himself, using the Shehimo book of hours and tracing its theological lineage through St. Severus of Antioch.' },
    { id: 'armenian', name: 'Armenian Apostolic Church', desc: 'The first nation to adopt Christianity as a state religion (301 AD), organized by St. Gregory the Illuminator, with a rich tradition of khachkars (cross-stones) and sacred music.' },
    { id: 'malankara', name: 'Malankara Orthodox Syrian Church', desc: 'The Church of the St. Thomas Christians of Kerala, India, tracing its founding to the Apostle Thomas himself and its liturgical lineage to West Syriac tradition.' }
  ];
  function viewTraditions() {
    return `
      ${topbar('Traditions')}
      <div class="view">
        ${TRADITION_INFO.map(t => `<div class="list-card">
          <div class="avatar">⛪</div>
          <div class="content"><h3>${esc(t.name)}</h3><p>${esc(t.desc)}</p></div>
        </div>`).join('')}
      </div>
      ${bottomNav('traditions')}`;
  }

  /* ---------------- Prayers ---------------- */
  function viewPrayersIndex() {
    return `
      ${topbar('Prayers & Hours', { back: true })}
      <div class="view">
        <div class="kyrie-card">
          <div class="subtle" style="margin-bottom:6px;">Kyrie Eleison Prayer Rope</div>
          <div class="kyrie-count" id="kyrie-count">${state.kyrie}</div>
          <div class="kyrie-target">of ${KYRIE_TARGET}</div>
          <div class="kyrie-progress"><div class="kyrie-progress-fill" id="kyrie-fill" style="width:${Math.min(100, state.kyrie / KYRIE_TARGET * 100)}%"></div></div>
          <div class="kyrie-buttons">
            <button class="kyrie-btn" data-kyrie-tap>Lord, have mercy</button>
            <button class="kyrie-btn reset" data-kyrie-reset>Reset</button>
          </div>
        </div>
        <div class="section-label">Canonical Hours & Devotions</div>
        ${PRAYERS.map(p => `<div class="list-card" data-nav="prayer-detail" data-id="${p.id}">
          <div class="avatar">🕊</div>
          <div class="content"><h3>${esc(p.title)}</h3><p>${esc(p.subtitle)}</p></div>
        </div>`).join('')}
      </div>
      ${bottomNav('prayers')}`;
  }

  function viewPrayerDetail(id) {
    const p = PRAYERS.find(x => x.id === id);
    if (!p) return viewPrayersIndex();
    const bm = isBookmarked('prayer', p.id);
    return `
      ${topbar(p.title, { back: true, bookmarkActive: bm })}
      <div class="view" style="font-size:${state.fontScale}em;">
        <div class="prayer-controls">
          <span class="subtle">${esc(p.subtitle)}</span>
          <span style="flex:1;"></span>
          <button class="font-btn" data-font="-">A-</button>
          <button class="font-btn" data-font="+">A+</button>
        </div>
        ${p.lines.map(l => `<div class="prayer-line role-${l.role}">
          <div class="role-label">${roleGlyph(l.role)} ${l.role}</div>
          <div class="line-text">${esc(l.text)}</div>
        </div>`).join('')}
      </div>
      ${bottomNav('prayers')}`;
  }
  function roleGlyph(role) {
    return { priest: '✝', deacon: '☩', congregation: '⛪', rubric: '✦' }[role] || '';
  }

  /* ---------------- Q&A ---------------- */
  let qaOpen = new Set();
  function viewQA() {
    return `
      ${topbar('Q&A Catalog', { back: true })}
      <div class="view">
        <p class="subtle" style="margin-bottom:14px;">Apologetics questions with patristic anchors and theological takeaways.</p>
        ${QA.map(item => `<div class="qa-item ${qaOpen.has(item.id) ? 'open' : ''}" data-qa-toggle="${item.id}">
          <div class="qa-question"><h3>${esc(item.q)}</h3><span class="chevron">⌄</span></div>
          <div class="qa-answer"><div class="qa-answer-inner">
            <p>${esc(item.a)}</p>
            <div class="qa-takeaway"><strong>Key takeaway:</strong> ${esc(item.takeaway)}</div>
            <div class="qa-anchor">✦ ${esc(item.anchor)}</div>
          </div></div>
        </div>`).join('')}
      </div>
      ${bottomNav('qa')}`;
  }

  /* ---------------- Quiz ---------------- */
  function startQuiz(tier) {
    const pool = QUIZ.filter(q => q.tier === tier);
    state.quiz = { tier, pool, i: 0, score: 0, answered: null };
  }
  function viewQuiz() {
    if (!state.quiz) {
      return `
        ${topbar('Catechism Quiz', { back: true })}
        <div class="view">
          <p class="subtle" style="margin-bottom:16px;">Choose a level to test your knowledge.</p>
          ${TIERS.map(t => `<div class="list-card" data-quiz-start="${t}">
            <div class="avatar">✎</div>
            <div class="content"><h3>${t}</h3><p>${QUIZ.filter(q=>q.tier===t).length} questions</p></div>
          </div>`).join('')}
          ${state.quizHistory.length ? `<div class="section-label" style="margin-top:20px;">History</div>
          <div class="list-card" style="display:block;">
            ${state.quizHistory.slice(0,10).map(h => `<div class="quiz-history-item"><span>${esc(h.tier)}</span><span>${h.score}/${h.total} — ${new Date(h.ts).toLocaleDateString()}</span></div>`).join('')}
          </div>` : ''}
        </div>
        ${bottomNav('quiz')}`;
    }
    const qz = state.quiz;
    if (qz.i >= qz.pool.length) {
      return `
        ${topbar('Quiz Result', { back: true })}
        <div class="view">
          <div class="quiz-result">
            <div class="score">${qz.score}/${qz.pool.length}</div>
            <p>${esc(qz.tier)} level complete.</p>
            <button class="quiz-next" data-quiz-restart>Try Another Level</button>
          </div>
        </div>
        ${bottomNav('quiz')}`;
    }
    const q = qz.pool[qz.i];
    const answered = qz.answered !== null;
    return `
      ${topbar('Catechism Quiz', { back: true })}
      <div class="view">
        <div class="quiz-card">
          <div class="quiz-progress">${esc(qz.tier)} · Question ${qz.i + 1} of ${qz.pool.length} · Score ${qz.score}</div>
          <div class="quiz-question">${esc(q.question)}</div>
          ${q.options.map((opt, idx) => {
            let cls = '';
            if (answered) {
              if (idx === q.answer) cls = 'correct';
              else if (idx === qz.answered) cls = 'incorrect';
            }
            return `<button class="quiz-option ${cls}" data-quiz-answer="${idx}" ${answered ? 'disabled' : ''}>${esc(opt)}</button>`;
          }).join('')}
          ${answered ? `<div class="quiz-rationale">${esc(q.rationale)}</div>
          <button class="quiz-next" data-quiz-next>Next</button>` : ''}
        </div>
      </div>
      ${bottomNav('quiz')}`;
  }

  /* ---------------- Notes ---------------- */
  function viewNotes() {
    return `
      ${topbar('Notes', { back: true })}
      <div class="view">
        ${NOTES.map(sec => `<div class="note-section">
          <div class="section-label">${sec.icon} ${esc(sec.title)}</div>
          <div class="list-card" style="display:block;">
            ${sec.entries.map(e => `<div class="note-entry"><div class="term">${esc(e.term)}</div><div class="def">${esc(e.def)}</div></div>`).join('')}
          </div>
        </div>`).join('')}
      </div>
      ${bottomNav('notes')}`;
  }

  /* ---------------- Journal ---------------- */
  function viewJournal() {
    return `
      ${topbar('My Study Journal', { back: true })}
      <div class="view">
        <textarea class="journal-input" id="journal-input" placeholder="Write a reflection, prayer, or study note..."></textarea>
        <button class="journal-save" data-journal-save>Save Entry</button>
        <div class="section-label" style="margin-top:22px;">Past Entries</div>
        ${state.journal.length === 0 ? `<div class="empty-state"><span class="glyph">✍</span>No entries yet. Begin your journal above.</div>` :
          state.journal.map(j => `<div class="journal-entry">
            <div class="date">${new Date(j.ts).toLocaleString()}<button class="del" data-journal-del="${j.ts}">Delete</button></div>
            <div class="text">${esc(j.text)}</div>
          </div>`).join('')}
      </div>
      ${bottomNav('journal')}`;
  }

  /* ---------------- Bookmarks ---------------- */
  function viewBookmarks() {
    return `
      ${topbar('Bookmarks', { back: true })}
      <div class="view">
        ${state.bookmarks.length === 0 ? `<div class="empty-state"><span class="glyph">★</span>Nothing bookmarked yet. Tap the star on any doctrine, prayer, commentary, or Q&A to save it here.</div>` :
          state.bookmarks.map(b => `<div class="list-card" data-bookmark-open="${b.kind}:${b.id}">
            <div class="avatar">★</div>
            <div class="content"><h3>${esc(b.title)}</h3><p class="subtle">${esc(kindLabel(b.kind))}</p></div>
            <button class="bookmark-btn active" data-bm-quick="${b.kind}:${b.id}:${esc(b.title)}">★</button>
          </div>`).join('')}
      </div>
      ${bottomNav('bookmarks')}`;
  }
  function kindLabel(kind) {
    return { catechism: 'Catechism', commentary: 'Commentary', prayer: 'Prayer', qa: 'Q&A' }[kind] || kind;
  }

  /* ---------------- More ---------------- */
  function viewMore() {
    const items = [
      ['prayers', '🕊', 'Prayers & Hours'],
      ['qa', '❓', 'Q&A Catalog'],
      ['quiz', '✎', 'Catechism Quiz'],
      ['notes', '📖', 'Notes'],
      ['journal', '✍', 'My Study Journal'],
      ['bookmarks', '★', 'Bookmarks'],
      ['search', '⌕', 'Search Everything']
    ];
    return `
      ${topbar('More')}
      <div class="view">
        ${items.map(([id, icon, label]) => `<div class="list-card" data-nav="${id}">
          <div class="avatar">${icon}</div>
          <div class="content"><h3>${esc(label)}</h3></div>
        </div>`).join('')}
      </div>
      ${bottomNav('more')}`;
  }

  /* ---------------- Search ---------------- */
  function buildSearchIndex() {
    const idx = [];
    CATECHISM.forEach(c => idx.push({ kind: 'catechism', id: c.id, title: c.title, snippet: c.summary, blob: [c.title, c.summary, ...c.body, c.tag, ...(c.patristics||[]).map(p=>p.father+' '+p.quote)].join(' ').toLowerCase() }));
    COMMENTARIES.forEach(c => idx.push({ kind: 'commentary', id: c.order, title: c.ref, snippet: c.text, blob: [c.ref, c.book, c.text, ...c.entries.map(e => e.father + ' ' + e.text)].join(' ').toLowerCase() }));
    PRAYERS.forEach(p => idx.push({ kind: 'prayer', id: p.id, title: p.title, snippet: p.subtitle, blob: [p.title, p.subtitle, ...p.lines.map(l => l.text)].join(' ').toLowerCase() }));
    QA.forEach(q => idx.push({ kind: 'qa', id: q.id, title: q.q, snippet: q.a.slice(0, 100), blob: [q.q, q.a, q.takeaway, q.anchor].join(' ').toLowerCase() }));
    NOTES.forEach(sec => sec.entries.forEach(e => idx.push({ kind: 'note', id: sec.id, title: e.term, snippet: e.def, blob: [e.term, e.def].join(' ').toLowerCase() })));
    return idx;
  }
  const SEARCH_INDEX = buildSearchIndex();

  function viewSearch(query) {
    query = query || '';
    const q = query.trim().toLowerCase();
    const results = q.length < 2 ? [] : SEARCH_INDEX.filter(r => r.blob.includes(q)).slice(0, 40);
    return `
      ${topbar('Search', { back: true })}
      <div class="view">
        <div class="search-bar">
          <span class="icon">⌕</span>
          <input id="search-input" type="text" placeholder="Search doctrines, prayers, commentaries, Q&A, notes…" value="${esc(query)}" autofocus/>
        </div>
        ${q.length < 2 ? `<div class="empty-state"><span class="glyph">⌕</span>Type at least 2 letters to search across the entire catechism, commentaries, prayers, and notes.</div>` :
          results.length === 0 ? `<div class="empty-state"><span class="glyph">⌕</span>No results for "${esc(query)}".</div>` :
          results.map(r => `<div class="search-result" data-search-open="${r.kind}:${r.id}">
            <div class="kind">${esc(kindLabel(r.kind) || r.kind)}</div>
            <h4>${esc(r.title)}</h4>
            <p>${esc(r.snippet)}</p>
          </div>`).join('')}
      </div>
      ${bottomNav('search')}`;
  }
  function openSearchResult(kind, id) {
    if (kind === 'catechism') go('catechism-detail/' + id);
    else if (kind === 'commentary') go('commentary-detail/' + id);
    else if (kind === 'prayer') go('prayer-detail/' + id);
    else if (kind === 'qa') { qaOpen.add(id); go('qa'); }
    else if (kind === 'note') go('notes');
  }

  /* ---------------- render dispatch ---------------- */
  let currentSearchQuery = '';
  function render() {
    const { name, param } = parseRoute();
    let html;
    switch (name) {
      case 'home': html = viewHome(); break;
      case 'catechism': html = viewCatechism(); break;
      case 'catechism-detail': html = viewCatechismDetail(param); break;
      case 'commentary': html = viewCommentaryIndex(); break;
      case 'commentary-detail': html = viewCommentaryDetail(param); break;
      case 'traditions': html = viewTraditions(); break;
      case 'prayers': html = viewPrayersIndex(); break;
      case 'prayer-detail': html = viewPrayerDetail(param); break;
      case 'qa': html = viewQA(); break;
      case 'quiz': html = viewQuiz(); break;
      case 'notes': html = viewNotes(); break;
      case 'journal': html = viewJournal(); break;
      case 'bookmarks': html = viewBookmarks(); break;
      case 'search': html = viewSearch(currentSearchQuery); break;
      case 'more': html = viewMore(); break;
      default: html = viewHome();
    }
    app.innerHTML = html;
    app.scrollTop = 0;
    const scroller = app.querySelector('.view');
    if (scroller) scroller.scrollTop = 0;
    wireEvents(name, param);
  }

  /* ---------------- events ---------------- */
  function wireEvents(routeName, routeParam) {
    app.querySelectorAll('[data-nav]').forEach(el => {
      el.addEventListener('click', () => {
        const target = el.getAttribute('data-nav');
        const id = el.getAttribute('data-id');
        if (target === 'catechism-detail' || target === 'commentary-detail' || target === 'prayer-detail') {
          go(target + '/' + id);
        } else go(target);
      });
    });
    app.querySelectorAll('[data-back]').forEach(el => el.addEventListener('click', () => history.back()));

    app.querySelectorAll('[data-trad]').forEach(el => el.addEventListener('click', () => {
      state.catFilter = el.getAttribute('data-trad');
      render();
    }));

    app.querySelectorAll('[data-bm-quick]').forEach(el => el.addEventListener('click', (ev) => {
      ev.stopPropagation();
      const [kind, id, title] = el.getAttribute('data-bm-quick').split(':');
      const added = toggleBookmark(kind, id, title);
      toast(added ? 'Bookmarked' : 'Removed from bookmarks');
      render();
    }));

    const bookmarkToggleBtn = app.querySelector('[data-bookmark-toggle]');
    if (bookmarkToggleBtn) {
      bookmarkToggleBtn.addEventListener('click', () => {
        let kind, id, title;
        if (routeName === 'catechism-detail') { const c = CATECHISM.find(x => x.id === routeParam); kind='catechism'; id=c.id; title=c.title; }
        else if (routeName === 'commentary-detail') { const c = COMMENTARIES.find(x => String(x.order) === String(routeParam)); kind='commentary'; id=c.order; title=c.ref; }
        else if (routeName === 'prayer-detail') { const p = PRAYERS.find(x => x.id === routeParam); kind='prayer'; id=p.id; title=p.title; }
        if (kind) { const added = toggleBookmark(kind, id, title); toast(added ? 'Bookmarked' : 'Removed from bookmarks'); render(); }
      });
    }

    app.querySelectorAll('[data-bookmark-open]').forEach(el => el.addEventListener('click', (ev) => {
      if (ev.target.closest('[data-bm-quick]')) return;
      const [kind, id] = el.getAttribute('data-bookmark-open').split(':');
      openSearchResult(kind, id);
    }));

    // commentary prev/next
    const prevBtn = app.querySelector('[data-commentary-prev]');
    const nextBtn = app.querySelector('[data-commentary-next]');
    if (prevBtn) prevBtn.addEventListener('click', () => {
      const idx = COMMENTARIES.findIndex(c => String(c.order) === prevBtn.getAttribute('data-commentary-prev'));
      if (idx > 0) go('commentary-detail/' + COMMENTARIES[idx - 1].order);
    });
    if (nextBtn) nextBtn.addEventListener('click', () => {
      const idx = COMMENTARIES.findIndex(c => String(c.order) === nextBtn.getAttribute('data-commentary-next'));
      if (idx < COMMENTARIES.length - 1) go('commentary-detail/' + COMMENTARIES[idx + 1].order);
    });

    // prayers: font size
    app.querySelectorAll('[data-font]').forEach(el => el.addEventListener('click', () => {
      const dir = el.getAttribute('data-font');
      state.fontScale = Math.max(0.8, Math.min(1.6, state.fontScale + (dir === '+' ? 0.1 : -0.1)));
      store.set('ow_fontscale', state.fontScale);
      render();
    }));

    // kyrie counter
    const kyrieTap = app.querySelector('[data-kyrie-tap]');
    if (kyrieTap) kyrieTap.addEventListener('click', () => {
      state.kyrie = Math.min(KYRIE_TARGET, state.kyrie + 1);
      store.set('ow_kyrie', state.kyrie);
      const countEl = document.getElementById('kyrie-count');
      const fillEl = document.getElementById('kyrie-fill');
      if (countEl) countEl.textContent = state.kyrie;
      if (fillEl) fillEl.style.width = Math.min(100, state.kyrie / KYRIE_TARGET * 100) + '%';
      if (state.kyrie === KYRIE_TARGET) toast('Lord, have mercy — 41 complete');
    });
    const kyrieReset = app.querySelector('[data-kyrie-reset]');
    if (kyrieReset) kyrieReset.addEventListener('click', () => {
      state.kyrie = 0; store.set('ow_kyrie', 0); render();
    });

    // Q&A accordion
    app.querySelectorAll('[data-qa-toggle]').forEach(el => el.addEventListener('click', () => {
      const id = el.getAttribute('data-qa-toggle');
      if (qaOpen.has(id)) qaOpen.delete(id); else qaOpen.add(id);
      render();
    }));

    // quiz
    app.querySelectorAll('[data-quiz-start]').forEach(el => el.addEventListener('click', () => {
      startQuiz(el.getAttribute('data-quiz-start'));
      render();
    }));
    app.querySelectorAll('[data-quiz-answer]').forEach(el => el.addEventListener('click', () => {
      const idx = parseInt(el.getAttribute('data-quiz-answer'), 10);
      const qz = state.quiz;
      const q = qz.pool[qz.i];
      qz.answered = idx;
      if (idx === q.answer) qz.score++;
      render();
    }));
    const quizNext = app.querySelector('[data-quiz-next]');
    if (quizNext) quizNext.addEventListener('click', () => {
      state.quiz.i++;
      state.quiz.answered = null;
      if (state.quiz.i >= state.quiz.pool.length) {
        state.quizHistory.unshift({ tier: state.quiz.tier, score: state.quiz.score, total: state.quiz.pool.length, ts: Date.now() });
        store.set('ow_quiz_history', state.quizHistory);
      }
      render();
    });
    const quizRestart = app.querySelector('[data-quiz-restart]');
    if (quizRestart) quizRestart.addEventListener('click', () => { state.quiz = null; render(); });

    // journal
    const journalSave = app.querySelector('[data-journal-save]');
    if (journalSave) journalSave.addEventListener('click', () => {
      const ta = document.getElementById('journal-input');
      const text = ta.value.trim();
      if (!text) return;
      state.journal.unshift({ text, ts: Date.now() });
      store.set('ow_journal', state.journal);
      toast('Entry saved');
      render();
    });
    app.querySelectorAll('[data-journal-del]').forEach(el => el.addEventListener('click', () => {
      const ts = parseInt(el.getAttribute('data-journal-del'), 10);
      state.journal = state.journal.filter(j => j.ts !== ts);
      store.set('ow_journal', state.journal);
      render();
    }));

    // search
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
      searchInput.addEventListener('input', () => {
        currentSearchQuery = searchInput.value;
        const results = renderSearchResultsOnly(currentSearchQuery);
      });
      searchInput.focus();
    }
    app.querySelectorAll('[data-search-open]').forEach(el => el.addEventListener('click', () => {
      const [kind, id] = el.getAttribute('data-search-open').split(':');
      openSearchResult(kind, id);
    }));
  }

  function renderSearchResultsOnly(query) {
    // lightweight re-render of just the search view to avoid losing focus while typing
    const viewEl = app.querySelector('.view');
    const scrollPos = viewEl ? viewEl.scrollTop : 0;
    const newHtml = viewSearch(query);
    app.innerHTML = newHtml;
    wireEvents('search', null);
    const input = document.getElementById('search-input');
    if (input) {
      input.focus();
      input.setSelectionRange(input.value.length, input.value.length);
    }
  }

  render();
})();
