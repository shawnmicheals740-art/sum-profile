```css
"The Journey Log": "EDUCATION · CERTS",
"Ticket Counter": "CONTACT · FINAL STOP",
};


const panelTitles = {
"Station Master / Welcome": "Station Master",
"The Train Schedule": "The Train Schedule",
"The Engine Room": "The Engine Room",
"The Freight Car": "The Freight Car",
"The Journey Log": "The Journey Log",
"Ticket Counter": "Ticket Counter",
};


function cssColorToken(colorName) {
if (colorName === "yellow") return "var(--yellow)";
if (colorName === "green") return "var(--green)";
if (colorName === "red") return "var(--red)";
return "rgba(148,163,184,0.28)";
}


function glowClassFromColor(colorName) {
if (colorName === "yellow") return "glow-yellow";
if (colorName === "green") return "glow-green";
if (colorName === "red") return "glow-red";
return "";
}


function applySignalDots() {
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
// Left: active pop-out
tabs.forEach((t) => t.classList.remove("is-active"));
const idx = tabs.findIndex((t) => t.dataset.section === sectionName);
const active = tabs[idx];
if (!active) return;
active.classList.add("is-active");


// Right: show only selected station
stations.forEach((s) => s.classList.toggle("is-open", s.dataset.station === sectionName));


// Header title + badge
panelTitle.textContent = panelTitles[sectionName] || sectionName;
panelBadge.textContent = badgeText[sectionName] || "";


// Badge glow = first dot color of selected tab
const aspect = get_portfolio_signal_aspect(sectionName);
panelBadge.classList.remove("glow-yellow", "glow-green", "glow-red");
const glow = glowClassFromColor(aspect.dot1);
if (glow) panelBadge.classList.add(glow);


pinnedLabel.textContent = sectionName;
}


function applyHoverTrackLogic(hoverIndex) {
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
tab.addEventListener("click", () => openStation(tab.dataset.section));
});


// Hover preview signals
tabs.forEach((tab, i) => {
tab.addEventListener("mouseenter", () => applyHoverTrackLogic(i));
});


document.querySelector(".nav").addEventListener("mouseleave", () => applyHoverTrackLogic(-1));
```
