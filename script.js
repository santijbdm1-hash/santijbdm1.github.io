/* ============================================================
   IMAGE GUIDE: single source for every placeholder.
   1. Save your image in /images using the file name below.
   2. Add that file name to AVAILABLE. The placeholder is replaced.
   ============================================================ */
const AVAILABLE = []; // e.g. ["journal-home.png", "wallet-dashboard.png"]

const ASSETS = {
  // My Journal (dark theme app). Phone screenshots 3:4 (about 1170x1560), wide one 21:9 (about 2100x900).
  "j-home":    {t:"SCREENSHOT", f:"journal-home.png",    d:"My Journal main/home screen in dark mode."},
  "j-today":   {t:"SCREENSHOT", f:"journal-today.png",   d:"My Journal Today screen with logged activities."},
  "j-library": {t:"SCREENSHOT", f:"journal-library.png", d:"My Journal Library screen."},
  "j-goals":   {t:"SCREENSHOT", f:"journal-goals.png",   d:"My Journal Goals or Events screen."},
  "j-unique":  {t:"SCREENSHOT", f:"journal-unique.png",  d:"The most interesting or unique My Journal feature (wide, 21:9)."},
  // My Wallet. Wide ones 21:9 (about 2100x900), phone shots 3:4 (about 1170x1560).
  "w-dash":   {t:"SCREENSHOT", f:"wallet-dashboard.png",    d:"My Wallet main dashboard (wide, 21:9)."},
  "w-trans":  {t:"SCREENSHOT", f:"wallet-transactions.png", d:"My Wallet transactions / money tracking screen."},
  "w-budget": {t:"SCREENSHOT", f:"wallet-budget.png",       d:"My Wallet budget, overview or analytics screen."},
  "w-extra":  {t:"SCREENSHOT", f:"wallet-feature.png",      d:"Another interesting My Wallet feature (wide, 21:9)."}
};

// Render placeholders or loaded assets
document.querySelectorAll(".ph").forEach(el => {
  const a = ASSETS[el.dataset.id]; 
  if (!a) return;
  if (AVAILABLE.includes(a.f)) {
    el.classList.add("has"); 
    el.style.backgroundImage = `url("images/${a.f}")`;
    el.setAttribute("role", "img"); 
    el.setAttribute("aria-label", a.d);
  } else {
    el.innerHTML = `<b>[${a.t}: ${a.d.split(/[.(]/)[0]}]</b><span>${a.d}</span><span>images/${a.f}</span>`;
  }
});

// ── Mobile menu ──
const btn = document.querySelector(".menu-btn");
const menu = document.getElementById("menu");
if (btn && menu) {
  btn.addEventListener("click", () => {
    const o = menu.classList.toggle("open");
    btn.setAttribute("aria-expanded", o);
  });
  menu.addEventListener("click", e => {
    if (e.target.tagName === "A") {
      menu.classList.remove("open");
      btn.setAttribute("aria-expanded", "false");
    }
  });
}

// ── Overview dialogs ──
document.querySelectorAll("[data-open]").forEach(b => {
  b.addEventListener("click", () => {
    const dlg = document.getElementById(b.dataset.open);
    if (dlg) dlg.showModal();
  });
});
document.querySelectorAll("dialog").forEach(d => {
  const closeBtn = d.querySelector("[data-close]");
  if (closeBtn) closeBtn.addEventListener("click", () => d.close());
  d.addEventListener("click", e => {
    if (e.target === d) d.close();
  });
});

// ── Nav: Scrolled shadow toggle ──
const nav = document.querySelector(".nav");
window.addEventListener("scroll", () => {
  if (nav) nav.classList.toggle("scrolled", window.scrollY > 20);
}, { passive: true });

// ── Nav: Active section highlight on scroll ──
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll("#menu a");
const activateLink = () => {
  let current = "";
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 120) current = s.id;
  });
  navLinks.forEach(a => {
    a.classList.toggle("active", a.getAttribute("href") === "#" + current);
  });
};
window.addEventListener("scroll", activateLink, { passive: true });
activateLink();

// ── Hero Glow Orb: Smooth Mouse Follower ──
const glow = document.querySelector(".hero-glow");
const hero = document.querySelector(".hero");
if (glow && hero) {
  hero.addEventListener("mousemove", e => {
    const r = hero.getBoundingClientRect();
    glow.style.left = (e.clientX - r.left) + "px";
    glow.style.top = (e.clientY - r.top) + "px";
  }, { passive: true });
}

// ── 3D Tilt Micro-Interaction for Cards ──
const tiltCards = document.querySelectorAll(".about-card, .principle-card");
tiltCards.forEach(card => {
  card.addEventListener("mousemove", e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -4;
    const rotateY = ((x - centerX) / centerX) * 4;
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "";
  });
});

// ── Scroll Reveal via IntersectionObserver ──
const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
if (!prefersReduced) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll("[data-reveal]").forEach(el => observer.observe(el));
} else {
  document.querySelectorAll("[data-reveal]").forEach(el => el.classList.add("visible"));
}
