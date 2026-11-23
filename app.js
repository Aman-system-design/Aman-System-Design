// Main Application Script for Aman's Portfolio (AT)
// Tactile editorial presentation, Three.js 3D playground & synthesized Web Audio

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

  initBrickKeyFilter();
  initCopyEmailToast();
  initActiveNavSpy();
  initThreeJsPlayground();
});

// Render Hero & Header
function renderHeaderAndHero(data) {
  const wordmark = document.getElementById("wordmark");
  if (wordmark) {
    wordmark.innerHTML = `${data.profile.initials}<span>.</span>`;
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
          Explore brick builds <span aria-hidden="true">↘</span>
        </a>
      </div>
    `;
  }

  const headerSocials = document.getElementById("header-socials");
  if (headerSocials) {
    headerSocials.innerHTML = `
      <a class="social-brick linkedin-brick" href="${data.profile.socials.linkedin}" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" title="LinkedIn">in</a>
      <a class="social-brick x-brick" href="${data.profile.socials.twitter}" target="_blank" rel="noopener noreferrer" aria-label="X / Twitter" title="X / Twitter">𝕏</a>
      <a class="social-brick github-brick" href="${data.profile.socials.github}" target="_blank" rel="noopener noreferrer" aria-label="GitHub" title="GitHub">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
      </a>
    `;
  }
}

// Render Color Key
function renderColorKey(data) {
  const container = document.getElementById("brick-key-nav");
  if (!container) return;
  container.innerHTML = `
    <p class="key-label">Interactive Key:</p>
    ${data.colorKey.map(k => `
      <button class="key-filter-btn" data-filter="${k.id}" data-target="${k.section}" type="button">
        <i class="key-brick key-${k.color}" aria-hidden="true"></i>
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
    <article class="current-role card-brick block-blue">
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
          <div class="experience-card card-brick">
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
        <article class="edu-card card-brick block-yellow">
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
        <article class="project-card card-brick block-blue">
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
        <article class="field-note-card card-brick block-red">
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
        <a class="essay-card card-brick block-red" href="${es.url}" target="_blank" rel="noopener noreferrer">
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
          <div class="book-card card-brick block-yellow">
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
      <div class="coffee-card card-brick">
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
        <article class="post-quote-card card-brick">
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
        <p class="footer-sub">aman.atii.in • Built with craft and systems thinking.</p>
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
function initBrickKeyFilter() {
  const keyButtons = document.querySelectorAll(".key-filter-btn");
  const resetBtn = document.getElementById("reset-filter-btn");

  keyButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const targetSecId = btn.dataset.target;
      const isActive = btn.classList.contains("active");

      keyButtons.forEach(b => b.classList.remove("active"));
      document.querySelectorAll(".card-brick").forEach(c => c.classList.remove("dimmed", "highlighted"));

      if (isActive) {
        if (resetBtn) resetBtn.style.display = "none";
        return;
      }

      btn.classList.add("active");
      if (resetBtn) resetBtn.style.display = "inline-flex";

      const targetClass = `block-${btn.querySelector(".key-brick").classList.contains("key-blue") ? "blue" : btn.querySelector(".key-brick").classList.contains("key-yellow") ? "yellow" : "red"}`;

      document.querySelectorAll(".card-brick").forEach(card => {
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
      document.querySelectorAll(".card-brick").forEach(c => c.classList.remove("dimmed", "highlighted"));
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

// Synthesized Sound Engine
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

  playBrickSnap() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    if (this.ctx.state === "suspended") this.ctx.resume();

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(650, t);
    osc.frequency.exponentialRampToValueAtTime(160, t + 0.05);

    gain.gain.setValueAtTime(0.28, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.05);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(t);
    osc.stop(t + 0.05);
  }

  playPop() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    if (this.ctx.state === "suspended") this.ctx.resume();

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = "triangle";
    osc.frequency.setValueAtTime(320, t);
    osc.frequency.exponentialRampToValueAtTime(780, t + 0.08);

    gain.gain.setValueAtTime(0.25, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.08);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(t);
    osc.stop(t + 0.08);
  }
}

const sounds = new SoundEffects();

// Three.js 3D Brick Playground
function initThreeJsPlayground() {
  const container = document.getElementById("scene");
  if (!container) return;

  const soundBtn = document.getElementById("sound-toggle");
  if (soundBtn) {
    soundBtn.disabled = false;
    soundBtn.addEventListener("click", () => {
      sounds.enabled = !sounds.enabled;
      soundBtn.setAttribute("aria-pressed", sounds.enabled ? "true" : "false");
      soundBtn.textContent = sounds.enabled ? "Sound On 🔊" : "Sound Off 🔇";
      if (sounds.enabled) sounds.playBrickSnap();
    });
  }

  if (typeof THREE === "undefined") {
    return;
  }

  const width = container.clientWidth || 640;
  const height = container.clientHeight || 420;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
  camera.position.set(5.5, 4.5, 7.5);
  camera.lookAt(0, 0.5, 0);

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  container.appendChild(renderer.domElement);

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
  scene.add(ambientLight);

  const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
  dirLight.position.set(8, 12, 8);
  dirLight.castShadow = true;
  scene.add(dirLight);

  const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(14, 14),
    new THREE.ShadowMaterial({ opacity: 0.12 })
  );
  floor.rotation.x = -Math.PI / 2;
  floor.position.y = -1.2;
  floor.receiveShadow = true;
  scene.add(floor);

  const brickGroup = new THREE.Group();
  scene.add(brickGroup);

  const materials = {
    blue: new THREE.MeshStandardMaterial({ color: 0x2563eb, roughness: 0.25, metalness: 0.05 }),
    yellow: new THREE.MeshStandardMaterial({ color: 0xf59e0b, roughness: 0.25, metalness: 0.05 }),
    red: new THREE.MeshStandardMaterial({ color: 0xef4444, roughness: 0.25, metalness: 0.05 }),
    green: new THREE.MeshStandardMaterial({ color: 0x10b981, roughness: 0.25, metalness: 0.05 })
  };

  function createBrick(w = 2, h = 0.7, d = 1, colorName = "blue") {
    const grp = new THREE.Group();
    const mat = materials[colorName] || materials.blue;
    const box = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
    box.castShadow = true;
    box.receiveShadow = true;
    grp.add(box);

    const sx = Math.round(w * 2);
    const sz = Math.round(d * 2);
    const studGeo = new THREE.CylinderGeometry(0.18, 0.18, 0.15, 16);

    for (let ix = 0; ix < sx; ix++) {
      for (let iz = 0; iz < sz; iz++) {
        const stud = new THREE.Mesh(studGeo, mat);
        stud.castShadow = true;
        const xo = -w / 2 + (ix + 0.5) * (w / sx);
        const zo = -d / 2 + (iz + 0.5) * (d / sz);
        stud.position.set(xo, h / 2 + 0.075, zo);
        grp.add(stud);
      }
    }
    return grp;
  }

  const builds = {
    original: [
      { w: 3, h: 0.7, d: 1.4, c: "blue", pos: [0, -0.7, 0], rot: [0, 0, 0] },
      { w: 2.2, h: 0.7, d: 1.4, c: "yellow", pos: [0.3, 0.05, 0], rot: [0, 0.15, 0] },
      { w: 1.4, h: 0.7, d: 1.4, c: "red", pos: [0.5, 0.8, 0], rot: [0, -0.2, 0] }
    ],
    orbit: [
      { w: 1.5, h: 0.6, d: 0.8, c: "blue", pos: [1.8, 0, 0], rot: [0, 0, 0] },
      { w: 1.5, h: 0.6, d: 0.8, c: "yellow", pos: [0, 0, 1.8], rot: [0, Math.PI / 2, 0] },
      { w: 1.5, h: 0.6, d: 0.8, c: "red", pos: [-1.8, 0, 0], rot: [0, 0, 0] },
      { w: 1.5, h: 0.6, d: 0.8, c: "green", pos: [0, 0, -1.8], rot: [0, Math.PI / 2, 0] }
    ],
    heart: [
      { w: 2.4, h: 0.6, d: 1, c: "red", pos: [0, -0.6, 0], rot: [0, 0, 0] },
      { w: 3.2, h: 0.6, d: 1, c: "red", pos: [0, 0.05, 0], rot: [0, 0, 0] },
      { w: 1.3, h: 0.6, d: 1, c: "red", pos: [-0.9, 0.7, 0], rot: [0, 0, 0] },
      { w: 1.3, h: 0.6, d: 1, c: "red", pos: [0.9, 0.7, 0], rot: [0, 0, 0] }
    ],
    tower: [
      { w: 2.2, h: 0.6, d: 1.5, c: "blue", pos: [0, -0.9, 0], rot: [0, 0, 0] },
      { w: 2.0, h: 0.6, d: 1.4, c: "yellow", pos: [0, -0.25, 0], rot: [0, 0.2, 0] },
      { w: 1.8, h: 0.6, d: 1.3, c: "red", pos: [0, 0.4, 0], rot: [0, -0.3, 0] },
      { w: 1.5, h: 0.6, d: 1.1, c: "green", pos: [0, 1.05, 0], rot: [0, 0.4, 0] }
    ],
    staircase: [
      { w: 1.2, h: 0.6, d: 1.2, c: "blue", pos: [-1.4, -0.8, 0], rot: [0, 0, 0] },
      { w: 1.2, h: 0.6, d: 1.2, c: "yellow", pos: [0, 0.2, 0], rot: [0, 0, 0] },
      { w: 1.2, h: 0.6, d: 1.2, c: "red", pos: [1.4, 1.2, 0], rot: [0, 0, 0] }
    ],
    arch: [
      { w: 0.9, h: 1.8, d: 1, c: "blue", pos: [-1.4, 0, 0], rot: [0, 0, 0] },
      { w: 0.9, h: 1.8, d: 1, c: "blue", pos: [1.4, 0, 0], rot: [0, 0, 0] },
      { w: 3.8, h: 0.6, d: 1.1, c: "yellow", pos: [0, 1.1, 0], rot: [0, 0, 0] },
      { w: 1.8, h: 0.6, d: 1.2, c: "red", pos: [0, 1.75, 0], rot: [0, 0, 0] }
    ]
  };

  let meshes = [];
  let isExploded = false;

  function load(name) {
    const config = builds[name] || builds.original;
    isExploded = false;
    while (brickGroup.children.length > 0) brickGroup.remove(brickGroup.children[0]);
    meshes = [];

    config.forEach(spec => {
      const mesh = createBrick(spec.w, spec.h, spec.d, spec.c);
      mesh.position.set(...spec.pos);
      mesh.rotation.set(...spec.rot);
      mesh.userData.origPos = [...spec.pos];
      mesh.userData.origRot = [...spec.rot];
      brickGroup.add(mesh);
      meshes.push(mesh);
    });

    sounds.playBrickSnap();
  }

  load("original");

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
      load(design);
    });
  });

  const stackToggle = document.getElementById("stack-toggle");
  if (stackToggle) {
    stackToggle.disabled = false;
    stackToggle.addEventListener("click", () => {
      isExploded = !isExploded;
      sounds.playPop();

      meshes.forEach(m => {
        if (isExploded) {
          const rx = (Math.random() - 0.5) * 4;
          const ry = (Math.random() - 0.5) * 3 + 0.5;
          const rz = (Math.random() - 0.5) * 4;
          m.position.set(rx, ry, rz);
          m.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
          stackToggle.innerHTML = "Reassemble the bricks ⤹";
        } else {
          m.position.set(...m.userData.origPos);
          m.rotation.set(...m.userData.origRot);
          stackToggle.innerHTML = "Scatter the bricks ↘";
          sounds.playBrickSnap();
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
    brickGroup.rotation.y += (targetRotY - brickGroup.rotation.y) * 0.08;
    brickGroup.rotation.x += (targetRotX - brickGroup.rotation.x) * 0.08;
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
