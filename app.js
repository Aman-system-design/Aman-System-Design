// Aman (AT) — aman.atii.in
// Neural Transformers, API Pipelines & 0-to-1 Architecture Engine

document.addEventListener("DOMContentLoaded", () => {
  const data = window.PORTFOLIO_DATA;
  if (!data) return;

  renderHeaderAndHero(data);
  renderColorKey(data);
  renderWorkSection(data);
  renderEducationSection(data);
  renderProjectsSection(data);
  renderFieldNotesSection(data);
  renderEssaysSection(data);
  renderBooksAndTaste(data);
  renderSocialPosts(data);
  renderFooter(data);

  initKeyFilter();
  initCopyEmailToast();
  initActiveNavSpy();
  initNeuralPlayground();
  initHeroTokenCore();
});

// Render Header & Hero
function renderHeaderAndHero(data) {
  const wordmark = document.getElementById("wordmark");
  if (wordmark) {
    wordmark.innerHTML = `${data.profile.initials}<span style="color:#10b981">.</span>`;
  }

  const heroIntro = document.getElementById("hero-intro");
  if (heroIntro) {
    heroIntro.innerHTML = `
      <div class="intro-heading">
        <h1 id="intro-title">${data.profile.tagline}</h1>
        <p class="intro-role">${data.profile.role}</p>
        <p class="intro-bio">${data.profile.bio}</p>
      </div>
      <div class="intro-status-pill">
        <span class="status-dot"></span>
        <span>${data.profile.statusBadge}</span>
      </div>
      <div class="intro-actions">
        <a class="contact-link" href="mailto:${data.profile.email}" data-copy-email="${data.profile.email}">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
          Get in touch
        </a>
        <a class="playground-link" href="#playground">
          Inspect Neural Flow <span aria-hidden="true">↘</span>
        </a>
      </div>
    `;
  }

  const headerSocials = document.getElementById("header-socials");
  if (headerSocials) {
    headerSocials.innerHTML = `
      <a class="social-pill linkedin-pill" href="${data.profile.socials.linkedin}" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" title="LinkedIn">in</a>
      <a class="social-pill x-pill" href="${data.profile.socials.twitter}" target="_blank" rel="noopener noreferrer" aria-label="X / Twitter" title="X / Twitter">𝕏</a>
      <a class="social-pill github-pill" href="${data.profile.socials.github}" target="_blank" rel="noopener noreferrer" aria-label="GitHub" title="GitHub">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
      </a>
    `;
  }
}

// Render Color Key
function renderColorKey(data) {
  const container = document.getElementById("color-key-nav") || document.getElementById("brick-key-nav");
  if (!container) return;
  container.innerHTML = `
    <p class="key-label">API Endpoints:</p>
    ${data.colorKey.map(k => `
      <button class="key-filter-btn" data-filter="${k.id}" data-target="${k.section}" type="button">
        <span class="api-method-code method-${k.color}">${k.endpoint.split(" ")[0]}</span>
        <span class="api-endpoint-path">${k.endpoint.split(" ")[1]}</span>
        <i class="key-node key-${k.color}" aria-hidden="true"></i>
        <span class="key-filter-title">${k.label}</span>
      </button>
    `).join("")}
    <button class="key-filter-reset" id="reset-filter-btn" type="button" style="display:none;">Reset Filter ✕</button>
  `;
}

// Render Work Section
function renderWorkSection(data) {
  const workContent = document.getElementById("work-content");
  if (!workContent) return;
  const cur = data.work.current;

  workContent.innerHTML = `
    <article class="current-role card-stem block-blue">
      <div class="item-top">
        <div class="company-brand">
          <h3><a href="${cur.url}" target="_blank" rel="noopener noreferrer">${cur.company} ↗</a></h3>
          <span class="role-title">${cur.role}</span>
        </div>
        <span class="current-badge"><span class="status-dot-sm"></span> ${cur.badge}</span>
      </div>

      <p class="role-summary">${cur.summary}</p>

      <div class="metrics-banner">
        ${cur.metrics.map(m => `
          <div class="metric-block">
            <span class="metric-value">${m.value}</span>
            <span class="metric-label">${m.label}</span>
            <span class="metric-detail">${m.detail}</span>
          </div>
        `).join("")}
      </div>

      <div class="role-highlights">
        <h4 class="highlights-title">Key Architectural Highlights:</h4>
        <ul class="role-bullets">
          ${cur.highlights.map(h => `<li>${h}</li>`).join("")}
        </ul>
      </div>
    </article>

    <div class="previous-roles">
      ${data.work.previous.map(p => `
        <article class="timeline-item card-stem block-blue">
          <div class="item-top">
            <h4>${p.company}</h4>
            <span class="timeline-period">${p.period}</span>
          </div>
          <p class="timeline-role">${p.role}</p>
          <p class="timeline-desc">${p.description}</p>
          <ul class="role-bullets mini-bullets">
            ${p.bulletPoints.map(bp => `<li>${bp}</li>`).join("")}
          </ul>
        </article>
      `).join("")}
    </div>
  `;
}

// Render Education Section
function renderEducationSection(data) {
  const eduContent = document.getElementById("education-content");
  if (!eduContent) return;

  eduContent.innerHTML = `
    <div class="edu-grid">
      ${data.education.map(e => `
        <article class="edu-card card-stem block-yellow">
          <div class="item-top">
            <h3>${e.institution}</h3>
            <span class="edu-period">${e.period}</span>
          </div>
          <p class="edu-degree">${e.degree}</p>
          <p class="edu-notes">${e.notes}</p>
        </article>
      `).join("")}
    </div>
  `;
}

// Render Projects Section
function renderProjectsSection(data) {
  const projectsContent = document.getElementById("projects-content");
  if (!projectsContent) return;

  projectsContent.innerHTML = `
    <div class="projects-grid">
      ${data.projects.map(p => `
        <article class="project-card card-stem block-${p.badgeColor}">
          <div class="item-top">
            <h3>${p.title}</h3>
            <span class="project-badge badge-${p.badgeColor}">${p.tag}</span>
          </div>
          <p class="project-desc">${p.description}</p>
          <div class="tags-container">
            ${p.tags.map(t => `<span class="project-tag">${t}</span>`).join("")}
          </div>
          <a class="project-cta" href="${p.url}" target="_blank" rel="noopener noreferrer">${p.cta}</a>
        </article>
      `).join("")}
    </div>
  `;
}

// Render Field Notes Section
function renderFieldNotesSection(data) {
  const fnContent = document.getElementById("field-notes-content");
  if (!fnContent) return;

  fnContent.innerHTML = `
    <div class="field-notes-list">
      ${data.fieldNotes.map(n => `
        <article class="field-note-card card-stem block-green" id="${n.id}">
          <div class="note-meta-bar">
            <span class="note-badge">${n.badge}</span>
            <span class="note-date">${n.date}</span>
          </div>
          <h3>${n.title}</h3>
          <p>${n.summary}</p>
          <div class="note-footer">
            <div class="note-tags">
              ${n.press.map(t => `<span class="project-tag">${t}</span>`).join("")}
            </div>
            <a class="note-link" href="${n.link}" target="_blank" rel="noopener noreferrer">${n.linkText}</a>
          </div>
        </article>
      `).join("")}
    </div>
  `;
}

// Render Essays Section
function renderEssaysSection(data) {
  const essaysContent = document.getElementById("essays-content");
  if (!essaysContent) return;

  essaysContent.innerHTML = `
    <div class="essays-list">
      ${data.essays.map(e => `
        <article class="essay-card card-stem block-green">
          <div class="essay-header">
            <span class="essay-category">${e.category}</span>
            <span class="essay-meta">${e.date} • ${e.readTime}</span>
          </div>
          <h3><a href="${e.url}" target="_blank" rel="noopener noreferrer">${e.title} ↗</a></h3>
          <p>${e.description}</p>
        </article>
      `).join("")}
    </div>
  `;
}

// Render Books & Off the clock
function renderBooksAndTaste(data) {
  const tasteContent = document.getElementById("taste-content");
  if (!tasteContent) return;

  tasteContent.innerHTML = `
    <div class="taste-grid">
      <div class="taste-column card-stem block-yellow">
        <div class="taste-header">
          <h3>Systems Bookshelf</h3>
          <span class="taste-sub">Influential architecture &amp; mental models</span>
        </div>
        <div class="books-list">
          ${data.books.map(b => `
            <div class="book-row">
              <div class="book-info">
                <span class="book-title">${b.title}</span>
                <span class="book-author">${b.author}</span>
              </div>
              <p class="book-takeaway">${b.takeaway}</p>
            </div>
          `).join("")}
        </div>
      </div>

      <div class="taste-column card-stem block-yellow">
        <div class="taste-header">
          <h3>${data.coffeeNotes.title}</h3>
          <span class="taste-sub">${data.coffeeNotes.subtitle}</span>
        </div>
        <div class="coffee-list">
          ${data.coffeeNotes.favorites.map(c => `
            <div class="coffee-row">
              <div class="coffee-spot-line">
                <span class="coffee-spot">${c.spot}</span>
                <span class="coffee-city">${c.city}</span>
              </div>
              <p class="coffee-note">${c.note}</p>
            </div>
          `).join("")}
        </div>
      </div>
    </div>
  `;
}

// Render Social Posts
function renderSocialPosts(data) {
  const postsContent = document.getElementById("social-posts-content");
  if (!postsContent) return;

  postsContent.innerHTML = `
    <div class="posts-grid">
      ${data.socialPosts.map(p => `
        <article class="post-card card-stem block-blue">
          <div class="post-top">
            <span class="post-platform">${p.platform}</span>
            <span class="post-eyebrow">${p.eyebrow}</span>
          </div>
          <p class="post-quote">“${p.quote}”</p>
          <div class="post-bottom">
            <span class="post-date">${p.date}</span>
            <a class="post-link" href="${p.url}" target="_blank" rel="noopener noreferrer">View thread ↗</a>
          </div>
        </article>
      `).join("")}
    </div>
  `;
}

// Render Footer
function renderFooter(data) {
  const footer = document.getElementById("site-footer");
  if (!footer) return;

  footer.innerHTML = `
    <div class="wrap footer-inner">
      <div class="footer-left">
        <a class="footer-wordmark" href="#top">AT<span style="color:#10b981">.</span></a>
        <p class="footer-tagline">Aman • Data &amp; AI Systems • 0-to-1 Platforms</p>
        <p class="footer-copy">Crafted with precision. Designed for scale, low latency and human agency.</p>
      </div>
      <div class="footer-right">
        <a class="footer-link" href="mailto:${data.profile.email}">${data.profile.email}</a>
        <a class="footer-link" href="${data.profile.socials.github}" target="_blank" rel="noopener noreferrer">GitHub</a>
        <a class="footer-link" href="llms.txt">llms.txt</a>
      </div>
    </div>
  `;
}

// Key Filter Logic
function initKeyFilter() {
  const keyButtons = document.querySelectorAll(".key-filter-btn");
  const resetBtn = document.getElementById("reset-filter-btn");

  keyButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const targetSecId = btn.dataset.target;
      const isActive = btn.classList.contains("active");

      keyButtons.forEach(b => b.classList.remove("active"));
      document.querySelectorAll(".card-stem, .card-brick").forEach(c => c.classList.remove("dimmed", "highlighted"));

      if (isActive) {
        if (resetBtn) resetBtn.style.display = "none";
        return;
      }

      btn.classList.add("active");
      if (resetBtn) resetBtn.style.display = "inline-flex";

      const node = btn.querySelector(".key-node, .key-brick");
      const color = node ? (node.classList.contains("key-blue") ? "blue" : node.classList.contains("key-yellow") ? "yellow" : "green") : "blue";
      const targetClass = `block-${color}`;

      document.querySelectorAll(".card-stem, .card-brick").forEach(card => {
        if (card.classList.contains(targetClass)) {
          card.classList.add("highlighted");
        } else {
          card.classList.add("dimmed");
        }
      });

      const targetSection = document.getElementById(targetSecId);
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: "smooth", block: "start" });
      }

      sounds.playRelaySnap();
    });
  });

  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      keyButtons.forEach(b => b.classList.remove("active"));
      document.querySelectorAll(".card-stem, .card-brick").forEach(c => c.classList.remove("dimmed", "highlighted"));
      resetBtn.style.display = "none";
      sounds.playPop();
    });
  }
}

// Copy Email Toast
function initCopyEmailToast() {
  let toast = document.getElementById("toast-notification");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "toast-notification";
    toast.className = "toast-notification";
    toast.setAttribute("role", "status");
    toast.setAttribute("aria-live", "polite");
    document.body.appendChild(toast);
  }

  const copyLinks = document.querySelectorAll("[data-copy-email]");
  copyLinks.forEach(link => {
    link.addEventListener("click", e => {
      const email = link.dataset.copyEmail;
      if (!email) return;

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(email).then(() => {
          showToast(`Copied ${email} to clipboard!`);
          sounds.playRelaySnap();
        }).catch(() => {});
      }
    });
  });

  function showToast(msg) {
    toast.textContent = msg;
    toast.classList.add("show");
    setTimeout(() => {
      toast.classList.remove("show");
    }, 2800);
  }
}

// Active Navigation Spy
function initActiveNavSpy() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".site-nav a");

  window.addEventListener("scroll", () => {
    let current = "";
    const scrollPos = window.scrollY + 140;

    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        current = sec.getAttribute("id");
      }
    });

    navLinks.forEach(link => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  }, { passive: true });
}

// Web Audio Tactile Engine
class SoundEffects {
  constructor() {
    this.ctx = null;
    this.enabled = true;
  }

  ensureContext() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.ctx = new AudioContext();
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  playRelaySnap() {
    if (!this.enabled) return;
    this.ensureContext();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(680, t);
    osc.frequency.exponentialRampToValueAtTime(320, t + 0.045);

    gain.gain.setValueAtTime(0.18, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.045);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(t);
    osc.stop(t + 0.045);
  }

  playDisperse() {
    if (!this.enabled) return;
    this.ensureContext();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(420, t);
    osc.frequency.exponentialRampToValueAtTime(840, t + 0.08);

    gain.gain.setValueAtTime(0.15, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.08);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(t);
    osc.stop(t + 0.08);
  }

  playPop() {
    if (!this.enabled) return;
    this.ensureContext();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = "triangle";
    osc.frequency.setValueAtTime(320, t);
    osc.frequency.exponentialRampToValueAtTime(640, t + 0.06);

    gain.gain.setValueAtTime(0.14, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.06);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(t);
    osc.stop(t + 0.06);
  }
}

const sounds = new SoundEffects();

// Interactive Hero Token Core (Replaces any toy mascot with modern AI neural token orbit)
function initHeroTokenCore() {
  const container = document.getElementById("hero-token-core");
  if (!container) return;

  const tokens = [
    { text: "qkv:attn", color: "blue", angle: 0, r: 85, speed: 0.008 },
    { text: "dim:1536", color: "gold", angle: 1.05, r: 92, speed: 0.006 },
    { text: "p99:38ms", color: "green", angle: 2.1, r: 88, speed: 0.007 },
    { text: "tok/s:140", color: "blue", angle: 3.15, r: 90, speed: 0.009 },
    { text: "POST /v1/infer", color: "green", angle: 4.2, r: 94, speed: 0.005 },
    { text: "SLA:Tier-1", color: "gold", angle: 5.25, r: 86, speed: 0.008 }
  ];

  const svg = container.querySelector(".token-core-svg");
  if (!svg) return;

  let isHovered = false;
  container.addEventListener("mouseenter", () => { isHovered = true; });
  container.addEventListener("mouseleave", () => { isHovered = false; });

  const tokenGroup = svg.querySelector("#dynamic-token-nodes");
  if (!tokenGroup) return;

  function update() {
    requestAnimationFrame(update);
    const speedMult = isHovered ? 0.4 : 1.0;

    let html = "";
    const cx = 100;
    const cy = 100;

    tokens.forEach(tok => {
      tok.angle += tok.speed * speedMult;
      const x = cx + Math.cos(tok.angle) * (tok.r * 0.72);
      const y = cy + Math.sin(tok.angle) * (tok.r * 0.48);

      const colorHex = tok.color === "blue" ? "#2563EB" : tok.color === "green" ? "#10B981" : "#F59E0B";

      // Connection beam to central core
      html += `<line x1="${cx}" y1="${cy}" x2="${x}" y2="${y}" stroke="${colorHex}" stroke-width="1" stroke-dasharray="2 3" opacity="${isHovered ? 0.7 : 0.28}" />`;

      // Token pill badge
      const width = tok.text.length * 6.2 + 14;
      html += `
        <g transform="translate(${x}, ${y})">
          <rect x="-${width / 2}" y="-10" width="${width}" height="20" rx="6" fill="#FFFFFF" stroke="${colorHex}" stroke-width="1.2" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.06))"/>
          <circle cx="-${width / 2 - 5}" cy="0" r="2.5" fill="${colorHex}"/>
          <text x="3" y="3.5" font-family="'JetBrains Mono', monospace" font-size="8.5" font-weight="700" fill="#1F242E" text-anchor="middle">${tok.text}</text>
        </g>
      `;
    });

    tokenGroup.innerHTML = html;
  }

  update();
}

// Three.js Interactive Neural & Transformer Architecture Playground
function initNeuralPlayground() {
  const container = document.getElementById("scene");
  if (!container) return;

  const soundBtn = document.getElementById("sound-toggle");
  if (soundBtn) {
    soundBtn.disabled = false;
    soundBtn.addEventListener("click", () => {
      sounds.enabled = !sounds.enabled;
      soundBtn.setAttribute("aria-pressed", sounds.enabled ? "true" : "false");
      soundBtn.textContent = sounds.enabled ? "Sound On 🔊" : "Sound Off 🔇";
      if (sounds.enabled) sounds.playRelaySnap();
    });
  }

  if (typeof THREE === "undefined") return;

  const width = container.clientWidth || 640;
  const height = container.clientHeight || 420;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
  camera.position.set(5.5, 4.0, 7.5);
  camera.lookAt(0, 0.2, 0);

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  container.appendChild(renderer.domElement);

  // Lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.95);
  scene.add(ambientLight);

  const dirLight = new THREE.DirectionalLight(0xffffff, 1.3);
  dirLight.position.set(8, 12, 8);
  dirLight.castShadow = true;
  scene.add(dirLight);

  const fillLight = new THREE.DirectionalLight(0x38bdf8, 0.5);
  fillLight.position.set(-6, -4, -6);
  scene.add(fillLight);

  // Ground plane
  const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(16, 16),
    new THREE.ShadowMaterial({ opacity: 0.08 })
  );
  floor.rotation.x = -Math.PI / 2;
  floor.position.y = -1.35;
  floor.receiveShadow = true;
  scene.add(floor);

  const neuralGroup = new THREE.Group();
  scene.add(neuralGroup);

  // Material Library for Neural / API Components
  const materials = {
    blue: new THREE.MeshStandardMaterial({
      color: 0x2563eb,
      metalness: 0.2,
      roughness: 0.35
    }),
    emerald: new THREE.MeshStandardMaterial({
      color: 0x10b981,
      metalness: 0.15,
      roughness: 0.3
    }),
    amber: new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      metalness: 0.2,
      roughness: 0.4
    }),
    slate: new THREE.MeshStandardMaterial({
      color: 0x334155,
      metalness: 0.6,
      roughness: 0.4
    }),
    frost: new THREE.MeshPhysicalMaterial({
      color: 0xe0f2fe,
      metalness: 0.1,
      roughness: 0.15,
      transmission: 0.85,
      transparent: true,
      opacity: 0.92
    }),
    wire: new THREE.LineBasicMaterial({
      color: 0x94a3b8,
      transparent: true,
      opacity: 0.55
    })
  };

  function createNeuralNode(type, w, h, d, colorKey) {
    const group = new THREE.Group();
    let geom;

    if (type === "sphere" || type === "token") {
      geom = new THREE.SphereGeometry(w / 2, 24, 24);
    } else if (type === "octa" || type === "vector") {
      geom = new THREE.OctahedronGeometry(w / 1.6, 0);
    } else if (type === "cylinder" || type === "pipeline") {
      geom = new THREE.CylinderGeometry(w / 2, w / 2, h, 24);
    } else {
      geom = new THREE.BoxGeometry(w, h, d);
    }

    const mat = materials[colorKey] || materials.blue;
    const mesh = new THREE.Mesh(geom, mat);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    group.add(mesh);

    // Subtle edge highlight for architectural precision
    const edges = new THREE.EdgesGeometry(geom);
    const line = new THREE.LineSegments(edges, materials.wire);
    group.add(line);

    return group;
  }

  // 6 LLM & Neural Architecture Presets
  const presets = {
    attention: [
      { t: "octa", w: 1.6, h: 1.6, d: 1.6, c: "blue", pos: [0, 0, 0], rot: [0, 0, 0] },
      { t: "sphere", w: 0.7, h: 0.7, d: 0.7, c: "emerald", pos: [-1.8, 0.8, 0], rot: [0, 0, 0] },
      { t: "sphere", w: 0.7, h: 0.7, d: 0.7, c: "amber", pos: [1.8, 0.8, 0], rot: [0, 0, 0] },
      { t: "sphere", w: 0.7, h: 0.7, d: 0.7, c: "frost", pos: [0, 1.8, -0.6], rot: [0, 0, 0] },
      { t: "cylinder", w: 2.8, h: 0.25, d: 2.8, c: "slate", pos: [0, -1.0, 0], rot: [0, 0, 0] }
    ],
    manifold: [
      { t: "octa", w: 1.2, h: 1.2, d: 1.2, c: "emerald", pos: [-1.2, 0.4, 0], rot: [0.4, 0.4, 0] },
      { t: "octa", w: 1.4, h: 1.4, d: 1.4, c: "blue", pos: [1.0, -0.2, 0.5], rot: [-0.2, 0.6, 0] },
      { t: "sphere", w: 0.9, h: 0.9, d: 0.9, c: "amber", pos: [0, 1.2, -0.8], rot: [0, 0, 0] },
      { t: "sphere", w: 0.8, h: 0.8, d: 0.8, c: "frost", pos: [-0.5, -0.8, -0.5], rot: [0, 0, 0] },
      { t: "octa", w: 0.8, h: 0.8, d: 0.8, c: "blue", pos: [0.8, 0.9, -0.2], rot: [0.2, 0.2, 0] }
    ],
    pipeline: [
      { t: "box", w: 1.0, h: 1.2, d: 1.0, c: "slate", pos: [-2.0, 0, 0], rot: [0, 0, 0] },
      { t: "cylinder", w: 1.2, h: 1.6, d: 1.2, c: "blue", pos: [-0.7, 0, 0], rot: [0, 0, 1.57] },
      { t: "octa", w: 1.3, h: 1.3, d: 1.3, c: "emerald", pos: [0.8, 0, 0], rot: [0, 0.5, 0] },
      { t: "box", w: 1.1, h: 1.1, d: 1.1, c: "amber", pos: [2.1, 0, 0], rot: [0, 0.2, 0] }
    ],
    speculative: [
      { t: "octa", w: 1.4, h: 1.4, d: 1.4, c: "blue", pos: [-1.4, 0, 0], rot: [0, 0, 0] },
      { t: "sphere", w: 0.7, h: 0.7, d: 0.7, c: "emerald", pos: [0.2, 0.9, 0], rot: [0, 0, 0] },
      { t: "sphere", w: 0.7, h: 0.7, d: 0.7, c: "emerald", pos: [0.2, -0.9, 0], rot: [0, 0, 0] },
      { t: "sphere", w: 0.6, h: 0.6, d: 0.6, c: "amber", pos: [1.8, 1.3, 0], rot: [0, 0, 0] },
      { t: "sphere", w: 0.6, h: 0.6, d: 0.6, c: "frost", pos: [1.8, 0.5, 0], rot: [0, 0, 0] },
      { t: "sphere", w: 0.6, h: 0.6, d: 0.6, c: "emerald", pos: [1.8, -0.9, 0], rot: [0, 0, 0] }
    ],
    layers: [
      { t: "box", w: 2.8, h: 0.4, d: 2.0, c: "slate", pos: [0, -0.9, 0], rot: [0, 0, 0] },
      { t: "box", w: 2.4, h: 0.4, d: 1.8, c: "blue", pos: [0, -0.3, 0], rot: [0, 0.15, 0] },
      { t: "box", w: 2.0, h: 0.4, d: 1.6, c: "frost", pos: [0, 0.3, 0], rot: [0, -0.15, 0] },
      { t: "box", w: 1.6, h: 0.4, d: 1.4, c: "emerald", pos: [0, 0.9, 0], rot: [0, 0.3, 0] },
      { t: "octa", w: 0.9, h: 0.9, d: 0.9, c: "amber", pos: [0, 1.55, 0], rot: [0, 0, 0] }
    ],
    sparsity: [
      { t: "box", w: 0.6, h: 0.6, d: 0.6, c: "blue", pos: [-0.8, -0.8, 0], rot: [0, 0, 0] },
      { t: "box", w: 0.6, h: 0.6, d: 0.6, c: "slate", pos: [0, -0.8, 0], rot: [0, 0, 0] },
      { t: "box", w: 0.6, h: 0.6, d: 0.6, c: "emerald", pos: [0.8, -0.8, 0], rot: [0, 0, 0] },
      { t: "box", w: 0.6, h: 0.6, d: 0.6, c: "frost", pos: [-0.8, 0, 0], rot: [0, 0, 0] },
      { t: "box", w: 0.6, h: 0.6, d: 0.6, c: "amber", pos: [0, 0, 0], rot: [0, 0, 0] },
      { t: "box", w: 0.6, h: 0.6, d: 0.6, c: "blue", pos: [0.8, 0, 0], rot: [0, 0, 0] },
      { t: "box", w: 0.6, h: 0.6, d: 0.6, c: "emerald", pos: [-0.8, 0.8, 0], rot: [0, 0, 0] },
      { t: "box", w: 0.6, h: 0.6, d: 0.6, c: "frost", pos: [0.8, 0.8, 0], rot: [0, 0, 0] }
    ]
  };

  let meshes = [];
  let isDispersed = false;

  function loadPreset(name) {
    const config = presets[name] || presets.attention;
    isDispersed = false;
    while (neuralGroup.children.length > 0) neuralGroup.remove(neuralGroup.children[0]);
    meshes = [];

    config.forEach(spec => {
      const obj = createNeuralNode(spec.t, spec.w, spec.h, spec.d, spec.c);
      obj.position.set(...spec.pos);
      obj.rotation.set(...spec.rot);
      obj.userData.origPos = [...spec.pos];
      obj.userData.origRot = [...spec.rot];
      neuralGroup.add(obj);
      meshes.push(obj);
    });

    sounds.playRelaySnap();
  }

  loadPreset("attention");

  const buildButtons = document.querySelectorAll(".build-choice");
  buildButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      buildButtons.forEach(b => {
        b.classList.remove("active");
        b.setAttribute("aria-pressed", "false");
      });
      btn.classList.add("active");
      btn.setAttribute("aria-pressed", "true");

      const design = btn.dataset.design;
      const titleEl = document.getElementById("selected-build");
      if (titleEl) titleEl.textContent = btn.querySelector("span:last-child").textContent;
      loadPreset(design);
    });
  });

  const disperseBtn = document.getElementById("stack-toggle");
  if (disperseBtn) {
    disperseBtn.disabled = false;
    disperseBtn.addEventListener("click", () => {
      isDispersed = !isDispersed;
      sounds.playDisperse();

      meshes.forEach(m => {
        if (isDispersed) {
          const rx = (Math.random() - 0.5) * 4.5;
          const ry = (Math.random() - 0.5) * 3 + 0.4;
          const rz = (Math.random() - 0.5) * 4.5;
          m.position.set(rx, ry, rz);
          m.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
          disperseBtn.innerHTML = "Converge weights ⤹";
        } else {
          m.position.set(...m.userData.origPos);
          m.rotation.set(...m.userData.origRot);
          disperseBtn.innerHTML = "Disperse tokens ↘";
          sounds.playRelaySnap();
        }
      });
    });
  }

  // Mouse & Touch Controls
  let isDragging = false;
  let prevMouseX = 0;
  let prevMouseY = 0;
  let targetRotY = 0;
  let targetRotX = 0;

  const dom = renderer.domElement;
  dom.addEventListener("mousedown", e => {
    isDragging = true;
    prevMouseX = e.clientX;
    prevMouseY = e.clientY;
  });

  window.addEventListener("mouseup", () => { isDragging = false; });

  window.addEventListener("mousemove", e => {
    if (!isDragging) return;
    const deltaX = e.clientX - prevMouseX;
    const deltaY = e.clientY - prevMouseY;
    prevMouseX = e.clientX;
    prevMouseY = e.clientY;

    targetRotY += deltaX * 0.008;
    targetRotX += deltaY * 0.008;
  });

  dom.addEventListener("touchstart", e => {
    if (e.touches.length === 1) {
      isDragging = true;
      prevMouseX = e.touches[0].clientX;
      prevMouseY = e.touches[0].clientY;
    }
  }, { passive: true });

  window.addEventListener("touchend", () => { isDragging = false; });

  window.addEventListener("touchmove", e => {
    if (!isDragging || e.touches.length !== 1) return;
    const deltaX = e.touches[0].clientX - prevMouseX;
    const deltaY = e.touches[0].clientY - prevMouseY;
    prevMouseX = e.touches[0].clientX;
    prevMouseY = e.touches[0].clientY;

    targetRotY += deltaX * 0.008;
    targetRotX += deltaY * 0.008;
  }, { passive: true });

  // Animation Loop
  function animate() {
    requestAnimationFrame(animate);
    if (!isDragging) targetRotY += 0.003;
    neuralGroup.rotation.y += (targetRotY - neuralGroup.rotation.y) * 0.08;
    neuralGroup.rotation.x += (targetRotX - neuralGroup.rotation.x) * 0.08;
    renderer.render(scene, camera);
  }
  animate();

  // Resize Handler
  window.addEventListener("resize", () => {
    const nw = container.clientWidth;
    const nh = container.clientHeight;
    camera.aspect = nw / nh;
    camera.updateProjectionMatrix();
    renderer.setSize(nw, nh);
  });
}
