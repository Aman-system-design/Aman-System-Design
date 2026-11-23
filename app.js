// Main Application Script for PM Portfolio
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
  initCustomizerModal(data);
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
        <button id="open-customizer-btn" class="customizer-trigger-btn" title="Customize this portfolio with your details">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
          Customize
        </button>
      </div>
    `;
  }

  // Header social links
  const headerSocials = document.getElementById("header-socials");
  if (headerSocials) {
    headerSocials.innerHTML = `
      <a class="social-brick linkedin-brick" href="${data.profile.socials.linkedin}" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" title="LinkedIn">in</a>
      <a class="social-brick x-brick" href="${data.profile.socials.twitter}" target="_blank" rel="noopener noreferrer" aria-label="X / Twitter" title="X / Twitter">𝕏</a>
      <a class="social-brick substack-brick" href="${data.profile.socials.substack}" target="_blank" rel="noopener noreferrer" aria-label="Substack" title="Substack">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z"/></svg>
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
        <h4>Key Focus & Execution</h4>
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
        <h3>The Filtered Feed &amp; Thought Pieces</h3>
        <p>Internet habits, platform teardowns, and observations from the trenches of product management.</p>
      </div>
      <a class="newsletter-subscribe-btn" href="${data.profile.socials.substack}" target="_blank" rel="noopener noreferrer">
        Subscribe on Substack ↗
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
          <span class="essay-read-cta">Read essay →</span>
        </a>
      `).join("")}
    </div>
  `;
}

// Render Books and Coffee
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

  // Tab switching logic
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

// Render Social Posts & Public Discourse
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
    <div class="footer-wrap">
      <div class="footer-identity">
        <a class="footer-email" href="mailto:${data.profile.email}">${data.profile.email}</a>
        <p class="footer-author">${data.profile.name} — ${data.profile.role}</p>
        <p class="footer-sub">Built with craft, curiosity, and product intuition.</p>
      </div>
      <nav class="footer-nav" aria-label="Footer links">
        <a class="back-to-top" href="#top">Back to top ↑</a>
        <a href="${data.profile.socials.linkedin}" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        <a href="${data.profile.socials.twitter}" target="_blank" rel="noopener noreferrer">𝕏</a>
        <a href="${data.profile.socials.substack}" target="_blank" rel="noopener noreferrer">Substack</a>
        <a href="/llms.txt" target="_blank" title="AI reading file">llms.txt</a>
      </nav>
    </div>
  `;
}

// Interactive Color Key Filter
function initBrickKeyFilter() {
  const keyButtons = document.querySelectorAll(".key-filter-btn");
  const resetBtn = document.getElementById("reset-filter-btn");

  keyButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const filterId = btn.dataset.filter;
      const targetSecId = btn.dataset.target;
      const isActive = btn.classList.contains("active");

      // Reset all buttons
      keyButtons.forEach(b => b.classList.remove("active"));
      document.querySelectorAll(".card-brick").forEach(c => c.classList.remove("dimmed", "highlighted"));

      if (isActive) {
        if (resetBtn) resetBtn.style.display = "none";
        return;
      }

      btn.classList.add("active");
      if (resetBtn) resetBtn.style.display = "inline-flex";

      // Highlight blocks matching filter
      const targetClass = `block-${btn.querySelector(".key-brick").classList.contains("key-blue") ? "blue" : btn.querySelector(".key-brick").classList.contains("key-yellow") ? "yellow" : "red"}`;

      document.querySelectorAll(".card-brick").forEach(card => {
        if (card.classList.contains(targetClass)) {
          card.classList.add("highlighted");
        } else {
          card.classList.add("dimmed");
        }
      });

      // Smooth scroll to section
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

// Copy Email with Toast
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
    }, 2800);
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

// Web Audio Tactile Brick Click Synthesizer
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
    // Tactile plastic 'clack' click
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(620, t);
    osc.frequency.exponentialRampToValueAtTime(140, t + 0.05);

    gain.gain.setValueAtTime(0.3, t);
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

// Interactive Three.js 3D Brick Playground
function initThreeJsPlayground() {
  const container = document.getElementById("scene");
  if (!container) return;

  // Sound toggle button
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

  // Check Three.js availability
  if (typeof THREE === "undefined") {
    container.innerHTML = `
      <div class="brick-fallback">
        <div style="background:#2563eb; width:160px; height:45px; border-radius:6px; margin:8px auto; box-shadow:0 6px 12px rgba(0,0,0,0.1);"></div>
        <div style="background:#f59e0b; width:130px; height:45px; border-radius:6px; margin:8px auto; box-shadow:0 6px 12px rgba(0,0,0,0.1);"></div>
        <div style="background:#ef4444; width:100px; height:45px; border-radius:6px; margin:8px auto; box-shadow:0 6px 12px rgba(0,0,0,0.1);"></div>
      </div>
    `;
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

  // Lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
  scene.add(ambientLight);

  const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
  dirLight.position.set(8, 12, 8);
  dirLight.castShadow = true;
  dirLight.shadow.mapSize.width = 1024;
  dirLight.shadow.mapSize.height = 1024;
  scene.add(dirLight);

  const fillLight = new THREE.DirectionalLight(0xdbeafe, 0.5);
  fillLight.position.set(-6, -4, -6);
  scene.add(fillLight);

  // Ground shadow receiver
  const shadowGeo = new THREE.PlaneGeometry(14, 14);
  const shadowMat = new THREE.ShadowMaterial({ opacity: 0.14 });
  const floor = new THREE.Mesh(shadowGeo, shadowMat);
  floor.rotation.x = -Math.PI / 2;
  floor.position.y = -1.2;
  floor.receiveShadow = true;
  scene.add(floor);

  // Brick Group
  const brickGroup = new THREE.Group();
  scene.add(brickGroup);

  // Brick Materials
  const materials = {
    blue: new THREE.MeshStandardMaterial({ color: 0x2563eb, roughness: 0.25, metalness: 0.05 }),
    yellow: new THREE.MeshStandardMaterial({ color: 0xf59e0b, roughness: 0.25, metalness: 0.05 }),
    red: new THREE.MeshStandardMaterial({ color: 0xef4444, roughness: 0.25, metalness: 0.05 }),
    green: new THREE.MeshStandardMaterial({ color: 0x10b981, roughness: 0.25, metalness: 0.05 }),
    purple: new THREE.MeshStandardMaterial({ color: 0x8b5cf6, roughness: 0.25, metalness: 0.05 }),
    teal: new THREE.MeshStandardMaterial({ color: 0x06b6d4, roughness: 0.25, metalness: 0.05 })
  };

  function createBrickMesh(width = 2, height = 0.7, depth = 1, colorName = "blue") {
    const group = new THREE.Group();
    const boxGeo = new THREE.BoxGeometry(width, height, depth);
    const mat = materials[colorName] || materials.blue;
    const box = new THREE.Mesh(boxGeo, mat);
    box.castShadow = true;
    box.receiveShadow = true;
    group.add(box);

    // Add classic studs on top
    const studsX = Math.round(width * 2);
    const studsZ = Math.round(depth * 2);
    const studGeo = new THREE.CylinderGeometry(0.18, 0.18, 0.15, 16);

    for (let ix = 0; ix < studsX; ix++) {
      for (let iz = 0; iz < studsZ; iz++) {
        const stud = new THREE.Mesh(studGeo, mat);
        stud.castShadow = true;
        const xOffset = -width / 2 + (ix + 0.5) * (width / studsX);
        const zOffset = -depth / 2 + (iz + 0.5) * (depth / studsZ);
        stud.position.set(xOffset, height / 2 + 0.075, zOffset);
        group.add(stud);
      }
    }
    return group;
  }

  // Build Presets
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
      { w: 1.5, h: 0.6, d: 0.8, c: "green", pos: [0, 0, -1.8], rot: [0, Math.PI / 2, 0] },
      { w: 1.2, h: 0.8, d: 1.2, c: "purple", pos: [0, 0.6, 0], rot: [0, 0.78, 0] }
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
      { w: 1.5, h: 0.6, d: 1.1, c: "green", pos: [0, 1.05, 0], rot: [0, 0.4, 0] },
      { w: 1.0, h: 0.6, d: 1.0, c: "purple", pos: [0, 1.7, 0], rot: [0, 0, 0] }
    ],
    staircase: [
      { w: 1.2, h: 0.6, d: 1.2, c: "blue", pos: [-1.4, -0.8, 0], rot: [0, 0, 0] },
      { w: 1.2, h: 0.6, d: 1.2, c: "teal", pos: [-0.7, -0.3, 0], rot: [0, 0, 0] },
      { w: 1.2, h: 0.6, d: 1.2, c: "yellow", pos: [0, 0.2, 0], rot: [0, 0, 0] },
      { w: 1.2, h: 0.6, d: 1.2, c: "green", pos: [0.7, 0.7, 0], rot: [0, 0, 0] },
      { w: 1.2, h: 0.6, d: 1.2, c: "red", pos: [1.4, 1.2, 0], rot: [0, 0, 0] }
    ],
    arch: [
      { w: 0.9, h: 1.8, d: 1, c: "blue", pos: [-1.4, 0, 0], rot: [0, 0, 0] },
      { w: 0.9, h: 1.8, d: 1, c: "blue", pos: [1.4, 0, 0], rot: [0, 0, 0] },
      { w: 3.8, h: 0.6, d: 1.1, c: "yellow", pos: [0, 1.1, 0], rot: [0, 0, 0] },
      { w: 1.8, h: 0.6, d: 1, c: "red", pos: [0, 1.75, 0], rot: [0, 0, 0] }
    ]
  };

  let activeBuild = "original";
  let brickMeshes = [];
  let isExploded = false;

  function loadBuild(name) {
    const config = builds[name] || builds.original;
    activeBuild = name;
    isExploded = false;

    // Remove old meshes
    while (brickGroup.children.length > 0) {
      brickGroup.remove(brickGroup.children[0]);
    }
    brickMeshes = [];

    config.forEach(spec => {
      const mesh = createBrickMesh(spec.w, spec.h, spec.d, spec.c);
      mesh.position.set(...spec.pos);
      mesh.rotation.set(...spec.rot);
      mesh.userData.defaultPos = [...spec.pos];
      mesh.userData.defaultRot = [...spec.rot];
      brickGroup.add(mesh);
      brickMeshes.push(mesh);
    });

    sounds.playBrickSnap();
  }

  loadBuild("original");

  // Build choice buttons
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
      if (titleEl) {
        titleEl.textContent = btn.querySelector("span:last-child").textContent;
      }
      loadBuild(design);
    });
  });

  // Disassemble / Stack toggle button
  const stackToggle = document.getElementById("stack-toggle");
  if (stackToggle) {
    stackToggle.disabled = false;
    stackToggle.addEventListener("click", () => {
      isExploded = !isExploded;
      sounds.playPop();

      brickMeshes.forEach(m => {
        if (isExploded) {
          const rx = (Math.random() - 0.5) * 4;
          const ry = (Math.random() - 0.5) * 3 + 0.5;
          const rz = (Math.random() - 0.5) * 4;
          m.position.set(rx, ry, rz);
          m.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
          stackToggle.innerHTML = "Reassemble the bricks ⤹";
        } else {
          m.position.set(...m.userData.defaultPos);
          m.rotation.set(...m.userData.defaultRot);
          stackToggle.innerHTML = "Scatter the bricks ↘";
          sounds.playBrickSnap();
        }
      });
    });
  }

  // Interactive Drag-to-Rotate Controls
  let isDragging = false;
  let previousMousePosition = { x: 0, y: 0 };
  let targetRotationY = 0;
  let targetRotationX = 0;

  const dom = renderer.domElement;
  dom.style.cursor = "grab";

  dom.addEventListener("mousedown", (e) => {
    isDragging = true;
    dom.style.cursor = "grabbing";
    previousMousePosition = { x: e.clientX, y: e.clientY };
  });

  window.addEventListener("mouseup", () => {
    isDragging = false;
    dom.style.cursor = "grab";
  });

  window.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    const deltaX = e.clientX - previousMousePosition.x;
    const deltaY = e.clientY - previousMousePosition.y;

    targetRotationY += deltaX * 0.008;
    targetRotationX = Math.max(-0.6, Math.min(0.8, targetRotationX + deltaY * 0.008));

    previousMousePosition = { x: e.clientX, y: e.clientY };
  });

  // Touch support for mobile
  dom.addEventListener("touchstart", (e) => {
    if (e.touches.length === 1) {
      isDragging = true;
      previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
  }, { passive: true });

  window.addEventListener("touchend", () => {
    isDragging = false;
  });

  window.addEventListener("touchmove", (e) => {
    if (!isDragging || e.touches.length !== 1) return;
    const deltaX = e.touches[0].clientX - previousMousePosition.x;
    const deltaY = e.touches[0].clientY - previousMousePosition.y;

    targetRotationY += deltaX * 0.01;
    targetRotationX = Math.max(-0.6, Math.min(0.8, targetRotationX + deltaY * 0.01));

    previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  }, { passive: true });

  // Animation Loop
  let reqId;
  function animate() {
    reqId = requestAnimationFrame(animate);

    // Subtle idle floating rotation when not dragging
    if (!isDragging) {
      targetRotationY += 0.003;
    }

    brickGroup.rotation.y += (targetRotationY - brickGroup.rotation.y) * 0.08;
    brickGroup.rotation.x += (targetRotationX - brickGroup.rotation.x) * 0.08;

    renderer.render(scene, camera);
  }
  animate();

  // Resize handler
  window.addEventListener("resize", () => {
    const w = container.clientWidth;
    const h = container.clientHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  });
}

// Live Customizer Drawer/Modal
function initCustomizerModal(data) {
  const openBtn = document.getElementById("open-customizer-btn");
  if (!openBtn) return;

  // Create modal container
  const modal = document.createElement("div");
  modal.id = "customizer-modal";
  modal.className = "customizer-modal";
  modal.innerHTML = `
    <div class="customizer-overlay"></div>
    <div class="customizer-drawer">
      <div class="customizer-header">
        <div>
          <h3>Customize Your PM Portfolio</h3>
          <p>Instantly update the site with your own profile, metrics, and links.</p>
        </div>
        <button id="close-customizer-btn" class="close-btn" type="button">✕</button>
      </div>

      <div class="customizer-body">
        <form id="customizer-form">
          <div class="form-group">
            <label for="cust-name">Your Full Name</label>
            <input type="text" id="cust-name" value="${data.profile.name}" required>
          </div>

          <div class="form-group">
            <label for="cust-initials">Wordmark Initials (e.g. sp, ak, jd)</label>
            <input type="text" id="cust-initials" value="${data.profile.initials}" maxlength="3">
          </div>

          <div class="form-group">
            <label for="cust-role">Your Current Role Title</label>
            <input type="text" id="cust-role" value="${data.profile.role}">
          </div>

          <div class="form-group">
            <label for="cust-company">Current Company</label>
            <input type="text" id="cust-company" value="${data.work.current.company}">
          </div>

          <div class="form-group">
            <label for="cust-bio">Short Bio (1-2 sentences)</label>
            <textarea id="cust-bio" rows="3">${data.profile.bio}</textarea>
          </div>

          <div class="form-group">
            <label for="cust-email">Email Address</label>
            <input type="email" id="cust-email" value="${data.profile.email}">
          </div>

          <div class="form-group">
            <label for="cust-metric1">Headline Metric 1 (e.g. 0 → 1.2M+)</label>
            <input type="text" id="cust-metric1" value="${data.work.current.metrics[0]?.value || ''}">
          </div>

          <div class="form-group">
            <label for="cust-metric2">Headline Metric 2 (e.g. 100× ARR)</label>
            <input type="text" id="cust-metric2" value="${data.work.current.metrics[1]?.value || ''}">
          </div>

          <div class="form-group">
            <label for="cust-linkedin">LinkedIn URL</label>
            <input type="url" id="cust-linkedin" value="${data.profile.socials.linkedin}">
          </div>

          <div class="form-group">
            <label for="cust-twitter">X / Twitter URL</label>
            <input type="url" id="cust-twitter" value="${data.profile.socials.twitter}">
          </div>

          <div class="form-actions">
            <button type="submit" class="save-btn">Apply Changes Live</button>
            <button type="button" id="copy-json-btn" class="export-btn">Copy Config JSON</button>
          </div>
        </form>
      </div>
    </div>
  `;

  document.body.appendChild(modal);

  const overlay = modal.querySelector(".customizer-overlay");
  const closeBtn = modal.querySelector("#close-customizer-btn");
  const form = modal.querySelector("#customizer-form");
  const copyJsonBtn = modal.querySelector("#copy-json-btn");

  function openModal() {
    modal.classList.add("active");
  }

  function closeModal() {
    modal.classList.remove("active");
  }

  openBtn.addEventListener("click", openModal);
  closeBtn.addEventListener("click", closeModal);
  overlay.addEventListener("click", closeModal);

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const newName = document.getElementById("cust-name").value;
    const newInitials = document.getElementById("cust-initials").value || newName.slice(0, 2).toLowerCase();
    const newRole = document.getElementById("cust-role").value;
    const newCompany = document.getElementById("cust-company").value;
    const newBio = document.getElementById("cust-bio").value;
    const newEmail = document.getElementById("cust-email").value;
    const newMetric1 = document.getElementById("cust-metric1").value;
    const newMetric2 = document.getElementById("cust-metric2").value;
    const newLi = document.getElementById("cust-linkedin").value;
    const newTw = document.getElementById("cust-twitter").value;

    data.profile.name = newName;
    data.profile.shortName = newName.split(" ")[0];
    data.profile.initials = newInitials;
    data.profile.role = newRole;
    data.profile.tagline = `Hi, I’m <span>${data.profile.shortName}.</span>`;
    data.profile.bio = newBio;
    data.profile.email = newEmail;
    data.profile.socials.linkedin = newLi;
    data.profile.socials.twitter = newTw;

    data.work.current.company = newCompany;
    data.work.current.role = newRole;
    if (data.work.current.metrics[0]) data.work.current.metrics[0].value = newMetric1;
    if (data.work.current.metrics[1]) data.work.current.metrics[1].value = newMetric2;

    renderHeaderAndHero(data);
    renderWorkSection(data);
    renderFooter(data);

    closeModal();
    const toast = document.getElementById("toast-notification");
    if (toast) {
      toast.textContent = "Profile updated live! Save portfolio-data.js to persist permanently.";
      toast.classList.add("show");
      setTimeout(() => toast.classList.remove("show"), 3200);
    }
  });

  copyJsonBtn.addEventListener("click", () => {
    const jsonStr = "window.PORTFOLIO_DATA = " + JSON.stringify(data, null, 2) + ";\n";
    if (navigator.clipboard) {
      navigator.clipboard.writeText(jsonStr).then(() => {
        copyJsonBtn.textContent = "Copied to Clipboard! ✓";
        setTimeout(() => copyJsonBtn.textContent = "Copy Config JSON", 2000);
      });
    }
  });
}
