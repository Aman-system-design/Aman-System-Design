// Aman — Single-View Portfolio & Interactive System Simulator
// Strictly read-only, decluttered single-view architecture

document.addEventListener("DOMContentLoaded", () => {
  const data = window.PORTFOLIO_DATA;
  if (!data) return;

  renderIntro(data);
  renderMetrics(data);
  renderExperience(data);
  renderCaseStudies(data);
  renderProjects(data);
  initSimulator(data);
  initSandbox();
  initSoundEngine();
  initCopyEmail();
});

// Sound Synthesizer
class SoundEngine {
  constructor() {
    this.ctx = null;
    this.enabled = true;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) this.ctx = new AudioCtx();
    }
  }

  click() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    if (this.ctx.state === "suspended") this.ctx.resume();

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(650, t);
    osc.frequency.exponentialRampToValueAtTime(250, t + 0.035);

    gain.gain.setValueAtTime(0.18, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.035);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(t);
    osc.stop(t + 0.035);
  }

  success() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    if (this.ctx.state === "suspended") this.ctx.resume();

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = "triangle";
    osc.frequency.setValueAtTime(420, t);
    osc.frequency.exponentialRampToValueAtTime(840, t + 0.1);

    gain.gain.setValueAtTime(0.2, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.12);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(t);
    osc.stop(t + 0.12);
  }
}

const sound = new SoundEngine();

function initSoundEngine() {
  const btn = document.getElementById("sound-btn");
  if (btn) {
    btn.addEventListener("click", () => {
      sound.enabled = !sound.enabled;
      btn.textContent = sound.enabled ? "Sound: ON 🔊" : "Sound: OFF 🔇";
      btn.setAttribute("aria-pressed", sound.enabled ? "true" : "false");
      if (sound.enabled) sound.click();
    });
  }
}

// Render Intro
function renderIntro(data) {
  const container = document.getElementById("intro-container");
  if (!container) return;

  container.innerHTML = `
    <div class="status-indicator">
      <span class="status-dot"></span>
      <span>${data.profile.status}</span>
    </div>

    <h1 class="intro-headline">${data.profile.headline}</h1>
    <p class="intro-bio">${data.profile.bio}</p>

    <div class="intro-actions">
      <button class="btn-primary" id="copy-email-btn" data-email="${data.profile.email}">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
        <span>Copy Email</span>
      </button>
      <a class="btn-outline" href="${data.profile.github}" target="_blank" rel="noopener noreferrer">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
        <span>GitHub</span>
      </a>
      <span class="geo-tag">📍 ${data.profile.location}</span>
    </div>
  `;
}

// Render Metrics
function renderMetrics(data) {
  const container = document.getElementById("metrics-container");
  if (!container) return;

  container.innerHTML = data.metrics.map(m => `
    <div class="metric-pill">
      <span class="metric-num">${m.value}</span>
      <div class="metric-info">
        <strong>${m.label}</strong>
        <small>${m.sub}</small>
      </div>
    </div>
  `).join("");
}

// Render Experience
function renderExperience(data) {
  const container = document.getElementById("experience-container");
  if (!container) return;

  container.innerHTML = data.experience.map(e => `
    <div class="exp-item">
      <div class="exp-header">
        <div>
          <strong class="exp-company">${e.company}</strong>
          <span class="exp-role">${e.role}</span>
        </div>
        <div class="exp-meta">
          <span class="exp-tag tag-${e.tag.toLowerCase()}">${e.tag}</span>
          <time class="exp-time">${e.period}</time>
        </div>
      </div>
      <p class="exp-summary">${e.summary}</p>
      <ul class="exp-bullets">
        ${e.bullets.map(b => `<li>${b}</li>`).join("")}
      </ul>
    </div>
  `).join("");
}

// Render Case Studies
function renderCaseStudies(data) {
  const container = document.getElementById("casestudies-container");
  if (!container) return;

  container.innerHTML = data.caseStudies.map(cs => `
    <div class="case-card">
      <div class="case-header">
        <h4>${cs.title}</h4>
        <span class="case-metric">${cs.metric}</span>
      </div>
      <div class="case-diff">
        <div class="diff-block">
          <span class="diff-label">Friction</span>
          <p>${cs.problem}</p>
        </div>
        <div class="diff-block">
          <span class="diff-label">System Architecture</span>
          <p>${cs.solution}</p>
        </div>
      </div>
    </div>
  `).join("");
}

// Render Projects
function renderProjects(data) {
  const container = document.getElementById("projects-container");
  if (!container) return;

  container.innerHTML = data.projects.map(p => `
    <div class="project-pill">
      <div class="proj-head">
        <strong>${p.name}</strong>
        <span class="proj-tag">${p.tag}</span>
      </div>
      <p class="proj-desc">${p.desc}</p>
    </div>
  `).join("");
}

// Interactive Tactical Dilemma Simulator
function initSimulator(data) {
  const scenarios = data.simulator.scenarios;
  let currentIdx = 0;
  let telemetry = { velocity: 70, delight: 65, health: 80, cost: 75 };

  const stage = document.getElementById("sim-stage");
  if (!stage) return;

  function updateGauges() {
    telemetry.velocity = Math.max(5, Math.min(100, telemetry.velocity));
    telemetry.delight = Math.max(5, Math.min(100, telemetry.delight));
    telemetry.health = Math.max(5, Math.min(100, telemetry.health));
    telemetry.cost = Math.max(5, Math.min(100, telemetry.cost));

    const set = (id, val) => {
      const bar = document.getElementById(`bar-${id}`);
      const txt = document.getElementById(`txt-${id}`);
      if (bar) bar.style.width = `${val}%`;
      if (txt) txt.textContent = `${val}%`;
    };

    set("vel", telemetry.velocity);
    set("del", telemetry.delight);
    set("hlth", telemetry.health);
    set("cst", telemetry.cost);
  }

  function renderScenario(idx) {
    if (idx >= scenarios.length) {
      renderResults();
      return;
    }

    const sc = scenarios[idx];
    stage.innerHTML = `
      <div class="sim-header-row">
        <span class="sim-counter">Tactical Round ${idx + 1} / ${scenarios.length}</span>
        <span class="sim-type">System Trade-off</span>
      </div>

      <h4 class="sim-title">${sc.title}</h4>
      <p class="sim-context">${sc.context}</p>

      <div class="sim-options">
        ${sc.options.map((opt, i) => `
          <button class="sim-opt-btn" data-opt="${i}">
            <span class="opt-key">${String.fromCharCode(65 + i)}</span>
            <span class="opt-text">${opt.text}</span>
          </button>
        `).join("")}
      </div>

      <div id="sim-feedback" class="sim-feedback-box" style="display:none;"></div>
    `;

    const btns = stage.querySelectorAll(".sim-opt-btn");
    const fb = stage.querySelector("#sim-feedback");

    btns.forEach(b => {
      b.addEventListener("click", () => {
        const optIdx = parseInt(b.dataset.opt, 10);
        const choice = sc.options[optIdx];

        telemetry.velocity += choice.impact.velocity;
        telemetry.delight += choice.impact.delight;
        telemetry.health += choice.impact.health;
        telemetry.cost += choice.impact.cost;

        sound.success();
        updateGauges();

        btns.forEach(btn => btn.disabled = true);
        b.classList.add("chosen");

        fb.style.display = "block";
        fb.innerHTML = `
          <div class="verdict-line">
            <strong>Outcome:</strong> <span>${choice.verdict}</span>
          </div>
          <button id="next-sim-btn" class="btn-sim-next">
            ${idx + 1 < scenarios.length ? "Next Dilemma →" : "View System Assessment 🏆"}
          </button>
        `;

        document.getElementById("next-sim-btn").addEventListener("click", () => {
          sound.click();
          currentIdx++;
          renderScenario(currentIdx);
        });
      });
    });
  }

  function renderResults() {
    const avg = Math.round((telemetry.velocity + telemetry.delight + telemetry.health + telemetry.cost) / 4);
    let rank = "High-Leverage Systems Architect";
    let desc = "Balanced user ergonomics, architectural stability, and team velocity without fatal technical debt.";

    if (avg < 50) {
      rank = "Reactive Builder";
      desc = "Preserved immediate requests, but accumulated high tech debt and infrastructure friction.";
    } else if (avg >= 80) {
      rank = "Principal Systems Strategist";
      desc = "Rare execution level: converted friction into long-term modular platform leverage.";
    }

    stage.innerHTML = `
      <div class="sim-complete-card">
        <span class="complete-badge">Simulation Complete</span>
        <h4>${rank}</h4>
        <p class="sim-score">Composite Score: <strong>${avg}/100</strong></p>
        <p class="sim-desc">${desc}</p>
        <button id="restart-sim-btn" class="btn-primary" style="margin-top:0.8rem;">
          Run Again ↺
        </button>
      </div>
    `;

    document.getElementById("restart-sim-btn").addEventListener("click", () => {
      sound.click();
      currentIdx = 0;
      telemetry = { velocity: 70, delight: 65, health: 80, cost: 75 };
      updateGauges();
      renderScenario(0);
    });
  }

  updateGauges();
  renderScenario(0);
}

// Live Architecture Trade-Off Sandbox (Mode 2)
function initSandbox() {
  const tabSim = document.getElementById("tab-btn-sim");
  const tabSand = document.getElementById("tab-btn-sand");
  const viewSim = document.getElementById("sim-stage-view");
  const viewSand = document.getElementById("sandbox-stage-view");

  if (!tabSim || !tabSand) return;

  tabSim.addEventListener("click", () => {
    sound.click();
    tabSim.classList.add("active");
    tabSand.classList.remove("active");
    viewSim.style.display = "block";
    viewSand.style.display = "none";
  });

  tabSand.addEventListener("click", () => {
    sound.click();
    tabSand.classList.add("active");
    tabSim.classList.remove("active");
    viewSim.style.display = "none";
    viewSand.style.display = "block";
  });

  // Sandbox inputs
  const slider = document.getElementById("scale-slider");
  const cacheToggle = document.getElementById("toggle-cache");
  const circuitToggle = document.getElementById("toggle-circuit");
  const valScale = document.getElementById("val-scale-display");
  const valLat = document.getElementById("metric-est-latency");
  const valCost = document.getElementById("metric-est-cost");
  const valRel = document.getElementById("metric-est-reliability");

  function calcSandbox() {
    if (!slider) return;
    const scale = parseInt(slider.value, 10); // 10k to 10M
    valScale.textContent = scale >= 1000 ? `${(scale / 1000).toFixed(1)}M req/sec` : `${scale}K req/sec`;

    const hasCache = cacheToggle ? cacheToggle.checked : false;
    const hasCircuit = circuitToggle ? circuitToggle.checked : false;

    // Base latency & cost calculations
    let latency = Math.round(45 + (scale * 0.08));
    let cost = Math.round(150 + (scale * 0.35));
    let reliability = 98.5;

    if (hasCache) {
      latency = Math.max(12, Math.round(latency * 0.28));
      cost = Math.round(cost * 0.75);
    }
    if (hasCircuit) {
      reliability = 99.98;
      latency = Math.max(10, latency - 4);
    } else {
      reliability = Math.max(92, 99.5 - (scale * 0.005));
    }

    if (valLat) valLat.textContent = `${latency}ms`;
    if (valCost) valCost.textContent = `$${cost}/mo`;
    if (valRel) valRel.textContent = `${reliability.toFixed(2)}%`;
  }

  if (slider) slider.addEventListener("input", calcSandbox);
  if (cacheToggle) cacheToggle.addEventListener("change", calcSandbox);
  if (circuitToggle) circuitToggle.addEventListener("change", calcSandbox);
  calcSandbox();
}

// Copy Email
function initCopyEmail() {
  document.addEventListener("click", (e) => {
    const btn = e.target.closest("#copy-email-btn");
    if (!btn) return;
    const email = btn.dataset.email;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(email).then(() => {
        sound.click();
        const span = btn.querySelector("span");
        if (span) {
          const old = span.textContent;
          span.textContent = "Copied! ✓";
          setTimeout(() => span.textContent = old, 2000);
        }
      });
    }
  });
}
