// Paste this into script.js
tabs.forEach((tab) => {
const section = tab.dataset.section;
const aspect = get_portfolio_signal_aspect(section);
const dots = tab.querySelectorAll(".dot");


const colors = [aspect.dot1, aspect.dot2, aspect.dot3];
dots.forEach((d, i) => {
const c = colors[i];
d.style.background = cssColorToken(c);
d.style.boxShadow = `0 0 14px ${cssColorToken(c)}`;
});
});
}


function openStation(sectionName) {
// Left states
tabs.forEach((t) => {
t.classList.remove("is-active", "is-active-prev", "accent-yellow", "accent-green", "accent-red");
});


const idx = tabs.findIndex((t) => t.dataset.section === sectionName);
const active = tabs[idx];
if (!active) return;
active.classList.add("is-active");


// preceding tab label gets its own signal accent
const prev = tabs[idx - 1];
if (prev) {
prev.classList.add("is-active-prev");
const prevAspect = get_portfolio_signal_aspect(prev.dataset.section);
// use the first dot as the accent "identity" color
prev.classList.add(accentClassFromColor(prevAspect.dot1));
}


// Right content: show only the selected station
stations.forEach((s) => {
s.classList.toggle("is-open", s.dataset.station === sectionName);
});


// Header title + badge
panelTitle.textContent = panelTitles[sectionName] || sectionName;
panelBadge.textContent = badgeText[sectionName] || "";


// Badge glow should use the ACTIVE tab's FIRST dot (identity color)
const aspect = get_portfolio_signal_aspect(sectionName);
panelBadge.classList.remove("glow-yellow", "glow-green", "glow-red");
const glow = glowClassFromColor(aspect.dot1);
if (glow) panelBadge.classList.add(glow);


pinnedLabel.textContent = sectionName;
}


function applyHoverTrackLogic(hoverIndex) {
// clear hover states
tabs.forEach((t) => t.classList.remove("is-hover", "is-next", "is-prev"));


if (hoverIndex < 0) return;
const hovered = tabs[hoverIndex];
const next = tabs[hoverIndex + 1];
const prev = tabs[hoverIndex - 1];


if (hovered) hovered.classList.add("is-hover");
if (next) next.classList.add("is-next");
if (prev) prev.classList.add("is-prev");
}


// Init
applySignalDots();
openStation("Station Master / Welcome");


// Click to pin/open
tabs.forEach((tab) => {
tab.addEventListener("click", () => {
openStation(tab.dataset.section);
});
});


// Hover preview signals (does not change open station)
tabs.forEach((tab, i) => {
tab.addEventListener("mouseenter", () => applyHoverTrackLogic(i));
});


document.querySelector(".nav").addEventListener("mouseleave", () => {
applyHoverTrackLogic(-1);
});
