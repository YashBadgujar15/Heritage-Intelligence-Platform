/* ============================================================
   HERITAGE INTELLIGENCE — GAME EXPERIENCE LAYER
   UI ONLY / ADDITIVE ONLY
   Does NOT replace existing app logic, data, API calls or handlers.
   ============================================================ */

(() => {
  'use strict';

  const STYLE_ID = 'heritage-game-layer-styles';
  const INTRO_ID = 'heritage-game-intro';
  const HUD_ID = 'heritage-game-hud';

  const reducedMotion = window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ------------------------------------------------------------
     GAME LAYER STYLES
     ------------------------------------------------------------ */
  function injectStyles() {
    if (document.getElementById(STYLE_ID)) return;

    const style = document.createElement('style');
    style.id = STYLE_ID;
    style.textContent = `
      :root{
        --game-gold:#f59e0b;
        --game-gold2:#fbbf24;
        --game-dark:#090706;
        --game-panel:rgba(18,14,10,.86);
        --game-line:rgba(245,158,11,.24);
      }

      body.hip-game-mode{
        background:
          radial-gradient(circle at 50% -10%, rgba(245,158,11,.08), transparent 35%),
          #faf8f5;
      }

      body.hip-game-mode::before{
        content:"";
        position:fixed;
        inset:0;
        pointer-events:none;
        z-index:9990;
        opacity:.08;
        background:
          linear-gradient(rgba(245,158,11,.12) 1px, transparent 1px),
          linear-gradient(90deg,rgba(245,158,11,.12) 1px, transparent 1px);
        background-size:42px 42px;
        mask-image:linear-gradient(to bottom, black, transparent 75%);
      }

      /* Cinematic scan line */
      #heritage-game-scan{
        position:fixed;
        left:0;
        right:0;
        top:-3px;
        height:2px;
        z-index:9998;
        pointer-events:none;
        background:linear-gradient(90deg,transparent,#f59e0b,#fff7d6,#f59e0b,transparent);
        box-shadow:0 0 18px rgba(245,158,11,.7);
        opacity:.55;
        animation:heritageScan 7s linear infinite;
      }

      @keyframes heritageScan{
        0%{transform:translateY(0);opacity:0}
        8%{opacity:.6}
        48%{opacity:.35}
        100%{transform:translateY(100vh);opacity:0}
      }

      /* Intro / start screen */
      #${INTRO_ID}{
        position:fixed;
        inset:0;
        z-index:10000;
        display:flex;
        align-items:center;
        justify-content:center;
        padding:24px;
        background:
          radial-gradient(circle at 50% 42%, rgba(180,83,9,.18), transparent 30%),
          radial-gradient(circle at 20% 80%, rgba(15,118,110,.10), transparent 28%),
          linear-gradient(145deg,#080604 0%,#15100c 45%,#090706 100%);
        color:white;
      }

      #${INTRO_ID}.hip-intro-exit{
        animation:heritageIntroExit .65s cubic-bezier(.22,1,.36,1) forwards;
      }

      @keyframes heritageIntroExit{
        to{opacity:0;visibility:hidden;transform:scale(1.04)}
      }

      .hip-intro-inner{
        width:min(920px,100%);
        text-align:center;
        position:relative;
      }

      .hip-intro-kicker{
        display:inline-flex;
        align-items:center;
        gap:8px;
        padding:7px 13px;
        border:1px solid rgba(245,158,11,.35);
        border-radius:999px;
        color:#fcd34d;
        background:rgba(245,158,11,.08);
        font:700 11px/1 Inter,sans-serif;
        letter-spacing:.18em;
        text-transform:uppercase;
        margin-bottom:24px;
      }

      .hip-intro-title{
        margin:0;
        font:700 clamp(42px,8vw,88px)/.94 "Playfair Display",serif;
        letter-spacing:-.035em;
        text-shadow:0 0 40px rgba(245,158,11,.18);
      }

      .hip-intro-title span{
        color:#fbbf24;
      }

      .hip-intro-sub{
        max-width:680px;
        margin:22px auto 30px;
        color:#a8a29e;
        font:400 14px/1.8 Inter,sans-serif;
      }

      .hip-start{
        position:relative;
        overflow:hidden;
        border:1px solid #f59e0b;
        border-radius:12px;
        padding:15px 30px;
        color:#1c1917;
        background:linear-gradient(135deg,#fbbf24,#d97706);
        box-shadow:0 0 0 1px rgba(245,158,11,.2),0 12px 45px rgba(245,158,11,.16);
        font:800 13px/1 Inter,sans-serif;
        letter-spacing:.08em;
        text-transform:uppercase;
        cursor:pointer;
        transition:transform .2s ease,box-shadow .2s ease;
      }

      .hip-start:hover{
        transform:translateY(-2px);
        box-shadow:0 0 0 1px rgba(245,158,11,.3),0 16px 55px rgba(245,158,11,.28);
      }

      .hip-start::after{
        content:"";
        position:absolute;
        top:0;
        bottom:0;
        width:70px;
        left:-90px;
        transform:skewX(-20deg);
        background:rgba(255,255,255,.35);
        animation:hipButtonSweep 2.8s ease-in-out infinite;
      }

      @keyframes hipButtonSweep{
        0%,55%{left:-90px}
        100%{left:120%}
      }

      .hip-intro-meta{
        display:flex;
        justify-content:center;
        flex-wrap:wrap;
        gap:8px;
        margin-top:22px;
      }

      .hip-intro-meta span{
        padding:6px 10px;
        border-radius:7px;
        border:1px solid rgba(255,255,255,.09);
        background:rgba(255,255,255,.035);
        color:#78716c;
        font:500 10px Inter,sans-serif;
      }

      /* Game HUD */
      #${HUD_ID}{
        position:fixed;
        right:18px;
        bottom:18px;
        z-index:9980;
        width:235px;
        padding:13px;
        color:#e7e5e4;
        background:var(--game-panel);
        border:1px solid var(--game-line);
        border-radius:13px;
        box-shadow:0 12px 40px rgba(0,0,0,.18),0 0 25px rgba(245,158,11,.06);
        backdrop-filter:blur(14px);
        pointer-events:none;
        font-family:Inter,sans-serif;
      }

      .hip-hud-top{
        display:flex;
        justify-content:space-between;
        align-items:center;
        gap:10px;
        margin-bottom:9px;
      }

      .hip-hud-title{
        color:#f5f5f4;
        font-size:10px;
        font-weight:800;
        letter-spacing:.1em;
        text-transform:uppercase;
      }

      .hip-hud-live{
        display:flex;
        align-items:center;
        gap:5px;
        color:#86efac;
        font-size:9px;
        font-weight:700;
      }

      .hip-hud-dot{
        width:6px;
        height:6px;
        border-radius:50%;
        background:#22c55e;
        box-shadow:0 0 10px rgba(34,197,94,.8);
        animation:hipLive 1.7s ease-in-out infinite;
      }

      @keyframes hipLive{
        50%{opacity:.35}
      }

      .hip-hud-row{
        display:flex;
        align-items:center;
        justify-content:space-between;
        gap:8px;
        margin:7px 0;
      }

      .hip-hud-label{
        color:#a8a29e;
        font-size:9px;
        text-transform:uppercase;
        letter-spacing:.08em;
      }

      .hip-hud-value{
        color:#fbbf24;
        font-size:11px;
        font-weight:800;
      }

      .hip-xp{
        height:4px;
        margin-top:3px;
        overflow:hidden;
        border-radius:99px;
        background:#292524;
      }

      .hip-xp i{
        display:block;
                width:68%;
        height:100%;
        border-radius:99px;
        background:linear-gradient(90deg,#b45309,#fbbf24);
        box-shadow:0 0 10px rgba(245,158,11,.45);
        animation:hipXP 3.2s ease-in-out infinite alternate;
      }

      @keyframes hipXP{
        from{width:62%}
        to{width:74%}
      }

      .hip-hud-mission{
        margin-top:9px;
        padding:8px 9px;
        border:1px solid rgba(245,158,11,.14);
        border-radius:8px;
        background:rgba(245,158,11,.05);
      }

      .hip-hud-mission small{
        display:block;
        color:#78716c;
        font-size:8px;
        text-transform:uppercase;
        letter-spacing:.1em;
        margin-bottom:3px;
      }

      .hip-hud-mission strong{
        color:#d6d3d1;
        font-size:10px;
      }

      /* Game card treatment */
      .hip-game-card{
        position:relative;
        transition:
          transform .22s cubic-bezier(.22,1,.36,1),
          box-shadow .22s ease,
          border-color .22s ease !important;
      }

      .hip-game-card::before{
        content:"";
        position:absolute;
        inset:0;
        border-radius:inherit;
        pointer-events:none;
        opacity:0;
        background:radial-gradient(
          260px circle at var(--mx,50%) var(--my,50%),
          rgba(245,158,11,.10),
          transparent 65%
        );
        transition:opacity .2s ease;
      }

      .hip-game-card:hover{
        transform:translateY(-5px) !important;
        box-shadow:0 15px 35px rgba(28,25,23,.14),0 0 0 1px rgba(245,158,11,.12);
      }

      .hip-game-card:hover::before{
        opacity:1;
      }

      /* Agent status scanner */
      .hip-agent-active{
        position:relative;
        overflow:hidden;
      }

      .hip-agent-active::after{
        content:"";
        position:absolute;
        left:0;
        right:0;
        top:-100%;
        height:55%;
        pointer-events:none;
        background:linear-gradient(to bottom,transparent,rgba(245,158,11,.10),transparent);
        animation:hipAgentScan 3.5s linear infinite;
      }

      @keyframes hipAgentScan{
        to{top:140%}
      }

      /* Emergency mode */
      body.hip-emergency-mode #heritage-game-scan{
        background:linear-gradient(90deg,transparent,#ef4444,#fff,#ef4444,transparent);
        box-shadow:0 0 20px rgba(239,68,68,.75);
        animation-duration:2.4s;
      }

      body.hip-emergency-mode #${HUD_ID}{
        border-color:rgba(239,68,68,.35);
      }

      /* Small corner brackets */
      .hip-bracket{
        position:absolute;
        width:12px;
        height:12px;
        border-color:rgba(245,158,11,.45);
        pointer-events:none;
      }

      .hip-bracket.tl{left:8px;top:8px;border-left:1px solid;border-top:1px solid}
      .hip-bracket.tr{right:8px;top:8px;border-right:1px solid;border-top:1px solid}
      .hip-bracket.bl{left:8px;bottom:8px;border-left:1px solid;border-bottom:1px solid}
      .hip-bracket.br{right:8px;bottom:8px;border-right:1px solid;border-bottom:1px solid}

      @media(max-width:640px){
        #${HUD_ID}{
          right:10px;
          bottom:10px;
          width:190px;
          padding:10px;
          opacity:.94;
        }
        .hip-intro-title{font-size:44px}
        .hip-intro-sub{font-size:12px}
      }

      @media(prefers-reduced-motion:reduce){
        #heritage-game-scan,
        .hip-start::after,
        .hip-hud-dot,
        .hip-xp i,
        .hip-agent-active::after{
          animation:none !important;
        }
        .hip-game-card{transition:none !important}
      }
    `;
    document.head.appendChild(style);
  }

  /* ------------------------------------------------------------
     INTRO SCREEN
     ------------------------------------------------------------ */
  function createIntro() {
    if (document.getElementById(INTRO_ID)) return;

    const intro = document.createElement('div');
    intro.id = INTRO_ID;
    intro.innerHTML = `
      <div class="hip-intro-inner">
        <div class="hip-intro-kicker">🏛 Heritage Intelligence · Mission Control</div>
        <h1 class="hip-intro-title">ENTER THE<br><span>HERITAGE WORLD</span></h1>
        <p class="hip-intro-sub">
          Explore living heritage, activate AI agents, monitor structural risks,
          manage visitor intelligence and coordinate emergency decisions —
          all inside one interactive command experience.
        </p>
        <button class="hip-start" type="button">▶ Start Mission</button>
        <div class="hip-intro-meta">
          <span>AI AGENTS</span>
          <span>IBM GRANITE</span>
          <span>AHMEDABAD</span>
          <span>MODHERA</span>
          <span>EMERGENCY CENTER</span>
        </div>
      </div>
    `;

    document.body.appendChild(intro);

    const start = intro.querySelector('.hip-start');
    start.addEventListener('click', () => {
      intro.classList.add('hip-intro-exit');
      setTimeout(() => intro.remove(), reducedMotion ? 0 : 650);
    }, { once:true });
  }

  /* ------------------------------------------------------------
     HUD
     ------------------------------------------------------------ */
  function createHUD() {
    if (document.getElementById(HUD_ID)) return;

    const hud = document.createElement('aside');
    hud.id = HUD_ID;
    hud.innerHTML = `
      <div class="hip-hud-top">
        <div class="hip-hud-title">Heritage Command</div>
        <div class="hip-hud-live"><i class="hip-hud-dot"></i> ONLINE</div>
      </div>

      <div class="hip-hud-row">
        <span class="hip-hud-label">Mission XP</span>
        <span class="hip-hud-value">2,450</span>
      </div>
      <div class="hip-xp"><i></i></div>

      <div class="hip-hud-row">
        <span class="hip-hud-label">Agents</span>
        <span class="hip-hud-value">05 ACTIVE</span>
      </div>

      <div class="hip-hud-row">
        <span class="hip-hud-label">World Status</span>
        <span class="hip-hud-value" id="hip-world-status">MONITORING</span>
      </div>

      <div class="hip-hud-mission">
        <small>Current Objective</small>
        <strong id="hip-current-mission">Explore the Heritage Network</strong>
      </div>
    `;

    document.body.appendChild(hud);
  }

  /* ------------------------------------------------------------
     SCAN LINE
     ------------------------------------------------------------ */
  function createScanLine() {
    if (document.getElementById('heritage-game-scan')) return;
    const line = document.createElement('div');
    line.id = 'heritage-game-scan';
    document.body.appendChild(line);
  }

  /* ------------------------------------------------------------
     ENHANCE RENDERED UI
     ------------------------------------------------------------ */
  function addBrackets(card) {
    if (card.querySelector('.hip-bracket')) return;
    ['tl','tr','bl','br'].forEach(pos => {
      const b = document.createElement('i');
      b.className = `hip-bracket ${pos}`;
      card.appendChild(b);
    });
  }

  function enhanceCards(root = document) {
    const selectors = [
      '.card-hover',
      '.bg-white.rounded-xl.border',
      '.bg-white.rounded-2xl.border',
      '.em-agent-card',
      '.em-orchestrator',
      '.em-decision-border'
    ];

    root.querySelectorAll(selectors.join(',')).forEach(card => {
      if (card.dataset.hipEnhanced === '1') return;

      card.dataset.hipEnhanced = '1';
      card.classList.add('hip-game-card');

      if (
        card.classList.contains('em-agent-card') ||
        card.classList.contains('em-orchestrator') ||
        card.classList.contains('em-decision-border')
      ) {
        card.classList.add('hip-agent-active');
      }

      if (card.children.length < 40) addBrackets(card);

      card.addEventListener('pointermove', e => {
        const r = card.getBoundingClientRect();
        card.style.setProperty('--mx', `${e.clientX - r.left}px`);
        card.style.setProperty('--my', `${e.clientY - r.top}px`);
      });
    });
  }

  /* ------------------------------------------------------------
     BUTTON / NAV POLISH
     ------------------------------------------------------------ */
  function enhanceButtons(root = document) {
    root.querySelectorAll('button').forEach(btn => {
      if (btn.dataset.hipButton === '1') return;
      btn.dataset.hipButton = '1';
            btn.addEventListener('pointerdown', () => {
        btn.style.setProperty('--hip-press', '1');
      });

      btn.addEventListener('pointerup', () => {
        btn.style.removeProperty('--hip-press');
      });
    });
  }

  /* ------------------------------------------------------------
     DETECT CURRENT VIEW WITHOUT TOUCHING APP STATE
     ------------------------------------------------------------ */
  function updateHUD() {
    const status = document.getElementById('hip-world-status');
    const mission = document.getElementById('hip-current-mission');

    const text = (document.body.innerText || '').toLowerCase();

    if (!status || !mission) return;

    if (text.includes('heritage emergency') || text.includes('critical heritage event')) {
      status.textContent = 'CRITICAL';
      status.style.color = '#fca5a5';
      mission.textContent = 'Coordinate the Emergency Response';
      document.body.classList.add('hip-emergency-mode');
    } else if (text.includes('authority dashboard')) {
      status.textContent = 'ANALYSIS';
      status.style.color = '#93c5fd';
      mission.textContent = 'Review Heritage Intelligence';
      document.body.classList.remove('hip-emergency-mode');
    } else if (text.includes('ai agent architecture')) {
      status.textContent = 'AGENTS READY';
      status.style.color = '#86efac';
      mission.textContent = 'Inspect the Agent Network';
      document.body.classList.remove('hip-emergency-mode');
    } else if (text.includes('tourist experience')) {
      status.textContent = 'EXPLORING';
      status.style.color = '#fbbf24';
      mission.textContent = 'Choose a Heritage Destination';
      document.body.classList.remove('hip-emergency-mode');
    } else {
      status.textContent = 'MONITORING';
      status.style.color = '#fbbf24';
      mission.textContent = 'Explore the Heritage Network';
      document.body.classList.remove('hip-emergency-mode');
    }
  }

  /* ------------------------------------------------------------
     KEYBOARD GAME FEEL
     ------------------------------------------------------------ */
  function keyboardFeedback() {
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') {
        const intro = document.getElementById(INTRO_ID);
        if (intro) {
              intro.remove();
        }
      }
    });
  }

  /* ------------------------------------------------------------
     SAFE INITIALISATION
     ------------------------------------------------------------ */
  function enhance() {
    injectStyles();
    document.body.classList.add('hip-game-mode');
    createScanLine();
    createHUD();
    enhanceCards();
    enhanceButtons();
    updateHUD();
  }

  function init() {
    enhance();

    /*
      The original application re-renders #app with innerHTML.
      This observer only re-applies visual classes after those renders.
      It does NOT intercept or replace any existing event handlers.
    */
    const app = document.getElementById('app');

    if (app && window.MutationObserver) {
      const observer = new MutationObserver(() => {
        requestAnimationFrame(() => {
          enhanceCards(app);
          enhanceButtons(app);
          updateHUD();
        });
      });

      observer.observe(app, { childList:true, subtree:true });
    }

    keyboardFeedback();

    /*
      Show cinematic intro only once per browser session.
      The intro is intentionally shown on every page load
      in createIntro().
    */
    createIntro();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once:true });
  } else {
    init();
  }
})();

/* ============================================================
   HERITAGE INTELLIGENCE — FINAL CINEMATIC HERO + RESPONSIVE PATCH
   ADDITIVE UI ONLY
   Does NOT change original app data, state, API calls, handlers,
   navigation, simulations or existing content.
   ============================================================ */
(() => {
  'use strict';

  const STYLE_ID = 'hi-final-cinematic-responsive';
  const PANEL_ID = 'hi-final-hero-panel';

  function injectStyles() {
    if (document.getElementById(STYLE_ID)) return;

    const style = document.createElement('style');
    style.id = STYLE_ID;
    style.textContent = `
      html { scroll-behavior:smooth; }
      body { overflow-x:hidden; background:#0b0907; }

      /* ORIGINAL HERO = FULL CINEMATIC HERITAGE WORLD */
      .gradient-hero {
        position:relative !important;
        isolation:isolate;
        min-height:clamp(590px,78vh,820px);
        overflow:hidden !important;
        background-image:
          linear-gradient(90deg,rgba(5,4,3,.96) 0%,rgba(5,4,3,.82) 27%,rgba(5,4,3,.38) 58%,rgba(5,4,3,.16) 100%),
          linear-gradient(180deg,rgba(5,4,3,.10),rgba(5,4,3,.18) 55%,rgba(5,4,3,.92) 100%),
          url("assets/modhera.png") !important;
        background-size:cover !important;
        background-position:center center !important;
        background-repeat:no-repeat !important;
        box-shadow:inset 0 -90px 120px rgba(0,0,0,.55);
      }

      .gradient-hero::before {
        content:"";
        position:absolute;
        inset:0;
        z-index:-1;
        pointer-events:none;
        background:
          radial-gradient(circle at 74% 43%,rgba(251,191,36,.18),transparent 23%),
          linear-gradient(90deg,rgba(0,0,0,.18),transparent 55%);
      }

      .gradient-hero::after {
        content:"";
        position:absolute;
        inset:0;
        z-index:0;
        pointer-events:none;
        opacity:.30;
        background:
          linear-gradient(rgba(245,158,11,.11) 1px,transparent 1px),
          linear-gradient(90deg,rgba(245,158,11,.11) 1px,transparent 1px);
        background-size:48px 48px;
        mask-image:linear-gradient(to bottom,black,transparent 82%);
      }

      .gradient-hero > * { position:relative; z-index:1; }

      .gradient-hero .max-w-7xl {
        min-height:inherit;
        display:flex;
        align-items:center;
        padding-top:clamp(80px,10vh,120px) !important;
        padding-bottom:clamp(90px,12vh,130px) !important;
      }

      .gradient-hero h1 {
        text-shadow:0 5px 28px rgba(0,0,0,.58);
        letter-spacing:-.025em;
      }

      .gradient-hero p { text-shadow:0 2px 16px rgba(0,0,0,.7); }

      .gradient-hero .agent-chip {
        border:1px solid rgba(255,255,255,.12);
        box-shadow:0 8px 28px rgba(0,0,0,.18);
        backdrop-filter:blur(8px);
      }

      .gradient-hero button {
        min-height:48px;
        box-shadow:0 10px 30px rgba(0,0,0,.20);
        transition:transform .22s cubic-bezier(.22,1,.36,1),box-shadow .22s ease,filter .22s ease;
      }

      .gradient-hero button:hover {
        transform:translateY(-3px);
        box-shadow:0 15px 38px rgba(0,0,0,.30);
        filter:brightness(1.07);
      }

      .gradient-hero button:active { transform:translateY(-1px) scale(.985); }

      /* CINEMATIC HERITAGE WORLD PANEL */
      #${PANEL_ID} {
        position:absolute;
        top:clamp(92px,13vh,130px);
        right:clamp(20px,4vw,58px);
        width:min(285px,24vw);
        min-width:235px;
        padding:15px;
        color:#e7e5e4;
        border:1px solid rgba(245,158,11,.30);
        border-radius:16px;
        background:rgba(8,7,6,.60);
        box-shadow:0 20px 60px rgba(0,0,0,.35),inset 0 0 30px rgba(245,158,11,.035);
        backdrop-filter:blur(15px);
        pointer-events:none;
      }

      #${PANEL_ID} .hi-head {
        display:flex;
        justify-content:space-between;
        align-items:center;
        gap:10px;
        margin-bottom:13px;
      }

      #${PANEL_ID} .hi-title {
        color:#fbbf24;
        font:800 10px/1 Inter,sans-serif;
        letter-spacing:.16em;
        text-transform:uppercase;
      }

      #${PANEL_ID} .hi-live {
        color:#86efac;
        font:800 9px/1 Inter,sans-serif;
        letter-spacing:.08em;
      }

      #${PANEL_ID} .hi-map {
        height:105px;
        position:relative;
        overflow:hidden;
        border:1px solid rgba(245,158,11,.12);
        border-radius:11px;
        background:
          linear-gradient(rgba(245,158,11,.07) 1px,transparent 1px),
          linear-gradient(90deg,rgba(245,158,11,.07) 1px,transparent 1px),
          rgba(255,255,255,.025);
        background-size:22px 22px;
      }

      #${PANEL_ID} .hi-line {
        position:absolute;
        height:1px;
        transform-origin:left center;
        background:linear-gradient(90deg,rgba(245,158,11,.75),rgba(20,184,166,.25));
        box-shadow:0 0 8px rgba(245,158,11,.25);
      }

      #${PANEL_ID} .hi-node {
        position:absolute;
        width:9px;
        height:9px;
        border-radius:50%;
        background:#fbbf24;
                box-shadow:0 0 0 4px rgba(251,191,36,.13),0 0 16px rgba(251,191,36,.65);
      }

      #${PANEL_ID} .hi-label {
        position:absolute;
        color:#d6d3d1;
        font:700 8px/1 Inter,sans-serif;
        letter-spacing:.07em;
        white-space:nowrap;
      }

      #${PANEL_ID} .hi-stats {
        display:grid;
        grid-template-columns:repeat(3,1fr);
        gap:6px;
        margin-top:9px;
      }

      #${PANEL_ID} .hi-stat {
        padding:8px 6px;
        text-align:center;
        border:1px solid rgba(255,255,255,.08);
        border-radius:9px;
        background:rgba(255,255,255,.025);
      }

      #${PANEL_ID} .hi-stat b {
        display:block;
        color:#fbbf24;
        font:800 13px/1.1 Inter,sans-serif;
      }

      #${PANEL_ID} .hi-stat span {
        display:block;
        margin-top:3px;
        color:#a8a29e;
        font:600 7px/1 Inter,sans-serif;
        letter-spacing:.08em;
        text-transform:uppercase;
      }

      /* NAV stays FIRST — the old experimental section must never push it down */
      nav {
        position:sticky !important;
        top:0 !important;
        z-index:9000 !important;
        backdrop-filter:blur(14px);
        box-shadow:0 8px 30px rgba(0,0,0,.16);
      }

      nav button { touch-action:manipulation; }

      @media (min-width:901px) {
        .gradient-hero .max-w-3xl { max-width:min(760px,58vw); }
        .gradient-hero .max-w-2xl { max-width:620px; }
      }

      @media (max-width:1100px) {
        #${PANEL_ID} {
          right:22px;
          width:240px;
          min-width:0;
        }
        .gradient-hero .max-w-3xl { max-width:64%; }
      }

      @media (max-width:900px) {
        .gradient-hero {
          min-height:700px;
          background-position:62% center !important;
          background-image:
            linear-gradient(90deg,rgba(5,4,3,.94) 0%,rgba(5,4,3,.72) 48%,rgba(5,4,3,.28) 100%),
            linear-gradient(180deg,rgba(5,4,3,.16),rgba(5,4,3,.78)),
            url("assets/modhera.png") !important;
        }

        #${PANEL_ID} {
          top:auto;
          bottom:25px;
          right:20px;
          width:260px;
        }

        .gradient-hero .max-w-3xl { max-width:72%; }
      }

      @media (max-width:640px) {
        nav > div {
          overflow-x:auto;
          scrollbar-width:none;
        }
        nav > div::-webkit-scrollbar { display:none; }

        nav > div > button:first-child { flex:0 0 auto; }

        nav > div > div {
          flex:0 0 auto;
          flex-wrap:nowrap !important;
          overflow-x:auto;
          scrollbar-width:none;
        }
        nav > div > div::-webkit-scrollbar { display:none; }
        nav > div > div button {
          flex:0 0 auto;
          white-space:nowrap;
        }

        .gradient-hero {
          min-height:790px;
          background-position:65% center !important;
          box-shadow:inset 0 -100px 110px rgba(0,0,0,.72);
        }

        .gradient-hero .max-w-7xl {
          display:block;
          padding-top:72px !important;
          padding-bottom:230px !important;
        }

        .gradient-hero .max-w-3xl { max-width:100%; }

        .gradient-hero h1 {
          font-size:clamp(2.25rem,11vw,3.5rem) !important;
          line-height:1.04 !important;
          margin-bottom:18px !important;
        }

        .gradient-hero p {
          font-size:14px !important;
          line-height:1.65 !important;
          max-width:100% !important;
          margin-bottom:22px !important;
        }

        .gradient-hero .flex.flex-wrap.gap-3 {
          display:grid;
          grid-template-columns:1fr;
          gap:9px;
        }

        .gradient-hero .flex.flex-wrap.gap-3 button {
          width:100%;
          justify-content:center;
        }

        #${PANEL_ID} {
          left:12px;
          right:12px;
          bottom:16px;
          width:auto;
          padding:11px;
        }

        #${PANEL_ID} .hi-map { height:78px; }
        #${PANEL_ID} .hi-stat { padding:6px 4px; }
        #${PANEL_ID} .hi-stat b { font-size:11px; }

        .hip-game-card:hover { transform:none !important; }
      }

      @media (max-width:400px) {
        .gradient-hero { min-height:820px; }
        .gradient-hero .max-w-7xl {
          padding-top:62px !important;
          padding-bottom:235px !important;
        }
        .gradient-hero .agent-chip {
          font-size:9px;
          padding:5px 7px;
        }
      }

      @media (max-height:600px) and (orientation:landscape) {
        .gradient-hero { min-height:680px; }
        #${PANEL_ID} {
          width:235px;
          right:12px;
          bottom:12px;
        }
      }

      @media (prefers-reduced-motion:reduce) {
        html { scroll-behavior:auto; }
        .gradient-hero button { transition:none; }
      }
    `;
    document.head.appendChild(style);
  }

  function removeOldExperimentalSection() {
    /*
      The previous experiment inserted a separate Heritage World section
      before the app navigation. That is what caused the screenshot to show
      the navigation in the middle of the page.
    */
    document.querySelectorAll('#hi-heritage-world,#hi-mission-panel').forEach(el => el.remove());
  }

  function createPanel() {
    if (document.getElementById(PANEL_ID)) return;

    const hero = document.querySelector('#app main .gradient-hero');
    if (!hero) return;

    const panel = document.createElement('aside');
    panel.id = PANEL_ID;
    panel.innerHTML = `
      <div class="hi-head">
        <div class="hi-title">◉ Heritage World</div>
        <div class="hi-live">● SYSTEM LIVE</div>
      </div>

      <div class="hi-map" aria-hidden="true">
        <span class="hi-line" style="left:20%;top:67%;width:44%;transform:rotate(-18deg)"></span>
        <span class="hi-line" style="left:49%;top:52%;width:29%;transform:rotate(30deg)"></span>
        <span class="hi-line" style="left:35%;top:72%;width:36%;transform:rotate(8deg)"></span>

        <i class="hi-node" style="left:18%;top:63%"></i>
        <i class="hi-node" style="left:46%;top:47%"></i>
        <i class="hi-node" style="left:75%;top:73%"></i>

        <span class="hi-label" style="left:22%;top:58%">AHMEDABAD</span>
        <span class="hi-label" style="left:50%;top:39%">MODHERA</span>
        <span class="hi-label" style="left:57%;top:79%">HERITAGE SITE</span>
      </div>

      <div class="hi-stats">
        <div class="hi-stat"><b>24</b><span>Sites</span></div>
        <div class="hi-stat"><b>05</b><span>Agents</span></div>
        <div class="hi-stat"><b>LIVE</b><span>Network</span></div>
      </div>
    `;

    hero.appendChild(panel);
  }

  function apply() {
    injectStyles();
    removeOldExperimentalSection();
    createPanel();
  }

  function init() {
    apply();

    const app = document.getElementById('app');
    if (app && window.MutationObserver) {
      const observer = new MutationObserver(() => {
        requestAnimationFrame(() => {
          removeOldExperimentalSection();
          createPanel();
        });
      });
      observer.observe(app, { childList:true, subtree:true });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, {once:true});
  } else {
    init();
  }
})();