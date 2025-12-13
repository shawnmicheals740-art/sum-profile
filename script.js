// SIGNAL STATE RULE (what you asked):
// - current tab: GREEN
// - immediate previous: RED
// - everything before that: YELLOW
// - everything after current: GREEN
//
// Each tab has 3 dots in fixed order: [RED, YELLOW, GREEN]
// We "light up" only one dot based on the tab’s current state.

const tabs = Array.from(document.querySelectorAll(".tab"));
const stations = Array.from(document.querySelectorAll(".station"));

const pinnedLabel = document.getElementById("pinnedLabel");
const panelTitle = document.getElementById("panelTitle");
const panelBadge = document.getElementById("panelBadge");

const badgeText = {
  "Welcome": "WELCOME · OVERVIEW",
  "The Train Schedule": "SCHEDULE · EXPERIENCE",
  "The Engine Room": "SKILLS · SYSTEMS",
  "The Freight Car": "PROJECTS · ASSETS",
  "The Journey Log": "EDUCATION · CERTS",
  "Ticket Counter": "CONTACT · FINAL STOP",
};

function setBadgeGlow(color) {
  panelBadge.classList.remove("glow-green", "glow-yellow", "glow-red");
  if (color === "green") panelBadge.classList.add("glow-green");
  if (color === "yellow") panelBadge.classList.add("glow-yellow");
  if (color === "red") panelBadge.classList.add("glow-red");
}

function lightOnly(tabEl, color) {
  const r = tabEl.querySelector(".dot-red");
  const y = tabEl.querySelector(".dot-yellow");
  const g = tabEl.querySelector(".dot-green");

  [r, y, g].forEach(d => d.classList.remove("is-lit"));

  if (color === "red") r.classList.add("is-lit");
  if (color === "yellow") y.classList.add("is-lit");
  if (color === "green") g.classList.add("is-lit");
}

function applySignalStates(currentIndex) {
  tabs.forEach((tab, i) => {
    let stateColor = "green";

    if (i === currentIndex) stateColor = "green";
    else if (i === currentIndex - 1) stateColor = "red";
    else if (i < currentIndex - 1) stateColor = "yellow";
    else if (i > currentIndex) stateColor = "green";

    lightOnly(tab, stateColor);
  });

  // Badge illumination follows CURRENT tab color (always green in your rule)
  // But if you ever change rule later, this still works.
  setBadgeGlow("green");
}

function openSectionByIndex(index) {
  tabs.forEach(t => t.classList.remove("is-active"));
  const activeTab = tabs[index];
  if (!activeTab) return;

  activeTab.classList.add("is-active");

  const sectionName = activeTab.dataset.section;

  stations.forEach(s => {
    s.classList.toggle("is-open", s.dataset.station === sectionName);
  });

  panelTitle.textContent = sectionName;
  panelBadge.textContent = badgeText[sectionName] || "";
  pinnedLabel.textContent = sectionName;

  applySignalStates(index);
}

// Click handlers
tabs.forEach((tab, idx) => {
  tab.addEventListener("click", () => openSectionByIndex(idx));
});

// INITIAL LOAD
// You said: first time -> all GREEN
// So we open Welcome (index 0) but also set all tabs to green-only-lit.
openSectionByIndex(0);
tabs.forEach(tab => lightOnly(tab, "green"));
setBadgeGlow("green");
