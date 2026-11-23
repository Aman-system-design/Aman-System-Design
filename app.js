// Aman (AT) — aman.atii.in
// Architectural System Primitives, Three.js 3D Interactive Canvas & Web Audio

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
  initThreeJsPrimitivesPlayground();
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
          Explore 3D primitives <span aria-hidden="true">↘</span>
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
    <p class="key-label">Interactive Key:</p>
    ${data.colorKey.map(k => `
      <button class="key-filter-btn" data-filter="${k.id}" data-target="${k.section}" type="button">
        <i class="key-node key-${k.color}" aria-hidden="true"></i>
        <span>${k.label}</span>
      </button>
    `).join("")}
    <button class="key-filter-reset" id="reset-filter-btn" type="button" style="display:none;">Clear filter ✕</button>
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
        <span class="current-badge"><i aria-hidden="true"></i> ${cur.badge}</span>
      </div>

      <p class="role-summary">${cur.summary}</p>

      <div class="metrics-grid">
        ${cur.metrics.map(m => `
          <div class="metric-card">
            <span class="metric-val">${m.value}</span>
            <span class="metric-label">${m.label}</span>
            <span class="metric-sub">${m.detail}</span>
          </div>
        `).join("")}
      </div>

      <div class="work-highlights">
        <h4>Key Focus &amp; Execution</h4>
        <ul>
          ${cur.highlights.map(h => `<li>${h}</li>`).join("")}
        </ul>
      </div>
    </article>

    <div class="previous-experience">
      <h3 class="subsection-heading">Previously</h3>
      <div class="experience-grid">
        ${data.work.previous.map(p => `
          <div class="experience-card card-stem">
            <div class="exp-header">
              <div>
                <strong>${p.company}</strong>
                <p class="previous-role">${p.role}</p>
              </div>
              <time>${p.period}</time>
            </div>
            <p class="exp-desc">${p.description}</p>
            <ul class="exp-bullets">
              ${p.bulletPoints.map(b => `<li>${b}</li>`).join("")}
            </ul>
          </div>
        `).join("")}
      </div>
    </div>
  `;
}

// Render Education
function renderEducationSection(data) {
  const eduContent = document.getElementById("education-content");
  if (!eduContent) return;
  eduContent.innerHTML = `
    <div class="education-grid">
      ${data.education.map(e => `
        <article class="edu-card card-stem block-yellow">
          <div class="edu-top">
            <h3>${e.institution}</h3>
            <span class="edu-date">${e.period}</span>
          </div>
          <p class="degree-title">${e.degree}</p>
          <p class="edu-notes">${e.notes}</p>
        </article>
      `).join("")}
    </div>
  `;
}

// Render Active Projects
function renderProjectsSection(data) {
  const projContent = document.getElementById("projects-content");
  if (!projContent) return;
  projContent.innerHTML = `
    <div class="projects-grid">
      ${data.projects.map(p => `
        <article class="project-card card-stem block-blue">
          <div class="item-top">
            <h3><a href="${p.url}" target="_blank" rel="noopener noreferrer">${p.title}</a></h3>
            <span class="status-tag tag-${p.badgeColor}">${p.tag}</span>
          </div>
          <p class="project-desc">${p.description}</p>
          <div class="tags-row">
            ${p.tags.map(t => `<span class="chip">${t}</span>`).join("")}
          </div>
          <div class="project-footer">
            <a class="inline-link" href="${p.url}" target="_blank" rel="noopener noreferrer">${p.cta}</a>
          </div>
        </article>
      `).join("")}
    </div>
  `;
}

// Render Field Notes
function renderFieldNotesSection(data) {
  const fnContent = document.getElementById("field-notes-content");
  if (!fnContent) return;
  fnContent.innerHTML = `
    <div class="field-notes-list">
      ${data.fieldNotes.map(n => `
        <article class="field-note-card card-stem block-green">
          <div class="field-heading">
            <span class="field-dot" aria-hidden="true"></span>
            <span class="field-badge">${n.badge}</span>
            <span class="small-label">${n.date}</span>
          </div>
          <h3 class="field-title">${n.title}</h3>
          <p class="field-summary">${n.summary}</p>
          <div class="field-links">
            <a class="inline-link accent-link" href="${n.link}" target="_blank" rel="noopener noreferrer">${n.linkText}</a>
            <div class="press-tags">
              ${n.press.map(pr => `<span>${pr}</span>`).join(" · ")}
            </div>
          </div>
        </article>
      `).join("")}
    </div>
  `;
}

// Render Essays
function renderEssaysSection(data) {
  const essayContent = document.getElementById("essays-content");
  if (!essayContent) return;
  essayContent.innerHTML = `
    <div class="writing-intro-banner">
      <div>
        <h3>Articles &amp; Field Thoughts</h3>
        <p>Internet habits, platform teardowns, and observations from the trenches of software systems.</p>
      </div>
      <a class="newsletter-subscribe-btn" href="${data.profile.socials.substack}" target="_blank" rel="noopener noreferrer">
        Read on Substack ↗
      </a>
    </div>
    <div class="essays-grid">
      ${data.essays.map(es => `
        <a class="essay-card card-stem block-green" href="${es.url}" target="_blank" rel="noopener noreferrer">
          <div class="essay-meta">
            <span class="essay-tag">${es.category}</span>
            <span class="read-time">${es.readTime}</span>
            <time>${es.date}</time>
          </div>
          <h4 class="essay-title">${es.title}</h4>
          <p class="essay-summary">${es.description}</p>
          <span class="essay-read-cta">Read article →</span>
        </a>
      `).join("")}
    </div>
  `;
}

// Render Books & Coffee
function renderBooksAndTaste(data) {
  const container = document.getElementById("taste-content");
  if (!container) return;

  container.innerHTML = `
    <div class="taste-tabs">
      <button class="taste-tab active" data-tab="books" type="button">📚 Bookshelf &amp; Reading Notes</button>
      <button class="taste-tab" data-tab="coffee" type="button">☕ Off the Clock: Coffee Log</button>
    </div>

    <div id="tab-books" class="taste-tab-panel active">
      <div class="books-grid">
        ${data.books.map(b => `
          <div class="book-card card-stem block-yellow">
            <div class="book-top">
              <span class="book-tag">${b.category}</span>
              <span class="book-rating">${b.rating}</span>
            </div>
            <h4 class="book-title">${b.title}</h4>
            <p class="book-author">by ${b.author}</p>
            <p class="book-takeaway">"${b.takeaway}"</p>
          </div>
        `).join("")}
      </div>
    </div>

    <div id="tab-coffee" class="taste-tab-panel">
      <div class="coffee-card card-stem">
        <div class="coffee-header">
          <h3>${data.coffeeNotes.title}</h3>
          <p class="coffee-sub">${data.coffeeNotes.subtitle}</p>
        </div>
        <div class="coffee-grid">
          ${data.coffeeNotes.favorites.map(c => `
            <div class="coffee-item">
              <div class="coffee-spot-line">
                <strong class="spot-name">${c.spot}</strong>
                <span class="spot-city">${c.city}</span>
              </div>
              <p class="spot-note">${c.note}</p>
            </div>
          `).join("")}
        </div>
      </div>
    </div>
  `;

  const tabs = container.querySelectorAll(".taste-tab");
  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      const target = tab.dataset.tab;
      container.querySelectorAll(".taste-tab-panel").forEach(p => p.classList.remove("active"));
      const activePanel = document.getElementById(`tab-${target}`);
      if (activePanel) activePanel.classList.add("active");
    });
  });
}

// Render Social Quotes
function renderSocialPosts(data) {
  const container = document.getElementById("social-posts-content");
  if (!container) return;
  container.innerHTML = `
    <div class="posts-grid">
      ${data.socialPosts.map(p => `
        <article class="post-quote-card card-stem">
          <div class="post-quote-head">
            <span class="post-platform-badge ${p.platform.toLowerCase().includes('x') ? 'badge-x' : 'badge-li'}">${p.platform}</span>
            <span class="post-eyebrow">${p.eyebrow}</span>
            <span class="post-date">${p.date}</span>
          </div>
          <blockquote class="post-body">“${p.quote}”</blockquote>
          <a class="post-link" href="${p.url}" target="_blank" rel="noopener noreferrer">View conversation ↗</a>
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
    <div class="footer-wrap wrap">
      <div class="footer-identity">
        <a class="footer-email" href="mailto:${data.profile.email}">${data.profile.email}</a>
        <p class="footer-author">${data.profile.name} — ${data.profile.role}</p>
        <p class="footer-sub">aman.atii.in • Built with craft, curiosity, and system design.</p>
      </div>
      <nav class="footer-nav" aria-label="Footer links">
        <a class="back-to-top" href="#top">Back to top ↑</a>
        <a href="${data.profile.socials.linkedin}" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        <a href="${data.profile.socials.twitter}" target="_blank" rel="noopener noreferrer">𝕏</a>
        <a href="${data.profile.socials.github}" target="_blank" rel="noopener noreferrer">GitHub</a>
        <a href="llms.txt" target="_blank" title="AI reading file">llms.txt</a>
      </nav>
    </div>
  `;
}

// Color Key Filter
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
    });
  });

  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      keyButtons.forEach(b => b.classList.remove("active"));
      document.querySelectorAll(".card-stem, .card-brick").forEach(c => c.classList.remove("dimmed", "highlighted"));
      resetBtn.style.display = "none";
    });
  }
}

// Copy Email Toast
function initCopyEmailToast() {
  let toast = document.getElementById("toast-notification");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "toast-notification";
    toast.className = "toast";
    document.body.appendChild(toast);
  }

  document.addEventListener("click", (e) => {
    const emailEl = e.target.closest("[data-copy-email]");
    if (emailEl) {
      const email = emailEl.getAttribute("data-copy-email");
      if (navigator.clipboard) {
        navigator.clipboard.writeText(email).then(() => {
          showToast(`Copied ${email} to clipboard!`);
        });
      }
    }
  });

  function showToast(msg) {
    toast.textContent = msg;
    toast.classList.add("show");
    setTimeout(() => {
      toast.classList.remove("show");
    }, 2600);
  }
}

// Nav Active Scroll Spy
function initActiveNavSpy() {
  const sections = document.querySelectorAll("main section[id]");
  const navLinks = document.querySelectorAll(".site-nav a");

  window.addEventListener("scroll", () => {
    let currentId = "";
    const scrollPos = window.scrollY + 140;

    sections.forEach(sec => {
      if (sec.offsetTop <= scrollPos && sec.offsetTop + sec.offsetHeight > scrollPos) {
        currentId = sec.getAttribute("id");
      }
    });

    navLinks.forEach(link => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${currentId}`) {
        link.classList.add("active");
      }
    });
  });
}

// Web Audio Tactile Synthesizer
class SoundEffects {
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

  playRelaySnap() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    if (this.ctx.state === "suspended") this.ctx.resume();

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(750, t);
    osc.frequency.exponentialRampToValueAtTime(220, t + 0.04);

    gain.gain.setValueAtTime(0.24, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.04);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(t);
    osc.stop(t + 0.04);
  }

  playDisperse() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    if (this.ctx.state === "suspended") this.ctx.resume();

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = "triangle";
    osc.frequency.setValueAtTime(360, t);
    osc.frequency.exponentialRampToValueAtTime(820, t + 0.07);

    gain.gain.setValueAtTime(0.22, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.07);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(t);
    osc.stop(t + 0.07);
  }
}

const sounds = new SoundEffects();

// Three.js 3D Primitives Playground (Architectural Nodes & Solid Blocks)
function initThreeJsPrimitivesPlayground() {
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
  camera.position.set(5.5, 4.2, 7.5);
  camera.lookAt(0, 0.3, 0);

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  container.appendChild(renderer.domElement);

  // Studio Lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.95);
  scene.add(ambientLight);

  const dirLight = new THREE.DirectionalLight(0xffffff, 1.3);
  dirLight.position.set(8, 12, 8);
  dirLight.castShadow = true;
  scene.add(dirLight);

  const fillLight = new THREE.DirectionalLight(0x60a5fa, 0.4);
  fillLight.position.set(-6, -4, -6);
  scene.add(fillLight);

  // Ground Shadow Plane
  const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(16, 16),
    new THREE.ShadowMaterial({ opacity: 0.12 })
  );
  floor.rotation.x = -Math.PI / 2;
  floor.position.y = -1.3;
  floor.receiveShadow = true;
  scene.add(floor);

  const primitiveGroup = new THREE.Group();
  scene.add(primitiveGroup);

  // High-End Architectural Materials (Sleek Frosted Glass & Polished Metals)
  const materials = {
    blue: new THREE.MeshStandardMaterial({
      color: 0x2563eb,
      roughness: 0.18,
      metalness: 0.15,
      transparent: true,
      opacity: 0.94
    }),
    emerald: new THREE.MeshStandardMaterial({
      color: 0x059669,
      roughness: 0.18,
      metalness: 0.15,
      transparent: true,
      opacity: 0.94
    }),
    amber: new THREE.MeshStandardMaterial({
      color: 0xd97706,
      roughness: 0.18,
      metalness: 0.15,
      transparent: true,
      opacity: 0.94
    }),
    slate: new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      roughness: 0.25,
      metalness: 0.4
    }),
    frost: new THREE.MeshStandardMaterial({
      color: 0xf1f5f9,
      roughness: 0.1,
      metalness: 0.05,
      transparent: true,
      opacity: 0.88
    })
  };

  // Create Sleek Architectural Primitive Object (No Lego studs!)
  function createPrimitiveObject(type = "box", w = 1.6, h = 0.8, d = 1.2, matName = "blue") {
    const grp = new THREE.Group();
    const mat = materials[matName] || materials.blue;
    let geo;

    if (type === "cylinder") {
      geo = new THREE.CylinderGeometry(w / 2, w / 2, h, 32);
    } else if (type === "sphere") {
      geo = new THREE.SphereGeometry(w / 2, 32, 32);
    } else if (type === "prism") {
      geo = new THREE.OctahedronGeometry(w / 1.6, 0);
    } else {
      geo = new THREE.BoxGeometry(w, h, d);
    }

    const mesh = new THREE.Mesh(geo, mat);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    grp.add(mesh);

    // Subtle sleek outline wireframe
    const wireGeo = new THREE.EdgesGeometry(geo);
    const wireMat = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.25 });
    const wire = new THREE.LineSegments(wireGeo, wireMat);
    grp.add(wire);

    return grp;
  }

  // 6 Architectural Presets
  const presets = {
    original: [
      { t: "box", w: 3.2, h: 0.65, d: 1.6, c: "slate", pos: [0, -0.75, 0], rot: [0, 0, 0] },
      { t: "box", w: 2.2, h: 0.65, d: 1.4, c: "blue", pos: [0.2, 0.0, 0], rot: [0, 0.2, 0] },
      { t: "prism", w: 1.5, h: 1.5, d: 1.5, c: "emerald", pos: [0.4, 0.85, 0], rot: [0, 0.4, 0] }
    ],
    orbit: [
      { t: "sphere", w: 1.6, h: 1.6, d: 1.6, c: "blue", pos: [0, 0, 0], rot: [0, 0, 0] },
      { t: "box", w: 0.8, h: 0.8, d: 0.8, c: "emerald", pos: [2.0, 0, 0], rot: [0, 0.4, 0] },
      { t: "cylinder", w: 0.7, h: 0.9, d: 0.7, c: "amber", pos: [0, 0, 2.0], rot: [0, 0, 0] },
      { t: "box", w: 0.8, h: 0.8, d: 0.8, c: "frost", pos: [-2.0, 0, 0], rot: [0, 0.2, 0] },
      { t: "prism", w: 1.0, h: 1.0, d: 1.0, c: "slate", pos: [0, 0, -2.0], rot: [0, 0.6, 0] }
    ],
    monolith: [
      { t: "box", w: 2.8, h: 0.5, d: 2.2, c: "slate", pos: [0, -0.9, 0], rot: [0, 0, 0] },
      { t: "box", w: 1.2, h: 2.4, d: 1.0, c: "blue", pos: [-0.6, 0.45, 0], rot: [0, 0.1, 0] },
      { t: "box", w: 1.0, h: 2.8, d: 0.9, c: "emerald", pos: [0.6, 0.65, 0], rot: [0, -0.1, 0] }
    ],
    cascade: [
      { t: "box", w: 1.4, h: 0.5, d: 1.2, c: "slate", pos: [-1.4, -0.75, 0], rot: [0, 0, 0] },
      { t: "box", w: 1.4, h: 0.5, d: 1.2, c: "blue", pos: [-0.7, -0.25, 0], rot: [0, 0, 0] },
      { t: "box", w: 1.4, h: 0.5, d: 1.2, c: "frost", pos: [0, 0.25, 0], rot: [0, 0, 0] },
      { t: "box", w: 1.4, h: 0.5, d: 1.2, c: "amber", pos: [0.7, 0.75, 0], rot: [0, 0, 0] },
      { t: "prism", w: 1.2, h: 1.2, d: 1.2, c: "emerald", pos: [1.4, 1.45, 0], rot: [0, 0.4, 0] }
    ],
    gateway: [
      { t: "box", w: 0.9, h: 2.0, d: 1.0, c: "slate", pos: [-1.4, 0.05, 0], rot: [0, 0, 0] },
      { t: "box", w: 0.9, h: 2.0, d: 1.0, c: "slate", pos: [1.4, 0.05, 0], rot: [0, 0, 0] },
      { t: "box", w: 3.8, h: 0.65, d: 1.1, c: "blue", pos: [0, 1.25, 0], rot: [0, 0, 0] },
      { t: "sphere", w: 1.0, h: 1.0, d: 1.0, c: "emerald", pos: [0, 2.0, 0], rot: [0, 0, 0] }
    ],
    equilibrium: [
      { t: "cylinder", w: 1.8, h: 0.5, d: 1.8, c: "slate", pos: [0, -0.85, 0], rot: [0, 0, 0] },
      { t: "prism", w: 1.4, h: 1.4, d: 1.4, c: "amber", pos: [0, 0.1, 0], rot: [0, 0.78, 0] },
      { t: "box", w: 3.2, h: 0.35, d: 1.2, c: "blue", pos: [0, 0.85, 0], rot: [0, 0.15, 0] },
      { t: "sphere", w: 0.8, h: 0.8, d: 0.8, c: "emerald", pos: [-1.1, 1.35, 0], rot: [0, 0, 0] },
      { t: "sphere", w: 0.8, h: 0.8, d: 0.8, c: "frost", pos: [1.1, 1.35, 0], rot: [0, 0, 0] }
    ]
  };

  let meshes = [];
  let isDispersed = false;

  function loadPreset(name) {
    const config = presets[name] || presets.original;
    isDispersed = false;
    while (primitiveGroup.children.length > 0) primitiveGroup.remove(primitiveGroup.children[0]);
    meshes = [];

    config.forEach(spec => {
      const obj = createPrimitiveObject(spec.t, spec.w, spec.h, spec.d, spec.c);
      obj.position.set(...spec.pos);
      obj.rotation.set(...spec.rot);
      obj.userData.origPos = [...spec.pos];
      obj.userData.origRot = [...spec.rot];
      primitiveGroup.add(obj);
      meshes.push(obj);
    });

    sounds.playRelaySnap();
  }

  loadPreset("original");

  const buildButtons = document.querySelectorAll(".build-choice");
  buildButtons.forEach(btn => {
    btn.disabled = false;
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
          disperseBtn.innerHTML = "Reassemble structure ⤹";
        } else {
          m.position.set(...m.userData.origPos);
          m.rotation.set(...m.userData.origRot);
          disperseBtn.innerHTML = "Disperse primitives ↘";
          sounds.playRelaySnap();
        }
      });
    });
  }

  let isDragging = false;
  let prevPos = { x: 0, y: 0 };
  let targetRotY = 0;
  let targetRotX = 0;

  const dom = renderer.domElement;
  dom.style.cursor = "grab";

  dom.addEventListener("mousedown", (e) => {
    isDragging = true;
    dom.style.cursor = "grabbing";
    prevPos = { x: e.clientX, y: e.clientY };
  });

  window.addEventListener("mouseup", () => {
    isDragging = false;
    dom.style.cursor = "grab";
  });

  window.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    const dx = e.clientX - prevPos.x;
    const dy = e.clientY - prevPos.y;
    targetRotY += dx * 0.008;
    targetRotX = Math.max(-0.6, Math.min(0.8, targetRotX + dy * 0.008));
    prevPos = { x: e.clientX, y: e.clientY };
  });

  function animate() {
    requestAnimationFrame(animate);
    if (!isDragging) targetRotY += 0.003;
    primitiveGroup.rotation.y += (targetRotY - primitiveGroup.rotation.y) * 0.08;
    primitiveGroup.rotation.x += (targetRotX - primitiveGroup.rotation.x) * 0.08;
    renderer.render(scene, camera);
  }
  animate();

  window.addEventListener("resize", () => {
    const w = container.clientWidth;
    const h = container.clientHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  });
}
