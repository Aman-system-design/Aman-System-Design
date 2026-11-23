// Aman's PM Portfolio & Interactive PM System Sandbox
// Application Logic, PM Decision Game Engine, and Interactive Workflows

document.addEventListener("DOMContentLoaded", () => {
  const data = window.PORTFOLIO_DATA;
  if (!data) return;

  renderHero(data);
  renderPrimitives(data);
  renderWork(data);
  renderCaseStudies(data);
  renderProjects(data);
  renderPMRevisionCards(data);
  initPMSimulatorGame(data);
  initPrioritizationMatrix();
  initCustomizerModal(data);
  initCopyEmail();
  initSoundEngine();
});

// Sound Synthesizer using Web Audio API
class AudioFeedback {
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

  playClick() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    if (this.ctx.state === "suspended") this.ctx.resume();

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(800, t);
    osc.frequency.exponentialRampToValueAtTime(300, t + 0.04);

    gain.gain.setValueAtTime(0.2, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.04);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(t);
    osc.stop(t + 0.04);
  }

  playSuccess() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    if (this.ctx.state === "suspended") this.ctx.resume();

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = "triangle";
    osc.frequency.setValueAtTime(440, t);
    osc.frequency.exponentialRampToValueAtTime(880, t + 0.12);

    gain.gain.setValueAtTime(0.25, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.15);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(t);
    osc.stop(t + 0.15);
  }
}

const audio = new AudioFeedback();

function initSoundEngine() {
  const soundToggle = document.getElementById("sound-toggle-btn");
  if (soundToggle) {
    soundToggle.addEventListener("click", () => {
      audio.enabled = !audio.enabled;
      soundToggle.textContent = audio.enabled ? "Sound: ON 🔊" : "Sound: OFF 🔇";
      soundToggle.setAttribute("aria-pressed", audio.enabled ? "true" : "false");
      if (audio.enabled) audio.playClick();
    });
  }
}

// Render Hero
function renderHero(data) {
  const wordmark = document.getElementById("brand-wordmark");
  if (wordmark) {
    wordmark.innerHTML = `${data.profile.initials}<span>.</span>`;
  }

  const heroContainer = document.getElementById("hero-content");
  if (!heroContainer) return;

  heroContainer.innerHTML = `
    <div class="hero-header-line">
      <div class="status-pill">
        <span class="pulse-indicator"></span>
        <span>${data.profile.statusBadge}</span>
      </div>
      <span class="location-tag">📍 ${data.profile.location}</span>
    </div>

    <h1 class="hero-tagline">${data.profile.tagline}</h1>
    <p class="hero-role-title">${data.profile.role}</p>
    <p class="hero-bio">${data.profile.bio}</p>

    <div class="hero-cta-group">
      <a class="btn-primary" href="#pm-game" id="hero-game-btn">
        <span class="btn-icon">⚡</span> Play PM Simulator
      </a>
      <a class="btn-secondary" href="#case-studies">
        View Case Studies ↘
      </a>
      <button class="btn-outline" id="copy-email-btn" data-email="${data.profile.email}">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
        Copy Email
      </button>
      <button class="btn-text" id="open-customizer-btn">Customize Profile</button>
    </div>
  `;
}

// Render Product Primitives Filter Row
function renderPrimitives(data) {
  const container = document.getElementById("primitives-nav");
  if (!container) return;

  container.innerHTML = `
    <div class="primitives-bar">
      <span class="primitives-title">Product Primitives:</span>
      ${data.primitives.map(p => `
        <button class="primitive-btn filter-${p.color}" data-target="${p.id}" type="button">
          <span class="primitive-icon">${p.icon}</span>
          <span class="primitive-label">${p.label}</span>
        </button>
      `).join("")}
      <button class="primitive-reset-btn" id="reset-primitives-btn" type="button" style="display:none;">Reset</button>
    </div>
  `;

  const buttons = container.querySelectorAll(".primitive-btn");
  const resetBtn = document.getElementById("reset-primitives-btn");

  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      audio.playClick();
      const isActive = btn.classList.contains("active");
      buttons.forEach(b => b.classList.remove("active"));
      document.querySelectorAll("[data-primitive]").forEach(el => el.classList.remove("primitive-dim", "primitive-glow"));

      if (isActive) {
        if (resetBtn) resetBtn.style.display = "none";
        return;
      }

      btn.classList.add("active");
      if (resetBtn) resetBtn.style.display = "inline-flex";

      const target = btn.dataset.target;
      document.querySelectorAll("[data-primitive]").forEach(el => {
        if (el.dataset.primitive === target) {
          el.classList.add("primitive-glow");
        } else {
          el.classList.add("primitive-dim");
        }
      });
    });
  });

  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      audio.playClick();
      buttons.forEach(b => b.classList.remove("active"));
      document.querySelectorAll("[data-primitive]").forEach(el => el.classList.remove("primitive-dim", "primitive-glow"));
      resetBtn.style.display = "none";
    });
  }
}

// Render Work & Experience
function renderWork(data) {
  const container = document.getElementById("work-content");
  if (!container) return;
  const cur = data.work.current;

  container.innerHTML = `
    <!-- Current Role Feature Card -->
    <div class="current-role-card card-shell" data-primitive="systems">
      <div class="card-meta-line">
        <div>
          <span class="badge-active">● ${cur.badge}</span>
          <h3 class="role-company"><a href="${cur.url}" target="_blank" rel="noopener noreferrer">${cur.company} ↗</a></h3>
          <p class="role-designation">${cur.role}</p>
        </div>
        <span class="role-tenure">${cur.period}</span>
      </div>

      <p class="role-description">${cur.summary}</p>

      <!-- Headline Metrics -->
      <div class="telemetry-metrics-grid">
        ${cur.metrics.map(m => `
          <div class="telemetry-metric-item">
            <span class="metric-number">${m.value}</span>
            <span class="metric-caption">${m.label}</span>
            <span class="metric-sub">${m.detail}</span>
          </div>
        `).join("")}
      </div>

      <div class="highlights-box">
        <h4>Key Engineering & Product Initiatives</h4>
        <ul>
          ${cur.highlights.map(h => `<li>${h}</li>`).join("")}
        </ul>
      </div>
    </div>

    <!-- Previous Experience List -->
    <div class="previous-roles-grid">
      ${data.work.previous.map(p => `
        <div class="past-role-card card-shell" data-primitive="zerotoone">
          <div class="past-role-top">
            <div>
              <h4 class="past-company">${p.company}</h4>
              <p class="past-title">${p.role}</p>
            </div>
            <span class="past-period">${p.period}</span>
          </div>
          <p class="past-summary">${p.summary}</p>
          <ul class="past-bullets">
            ${p.bullets.map(b => `<li>${b}</li>`).join("")}
          </ul>
        </div>
      `).join("")}
    </div>
  `;
}

// Render Case Studies
function renderCaseStudies(data) {
  const container = document.getElementById("case-studies-content");
  if (!container) return;

  container.innerHTML = `
    <div class="case-studies-grid">
      ${data.caseStudies.map(cs => `
        <article class="case-study-card card-shell" data-primitive="telemetry">
          <div class="case-tag-line">
            <span class="case-category">${cs.category}</span>
            <span class="case-metric-badge">${cs.metricHighlight}</span>
          </div>
          <h3 class="case-title">${cs.title}</h3>
          
          <div class="case-body-grid">
            <div class="case-block problem-block">
              <strong>The Friction / Problem</strong>
              <p>${cs.problem}</p>
            </div>
            <div class="case-block solution-block">
              <strong>The Architecture / Product Solution</strong>
              <p>${cs.solution}</p>
            </div>
          </div>

          <div class="case-impact-line">
            <strong>Outcome:</strong> <span>${cs.impact}</span>
          </div>
        </article>
      `).join("")}
    </div>
  `;
}

// Render Active Projects
function renderProjects(data) {
  const container = document.getElementById("projects-content");
  if (!container) return;

  container.innerHTML = `
    <div class="projects-grid">
      ${data.projects.map(p => `
        <div class="project-card card-shell" data-primitive="zerotoone">
          <div class="project-top-line">
            <h3 class="project-title"><a href="${p.url}" target="_blank" rel="noopener noreferrer">${p.title} ↗</a></h3>
            <span class="project-status-tag">${p.status}</span>
          </div>
          <p class="project-desc">${p.desc}</p>
          <div class="project-stack-pills">
            ${p.stack.map(s => `<span class="stack-pill">${s}</span>`).join("")}
          </div>
        </div>
      `).join("")}
    </div>
  `;
}

// Render Mental Models Flashcards
function renderPMRevisionCards(data) {
  const container = document.getElementById("mental-models-content");
  if (!container) return;

  container.innerHTML = `
    <div class="revision-header">
      <p class="revision-sub">Click any card to inspect how this mental model applies to real product engineering decisions:</p>
    </div>
    <div class="mental-models-grid">
      ${data.mentalModels.map(m => `
        <div class="model-card card-shell" data-primitive="models">
          <div class="model-top">
            <span class="model-badge">${m.category}</span>
            <span class="flip-hint">Insight ↘</span>
          </div>
          <h4 class="model-title">${m.title}</h4>
          <p class="model-concept">“${m.concept}”</p>
          <div class="model-application">
            <strong>PM Execution Lens:</strong>
            <p>${m.pmApplication}</p>
          </div>
        </div>
      `).join("")}
    </div>
  `;

  // Click animation on model cards
  container.querySelectorAll(".model-card").forEach(card => {
    card.addEventListener("click", () => {
      audio.playClick();
      card.classList.toggle("card-expanded");
    });
  });
}

// PM Simulator Game Engine
function initPMSimulatorGame(data) {
  const gameSection = document.getElementById("pm-game");
  if (!gameSection) return;

  const scenarios = data.game.scenarios;
  let currentRound = 0;
  let telemetry = {
    velocity: 70,
    delight: 65,
    health: 80,
    cost: 75
  };
  let history = [];

  const roundContainer = document.getElementById("game-stage-container");
  if (!roundContainer) return;

  function updateTelemetryGauges() {
    // Clamp values between 5 and 100
    telemetry.velocity = Math.max(5, Math.min(100, telemetry.velocity));
    telemetry.delight = Math.max(5, Math.min(100, telemetry.delight));
    telemetry.health = Math.max(5, Math.min(100, telemetry.health));
    telemetry.cost = Math.max(5, Math.min(100, telemetry.cost));

    const setGauge = (id, val) => {
      const bar = document.getElementById(`gauge-${id}`);
      const text = document.getElementById(`val-${id}`);
      if (bar) bar.style.width = `${val}%`;
      if (text) text.textContent = `${val}%`;
    };

    setGauge("velocity", telemetry.velocity);
    setGauge("delight", telemetry.delight);
    setGauge("health", telemetry.health);
    setGauge("cost", telemetry.cost);
  }

  function renderScenario(index) {
    if (index >= scenarios.length) {
      renderGameResults();
      return;
    }

    const sc = scenarios[index];
    roundContainer.innerHTML = `
      <div class="scenario-card card-shell">
        <div class="scenario-top">
          <span class="round-counter">Scenario ${index + 1} of ${scenarios.length}</span>
          <span class="scenario-type">Tactical Dilemma</span>
        </div>

        <h3 class="scenario-title">${sc.title}</h3>
        <p class="scenario-situation">${sc.situation}</p>

        <div class="choices-container">
          <p class="choices-label">What is your call, Product Manager?</p>
          ${sc.choices.map((choice, i) => `
            <button class="choice-option-btn" data-choice="${i}">
              <span class="choice-letter">${String.fromCharCode(65 + i)}</span>
              <span class="choice-text">${choice.text}</span>
            </button>
          `).join("")}
        </div>

        <div id="choice-feedback-box" class="choice-feedback-box" style="display:none;"></div>
      </div>
    `;

    const choiceBtns = roundContainer.querySelectorAll(".choice-option-btn");
    const feedbackBox = roundContainer.querySelector("#choice-feedback-box");

    choiceBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        const choiceIdx = parseInt(btn.dataset.choice, 10);
        const selected = sc.choices[choiceIdx];

        // Apply telemetry
        telemetry.velocity += selected.telemetry.velocity;
        telemetry.delight += selected.telemetry.delight;
        telemetry.health += selected.telemetry.health;
        telemetry.cost += selected.telemetry.cost;

        audio.playSuccess();
        updateTelemetryGauges();

        // Lock buttons
        choiceBtns.forEach(b => b.disabled = true);
        btn.classList.add("selected-choice");

        // Display feedback
        feedbackBox.style.display = "block";
        feedbackBox.innerHTML = `
          <div class="feedback-content">
            <strong>Post-Decision Outcome:</strong>
            <p>${selected.feedback}</p>
            <button id="next-scenario-btn" class="btn-primary next-btn">
              ${index + 1 < scenarios.length ? "Next Scenario →" : "View Final PM Evaluation 🏆"}
            </button>
          </div>
        `;

        document.getElementById("next-scenario-btn").addEventListener("click", () => {
          audio.playClick();
          currentRound++;
          renderScenario(currentRound);
        });
      });
    });
  }

  function renderGameResults() {
    const avgScore = Math.round((telemetry.velocity + telemetry.delight + telemetry.health + telemetry.cost) / 4);
    let title = "Senior Principal Product Manager — Systems & Scale";
    let desc = "Exceptional balance of user empathy, technical foresight, and commercial pragmatism. You protected velocity without creating fatal technical debt.";

    if (avgScore < 50) {
      title = "Scrappy 0-to-1 PM";
      desc = "You kept the lights on, but accumulated high technical debt and budget pressure. Great learning ground for enterprise scale.";
    } else if (avgScore >= 80) {
      title = "Executive VP of Product / Chief System Architect";
      desc = "Rare tier: You navigated stakeholder friction, avoided black-box traps, and turned one-off custom requests into long-term platform advantages.";
    }

    roundContainer.innerHTML = `
      <div class="results-card card-shell">
        <div class="results-header">
          <span class="badge-complete">Evaluation Complete</span>
          <h3>${title}</h3>
          <p class="results-score">Overall Score: <strong>${avgScore}/100</strong></p>
        </div>

        <p class="results-summary">${desc}</p>

        <div class="final-gauges-summary">
          <div class="final-stat">🚀 Velocity: <strong>${telemetry.velocity}%</strong></div>
          <div class="final-stat">💖 User Delight: <strong>${telemetry.delight}%</strong></div>
          <div class="final-stat">🛡️ Stability: <strong>${telemetry.health}%</strong></div>
          <div class="final-stat">💰 Runway: <strong>${telemetry.cost}%</strong></div>
        </div>

        <div class="results-actions">
          <button id="restart-game-btn" class="btn-primary">
            Play Again ↺
          </button>
          <a href="#case-studies" class="btn-secondary">
            Read Aman's Real Case Studies ↘
          </a>
        </div>
      </div>
    `;

    document.getElementById("restart-game-btn").addEventListener("click", () => {
      audio.playClick();
      currentRound = 0;
      telemetry = { velocity: 70, delight: 65, health: 80, cost: 75 };
      updateTelemetryGauges();
      renderScenario(0);
    });
  }

  // Initial render
  updateTelemetryGauges();
  renderScenario(0);
}

// Interactive Prioritization Matrix (2x2 Quadrant)
function initPrioritizationMatrix() {
  const container = document.getElementById("matrix-container");
  if (!container) return;

  const features = [
    { name: "Streaming Token UI", quad: "quick-wins", reason: "Low effort, huge perceived latency drop." },
    { name: "Self-Serve API Keys", quad: "quick-wins", reason: "Immediate onboarding unblocker." },
    { name: "Distributed Multi-Region Vector DB", quad: "major-bets", reason: "High effort, fundamental enterprise scale moat." },
    { name: "Enterprise RBAC & SSO", quad: "major-bets", reason: "High effort, unlocks tier-1 six-figure deals." },
    { name: "Dark Mode for Dev Portal", quad: "fill-ins", reason: "Low effort delight, low business leverage." },
    { name: "Custom Proprietary Client Auth", quad: "money-pits", reason: "High effort, derails platform modularity." }
  ];

  container.innerHTML = `
    <div class="matrix-grid-layout">
      <div class="matrix-quadrant quad-quick-wins" data-quad="quick-wins">
        <div class="quad-header">
          <span class="quad-badge">🚀 Quick Wins</span>
          <span class="quad-axis">High Impact • Low Effort</span>
        </div>
        <div class="quad-items" id="items-quick-wins"></div>
      </div>

      <div class="matrix-quadrant quad-major-bets" data-quad="major-bets">
        <div class="quad-header">
          <span class="quad-badge">🏛️ Major Bets</span>
          <span class="quad-axis">High Impact • High Effort</span>
        </div>
        <div class="quad-items" id="items-major-bets"></div>
      </div>

      <div class="matrix-quadrant quad-fill-ins" data-quad="fill-ins">
        <div class="quad-header">
          <span class="quad-badge">⚡ Fill-Ins</span>
          <span class="quad-axis">Low Impact • Low Effort</span>
        </div>
        <div class="quad-items" id="items-fill-ins"></div>
      </div>

      <div class="matrix-quadrant quad-money-pits" data-quad="money-pits">
        <div class="quad-header">
          <span class="quad-badge">⚠️ Money Pits</span>
          <span class="quad-axis">Low Impact • High Effort</span>
        </div>
        <div class="quad-items" id="items-money-pits"></div>
      </div>
    </div>
  `;

  features.forEach(f => {
    const parent = document.getElementById(`items-${f.quad}`);
    if (parent) {
      const el = document.createElement("div");
      el.className = "matrix-item-chip";
      el.innerHTML = `
        <strong>${f.name}</strong>
        <p>${f.reason}</p>
      `;
      el.addEventListener("click", () => {
        audio.playClick();
        el.classList.toggle("chip-active");
      });
      parent.appendChild(el);
    }
  });
}

// Copy Email with Toast
function initCopyEmail() {
  document.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-email]");
    if (!btn) return;
    const email = btn.dataset.email;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(email).then(() => {
        audio.playClick();
        showToast(`Copied ${email} to clipboard!`);
      });
    }
  });

  function showToast(text) {
    let toast = document.getElementById("site-toast");
    if (!toast) {
      toast = document.createElement("div");
      toast.id = "site-toast";
      toast.className = "site-toast";
      document.body.appendChild(toast);
    }
    toast.textContent = text;
    toast.classList.add("toast-visible");
    setTimeout(() => toast.classList.remove("toast-visible"), 2600);
  }
}

// Live Profile Customizer
function initCustomizerModal(data) {
  document.addEventListener("click", (e) => {
    if (e.target && e.target.id === "open-customizer-btn") {
      audio.playClick();
      openModal();
    }
  });

  function openModal() {
    let modal = document.getElementById("customizer-modal");
    if (!modal) {
      modal = document.createElement("div");
      modal.id = "customizer-modal";
      modal.className = "customizer-modal";
      modal.innerHTML = `
        <div class="customizer-overlay"></div>
        <div class="customizer-drawer card-shell">
          <div class="drawer-header">
            <div>
              <h3>Customize Your PM Identity</h3>
              <p>Update live details, headline metrics, and bio.</p>
            </div>
            <button id="close-modal-btn" class="close-btn" type="button">✕</button>
          </div>
          <div class="drawer-body">
            <form id="edit-profile-form">
              <div class="field-group">
                <label>Your Name</label>
                <input type="text" id="input-name" value="${data.profile.name}">
              </div>
              <div class="field-group">
                <label>Initials (Wordmark)</label>
                <input type="text" id="input-initials" value="${data.profile.initials}">
              </div>
              <div class="field-group">
                <label>Role / Specialty</label>
                <input type="text" id="input-role" value="${data.profile.role}">
              </div>
              <div class="field-group">
                <label>Company / Current Affiliation</label>
                <input type="text" id="input-company" value="${data.work.current.company}">
              </div>
              <div class="field-group">
                <label>Short Bio</label>
                <textarea id="input-bio" rows="3">${data.profile.bio}</textarea>
              </div>
              <div class="field-group">
                <label>Email</label>
                <input type="email" id="input-email" value="${data.profile.email}">
              </div>
              <div class="modal-buttons">
                <button type="submit" class="btn-primary">Apply Live</button>
                <button type="button" id="copy-config-btn" class="btn-outline">Copy Config JSON</button>
              </div>
            </form>
          </div>
        </div>
      `;
      document.body.appendChild(modal);

      modal.querySelector(".customizer-overlay").addEventListener("click", () => modal.classList.remove("open"));
      modal.querySelector("#close-modal-btn").addEventListener("click", () => modal.classList.remove("open"));

      modal.querySelector("#edit-profile-form").addEventListener("submit", (ev) => {
        ev.preventDefault();
        data.profile.name = document.getElementById("input-name").value;
        data.profile.initials = document.getElementById("input-initials").value;
        data.profile.role = document.getElementById("input-role").value;
        data.work.current.company = document.getElementById("input-company").value;
        data.profile.bio = document.getElementById("input-bio").value;
        data.profile.email = document.getElementById("input-email").value;

        renderHero(data);
        renderWork(data);
        modal.classList.remove("open");
        audio.playSuccess();
      });

      modal.querySelector("#copy-config-btn").addEventListener("click", () => {
        const json = "window.PORTFOLIO_DATA = " + JSON.stringify(data, null, 2) + ";\n";
        if (navigator.clipboard) {
          navigator.clipboard.writeText(json).then(() => {
            const btn = modal.querySelector("#copy-config-btn");
            btn.textContent = "Copied JSON! ✓";
            setTimeout(() => btn.textContent = "Copy Config JSON", 2000);
          });
        }
      });
    }

    modal.classList.add("open");
  }
}
