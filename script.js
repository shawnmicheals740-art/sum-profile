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

function setTabSignal(tab, color) {
  const red = tab.querySelector(".dot-red");
  const yellow = tab.querySelector(".dot-yellow");
  const green = tab.querySelector(".dot-green");

  [red, yellow, green].forEach(d => d.classList.remove("on"));

  if (color === "red") red.classList.add("on");
  if (color === "yellow") yellow.classList.add("on");
  if (color === "green") green.classList.add("on");
}

/**
 * YOUR REQUESTED LOGIC:
 * activeIndex = current opened tab
 * - tabs > activeIndex : GREEN
 * - tab  activeIndex   : GREEN
 * - tab  activeIndex-1 : RED
 * - tabs < activeIndex-1 : YELLOW
 */
function applyJourneySignals(activeIndex) {
  tabs.forEach((tab, idx) => {
    if (idx === activeIndex - 1) {
      setTabSignal(tab, "red");
    } else if (idx < activeIndex - 1) {
      setTabSignal(tab, "yellow");
    } else {
      setTabSignal(tab, "green");
    }
  });

  // Badge should follow CURRENT tab color (always green by this rule)
  setBadgeGlow("green");
}

function openStation(sectionName) {
  const activeIndex = tabs.findIndex(t => t.dataset.section === sectionName);
  if (activeIndex < 0) return;

  // left: active pop
  tabs.forEach(t => t.classList.remove("is-active"));
  tabs[activeIndex].classList.add("is-active");

  // right: show only selected content
  stations.forEach(s => {
    s.classList.toggle("is-open", s.dataset.station === sectionName);
  });

  // header
  panelTitle.textContent = sectionName;
  panelBadge.textContent = badgeText[sectionName] || "";
  pinnedLabel.textContent = sectionName;

  // signals
  applyJourneySignals(activeIndex);
}

// Initial state: first visit => ALL GREEN, Welcome open
openStation("Welcome");

// Click handling
tabs.forEach(tab => {
  tab.addEventListener("click", () => openStation(tab.dataset.section));
});
