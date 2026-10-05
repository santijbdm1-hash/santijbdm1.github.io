/* ============================================================
   IMAGE GUIDE: single source for every placeholder.
   1. Save your image in /images using the file name below.
   2. Add that file name to AVAILABLE. The placeholder is replaced.
   ============================================================ */
const AVAILABLE = []; // e.g. ["badminton-action.jpg", "journal-home.png"]

const ASSETS = {
  // Badminton section (4 photos in a row). Aspect ratio 3:4 portrait, about 1200x1600 px.
  "b-action":     {t:"PHOTO", f:"badminton-action.jpg",     d:"Competitive badminton action shot (smash, jump or lunge)."},
  "b-tournament": {t:"PHOTO", f:"badminton-tournament.jpg", d:"Tournament photo (venue, bib, bracket or team)."},
  "b-training":   {t:"PHOTO", f:"badminton-training.jpg",   d:"Training photo (practice, drills, gym)."},
  "b-podium":     {t:"PHOTO", f:"badminton-podium.jpg",     d:"Podium or achievement photo (medal, trophy, certificate)."},
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

document.querySelectorAll(".ph").forEach(el=>{
  const a = ASSETS[el.dataset.id]; if(!a) return;
  if(AVAILABLE.includes(a.f)){
    el.classList.add("has"); el.style.backgroundImage = `url("images/${a.f}")`;
    el.setAttribute("role","img"); el.setAttribute("aria-label",a.d);
  } else {
    el.innerHTML = `<b>[${a.t}: ${a.d.split(/[.(]/)[0]}]</b><span>${a.d}</span><span>images/${a.f}</span>`;
  }
});

// ── Mobile menu ──
const btn = document.querySelector(".menu-btn"), menu = document.getElementById("menu");
btn.addEventListener("click",()=>{const o = menu.classList.toggle("open"); btn.setAttribute("aria-expanded",o);});
menu.addEventListener("click",e=>{if(e.target.tagName==="A"){menu.classList.remove("open");btn.setAttribute("aria-expanded","false");}});

// ── Overview dialogs ──
document.querySelectorAll("[data-open]").forEach(b=>b.addEventListener("click",()=>document.getElementById(b.dataset.open).showModal()));
document.querySelectorAll("dialog").forEach(d=>{
  d.querySelector("[data-close]").addEventListener("click",()=>d.close());
  d.addEventListener("click",e=>{if(e.target===d) d.close();});
});

// ── Nav: scrolled shadow ──
const nav = document.querySelector(".nav");
window.addEventListener("scroll",()=>{
  nav.classList.toggle("scrolled", window.scrollY > 20);
}, {passive:true});

// ── Nav: active section highlight ──
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll("#menu a");
const activateLink = ()=>{
  let current = "";
  sections.forEach(s=>{
    if(window.scrollY >= s.offsetTop - 100) current = s.id;
  });
  navLinks.forEach(a=>{
    a.classList.toggle("active", a.getAttribute("href")==="#"+current);
  });
};
window.addEventListener("scroll", activateLink, {passive:true});
activateLink();

// ── Hero glow orb: follows mouse ──
const glow = document.querySelector(".hero-glow");
const hero = document.querySelector(".hero");
if(glow && hero){
  hero.addEventListener("mousemove",e=>{
    const r = hero.getBoundingClientRect();
    glow.style.left = (e.clientX - r.left)+"px";
    glow.style.top  = (e.clientY - r.top)+"px";
  },{passive:true});
}

// ── Scroll reveal via IntersectionObserver ──
const prefersReduced = window.matchMedia("(prefers-reduced-motion:reduce)").matches;
if(!prefersReduced){
  const observer = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },{threshold:0.12});
  document.querySelectorAll("[data-reveal]").forEach(el=>observer.observe(el));
}
